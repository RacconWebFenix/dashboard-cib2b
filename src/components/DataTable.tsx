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
          />
        );
      case "date":
        if (typeof value === "string") {
          try {
            const date = new Date(value);
            // Verificar se a data é válida
            if (!isNaN(date.getTime())) {
              return date.toLocaleDateString("pt-BR");
            }
            return String(value);
          } catch {
            return String(value);
          }
        }
        return String(value);
      case "number":
        if (typeof value === "number") {
          return value.toLocaleString("pt-BR");
        }
        return String(value);
      default:
        return String(value);
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
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {dynamicColumns.map((column) => (
                <TableCell
                  key={column.name}
                  sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  <Tooltip title={`Tipo: ${column.type}`}>
                    <span>{column.name}</span>
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
                {dynamicColumns.map((column) => (
                  <TableCell key={column.name}>
                    {formatCellValue(row[column.name], column)}
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
