import React from "react";
import { Typography, Box } from "@mui/material";
import MetricCard from "../components/MetricCard";
import DashboardChart from "../components/DashboardChart";
import type { MetricCard as MetricCardType, ChartData } from "../types";

const Dashboard: React.FC = () => {
  // Mock data for metrics
  const metrics: MetricCardType[] = [
    {
      title: "Total Revenue",
      value: "$142,892",
      trend: 12.5,
      icon: "trending_up",
      color: "primary",
    },
    {
      title: "Active Customers",
      value: "2,847",
      trend: 8.2,
      icon: "people",
      color: "success",
    },
    {
      title: "Orders",
      value: "1,254",
      trend: -2.1,
      icon: "shopping_cart",
      color: "warning",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      trend: 5.8,
      icon: "convert",
      color: "secondary",
    },
  ];

  // Mock data for charts
  const salesData: ChartData[] = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
  ];

  const customerData: ChartData[] = [
    { name: "Jan", value: 240 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 280 },
    { name: "Apr", value: 320 },
    { name: "May", value: 350 },
    { name: "Jun", value: 380 },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Dashboard Overview
      </Typography>

      {/* Metrics Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <DashboardChart
          title="Sales Overview"
          data={salesData}
          color="#1976d2"
        />
        <DashboardChart
          title="Customer Growth"
          data={customerData}
          color="#2e7d32"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
