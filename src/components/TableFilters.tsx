import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Chip,
  Stack,
  Collapse,
  IconButton,
} from "@mui/material";
import {
  Search,
  Clear,
  ExpandMore,
  ExpandLess,
  FilterList,
} from "@mui/icons-material";
import type { TableColumn } from "../types/tables";
import {
  getTableFields,
  getOperatorsForType,
} from "../utils/tableFieldMapping";

export interface TableFilter {
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
  value: string | number | boolean | null;
  type: "string" | "number" | "date" | "boolean";
}

export interface SearchParams {
  filters: TableFilter[];
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  page: number;
  pageSize: number;
}

interface TableFiltersProps {
  tableName: string;
  tableColumns: TableColumn[];
  onSearch: (params: SearchParams) => void;
  loading?: boolean;
  onClear?: () => void;
}

const TableFilters: React.FC<TableFiltersProps> = ({
  tableName,
  tableColumns,
  onSearch,
  loading = false,
  onClear,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState<TableFilter[]>([]);
  const [orderBy, setOrderBy] = useState<string>("");
  const [orderDirection, setOrderDirection] = useState<"ASC" | "DESC">("ASC");

  // Converte as colunas da tabela para campos com labels amigáveis
  const tableFields = getTableFields(tableColumns);

  // Limpa os filtros quando a tabela muda
  useEffect(() => {
    setFilters([]);
    setOrderBy("");
    setOrderDirection("ASC");
  }, [tableName]);

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        field: "",
        operator: "=",
        value: "",
        type: "string",
      },
    ]);
  };

  const updateFilter = (index: number, updates: Partial<TableFilter>) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], ...updates };
    setFilters(newFilters);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    const validFilters = filters.filter(
      (f) =>
        f.field && f.operator && (f.value !== "" || f.operator.includes("NULL"))
    );

    const searchParams: SearchParams = {
      filters: validFilters,
      orderBy: orderBy || undefined,
      orderDirection,
      page: 0,
      pageSize: 25,
    };

    onSearch(searchParams);
  };

  const handleClear = () => {
    setFilters([]);
    setOrderBy("");
    setOrderDirection("ASC");
    onClear?.();
  };

  return (
    <Card sx={{ mb: 3, overflow: "hidden" }}>
      <CardContent sx={{ overflow: "hidden" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          sx={{ overflow: "hidden" }}
        >
          <Typography variant="h6">
            <FilterList sx={{ mr: 1, verticalAlign: "text-bottom" }} />
            Filtros de Pesquisa - {tableName}
          </Typography>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{ ml: 1 }}
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={expanded}>
          <Box>
            {/* Filtros dinâmicos */}
            {filters.length > 0 && (
              <Box mb={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Filtros Ativos:
                </Typography>
                <Stack spacing={2}>
                  {filters.map((filter, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2,
                        alignItems: { xs: "stretch", md: "center" },
                        maxWidth: "100%",
                        p: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                        backgroundColor: "background.paper",
                      }}
                    >
                      <FormControl
                        size="small"
                        sx={{
                          minWidth: 120,
                          maxWidth: { xs: "100%", md: 350 },
                          flex: { md: "2 1 auto" },
                        }}
                      >
                        <InputLabel>Campo</InputLabel>
                        <Select
                          value={filter.field}
                          label="Campo"
                          autoWidth
                          onChange={(e) => {
                            const field = tableFields.find(
                              (f) => f.name === e.target.value
                            );
                            updateFilter(index, {
                              field: e.target.value,
                              type: field?.type as
                                | "string"
                                | "number"
                                | "date"
                                | "boolean",
                              operator: "=",
                              value: "",
                            });
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxWidth: 400,
                                maxHeight: 300,
                              },
                            },
                          }}
                        >
                          {tableFields.map((field) => (
                            <MenuItem key={field.name} value={field.name}>
                              {field.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl
                        size="small"
                        sx={{
                          minWidth: 100,
                          maxWidth: { xs: "100%", md: 200 },
                          flex: { md: "1 1 auto" },
                        }}
                      >
                        <InputLabel>Operador</InputLabel>
                        <Select
                          value={filter.operator}
                          label="Operador"
                          autoWidth
                          onChange={(e) =>
                            updateFilter(index, {
                              operator: e.target
                                .value as TableFilter["operator"],
                            })
                          }
                          disabled={!filter.field}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxWidth: 250,
                                maxHeight: 300,
                              },
                            },
                          }}
                        >
                          {filter.type &&
                            getOperatorsForType(filter.type)?.map((op) => (
                              <MenuItem key={op.value} value={op.value}>
                                {op.label}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>

                      {filter.type === "boolean" ? (
                        <FormControl
                          size="small"
                          sx={{
                            minWidth: 80,
                            maxWidth: { xs: "100%", md: 120 },
                            flex: { md: "1 1 auto" },
                          }}
                        >
                          <InputLabel>Valor</InputLabel>
                          <Select
                            value={filter.value?.toString() || ""}
                            label="Valor"
                            autoWidth
                            onChange={(e) =>
                              updateFilter(index, {
                                value: e.target.value === "true",
                              })
                            }
                            disabled={filter.operator.includes("NULL")}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxWidth: 120,
                                },
                              },
                            }}
                          >
                            <MenuItem value="true">Sim</MenuItem>
                            <MenuItem value="false">Não</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          fullWidth
                          size="small"
                          label="Valor"
                          type={
                            filter.type === "number"
                              ? "number"
                              : filter.type === "date"
                              ? "date"
                              : "text"
                          }
                          value={filter.value?.toString() || ""}
                          onChange={(e) =>
                            updateFilter(index, {
                              value:
                                filter.type === "number"
                                  ? Number(e.target.value)
                                  : e.target.value,
                            })
                          }
                          disabled={filter.operator.includes("NULL")}
                          InputLabelProps={
                            filter.type === "date" ? { shrink: true } : {}
                          }
                          sx={{ minWidth: 120, maxWidth: 250 }}
                        />
                      )}

                      <Button
                        color="error"
                        size="small"
                        onClick={() => removeFilter(index)}
                        startIcon={<Clear />}
                        sx={{
                          minWidth: 100,
                          width: { xs: "100%", md: "auto" },
                          alignSelf: { md: "center" },
                        }}
                      >
                        Remover
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Ordenação */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mb: 3,
              }}
            >
              <FormControl
                size="small"
                sx={{
                  minWidth: 150,
                  maxWidth: { xs: "100%", md: 400 },
                }}
              >
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  value={orderBy}
                  label="Ordenar por"
                  autoWidth
                  onChange={(e) => setOrderBy(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxWidth: 400,
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  <MenuItem value="">Sem ordenação</MenuItem>
                  {tableFields.map((field) => (
                    <MenuItem key={field.name} value={field.name}>
                      {field.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                size="small"
                sx={{
                  minWidth: 100,
                  maxWidth: { xs: "100%", md: 150 },
                }}
              >
                <InputLabel>Direção</InputLabel>
                <Select
                  value={orderDirection}
                  label="Direção"
                  autoWidth
                  onChange={(e) =>
                    setOrderDirection(e.target.value as "ASC" | "DESC")
                  }
                  disabled={!orderBy}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxWidth: 200,
                      },
                    },
                  }}
                >
                  <MenuItem value="ASC">Crescente</MenuItem>
                  <MenuItem value="DESC">Decrescente</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Botões de ação */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ flexWrap: "wrap" }}
            >
              <Button
                variant="outlined"
                onClick={addFilter}
                startIcon={<FilterList />}
              >
                Adicionar Filtro
              </Button>
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                startIcon={<Search />}
              >
                {loading ? "Pesquisando..." : "Pesquisar"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleClear}
                startIcon={<Clear />}
                color="secondary"
              >
                Limpar Filtros
              </Button>
            </Stack>

            {/* Preview dos filtros */}
            {filters.length > 0 && (
              <Box mt={2}>
                <Typography variant="caption" color="text.secondary">
                  Filtros ativos:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {filters
                    .filter((f) => f.field && f.operator)
                    .map((filter, index) => (
                      <Chip
                        key={index}
                        label={`${
                          tableFields.find((f) => f.name === filter.field)
                            ?.label
                        } ${filter.operator} ${
                          filter.operator.includes("NULL") ? "" : filter.value
                        }`}
                        size="small"
                        variant="outlined"
                        onDelete={() => removeFilter(index)}
                      />
                    ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default TableFilters;
