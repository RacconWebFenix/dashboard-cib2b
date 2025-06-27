import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import type { User } from "../types";

const Customers: React.FC = () => {
  const customers: User[] = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@empresa.com",
      role: "admin",
      lastLogin: new Date("2024-06-26"),
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@company.com",
      role: "manager",
      lastLogin: new Date("2024-06-25"),
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@business.com",
      role: "user",
      lastLogin: new Date("2024-06-24"),
    },
    {
      id: "4",
      name: "Ana Lima",
      email: "ana@corporation.com",
      role: "user",
      lastLogin: new Date("2024-06-23"),
    },
  ];

  const getRoleColor = (role: string): "error" | "warning" | "default" => {
    switch (role) {
      case "admin":
        return "error";
      case "manager":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Customers
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Login</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {customer.name}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.role}
                    color={getRoleColor(customer.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {customer.lastLogin.toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customers;
