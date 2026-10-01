import { REQUEST_TIMEOUT_MS } from '@/src/config/constants';
import type {
  GraphQLErrorDto,
  GraphQLOperation,
  GraphQLRequestErrorKind,
  GraphQLRequestOptions,
} from '@/src/types/graphql';

export class GraphQLRequestError extends Error {
  readonly kind: GraphQLRequestErrorKind;
  readonly operationName: string;
  readonly status?: number;
  readonly codes: readonly string[];

  constructor(
    kind: GraphQLRequestErrorKind,
    operationName: string,
    details: { status?: number; codes?: readonly string[] } = {},
  ) {
    super(`GraphQL ${operationName} failed: ${kind}`);
    this.name = 'GraphQLRequestError';
    this.kind = kind;
    this.operationName = operationName;
    this.status = details.status;
    this.codes = details.codes ?? [];
  }
}

export const defineOperation = <TData, TVariables>(
  operationName: string,
  query: string,
  isData: (data: unknown) => data is TData,
): GraphQLOperation<TData, TVariables> => ({ operationName, query, isData });

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const errorCodes = (errors: readonly GraphQLErrorDto[]): string[] =>
  errors.map((e) => {
    const code = e.extensions?.code;
    return typeof code === 'string' ? code : 'UNKNOWN';
  });

const parseErrors = (value: unknown): GraphQLErrorDto[] =>
  Array.isArray(value)
    ? value.filter(isRecord).map((e) => ({
        message: typeof e.message === 'string' ? e.message : '',
        extensions: isRecord(e.extensions) ? e.extensions : undefined,
      }))
    : [];

/**
 * The only GraphQL transport in the app. Sends `{ query, variables }` to a same-origin
 * proxy path; credentials are attached by nginx / the Vite dev proxy, never here.
 */
export const graphqlRequest = async <TData, TVariables>(
  endpoint: string,
  operation: GraphQLOperation<TData, TVariables>,
  variables: TVariables,
  options: GraphQLRequestOptions = {},
): Promise<TData> => {
  const { operationName } = operation;
  const timeoutSignal = AbortSignal.timeout(options.timeoutMs ?? REQUEST_TIMEOUT_MS);
  const signal = options.signal ? AbortSignal.any([options.signal, timeoutSignal]) : timeoutSignal;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: operation.query, variables }),
      signal,
    });
  } catch {
    if (options.signal?.aborted) throw new GraphQLRequestError('aborted', operationName);
    if (timeoutSignal.aborted) throw new GraphQLRequestError('timeout', operationName);
    throw new GraphQLRequestError('network', operationName);
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new GraphQLRequestError(response.ok ? 'invalid-response' : 'http', operationName, {
      status: response.status,
    });
  }

  if (!response.ok) {
    throw new GraphQLRequestError('http', operationName, { status: response.status });
  }
  if (!isRecord(body)) {
    throw new GraphQLRequestError('invalid-response', operationName, { status: response.status });
  }

  const errors = parseErrors(body.errors);
  if (errors.length > 0) {
    throw new GraphQLRequestError('graphql', operationName, {
      status: response.status,
      codes: errorCodes(errors),
    });
  }

  if (!operation.isData(body.data)) {
    throw new GraphQLRequestError('invalid-response', operationName, { status: response.status });
  }
  return body.data;
};

