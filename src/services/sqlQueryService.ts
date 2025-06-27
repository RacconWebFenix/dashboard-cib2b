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
  rawSQL?: string;
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

export interface SQLQueryResponse {
  data: TableData;
  query: string;
  executionTime: number;
  totalRecords: number;
  success: boolean;
  error?: string;
}

export interface N8NQueryPayload {
  query: string;
  tableName: string;
  filters: SQLFilter[];
  metadata: {
    timestamp: string;
    source: "dashboard-cib2b";
    requestId: string;
  };
}

export interface N8NQueryResponse {
  success: boolean;
  data?: Record<string, string | number | boolean | null>[];
  error?: string;
  executionTime?: number;
  totalRecords?: number;
  query?: string;
}

// Configuração do endpoint N8N
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

if (!N8N_WEBHOOK_URL) {
  console.warn(
    "⚠️ VITE_N8N_WEBHOOK_URL não está configurada. Usando dados mockados."
  );
}

/**
 * Serviço para execução de queries SQL via N8N
 */
export class SQLQueryService {
  /**
   * Gera um ID único para a requisição
   */
  private static generateRequestId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Adiciona aspas duplas em volta de nomes de tabelas e colunas
   */
  private static quoteIdentifier(identifier: string): string {
    return `"${identifier}"`;
  }

  /**
   * Constrói a query SQL baseada nos parâmetros
   */
  private static buildSQLQuery(request: SQLQueryRequest): string {
    const {
      tableName,
      select,
      filters,
      orderBy,
      orderDirection,
      page,
      pageSize,
    } = request;

    // SELECT clause com aspas duplas nas colunas
    const selectClause =
      select && select.length > 0
        ? select.map((col) => this.quoteIdentifier(col)).join(", ")
        : "*";

    // Tabela com aspas duplas
    let query = `SELECT ${selectClause} FROM ${this.quoteIdentifier(
      tableName
    )}`;

    // WHERE clause
    if (filters && filters.length > 0) {
      const whereConditions = filters.map((filter) =>
        this.buildFilterCondition(filter)
      );
      query += ` WHERE ${whereConditions.join(" AND ")}`;
    }

    // ORDER BY clause com aspas duplas na coluna
    if (orderBy) {
      query += ` ORDER BY ${this.quoteIdentifier(orderBy)} ${
        orderDirection || "ASC"
      }`;
    }

    // LIMIT and OFFSET for pagination
    const offset = (page - 1) * pageSize;
    query += ` LIMIT ${pageSize} OFFSET ${offset}`;

    return query;
  }

  /**
   * Constrói uma condição de filtro SQL
   */
  private static buildFilterCondition(filter: SQLFilter): string {
    const { field, operator, value, type } = filter;

    // Campo com aspas duplas
    const quotedField = this.quoteIdentifier(field);

    if (operator === "IS NULL" || operator === "IS NOT NULL") {
      return `${quotedField} ${operator}`;
    }

    let formattedValue = value;

    if (type === "string" && operator === "LIKE") {
      formattedValue = `'%${value}%'`;
    } else if (type === "string") {
      formattedValue = `'${value}'`;
    } else if (type === "date") {
      formattedValue = `'${value}'`;
    }

    return `${quotedField} ${operator} ${formattedValue}`;
  }

