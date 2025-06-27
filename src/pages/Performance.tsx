import React from 'react';
import { Typography, Box } from '@mui/material';
import MetricCard from '../components/MetricCard';
import DashboardChart from '../components/DashboardChart';
import type { MetricCard as MetricCardType, ChartData } from '../types';

const Performance: React.FC = () => {
  const performanceMetrics: MetricCardType[] = [
    {
      title: 'Page Load Time',
      value: '1.2s',
      trend: -15.3,
      icon: 'speed',
      color: 'success',
    },
    {
      title: 'Uptime',
      value: '99.9%',
      trend: 0.1,
      icon: 'cloud_done',
      color: 'primary',
    },
  ];

  const performanceData: ChartData[] = [
    { name: 'Mon', value: 1.1 },
    { name: 'Tue', value: 1.3 },
    { name: 'Wed', value: 1.0 },
    { name: 'Thu', value: 1.2 },
    { name: 'Fri', value: 1.1 },
    { name: 'Sat', value: 0.9 },
    { name: 'Sun', value: 1.0 },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Performance
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 3,
          mb: 4,
        }}
      >
        {performanceMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </Box>

      <Box>
        <DashboardChart
          title="Response Time (seconds)"
          data={performanceData}
          color="#4caf50"
        />
      </Box>
    </Box>
  );
};

export default Performance;
