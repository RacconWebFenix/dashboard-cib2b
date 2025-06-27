import type { TableData, TableRequest } from "../types/tables";
import { getMockDataForTable } from "../data/mockData";

// Simulated API endpoint - replace with your actual API
const API_BASE_URL = "http://localhost:3001/api";

export class TableService {
  static async fetchTableData(request: TableRequest): Promise<TableData> {
    try {
      const response = await fetch(`${API_BASE_URL}/tables/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar dados: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar dados"
      );
    }
  }

  // Mock data for development/demo purposes
  static async fetchMockTableData(request: TableRequest): Promise<TableData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Try to get realistic mock data first
    let mockRows = getMockDataForTable(
      request.tableName,
      request.pageSize || 25
    );

    // If no predefined mock data, generate synthetic data
    if (mockRows.length === 0) {
      mockRows = this.generateMockData(
        request.tableName,
        request.pageSize || 25
      );
    }

    const tableData = {
      tableName: request.tableName,
      columns: this.getMockColumns(request.tableName),
      rows: mockRows,
      totalRecords: 100, // Mock total
    };

    console.log(`Mock data generated for ${request.tableName}:`, {
      tableName: tableData.tableName,
      columnsCount: tableData.columns.length,
      rowsCount: tableData.rows.length,
      sampleRow: tableData.rows[0],
    });

    return tableData;
  }

  private static generateMockData(
    tableName: string,
    count: number
  ): Record<string, string | number | boolean | null>[] {
    const rows = [];

    // Realistic department names
    const departmentNames = [
      "Vendas",
      "Marketing",
      "Financeiro",
      "Recursos Humanos",
      "TI",
      "Produção",
      "Qualidade",
      "Logística",
      "Compras",
      "Administração",
      "Comercial",
      "Operacional",
      "Suporte",
      "Desenvolvimento",
      "Manutenção",
      "Contabilidade",
      "Jurídico",
      "Expedição",
      "Recebimento",
      "Estoque",
      "Planejamento",
      "Controladoria",
      "Auditoria",
      "Segurança",
      "Facilities",
    ];

    // Realistic company data
    const companyData = [
      {
        name: "Tech Solutions LTDA",
        fantasy: "TechSol",
        cnpjBase: "12.345.678",
      },
      {
        name: "Comércio Brasil S.A.",
        fantasy: "Brasil Com",
        cnpjBase: "23.456.789",
      },
      {
        name: "Industria Nacional LTDA",
        fantasy: "IndNac",
        cnpjBase: "34.567.890",
      },
      {
        name: "Serviços Premium LTDA",
        fantasy: "Premium",
        cnpjBase: "45.678.901",
      },
      {
        name: "Consultoria Expert S.A.",
        fantasy: "Expert",
        cnpjBase: "56.789.012",
      },
    ];

    // Realistic material data
    const materialData = [
      { name: "Parafuso Phillips M6", brand: "Vonder", category: "Fixação" },
      { name: "Tinta Acrílica Branca 18L", brand: "Coral", category: "Tintas" },
      { name: "Cabo Elétrico 2,5mm", brand: "Pirelli", category: "Elétrico" },
      { name: "Chapa de Aço 1020", brand: "Usiminas", category: "Metais" },
      {
        name: "Óleo Hidráulico ISO 68",
        brand: "Shell",
        category: "Lubrificantes",
      },
    ];

    for (let i = 0; i < count; i++) {
      switch (tableName) {
        case "COMPANY": {
          const companyIndex = i % companyData.length;
          const company = companyData[companyIndex];
          rows.push({
            ID_COMPANY: i + 1,
            KIND: i % 3 === 0 ? "FISICA" : "JURIDICA",
            PROFILE: i % 4 === 0 ? "SUPPLIER" : "CUSTOMER",
            STATUS: i % 8 === 0 ? "INACTIVE" : "ACTIVE",
            CNPJ: `${company.cnpjBase}/0001-${(i + 10)
              .toString()
              .padStart(2, "0")}`,
            NAME: `${company.name} ${i > 4 ? "Filial " + (i - 4) : ""}`.trim(),
            FANTASY_NAME: `${company.fantasy}${i > 4 ? " " + (i - 4) : ""}`,
            FINANCIAL_EMAIL: `financeiro@${company.fantasy.toLowerCase()}.com.br`,
            COMERCIAL_EMAIL: `vendas@${company.fantasy.toLowerCase()}.com.br`,
            ID_OFFICE_GROUP: Math.floor(i / 20) + 1,
            AUDITED_CREATED_AT: new Date(
              Date.now() - i * 24 * 60 * 60 * 1000
            ).toISOString(),
          });
          break;
        }

        case "DEPARTMENT": {
          const deptIndex = i % departmentNames.length;
          rows.push({
            ID_DEPARTMENT: i + 1,
            DESCRIPTION: departmentNames[deptIndex],
            IS_ACTIVE: i % 7 !== 0, // Most departments are active
            ID_OFFICE_GROUP: Math.floor(i / 15) + 1,
            ERP_CODE: `DEPT${(i + 1).toString().padStart(3, "0")}`,
            AUDITED_CREATED_AT: new Date(
              Date.now() - i * 12 * 60 * 60 * 1000
            ).toISOString(),
          });
          break;
        }

        case "MATERIAL": {
          const materialIndex = i % materialData.length;
          const material = materialData[materialIndex];
          rows.push({
            ID_MATERIAL: i + 1,
            IS_ACTIVE: i % 6 !== 0,
            ERP_CODE: `MAT${(i + 1).toString().padStart(4, "0")}`,
            NAME: `${material.name}${i > 4 ? " - Variação " + (i - 4) : ""}`,
            PHYSICAL_FEATURES: `${material.category} - Cor: ${
              i % 2 === 0 ? "Branco" : "Preto"
            }, Peso: ${(i * 0.5 + 1).toFixed(2)}kg`,
            BRAND: material.brand,
            EAN: `789012345${(i + 1000).toString().padStart(4, "0")}`,
            ID_OFFICE_GROUP: Math.floor(i / 25) + 1,
            AUDITED_CREATED_AT: new Date(
              Date.now() - i * 6 * 60 * 60 * 1000
            ).toISOString(),
          });
          break;
        }

        default:
          rows.push({
            ID: i + 1,
            DESCRIPTION: `Item genérico ${i + 1}`,
            ID_OFFICE_GROUP: Math.floor(i / 10) + 1,
            AUDITED_CREATED_AT: new Date(
              Date.now() - i * 24 * 60 * 60 * 1000
            ).toISOString(),
          });
      }
    }
    return rows;
  }

  private static getMockColumns(tableName: string): string[] {
    switch (tableName) {
      case "COMPANY":
        return [
          "ID_COMPANY",
          "KIND",
          "PROFILE",
          "STATUS",
          "CNPJ",
          "NAME",
          "FANTASY_NAME",
          "FINANCIAL_EMAIL",
          "COMERCIAL_EMAIL",
          "ID_OFFICE_GROUP",
        ];
      case "DEPARTMENT":
        return [
          "ID_DEPARTMENT",
          "DESCRIPTION",
          "IS_ACTIVE",
          "ID_OFFICE_GROUP",
          "ERP_CODE",
        ];
      case "MATERIAL":
        return [
          "ID_MATERIAL",
          "IS_ACTIVE",
          "ERP_CODE",
          "NAME",
          "PHYSICAL_FEATURES",
          "BRAND",
          "EAN",
          "ID_OFFICE_GROUP",
        ];
      default:
        return ["ID", "DESCRIPTION", "ID_OFFICE_GROUP", "AUDITED_CREATED_AT"];
    }
  }
}
