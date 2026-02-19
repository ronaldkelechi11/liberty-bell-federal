import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CreditCard,
  TrendingUp,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/api/accounts";
import { Skeleton } from "@/components/ui/skeleton";

const Overview = () => {
  const { data: accountsData, isLoading: accountsLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountService.getMyAccounts(),
    retry: false,
  });

  const accounts = accountsData || [
    { id: '1', type: 'checking', balance: 12500.50, accountNumber: '**** 4582' },
    { id: '2', type: 'savings', balance: 45000.00, accountNumber: '**** 1290' },
  ];

  const transactions = [
    { id: '1', title: 'Apple Store', date: 'Oct 24, 2023', amount: -999.00, category: 'Electronics', status: 'Completed' },
    { id: '2', title: 'Salary Deposit', date: 'Oct 23, 2023', amount: 5000.00, category: 'Income', status: 'Completed' },
    { id: '3', title: 'Starbucks', date: 'Oct 22, 2023', amount: -15.50, category: 'Food & Drink', status: 'Completed' },
    { id: '4', title: 'Netflix Subscription', date: 'Oct 20, 2023', amount: -19.99, category: 'Entertainment', status: 'Completed' },
  ];

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Good morning, John</h1>
          <p className="text-muted-foreground">Here's what's happening with your money today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary text-primary-foreground border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-80">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {accountsLoading ? <Skeleton className="h-9 w-32 bg-white/20" /> : `$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              </div>
              <p className="text-xs mt-1 opacity-70">+2.5% from last month</p>
              <div className="flex gap-2 mt-6">
                <Button size="sm" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <ArrowUpRight className="w-4 h-4 mr-1" /> Send
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/20 border-none text-white hover:bg-white/30">
                  <ArrowDownLeft className="w-4 h-4 mr-1" /> Add Money
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,000.00</div>
              <p className="text-xs text-muted-foreground mt-1">Goal: $50,000 (90%)</p>
              <div className="mt-4 w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[90%]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
              <CreditCard className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">2 Physical, 1 Virtual</p>
              <div className="mt-4 flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-5 rounded bg-gradient-to-br from-primary to-primary/60 border border-background shadow-sm" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold">Recent Transactions</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/accounts">View All <ChevronRight className="ml-1 w-4 h-4" /></Link>
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          t.amount < 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                        }`}>
                          {t.amount < 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{t.title}</p>
                          <p className="text-xs text-muted-foreground">{t.date} • {t.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${t.amount < 0 ? "text-foreground" : "text-green-600"}`}>
                          {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase">{t.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Accounts Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold">My Accounts</h2>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {accounts.map((acc) => (
                <Card key={acc.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold capitalize">{acc.type} Account</p>
                          <p className="text-xs text-muted-foreground">{(acc as any).number || (acc as any).accountNumber}</p>
                        </div>
                        <p className="font-bold">${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full border-dashed rounded-2xl py-8 h-auto flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-xl font-light">+</span>
                </div>
                <span className="text-sm font-medium">Open New Account</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
