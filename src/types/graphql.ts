/** A named GraphQL document bound to its result and variables types. */
export interface GraphQLOperation<TData, TVariables> {
  readonly operationName: string;
  readonly query: string;
  /** Runtime guard used to validate `data` at the service boundary. */
  readonly isData: (data: unknown) => data is TData;
  /** Phantom field for variables type inference only. */
  readonly __variables?: TVariables;
}

/** A single entry of a GraphQL `errors` array (transport DTO). */
export interface GraphQLErrorDto {
  readonly message: string;
  readonly extensions?: Readonly<Record<string, unknown>>;
}

/** Raw GraphQL-over-HTTP response body (transport DTO). */
export interface GraphQLResponseDto {
  readonly data?: unknown;
  readonly errors?: readonly GraphQLErrorDto[];
}

export type GraphQLRequestErrorKind =
  | 'network'
  | 'timeout'
  | 'http'
  | 'graphql'
  | 'invalid-response'
  | 'aborted';

export interface GraphQLRequestOptions {
  /** Caller-controlled cancellation (e.g. component unmount). */
  readonly signal?: AbortSignal;
  /** Overrides the default request timeout. */
  readonly timeoutMs?: number;
}

