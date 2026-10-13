import type { LeadFormColumnIds } from '@/src/types/forms';
import type { MondayBoardConfig } from '@/src/types/monday';

/** Same-origin path proxied to https://api.monday.com/v2 by nginx (prod) and Vite (dev). */
export const MONDAY_API_PATH = '/api/monday';

export const CONTACT_BOARD = {
  boardId: '5027978324',
  columns: {
    status: 'status',
    dateReceived: 'date_mm2mscyv',
    service: 'text_mm2mz8bt',
    jobTitle: 'text_mm2m5d5',
    company: 'text_mm2mf7yg',
    email: 'text_mm2myr13',
    phone: 'numeric_mm2me53n',
    message: 'text_mm2mhdp3',
    timeline: 'text_mm2mp8zj',
  },
} as const satisfies MondayBoardConfig;

export const SIM_SIGNUP_BOARD = {
  boardId: '5028626358',
  columns: {
    dateReceived: 'date_mm3g656w',
    company: 'text_mm3gfhg4',
    email: 'text_mm3gmf5j',
    phone: 'numeric_mm3g3vmg',
  },
} as const satisfies MondayBoardConfig;

export const SIM_TICKET_BOARD = {
  boardId: '5028643256',
  columns: {
    email: 'text_mm3gc1n1',
    requestType: 'dropdown_mm3gm404',
    simKit: 'dropdown_mm3g1kxb',
    requestDate: 'date_mm3gv78f',
    cancellationReason: 'text_mm3gbmmd',
  },
} as const satisfies MondayBoardConfig;

/** Default column ids for the generic lead form (MondayForm). */
export const DEFAULT_LEAD_FORM_COLUMN_IDS: LeadFormColumnIds = {
  email: 'text_mm2v7xcv',
  phone: 'numeric_mm2vzhat',
  country: 'text_mm2v24dt',
  industry: 'text_mm2v5stv',
  service: 'dropdown_mm2v25n',
  comments: 'text_mm2vghgy',
  status: 'status',
  date: 'date4',
};

export const WATCH_GUARDIAN_LEAD_BOARD_ID = '5028100217';

