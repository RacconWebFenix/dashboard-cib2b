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
  columns: TableColumn[];
  loading?: boolean;
  error?: string;
  onPageChange?: (page: number, pageSize: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  loading = false,
  error,
  onPageChange,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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
            return new Date(value).toLocaleDateString("pt-BR");
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
              {columns.map((column) => (
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
                {columns.map((column) => (
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
