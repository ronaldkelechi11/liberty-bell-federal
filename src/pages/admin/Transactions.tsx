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
  XCircle,
  Loader2,
  ExternalLink
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/api/admin";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AdminTransactions = () => {
  const { data: transactionsResponse, isLoading } = useQuery({
    queryKey: ['admin-transactions'],
    queryFn: () => adminService.getTransactions(),
  });

  const transactions = transactionsResponse?.data || [];

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'completed':
        return <Badge variant="default" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 gap-1 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"><CheckCircle2 className="w-3 h-3" /> {status}</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 gap-1 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800"><Clock className="w-3 h-3" /> {status}</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="bg-rose-50 text-rose-700 hover:bg-rose-100 gap-1 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800"><XCircle className="w-3 h-3" /> {status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Global Transactions</h1>
            <p className="text-muted-foreground mt-1">Audit and monitor all platform financial activity in real-time.</p>
          </div>
          <Button className="rounded-xl gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/5 to-primary/5 border-primary/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">Transaction Count</p>
                  <p className="text-3xl font-bold mt-1">{transactions.length}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 border-emerald-500/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">System Inflow</p>
                  <p className="text-3xl font-bold mt-1">
                    ${transactions
                      .filter(t => t.type === 'credit')
                      .reduce((acc, curr) => acc + curr.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20">
                  <ArrowDownLeft className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-rose-500/5 to-rose-600/5 border-rose-500/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-rose-600 uppercase tracking-widest">System Outflow</p>
                  <p className="text-3xl font-bold mt-1">
                    ${transactions
                      .filter(t => t.type === 'debit')
                      .reduce((acc, curr) => acc + curr.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600 border border-rose-500/20">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
          <div className="p-4 border-b border-border/50 flex flex-col md:flex-row gap-4 justify-between bg-secondary/5">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by reference, user ID..." className="pl-10 rounded-xl bg-background/50 border-border/50" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl gap-2 h-9 border-border/50">
                <Filter className="w-4 h-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl gap-2 h-9 border-border/50">
                <ArrowUpDown className="w-4 h-4" /> Sort
              </Button>
            </div>
          </div>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground animate-pulse">Loading global ledger...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      <th className="px-6 py-4">Reference / Date</th>
                      <th className="px-6 py-4">Account ID</th>
                      <th className="px-6 py-4">Type / Category</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-sm">
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                          No transactions recorded in the system.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((t) => (
                        <tr key={t.id} className="hover:bg-secondary/5 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="font-mono text-[10px] font-bold text-foreground">REF-{t.reference?.slice(0, 8).toUpperCase()}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {format(new Date(t.createdAt), 'MMM dd, yyyy • HH:mm')}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 group/id">
                              <span className="font-mono text-xs text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded">
                                {t.accountId.slice(0, 8)}...
                              </span>
                              <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover/id:opacity-100 transition-opacity cursor-pointer" />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className={cn(
                                "text-[10px] font-bold uppercase tracking-wider",
                                t.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'
                              )}>
                                {t.type}
                              </span>
                              <span className="text-xs text-muted-foreground capitalize">{t.category}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className={cn(
                              "font-bold",
                              t.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'
                            )}>
                              {t.type === 'credit' ? '+' : '-'}{t.currency}{t.amount.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{t.description}</p>
                          </td>
                          <td className="px-6 py-4">{getStatusBadge(t.status)}</td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-xl">
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer">View Details</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer">User Profile</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30">Reverse Transaction</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminTransactions;

const Activity = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);
