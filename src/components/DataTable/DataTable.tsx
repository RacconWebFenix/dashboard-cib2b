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
import type { TableData, TableColumn } from "../../types/tables";
import {
  tableContainerStyles,
  getHeaderCellStyles,
  getBodyCellStyles,
  tableRowStyles,
  loadingContainerStyles,
  headerContentStyles,
  truncationIndicatorStyles,
  booleanChipStyles,
  dateValueStyles,
  numberValueStyles,
  textValueStyles,
  alertStyles,
} from "./DataTable.styles";
import {
  formatDateBR,
  formatNumberBR,
  generateDynamicColumns,
  isValidDate,
  shouldShowTruncationIndicator,
} from "./DataTable.utils";

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
    return generateDynamicColumns(data, columns);
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
            sx={booleanChipStyles}
          />
        );
      case "date":
        if (typeof value === "string") {
          if (isValidDate(value)) {
            return (
              <Box component="span" sx={dateValueStyles}>
                {formatDateBR(value)}
              </Box>
            );
          }
          return String(value);
        }
        return String(value);
      case "number":
        if (typeof value === "number") {
          return (
            <Box component="span" sx={numberValueStyles}>
              {formatNumberBR(value)}
            </Box>
          );
        }
        return String(value);
      default:
        return (
          <Box component="span" sx={textValueStyles}>
            {String(value)}
          </Box>
        );
    }
  };

  if (loading) {
    return (
      <Box sx={loadingContainerStyles}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={alertStyles}>
        {error}
      </Alert>
    );
  }

  if (!data || data.rows.length === 0) {
    return (
      <Alert severity="info" sx={alertStyles}>
        Nenhum dado encontrado para esta tabela.
      </Alert>
    );
  }

  return (
    <Box color="lightblue">
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {dynamicColumns.map((column) => (
                <TableCell key={column.name} sx={getHeaderCellStyles(loading)}>
                  <Tooltip title={`${column.name} (Tipo: ${column.type})`}>
                    <Box component="span" sx={headerContentStyles}>
                      {column.name}
                      {shouldShowTruncationIndicator(column.name) && (
                        <Box component="span" sx={truncationIndicatorStyles}>
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
              <TableRow key={index} sx={tableRowStyles}>
                {dynamicColumns.map((column) => (
                  <TableCell key={column.name} sx={getBodyCellStyles(loading)}>
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
