export interface TableColumn {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
}

export interface TableDefinition {
  name: string;
  displayName: string;
  columns: TableColumn[];
  hasOfficeGroup: boolean;
}

export interface TableData {
  tableName: string;
  columns: string[];
  rows: Record<string, any>[];
  totalRecords: number;
}

export interface TableRequest {
  tableName: string;
  page?: number;
  pageSize?: number;
  filters?: Record<string, any>;
}
