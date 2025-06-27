# Dashboard CIB2B

Um dashboard React TypeScript moderno para visualização dinâmica de dados do sistema CIB2B, com filtros SQL dinâmicos, seleção de tabelas e geração de queries automatizada.

## 🚀 Características Principais

- **70+ Tabelas Mapeadas**: Cobertura completa do sistema CIB2B
- **Filtros SQL Dinâmicos**: Interface intuitiva para construção de queries
- **Visualização de Dados**: Tabelas responsivas com dados mockados
- **Geração de SQL**: Preview e envio de queries SQL em tempo real
- **Interface Moderna**: Design responsivo com Material-UI v7
- **TypeScript**: Tipagem completa para maior segurança

## �️ Tecnologias Utilizadas

- **Frontend**: React 18+ com TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI) v7
- **Roteamento**: React Router
- **Gráficos**: Recharts
- **Styling**: CSS Modules + MUI Theme
- **HTTP Client**: Axios

## 📁 Estrutura do Projeto

```
dashboard-cib2b/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── DashboardLayout.tsx
│   │   ├── MetricCard.tsx
│   │   ├── DashboardChart.tsx
│   │   ├── DataTable.tsx
│   │   └── TableFilters.tsx
│   ├── pages/               # Páginas da aplicação
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx
│   │   ├── Customers.tsx
│   │   ├── Performance.tsx
│   │   ├── Settings.tsx
│   │   └── Tables.tsx
│   ├── data/                # Dados e configurações
│   │   ├── tables.ts        # 70+ definições de tabelas
│   │   └── mockData.ts      # Dados de exemplo
│   ├── services/            # Serviços e APIs
│   │   ├── tableService.ts
│   │   └── sqlQueryService.ts
│   ├── utils/               # Utilitários
│   │   └── tableFieldMapping.ts
│   ├── types/               # Definições TypeScript
│   │   └── tables.ts
│   └── docs/                # Documentação
│       └── SQL_QUERY_SYSTEM.md
├── public/                  # Arquivos estáticos
└── package.json
```

## 🗄️ Tabelas Suportadas (70 Total)

### Principais Categorias:

#### 📊 **Gestão de Empresas e Colaboradores**
- `ADDRESS` - Endereços
- `COMPANY` - Empresas
- `COLLABORATOR` - Colaboradores
- `DEPARTMENT` - Departamentos
- `OFFICE_GROUP` - Grupos de Escritório

#### 🛍️ **Produtos e Materiais**
- `MATERIAL` - Materiais
- `BRAND` - Marcas
- `MANUFACTURER` - Fabricantes
- `FAMILY` - Famílias de Produtos
- `MEASUREMENT_UNIT` - Unidades de Medida

#### 📋 **Processos de Negócio**
- `ORDER_PROCESS` - Processos de Pedido
- `QUOTATION_PROCESS` - Processos de Cotação
- `CONTRACT_PROCESS` - Processos de Contrato
- `INVOICING_PROCESS` - Processos de Faturamento

#### 🔧 **Configurações e Integrações**
- `INTEGRATION` - Integrações
- `EMAIL` - Emails
- `GLOBAL_PARAM` - Parâmetros Globais
- `HELPER_CONFIG` - Configurações de Ajuda

#### 👥 **Participantes e Cadastros**
- `PARTICIPANT` - Participantes
- `PARTICIPANT_DATA` - Dados do Participante
- `PAYMENT_FORM` - Formas de Pagamento
- `PLAN` - Planos

#### 🔗 **Tabelas de Relacionamento**
- `FAMILY_providers` - Fornecedores da Família
- `CONTRACT_PROCESS_customers` - Clientes do Processo
- `PROVIDER_CATEGORIZATION_providers` - Categorização de Fornecedores

[Ver lista completa das 70 tabelas no código]

