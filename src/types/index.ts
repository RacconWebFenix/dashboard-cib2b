export interface DashboardData {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

export interface MetricCard {
  title: string;
  value: string;
  trend: number;
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  lastLogin: Date;
}

export interface BusinessMetrics {
  revenue: number;
  customers: number;
  orders: number;
  conversion: number;
}
