import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  TablePagination,
  CircularProgress,
  Alert,
  Tooltip,
} from "@mui/material";
import type { TableData, TableColumn } from "../types/tables";

interface DataTableProps {
  data: TableData | null;
  columns?: TableColumn[];
  loading?: boolean;
  error?: string;
  onPageChange?: (page: number, pageSize: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns = [],
  loading = false,
  error,
  onPageChange,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Reset page when data changes (new table or new search)
  React.useEffect(() => {
    setPage(0);
  }, [data?.tableName]);

  // Gerar colunas dinamicamente baseadas nos dados reais do N8N
  const dynamicColumns = React.useMemo(() => {
    if (data && data.columns && data.columns.length > 0) {
      console.log("DataTable: Generating dynamic columns from data:", {
        dataColumns: data.columns,
        staticColumns: columns,
        sampleRow: data.rows[0],
      });

      return data.columns.map((columnName) => {
        // Tentar encontrar a definição da coluna existente
        const existingColumn = columns.find((col) => col.name === columnName);
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
    console.log("DataTable: Using static columns as fallback:", columns);
    return columns;
  }, [data, columns]);

  // Função para determinar a largura ideal da coluna baseada no tipo
  const getColumnWidth = (column: TableColumn, index: number): string => {
    switch (column.type) {
      case "boolean":
        return "80px";
      case "number":
        return "120px";
      case "date":
        return "130px";
      default:
        // Para strings, primeira coluna (ID) menor, outras mais largas
        return index === 0 ? "120px" : "180px";
    }
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
    onPageChange?.(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    onPageChange?.(0, newRowsPerPage);
  };

  const formatCellValue = (
    value: unknown,
    column: TableColumn
  ): React.ReactNode => {
    if (value === null || value === undefined) {
      return "-";
    }

    switch (column.type) {
      case "boolean":
        return (
          <Chip
            label={value ? "Sim" : "Não"}
            color={value ? "success" : "default"}
            size="small"
            sx={{
              minWidth: "50px",
              maxWidth: "80px",
            }}
          />
        );
      case "date":
        if (typeof value === "string") {
          try {
            const date = new Date(value);
            // Verificar se a data é válida
            if (!isNaN(date.getTime())) {
              return (
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {date.toLocaleDateString("pt-BR")}
                </Box>
              );
            }
            return String(value);
          } catch {
            return String(value);
          }
        }
        return String(value);
      case "number":
        if (typeof value === "number") {
          return (
            <Box
              component="span"
              sx={{
                display: "block",
                textAlign: "right",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {value.toLocaleString("pt-BR")}
            </Box>
          );
        }
        return String(value);
      default:
        return (
          <Box
            component="span"
            sx={{
              display: "block",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "break-word",
            }}
          >
            {String(value)}
          </Box>
        );
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!data || data.rows.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        Nenhum dado encontrado para esta tabela.
      </Alert>
    );
  }

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 600,
          width: "100%",
          overflow: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          "& .MuiTable-root": {
            minWidth: 650,
            tableLayout: "fixed",
          },
          // Scroll horizontal no mobile
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#a8a8a8",
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {dynamicColumns.map((column, index) => (
                <TableCell
                  key={column.name}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    width: getColumnWidth(column, index),
                    minWidth: "80px",
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "8px 12px",
                  }}
                >
                  <Tooltip title={`${column.name} (Tipo: ${column.type})`}>
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      {column.name}
                      {column.name.length > 15 && (
                        <Box
                          component="span"
                          sx={{
                            fontSize: "0.7rem",
                            opacity: 0.6,
                          }}
                        >
                          ...
                        </Box>
                      )}
                    </Box>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                {dynamicColumns.map((column, index) => (
                  <TableCell
                    key={column.name}
                    sx={{
                      width: getColumnWidth(column, index),
                      minWidth: "80px",
                      maxWidth: "250px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      padding: "8px 12px",
                    }}
                  >
                    <Tooltip
                      title={String(row[column.name] || "")}
                      placement="top"
                      arrow
                    >
                      <Box component="span">
                        {formatCellValue(row[column.name], column)}
                      </Box>
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.totalRecords}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
        }
      />
    </Box>
  );
};

export default DataTable;