## � Como Executar

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd dashboard-cib2b

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build
npm run lint       # Linting com ESLint
```

## 📊 Funcionalidades

### 1. **Seleção Dinâmica de Tabelas**
- Dropdown com 70+ tabelas organizadas por categoria
- Busca e filtro por nome de tabela
- Exibição de metadados da tabela selecionada

### 2. **Filtros SQL Inteligentes**
- Interface visual para construção de filtros
- Operadores dinâmicos baseados no tipo de campo:
  - **String**: =, LIKE, IS NULL, IS NOT NULL
  - **Number**: =, >, <, >=, <=, IS NULL, IS NOT NULL
  - **Date**: =, >, <, >=, <=, IS NULL, IS NOT NULL
  - **Boolean**: =, IS NULL, IS NOT NULL

### 3. **Preview SQL em Tempo Real**
- Geração automática de queries SQL
- Syntax highlighting
- Validação de sintaxe

### 4. **Visualização de Dados**
- Tabelas responsivas com paginação
- Dados mockados para demonstração
- Ordenação por colunas
- Busca e filtros locais

### 5. **Mapeamento de Campos Amigáveis**
- Labels em português para todos os campos
- Conversão automática de nomes técnicos
- Suporte a campos específicos do domínio

## 🎨 Interface

### Páginas Disponíveis:
- **Dashboard**: Visão geral com métricas principais
- **Tables**: Exploração dinâmica de tabelas
- **Analytics**: Análises e relatórios
- **Customers**: Gestão de clientes
- **Performance**: Métricas de desempenho
- **Settings**: Configurações do sistema

### Componentes Principais:
- **TableFilters**: Filtros dinâmicos por tabela
- **DataTable**: Visualização de dados tabulares
- **MetricCard**: Cards de métricas
- **DashboardChart**: Gráficos e visualizações

## 🔧 Configuração Avançada

### Personalização de Campos
Edite `src/utils/tableFieldMapping.ts` para personalizar labels:

```typescript
const FIELD_LABEL_MAPPING: Record<string, string> = {
  ID_COMPANY: "ID da Empresa",
  NAME: "Nome",
  CNPJ: "CNPJ",
  // ... mais campos
};
```

### Adição de Novas Tabelas
Adicione definições em `src/data/tables.ts`:

```typescript
{
  name: "NOVA_TABELA",
  displayName: "Nova Tabela",
  hasOfficeGroup: true,
  columns: [
    { name: "ID", type: "number" },
    { name: "DESCRIPTION", type: "string" },
    // ... mais colunas
  ],
}
```

## 🌐 API Integration

### Configuração do Backend
Configure as URLs da API em `src/services/`:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

### Endpoints Esperados
- `GET /api/tables/{table_name}/data` - Buscar dados
- `POST /api/sql/execute` - Executar query SQL
- `GET /api/tables/{table_name}/schema` - Schema da tabela

## 📝 Exemplos de Uso

### Filtro Simples
```sql
SELECT * FROM COMPANY 
WHERE NAME LIKE '%Empresa%' 
AND IS_ACTIVE = true
```

### Filtro com Múltiplas Condições
```sql
SELECT * FROM ORDER_PROCESS 
WHERE AUDITED_CREATED_AT >= '2024-01-01' 
AND TOTAL_VALUE > 1000 
AND CUSTOMER_STATUS = 'APPROVED'
```

### Join entre Tabelas
```sql
SELECT c.NAME, o.TOTAL_VALUE 
FROM COMPANY c 
JOIN ORDER_PROCESS o ON c.ID_COMPANY = o.ID_FAVORED_CUSTOMER
WHERE o.AUDITED_CREATED_AT >= '2024-01-01'
```

## � Roadmap

- [ ] Conexão com API real do CIB2B
- [ ] Sistema de autenticação
- [ ] Export de dados (CSV, Excel, PDF)
- [ ] Dashboards personalizáveis
- [ ] Relatórios agendados
- [ ] Cache inteligente de queries
- [ ] Modo escuro/claro
- [ ] Suporte a múltiplos idiomas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📞 Suporte

Para dúvidas e suporte:
- Documentação: [docs/SQL_QUERY_SYSTEM.md](docs/SQL_QUERY_SYSTEM.md)
- Issues: [GitHub Issues](../../issues)

---

**Dashboard CIB2B** - Transformando dados em insights 📊✨
