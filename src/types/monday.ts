/** Monday.com IDs are sent as GraphQL `ID!` – kept as strings to avoid precision issues. */
export type MondayId = string;

// ─── Column values (domain) ──────────────────────────────────────────────────

export interface MondayDateValue {
  readonly date: string; // YYYY-MM-DD
}

export interface MondayLabelsValue {
  readonly labels: readonly string[];
}

export interface MondayStatusValue {
  readonly label: string;
}

/** Value accepted by a Monday column in `column_values`. Plain strings cover text/numeric columns. */
export type MondayColumnValue = string | MondayDateValue | MondayLabelsValue | MondayStatusValue;

/** Column id → value map; serialised to JSON for the `column_values` variable. */
export type MondayColumnValues = Readonly<Record<string, MondayColumnValue>>;

/** A board and its logical-name → column-id mapping. */
export interface MondayBoardConfig<TColumn extends string = string> {
  readonly boardId: MondayId;
  readonly columns: Readonly<Record<TColumn, string>>;
}

/** Domain input for creating an item. */
export interface MondayItemInput {
  readonly boardId: MondayId;
  readonly itemName: string;
  readonly columnValues: MondayColumnValues;
}

/** Domain input for creating a subitem. */
export interface MondaySubitemInput {
  readonly parentItemId: MondayId;
  readonly itemName: string;
}

// ─── GraphQL DTOs ────────────────────────────────────────────────────────────

export interface CreateItemVariables {
  readonly boardId: MondayId;
  readonly itemName: string;
  /** JSON-encoded `MondayColumnValues`. */
  readonly columnValues: string;
}

export interface CreateItemResult {
  readonly create_item: { readonly id: MondayId };
}

export interface CreateSubitemVariables {
  readonly parentItemId: MondayId;
  readonly itemName: string;
}

export interface CreateSubitemResult {
  readonly create_subitem: { readonly id: MondayId };
}

