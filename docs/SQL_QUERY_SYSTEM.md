# Sistema de Consultas SQL para Tabelas

## Visão Geral

Este sistema permite executar consultas SQL dinâmicas nas tabelas do banco de dados através de uma interface visual de filtros, gerando automaticamente queries SQL e enviando via POST para a API.

## Estrutura do POST para API

### Endpoint
```
POST /api/sql/query
```

### Headers
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer your-jwt-token"
}
```

### Body da Requisição

```typescript
interface SQLQueryRequest {
  tableName: string;
  select?: string[];
  filters: SQLFilter[];
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  page: number;
  pageSize: number;
  joins?: SQLJoin[];
}

interface SQLFilter {
  field: string;
  operator: "=" | "LIKE" | ">" | "<" | ">=" | "<=" | "IN" | "IS NULL" | "IS NOT NULL";
  value?: string | number | boolean | null;
  type: "string" | "number" | "date" | "boolean";
}

interface SQLJoin {
  table: string;
  on: string;
  type: "INNER" | "LEFT" | "RIGHT" | "FULL";
}
```

### Exemplo de POST para Tabela ADDRESS

```json
{
  "tableName": "ADDRESS",
  "select": [
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
    "ID_OFFICE_GROUP"
  ],
  "filters": [
    {
      "field": "CITY",
      "operator": "LIKE",
      "value": "São Paulo",
      "type": "string"
    },
    {
      "field": "IS_BILLING_ADDRESS",
      "operator": "=",
      "value": true,
      "type": "boolean"
    },
    {
      "field": "ID_OFFICE_GROUP",
      "operator": "=",
      "value": 1,
      "type": "number"
    }
  ],
  "orderBy": "CITY",
  "orderDirection": "ASC",
  "page": 0,
  "pageSize": 25,
  "joins": [
    {
      "table": "COMPANY",
      "on": "ADDRESS.ID_COMPANY = COMPANY.ID_COMPANY",
      "type": "LEFT"
    }
  ]
}
```

### SQL Gerado pelo Sistema

O POST acima geraria o seguinte SQL:

```sql
SELECT ID_ADDRESS, DESCRIPTION, MUNICIPAL_REGISTRATION, IS_BILLING_ADDRESS, ZIP_CODE, ADDRESS, NUMBER, COMPLEMENT, NEIGHBORHOOD, CITY, FEDERATED_UNIT, POSSIBLE_DTT_RECEIPT, ID_COMPANY, ID_OFFICE_GROUP
FROM ADDRESS
LEFT JOIN COMPANY ON ADDRESS.ID_COMPANY = COMPANY.ID_COMPANY
WHERE CITY LIKE '%São Paulo%' AND IS_BILLING_ADDRESS = true AND ID_OFFICE_GROUP = 1
ORDER BY CITY ASC
LIMIT 25 OFFSET 0
```

## Resposta da API

```typescript
interface SQLQueryResponse {
  data: {
    tableName: string;
    columns: string[];
    rows: Record<string, any>[];
    totalRecords: number;
  };
  query: string;
  executionTime: number;
  totalRecords: number;
}
```

### Exemplo de Resposta

```json
{
  "data": {
    "tableName": "ADDRESS",
    "columns": ["ID_ADDRESS", "DESCRIPTION", "CITY", "..."],
    "rows": [
      {
        "ID_ADDRESS": 1,
        "DESCRIPTION": "Endereço Principal",
        "CITY": "São Paulo",
        "IS_BILLING_ADDRESS": true,
        "ID_OFFICE_GROUP": 1
      }
    ],
    "totalRecords": 150
  },
  "query": "SELECT ID_ADDRESS, DESCRIPTION... FROM ADDRESS WHERE...",
  "executionTime": 85.5,
  "totalRecords": 150
}
```

## Tipos de Filtros Suportados

### String
- `=` - Igual exato
- `LIKE` - Contém (adiciona % automaticamente)
- `IS NULL` - Campo nulo
- `IS NOT NULL` - Campo não nulo

### Number
- `=` - Igual
- `>` - Maior que
- `<` - Menor que
- `>=` - Maior ou igual
- `<=` - Menor ou igual
- `IS NULL` - Campo nulo
- `IS NOT NULL` - Campo não nulo

### Date
- `=` - Data exata
- `>` - Após a data
- `<` - Antes da data
- `>=` - A partir da data
- `<=` - Até a data
- `IS NULL` - Campo nulo
- `IS NOT NULL` - Campo não nulo

### Boolean
- `=` - Igual (true/false)
- `IS NULL` - Campo nulo
- `IS NOT NULL` - Campo não nulo

## Implementação no Backend

### Node.js/Express Exemplo

```javascript
app.post('/api/sql/query', authenticateToken, async (req, res) => {
  try {
    const { tableName, select, filters, orderBy, orderDirection, page, pageSize, joins } = req.body;
    
    // Validar tableName contra whitelist
    const allowedTables = ['ADDRESS', 'COMPANY', 'MATERIAL', 'DEPARTMENT'];
    if (!allowedTables.includes(tableName)) {
      return res.status(400).json({ error: 'Tabela não permitida' });
    }
    
    // Construir query SQL
    let query = `SELECT ${select ? select.join(', ') : '*'} FROM ${tableName}`;
    
    // Adicionar JOINs
    if (joins && joins.length > 0) {
      joins.forEach(join => {
        query += ` ${join.type} JOIN ${join.table} ON ${join.on}`;
      });
    }
    
    // Adicionar WHERE
    if (filters && filters.length > 0) {
      const whereConditions = filters.map(filter => {
        return buildWhereCondition(filter);
      });
      query += ` WHERE ${whereConditions.join(' AND ')}`;
    }
    
    // Adicionar ORDER BY
    if (orderBy) {
      query += ` ORDER BY ${orderBy} ${orderDirection || 'ASC'}`;
    }
    
    // Adicionar PAGINATION
    const offset = page * pageSize;
    query += ` LIMIT ${pageSize} OFFSET ${offset}`;
    
    // Executar query
    const startTime = Date.now();
    const result = await db.query(query);
    const executionTime = Date.now() - startTime;
    
    // Contar total de registros
    const countQuery = `SELECT COUNT(*) as total FROM ${tableName}`;
    const countResult = await db.query(countQuery);
    
    res.json({
      data: {
        tableName,
        columns: select || Object.keys(result.rows[0] || {}),
        rows: result.rows,
        totalRecords: countResult.rows[0].total
      },
      query,
      executionTime,
      totalRecords: countResult.rows[0].total
    });
    
  } catch (error) {
    console.error('Erro na consulta SQL:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

function buildWhereCondition(filter) {
  const { field, operator, value, type } = filter;
  
  if (operator === 'IS NULL' || operator === 'IS NOT NULL') {
    return `${field} ${operator}`;
  }
  
  if (operator === 'LIKE') {
    return `${field} LIKE '%${value}%'`;
  }
  
  if (type === 'string') {
    return `${field} ${operator} '${value}'`;
  }
  
  return `${field} ${operator} ${value}`;
}
```

## Segurança

### Validações Importantes
1. **Whitelist de tabelas** - Só permitir tabelas específicas
2. **Sanitização de input** - Prevenir SQL injection
3. **Autenticação** - Verificar JWT token
4. **Rate limiting** - Limitar consultas por usuário
5. **Timeout** - Definir timeout para queries longas

### Exemplo de Validação

```javascript
function validateSQLRequest(req) {
  const allowedTables = ['ADDRESS', 'COMPANY', 'MATERIAL', 'DEPARTMENT'];
  const allowedColumns = {
    'ADDRESS': ['ID_ADDRESS', 'DESCRIPTION', 'CITY', /*...*/],
    'COMPANY': ['ID_COMPANY', 'NAME', 'CNPJ', /*...*/]
  };
  
  // Validar nome da tabela
  if (!allowedTables.includes(req.tableName)) {
    throw new Error('Tabela não permitida');
  }
  
  // Validar colunas
  if (req.select) {
    const tableColumns = allowedColumns[req.tableName];
    const invalidColumns = req.select.filter(col => !tableColumns.includes(col));
    if (invalidColumns.length > 0) {
      throw new Error(`Colunas não permitidas: ${invalidColumns.join(', ')}`);
    }
  }
  
  // Validar filtros
  req.filters.forEach(filter => {
    if (!allowedColumns[req.tableName].includes(filter.field)) {
      throw new Error(`Campo não permitido: ${filter.field}`);
    }
  });
}
```

## Como Usar na Interface

1. **Selecione uma tabela** no dropdown principal
2. **Expanda os filtros** clicando na seta
3. **Adicione filtros** clicando em "Adicionar Filtro"
4. **Configure cada filtro**:
   - Escolha o campo
   - Selecione o operador
   - Digite o valor (se necessário)
5. **Defina ordenação** (opcional)
6. **Clique em "Pesquisar"** para executar a consulta SQL

O sistema automaticamente:
- Gera o SQL
- Envia via POST para a API
- Exibe os resultados
- Mostra a query executada
- Informa o tempo de execução
