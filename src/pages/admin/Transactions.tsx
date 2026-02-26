import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  ArrowDownLeft,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const AdminTransactions = () => {
  const transactions = [
    { id: '1', user: 'John Doe', type: 'Deposit', amount: 5000.00, status: 'Completed', date: 'Oct 24, 2023 10:45 AM', method: 'Bank Wire' },
    { id: '2', user: 'Jane Smith', type: 'Withdrawal', amount: 1200.00, status: 'Pending', date: 'Oct 24, 2023 02:15 PM', method: 'Credit Card' },
    { id: '3', user: 'Robert Johnson', type: 'Transfer', amount: 850.00, status: 'Failed', date: 'Oct 23, 2023 09:30 AM', method: 'Internal' },
    { id: '4', user: 'Alice Brown', type: 'Investment', amount: 10000.00, status: 'Completed', date: 'Oct 22, 2023 11:20 AM', method: 'Wallet' },
    { id: '5', user: 'Michael Wilson', type: 'Deposit', amount: 2500.00, status: 'Completed', date: 'Oct 21, 2023 04:55 PM', method: 'Bitcoin' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 border-none"><CheckCircle2 className="w-3 h-3" /> {status}</Badge>;
      case 'Pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 gap-1 border-none"><Clock className="w-3 h-3" /> {status}</Badge>;
      case 'Failed':
        return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 gap-1 border-none"><XCircle className="w-3 h-3" /> {status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Global Transactions</h1>
            <p className="text-muted-foreground">Monitor and manage all financial activities across the platform.</p>
          </div>
          <Button className="rounded-xl gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary/5 border-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Volume</p>
                  <p className="text-2xl font-bold mt-1">$42,500.00</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <ArrowUpDown className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-500/5 border-green-500/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Deposits</p>
                  <p className="text-2xl font-bold mt-1">$1.2M</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-500/5 border-red-500/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                  <p className="text-2xl font-bold mt-1">$380K</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-600">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-card">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search user, ID, or method..." className="pl-10 rounded-xl" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl gap-2">
                <Filter className="w-4 h-4" /> Filter
              </Button>
              <Button variant="outline" className="rounded-xl gap-2">
                <ArrowUpDown className="w-4 h-4" /> Sort
              </Button>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/10 text-xs uppercase tracking-wider font-bold">
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-secondary/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">TRX-{t.id}0092{t.id}</td>
                      <td className="px-6 py-4 font-medium">{t.user}</td>
                      <td className="px-6 py-4">
                        <span className={t.type === 'Deposit' ? 'text-green-600' : t.type === 'Withdrawal' ? 'text-red-600' : 'text-blue-600'}>
                          {t.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold">
                        {t.type === 'Deposit' ? '+' : '-'}${t.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{t.method}</td>
                      <td className="px-6 py-4">{getStatusBadge(t.status)}</td>
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{t.date}</td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Transaction</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Refund</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminTransactions;
