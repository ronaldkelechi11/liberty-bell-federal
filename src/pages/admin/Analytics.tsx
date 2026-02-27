import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Activity,
  BarChart3,
  Loader2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/api/admin";

const Analytics = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: () => adminService.getAnalyticsOverview(),
  });

  const stats = [
    {
      title: 'Total Users',
      value: analytics?.data.totalUsers?.toLocaleString() || '0',
      change: '+12%',
      icon: Users
    },
    {
      title: 'Total Deposits',
      value: `$${(analytics?.data.totalDeposits || 0).toLocaleString()}`,
      change: '+18%',
      icon: ArrowDownLeft
    },
    {
      title: 'Total Withdrawals',
      value: `$${(analytics?.data.totalWithdrawals || 0).toLocaleString()}`,
      change: '+5%',
      icon: ArrowUpRight
    },
    {
      title: 'Active Investments',
      value: analytics?.data.totalInvestments?.toLocaleString() || '0',
      change: '+24%',
      icon: TrendingUp
    },
  ];

  const chartData = [
    { name: 'Jan', deposits: 4000, withdrawals: 2400 },
    { name: 'Feb', deposits: 3000, withdrawals: 1398 },
    { name: 'Mar', deposits: 2000, withdrawals: 9800 },
    { name: 'Apr', deposits: 2780, withdrawals: 3908 },
    { name: 'May', deposits: 1890, withdrawals: 4800 },
    { name: 'Jun', deposits: 2390, withdrawals: 3800 },
  ];

  const pieData = [
    { name: 'Active', value: analytics?.data.activeAccounts || 0, color: 'hsl(var(--primary))' },
    { name: 'Inactive', value: 10, color: 'hsl(var(--muted))' },
    { name: 'Suspended', value: 5, color: '#ef4444' },
  ];

  if (isLoading) {
    return (
      <DashboardLayout isAdmin={true}>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-heading font-bold">Admin Analytics</h1>
          <p className="text-muted-foreground mt-1">Real-time overview of the platform's performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Card key={s.title} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{s.title}</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-xs font-bold ${s.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {s.change}
                  </span>
                  <span className="text-[10px] text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" /> Financial Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="deposits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="withdrawals" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> User Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="deposits" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { label: 'CPU Usage', value: 34, color: 'bg-primary' },
                  { label: 'Memory Usage', value: 56, color: 'bg-blue-500' },
                  { label: 'API Latency', value: 12, color: 'bg-green-500' },
                  { label: 'Error Rate', value: 0.2, color: 'bg-red-500' },
                ].map((p) => (
                  <div key={p.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{p.label}</span>
                      <span className="text-muted-foreground">{p.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full ${p.color}`} style={{ width: `${p.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>User Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-muted-foreground">{d.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
