import { MONDAY_API_PATH } from '@/src/config/monday';
import { graphqlRequest } from '@/src/services/graphqlClient';
import type { MondayId, MondayItemInput, MondaySubitemInput } from '@/src/types/monday';
import { serializeColumnValues } from './columnValues';
import { CREATE_ITEM, CREATE_SUBITEM } from './operations';

export const createMondayItem = async (
  input: MondayItemInput,
  signal?: AbortSignal,
): Promise<MondayId> => {
  const data = await graphqlRequest(
    MONDAY_API_PATH,
    CREATE_ITEM,
    {
      boardId: input.boardId,
      itemName: input.itemName,
      columnValues: serializeColumnValues(input.columnValues),
    },
    { signal },
  );
  return String(data.create_item.id);
};

export const createMondaySubitem = async (
  input: MondaySubitemInput,
  signal?: AbortSignal,
): Promise<MondayId> => {
  const data = await graphqlRequest(MONDAY_API_PATH, CREATE_SUBITEM, input, { signal });
  return String(data.create_subitem.id);
};

