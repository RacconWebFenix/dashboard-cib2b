import type { SearchParams, TableFilter } from "../components/TableFilters";
import type { TableData } from "../types/tables";

export interface SQLQueryRequest {
  tableName: string;
  select?: string[];
  filters: SQLFilter[];
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  page: number;
  pageSize: number;
  joins?: SQLJoin[];
}

export interface SQLFilter {
  field: string;
  operator:
    | "="
    | "LIKE"
    | ">"
    | "<"
    | ">="
    | "<="
    | "IN"
    | "IS NULL"
    | "IS NOT NULL";
  value?: string | number | boolean | null;
  type: "string" | "number" | "date" | "boolean";
}

export interface SQLJoin {
  table: string;
  on: string;
  type: "INNER" | "LEFT" | "RIGHT" | "FULL";
}

export interface SQLQueryResponse {
  data: TableData;
  query: string;
  executionTime: number;
  totalRecords: number;
}

export class SQLQueryService {
  private static readonly API_BASE_URL = "http://localhost:3001/api";

  /**
   * Converte parâmetros de pesquisa para consulta SQL
   */
  static buildSQLQuery(
    params: SearchParams,
    tableName: string
  ): SQLQueryRequest {
    return {
      tableName,
      select: this.getDefaultColumns(tableName),
      filters: params.filters.map(this.convertFilter),
      orderBy: params.orderBy,
      orderDirection: params.orderDirection,
      page: params.page,
      pageSize: params.pageSize,
      joins: this.getDefaultJoins(tableName),
    };
  }

  /**
   * Executa consulta SQL via POST
   */
  static async executeQuery(
    params: SearchParams,
    tableName: string
  ): Promise<SQLQueryResponse> {
    const sqlQuery = this.buildSQLQuery(params, tableName);

    try {
      const response = await fetch(`${this.API_BASE_URL}/sql/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(sqlQuery),
      });

      if (!response.ok) {
        throw new Error(
          `Erro na consulta SQL: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erro na execução da consulta SQL:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erro desconhecido na consulta SQL"
      );
    }
  }

  /**
   * Versão mock para demonstração
   */
  static async executeMockQuery(
    params: SearchParams,
    tableName: string
  ): Promise<SQLQueryResponse> {
    // Simula delay da API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const sqlQuery = this.buildSQLQuery(params, tableName);
    const mockQuery = this.generateSQLString(sqlQuery);

    // Dados mock para ADDRESS
    const mockData = this.generateMockAddressData(params.pageSize);

    return {
      data: {
        tableName,
        columns: this.getDefaultColumns(tableName),
        rows: mockData,
        totalRecords: 150, // Mock total
      },
      query: mockQuery,
      executionTime: Math.random() * 100 + 50, // 50-150ms
      totalRecords: 150,
    };
  }

  /**
   * Converte filtro para formato SQL
   */
  private static convertFilter(filter: TableFilter): SQLFilter {
    return {
      field: filter.field,
      operator: filter.operator,
      value: filter.value,
      type: filter.type,
    };
  }

  /**
   * Gera string SQL a partir dos parâmetros
   */
  private static generateSQLString(query: SQLQueryRequest): string {
    let sql = `SELECT ${query.select?.join(", ") || "*"}`;
    sql += `\nFROM ${query.tableName}`;

    // Joins
    if (query.joins && query.joins.length > 0) {
      query.joins.forEach((join) => {
        sql += `\n${join.type} JOIN ${join.table} ON ${join.on}`;
      });
    }

    // WHERE clause
    if (query.filters && query.filters.length > 0) {
      const whereConditions = query.filters.map((filter) => {
        if (
          filter.operator === "IS NULL" ||
          filter.operator === "IS NOT NULL"
        ) {
          return `${filter.field} ${filter.operator}`;
        }

        if (filter.operator === "LIKE") {
          return `${filter.field} LIKE '%${filter.value}%'`;
        }

        if (filter.type === "string" && filter.operator === "=") {
          return `${filter.field} = '${filter.value}'`;
        }

        return `${filter.field} ${filter.operator} ${filter.value}`;
      });

      sql += `\nWHERE ${whereConditions.join(" AND ")}`;
    }

    // ORDER BY
    if (query.orderBy) {
      sql += `\nORDER BY ${query.orderBy} ${query.orderDirection || "ASC"}`;
    }

    // PAGINATION
    const offset = query.page * query.pageSize;
    sql += `\nLIMIT ${query.pageSize} OFFSET ${offset}`;

    return sql;
  }

  /**
   * Colunas padrão para cada tabela
   */
  private static getDefaultColumns(tableName: string): string[] {
    switch (tableName) {
      case "ADDRESS":
        return [
          "ID_ADDRESS",
          "DESCRIPTION",
          "MUNICIPAL_REGISTRATION",
          "IS_BILLING_ADDRESS",
          "ZIP_CODE",
          "ADDRESS",
          "NUMBER",
          "COMPLEMENT",
          "NEIGHBORHOOD",
          "CITY",
          "FEDERATED_UNIT",
          "POSSIBLE_DTT_RECEIPT",
          "ID_COMPANY",
          "ID_OFFICE_GROUP",
        ];
      default:
        return ["*"];
    }
  }

  /**
   * Joins padrão para cada tabela
   */
  private static getDefaultJoins(tableName: string): SQLJoin[] {
    switch (tableName) {
      case "ADDRESS":
        return [
          {
            table: "COMPANY",
            on: "ADDRESS.ID_COMPANY = COMPANY.ID_COMPANY",
            type: "LEFT",
          },
        ];
      default:
        return [];
    }
  }

  /**
   * Gera dados mock para ADDRESS
   */
  private static generateMockAddressData(
    count: number
  ): Record<string, string | number | boolean | null>[] {
    const addresses = [];
    const cities = [
      "São Paulo",
      "Rio de Janeiro",
      "Belo Horizonte",
      "Brasília",
      "Salvador",
    ];
    const states = ["SP", "RJ", "MG", "DF", "BA"];
    const neighborhoods = [
      "Centro",
      "Vila Nova",
      "Jardim América",
      "Copacabana",
      "Savassi",
    ];

    for (let i = 0; i < count; i++) {
      const cityIndex = i % cities.length;
      addresses.push({
        ID_ADDRESS: i + 1,
        DESCRIPTION: `Endereço ${i + 1}`,
        MUNICIPAL_REGISTRATION: `${Math.floor(Math.random() * 999999999)}`,
        IS_BILLING_ADDRESS: i % 3 === 0,
        ZIP_CODE: `${Math.floor(Math.random() * 90000) + 10000}-${
          Math.floor(Math.random() * 900) + 100
        }`,
        ADDRESS: `Rua das Flores, ${Math.floor(Math.random() * 9000) + 1000}`,
        NUMBER: `${Math.floor(Math.random() * 9999) + 1}`,
        COMPLEMENT:
          i % 4 === 0 ? `Apto ${Math.floor(Math.random() * 200) + 1}` : null,
        NEIGHBORHOOD: neighborhoods[i % neighborhoods.length],
        CITY: cities[cityIndex],
        FEDERATED_UNIT: states[cityIndex],
        POSSIBLE_DTT_RECEIPT: new Date(
          Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        ID_COMPANY: Math.floor(i / 5) + 1,
        ID_OFFICE_GROUP: Math.floor(i / 10) + 1,
      });
    }

    return addresses;
  }
}

export default SQLQueryService;
