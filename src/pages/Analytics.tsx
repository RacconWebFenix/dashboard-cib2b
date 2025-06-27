import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import DashboardChart from "../components/DashboardChart";
import type { ChartData } from "../types";

const Analytics: React.FC = () => {
  const conversionData: ChartData[] = [
    { name: "Week 1", value: 2.1 },
    { name: "Week 2", value: 2.8 },
    { name: "Week 3", value: 3.2 },
    { name: "Week 4", value: 3.0 },
  ];

  const trafficData: ChartData[] = [
    { name: "Organic", value: 4500 },
    { name: "Direct", value: 3200 },
    { name: "Social", value: 1800 },
    { name: "Email", value: 2100 },
    { name: "Paid", value: 2800 },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Analytics
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <DashboardChart
          title="Conversion Rate Trends"
          data={conversionData}
          color="#ff9800"
        />
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Traffic Sources
            </Typography>
            <Box sx={{ mt: 2 }}>
              {trafficData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {item.value.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Analytics;
