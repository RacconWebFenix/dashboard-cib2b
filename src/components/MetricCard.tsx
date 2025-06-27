import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import type { MetricCard as MetricCardType } from '../types';

interface MetricCardProps {
  metric: MetricCardType;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const { title, value, trend } = metric;
  const isPositive = trend >= 0;

  return (
    <Card 
      sx={{ 
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
          </Box>
        </Box>
        
        <Box display="flex" alignItems="center" mt={2}>
          {isPositive ? (
            <TrendingUp color="inherit" fontSize="small" />
          ) : (
            <TrendingDown color="inherit" fontSize="small" />
          )}
          <Typography 
            variant="body2" 
            ml={0.5}
            color={isPositive ? 'lightgreen' : 'lightcoral'}
          >
            {Math.abs(trend)}%
          </Typography>
          <Typography variant="body2" ml={1} color="rgba(255,255,255,0.7)">
            vs last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
