import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Activity,
  BarChart3
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
  Line
} from 'recharts';

const Analytics = () => {
  const stats = [
    { title: 'Total Users', value: '1,284', change: '+12%', icon: Users },
    { title: 'Total Deposits', value: '$2.4M', change: '+18%', icon: ArrowDownLeft },
    { title: 'Total Withdrawals', value: '$840K', change: '+5%', icon: ArrowUpRight },
    { title: 'Active Investments', value: '432', change: '+24%', icon: TrendingUp },
  ];

  const chartData = [
    { name: 'Jan', deposits: 4000, withdrawals: 2400 },
    { name: 'Feb', deposits: 3000, withdrawals: 1398 },
    { name: 'Mar', deposits: 2000, withdrawals: 9800 },
    { name: 'Apr', deposits: 2780, withdrawals: 3908 },
    { name: 'May', deposits: 1890, withdrawals: 4800 },
    { name: 'Jun', deposits: 2390, withdrawals: 3800 },
  ];

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Admin Analytics</h1>
          <p className="text-muted-foreground">Overview of the system's performance and growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Card key={s.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{s.title}</CardTitle>
                <s.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
                <p className={`text-xs mt-1 ${s.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {s.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
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
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="deposits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="withdrawals" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
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
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="deposits" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
