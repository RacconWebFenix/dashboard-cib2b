import type { TableColumn, TableData } from "../../types/tables";

/**
 * Gera colunas dinamicamente baseadas nos dados reais
 */
export const generateDynamicColumns = (
  data: TableData | null,
  staticColumns: TableColumn[]
): TableColumn[] => {
  if (data && data.columns && data.columns.length > 0) {
    console.log("DataTable: Generating dynamic columns from data:", {
      dataColumns: data.columns,
      staticColumns: staticColumns,
      sampleRow: data.rows[0],
    });

    return data.columns.map((columnName) => {
      // Tentar encontrar a definição da coluna existente
      const existingColumn = staticColumns.find(
        (col) => col.name === columnName
      );
      if (existingColumn) {
        return existingColumn;
      }

      // Se não encontrar, criar uma definição padrão baseada no tipo do valor
      const sampleValue = data.rows[0]?.[columnName];
      let type: "string" | "number" | "date" | "boolean" = "string";

      if (typeof sampleValue === "boolean") {
        type = "boolean";
      } else if (typeof sampleValue === "number") {
        type = "number";
      } else if (typeof sampleValue === "string") {
        // Verificar se é uma data (formatos ISO ou comuns)
        if (
          sampleValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) ||
          sampleValue.match(/^\d{4}-\d{2}-\d{2}$/) ||
          sampleValue.match(/^\d{2}\/\d{2}\/\d{4}$/)
        ) {
          type = "date";
        } else {
          type = "string";
        }
      }

      const dynamicColumn = {
        name: columnName,
        type,
      } as TableColumn;

      console.log(
        `DataTable: Created dynamic column '${columnName}' with type '${type}' from sample value:`,
        sampleValue
      );
      return dynamicColumn;
    });
  }

  // Se não há dados ou colunas, retornar as colunas estáticas (fallback)
  console.log("DataTable: Using static columns as fallback:", staticColumns);
  return staticColumns;
};

/**
 * Formata valores monetários com símbolo da moeda
 */
export const formatMoneyBR = (
  value: number,
  currency: string = "R$"
): string => {
  const formatted = value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${currency} ${formatted}`;
};

/**
 * Formata percentuais
 */
export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

/**
 * Formata CNPJ/CPF
 */
export const formatDocument = (
  value: string,
  type: "cnpj" | "cpf" = "cnpj"
): string => {
  if (!value) return value;

  const cleanValue = value.replace(/\D/g, "");

  if (type === "cnpj" && cleanValue.length === 14) {
    return cleanValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  if (type === "cpf" && cleanValue.length === 11) {
    return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return value;
};

/**
 * Formata nome da empresa com documento
 */
export const formatCompanyName = (
  name: string,
  cnpj?: string,
  cpf?: string
): string => {
  let formatted = name;

  if (cnpj) {
    formatted += ` (${formatDocument(cnpj, "cnpj")})`;
  } else if (cpf) {
    formatted += ` (${formatDocument(cpf, "cpf")})`;
  }

  return formatted;
};

/**
 * Formata um número para o padrão brasileiro
 * @param value Valor a ser formatado
 * @returns String formatada
 */
export const formatNumberBR = (value: number): string => {
  return value.toLocaleString("pt-BR");
};

/**
 * Formata uma data para o padrão brasileiro
 * @param value String de data para formatar
 * @returns String formatada
 */
export const formatDateBR = (value: string): string => {
  try {
    const date = new Date(value);
    return date.toLocaleDateString("pt-BR");
  } catch {
    return value;
  }
};

/**
 * Verifica se uma string é uma data válida
 * @param value Valor para verificar
 * @returns Verdadeiro se for uma data válida
 */
export const isValidDate = (value: string): boolean => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

/**
 * Verifica se deve exibir o indicador de truncamento para o texto
 * @param value Texto para verificar
 * @param maxLength Tamanho máximo antes de truncar
 * @returns Verdadeiro se precisar truncar
 */
export const shouldShowTruncationIndicator = (
  value: string,
  maxLength: number = 30
): boolean => {
  return value.length > maxLength;
};
