import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Alert,
  Stack,
} from "@mui/material";
import { Storage, Refresh, Info } from "@mui/icons-material";
import DataTable from "../components/DataTable";
import TableFilters from "../components/TableFilters";
import type { SearchParams } from "../components/TableFilters";
import { AVAILABLE_TABLES } from "../data/tables";
import { SQLQueryService } from "../services/sqlQueryService";
import type { TableData } from "../types/tables";

const Tables: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [lastQuery, setLastQuery] = useState<string>("");
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [useFilters, setUseFilters] = useState(false);

  const selectedTableDef = AVAILABLE_TABLES.find(
    (table) => table.name === selectedTable
  );

  const handleTableChange = (tableName: string) => {
    setSelectedTable(tableName);
    setTableData(null);
    setError("");
    setLastQuery("");
    setExecutionTime(0);
    setUseFilters(false);
  };

  const fetchTableData = async (page = 0, pageSize = 25) => {
    if (!selectedTable) return;

    setLoading(true);
    setError("");

    try {
      // Criar parâmetros de busca básicos (sem filtros)
      const searchParams = {
        filters: [], // Sem filtros - buscar todos os dados
        orderBy: undefined,
        orderDirection: "ASC" as const,
        page: page + 1, // SQLQueryService usa 1-based, DataTable usa 0-based
        pageSize,
      };

      // Usar SQLQueryService para buscar dados reais do banco
      const result = await SQLQueryService.executeTableQuery(
        selectedTable,
        searchParams,
        page + 1, // Converter de 0-based para 1-based
        pageSize
      );

      setTableData(result.data);
      setLastQuery(result.query);
      setExecutionTime(result.executionTime);
      setUseFilters(false); // Não estamos usando filtros aqui
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleSQLSearch = async (searchParams: SearchParams) => {
    if (!selectedTable) return;

    setLoading(true);
    setError("");

    try {
      // Use SQL query service para pesquisa avançada
      const result = await SQLQueryService.executeTableQuery(
        selectedTable,
        searchParams,
        1,
        10
      );

      setTableData(result.data);
      setLastQuery(result.query);
      setExecutionTime(result.executionTime);
      setUseFilters(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao executar consulta SQL"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setUseFilters(false);
    setLastQuery("");
    setExecutionTime(0);
    fetchTableData();
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Storage color="primary" />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Tabelas do Sistema
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Tabelas disponíveis:</strong> Esta seção permite visualizar
        dados das tabelas do sistema que possuem ID_OFFICE_GROUP. Selecione uma
        tabela abaixo para ver seus dados do banco de dados.
      </Alert>

      {/* Seção de Seleção de Tabela - Sempre no topo */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              gap: 3,
              alignItems: "start",
            }}
          >
            {/* Controles de Seleção */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Seleção de Tabela
              </Typography>

              <FormControl
                sx={{
                  mb: 2,
                  minWidth: 250,
                  maxWidth: "100%",
                }}
              >
                <InputLabel>Escolha uma tabela</InputLabel>
                <Select
                  value={selectedTable}
                  label="Escolha uma tabela"
                  onChange={(e) => handleTableChange(e.target.value)}
                  autoWidth
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxWidth: 500,
                        maxHeight: 400,
                      },
                    },
                  }}
                >
                  {AVAILABLE_TABLES.map((table) => (
                    <MenuItem key={table.name} value={table.name}>
                      <Box>
                        <Typography variant="body1">
                          {table.displayName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {table.name}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={() => fetchTableData()}
                disabled={!selectedTable || loading}
                startIcon={
                  loading ? <Refresh className="animate-spin" /> : <Storage />
                }
                sx={{ mr: 2 }}
              >
                {loading ? "Carregando..." : "Carregar Dados"}
              </Button>
            </Box>

            {/* Informações da Tabela Selecionada */}
            {selectedTableDef && (
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  <Info
                    fontSize="small"
                    sx={{ mr: 1, verticalAlign: "text-bottom" }}
                  />
                  Informações da Tabela
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Nome:</strong> {selectedTableDef.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Nome de Exibição:</strong>{" "}
                  {selectedTableDef.displayName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Colunas:</strong> {selectedTableDef.columns.length}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Campos principais:</strong>
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {selectedTableDef.columns.slice(0, 5).map((column) => (
                      <Chip
                        key={column.name}
                        label={column.name}
                        size="small"
                        variant="outlined"
                        color={
                          column.name === "ID_OFFICE_GROUP"
                            ? "primary"
                            : "default"
                        }
                      />
                    ))}
                    {selectedTableDef.columns.length > 5 && (
                      <Chip
                        label={`+${selectedTableDef.columns.length - 5} mais`}
                        size="small"
                        variant="outlined"
                        color="secondary"
                      />
                    )}
                  </Stack>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Filtros SQL - Aparecem apenas quando uma tabela está selecionada */}
      {selectedTable && selectedTableDef && (
        <TableFilters
          tableName={selectedTable}
          tableColumns={selectedTableDef.columns}
          onSearch={handleSQLSearch}
          onClear={handleClearFilters}
          loading={loading}
        />
      )}

      {/* Área de Visualização de Dados - Sempre abaixo da seleção */}
      <Box>
        {selectedTable ? (
          <Card>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">
                  Dados da Tabela: {selectedTableDef?.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {lastQuery && (
                    <Chip
                      label={`SQL | ${executionTime.toFixed(0)}ms`}
                      color="info"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  {tableData && (
                    <Chip
                      label={`${tableData.totalRecords} registros`}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Stack>
              </Box>

              {lastQuery && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="caption" component="div" gutterBottom>
                    <strong>Consulta SQL executada:</strong>
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      whiteSpace: "pre-wrap",
                      maxHeight: "150px",
                      overflow: "auto",
                      backgroundColor: "rgba(0,0,0,0.05)",
                      padding: 1,
                      borderRadius: 1,
                    }}
                  >
                    {lastQuery}
                  </Box>
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <DataTable
                data={tableData}
                columns={selectedTableDef?.columns || []}
                loading={loading}
                error={error}
                onPageChange={useFilters ? undefined : fetchTableData}
              />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="300px"
                textAlign="center"
              >
                <Storage
                  sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Selecione uma tabela
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Escolha uma tabela no menu acima para visualizar seus dados
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default Tables;
