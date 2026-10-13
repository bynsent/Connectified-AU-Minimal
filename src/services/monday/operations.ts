import { defineOperation, isRecord } from '@/src/services/graphqlClient';
import type {
  CreateItemResult,
  CreateItemVariables,
  CreateSubitemResult,
  CreateSubitemVariables,
} from '@/src/types/monday';

const hasId = (value: unknown): value is { id: string } =>
  isRecord(value) && (typeof value.id === 'string' || typeof value.id === 'number');

const isCreateItemResult = (data: unknown): data is CreateItemResult =>
  isRecord(data) && hasId(data.create_item);

const isCreateSubitemResult = (data: unknown): data is CreateSubitemResult =>
  isRecord(data) && hasId(data.create_subitem);

export const CREATE_ITEM = defineOperation<CreateItemResult, CreateItemVariables>(
  'CreateItem',
  /* GraphQL */ `
    mutation CreateItem($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item(board_id: $boardId, item_name: $itemName, column_values: $columnValues) {
        id
      }
    }
  `,
  isCreateItemResult,
);

export const CREATE_SUBITEM = defineOperation<CreateSubitemResult, CreateSubitemVariables>(
  'CreateSubitem',
  /* GraphQL */ `
    mutation CreateSubitem($parentItemId: ID!, $itemName: String!) {
      create_subitem(parent_item_id: $parentItemId, item_name: $itemName) {
        id
      }
    }
  `,
  isCreateSubitemResult,
);