  /**
   * Envia query para o N8N e processa a resposta
   */
  private static async sendToN8N(
    payload: N8NQueryPayload
  ): Promise<N8NQueryResponse> {
    if (!N8N_WEBHOOK_URL) {
      throw new Error("N8N Webhook URL não configurada");
    }

    console.log("🚀 Iniciando requisição HTTP para N8N");
    console.log("📍 URL de destino:", N8N_WEBHOOK_URL);
    console.log("📝 Headers:", { "Content-Type": "application/json" });

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📬 Resposta HTTP recebida:");
    console.log("📊 Status:", response.status, response.statusText);
    console.log(
      "📋 Headers da resposta:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      console.error("❌ Erro HTTP:", response.status, response.statusText);
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    console.log("📦 JSON parseado da resposta:", jsonResponse);

    return jsonResponse;
  }

  /**
   * Processa a resposta do N8N e converte para o formato esperado
   */
  private static processN8NResponse(
    n8nResponse: any, // Aceita qualquer formato de resposta do N8N
    query: string,
    tableName: string
  ): SQLQueryResponse {
    console.log("🔍 Processando resposta do N8N:");
    console.log(
      "📋 Dados completos da resposta:",
      JSON.stringify(n8nResponse, null, 2)
    );
    console.log("📊 Tipo da resposta:", typeof n8nResponse);
    console.log("📊 É array?:", Array.isArray(n8nResponse));

    let data: Record<string, string | number | boolean | null>[] = [];

    // Caso 1: A resposta é diretamente um array de objetos (formato mais comum do N8N)
    if (Array.isArray(n8nResponse)) {
      console.log("✅ Resposta é um array direto, usando como dados");
      data = n8nResponse;
    }
    // Caso 2: A resposta tem o formato { success: true, data: [...] }
    else if (
      n8nResponse &&
      typeof n8nResponse === "object" &&
      n8nResponse.success !== undefined
    ) {
      console.log("✅ Success:", n8nResponse.success);
      console.log("📊 Data type:", typeof n8nResponse.data);
      console.log("� Data is array:", Array.isArray(n8nResponse.data));
      console.log("📊 Data length:", n8nResponse.data?.length || 0);

      if (!n8nResponse.success) {
        console.log("❌ Resposta de erro do N8N:", n8nResponse.error);
        return {
          data: {
            tableName,
            columns: [],
            rows: [],
            totalRecords: 0,
          },
          query,
          executionTime: n8nResponse.executionTime || 0,
          totalRecords: 0,
          success: false,
          error: n8nResponse.error || "Erro desconhecido",
        };
      }

      data = n8nResponse.data || [];
    }
    // Caso 3: A resposta é um objeto único
    else if (n8nResponse && typeof n8nResponse === "object") {
      console.log("✅ Resposta é um objeto único, convertendo para array");
      data = [n8nResponse];
    }
    // Caso 4: Resposta vazia ou inválida
    else {
      console.log("⚠️ Resposta vazia ou inválida");
      data = [];
    }

    console.log("📊 Dados processados - total de registros:", data.length);

    if (data.length > 0) {
      console.log("🔍 Primeiro item dos dados:", data[0]);
      console.log("🔍 Estrutura do primeiro item:", Object.keys(data[0] || {}));
    }

    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const rows = data as Record<string, string | number | boolean | null>[];

    console.log("📋 Colunas extraídas:", columns);
    console.log("📋 Número de linhas:", rows.length);
    console.log("📋 Primeira linha (se existir):", rows[0] || "Nenhuma linha");

    return {
      data: {
        tableName,
        columns,
        rows,
        totalRecords: data.length,
      },
      query,
      executionTime: 0,
      totalRecords: data.length,
      success: true,
    };
  }

  /**
   * Executa uma query SQL via N8N
   */
  static async executeQuery(
    request: SQLQueryRequest
  ): Promise<SQLQueryResponse> {
    const startTime = performance.now();

    try {
      // Constrói a query SQL
      const query = request.rawSQL || this.buildSQLQuery(request);

      // Prepara o payload para o N8N
      const payload: N8NQueryPayload = {
        query,
        tableName: request.tableName,
        filters: request.filters,
        metadata: {
          timestamp: new Date().toISOString(),
          source: "dashboard-cib2b",
          requestId: this.generateRequestId(),
        },
      };

      console.log("🔄 Enviando query para N8N:");
      console.log("🌐 URL:", N8N_WEBHOOK_URL);
      console.log("📤 Payload completo:", JSON.stringify(payload, null, 2));
      console.log("🔍 Query SQL gerada:", query);

      // Envia para o N8N
      const n8nResponse = await this.sendToN8N(payload);

      console.log("✅ Resposta bruta do N8N recebida:");
      console.log("📨 Status da resposta: OK");
      console.log("📦 Dados recebidos:", n8nResponse);

      // Processa e retorna a resposta
      return this.processN8NResponse(n8nResponse, query, request.tableName);
    } catch (error) {
      const executionTime = performance.now() - startTime;

      console.error("❌ Erro ao executar query via N8N:", error);

      return {
        data: {
          tableName: request.tableName,
          columns: [],
          rows: [],
          totalRecords: 0,
        },
        query: request.rawSQL || this.buildSQLQuery(request),
        executionTime,
        totalRecords: 0,
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      };
    }
  }

  /**
   * Converte filtros do componente para filtros SQL
   */
  static convertFiltersToSQL(searchParams: SearchParams): SQLFilter[] {
    return searchParams.filters.map((filter: TableFilter) => ({
      field: filter.field,
      operator: filter.operator as SQLFilter["operator"],
      value: filter.value,
      type: filter.type,
    }));
  }

  /**
   * Cria uma requisição SQL a partir dos parâmetros de busca
   */
  static createQueryRequest(
    tableName: string,
    searchParams: SearchParams,
    page: number = 1,
    pageSize: number = 10
  ): SQLQueryRequest {
    return {
      tableName,
      filters: this.convertFiltersToSQL(searchParams),
      page,
      pageSize,
      orderBy: searchParams.orderBy,
      orderDirection: searchParams.orderDirection,
    };
  }

  /**
   * Executa uma query baseada nos parâmetros de busca da tabela
   */
  static async executeTableQuery(
    tableName: string,
    searchParams: SearchParams,
    page: number = 1,
    pageSize: number = 10
  ): Promise<SQLQueryResponse> {
    const request = this.createQueryRequest(
      tableName,
      searchParams,
      page,
      pageSize
    );
    return this.executeQuery(request);
  }

  /**
   * Testa a conexão com o N8N
   */
  static async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const testPayload: N8NQueryPayload = {
        query: "SELECT 1 AS test",
        tableName: "test",
        filters: [],
        metadata: {
          timestamp: new Date().toISOString(),
          source: "dashboard-cib2b",
          requestId: "test-connection",
        },
      };

      const response = await this.sendToN8N(testPayload);
      return { success: response.success };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro de conexão",
      };
    }
  }
}
