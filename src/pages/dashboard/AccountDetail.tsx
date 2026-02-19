import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Calendar,
  Wallet,
  MoreHorizontal,
  Lock,
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

const AccountDetail = () => {
  const { id } = useParams();

  // Mock data
  const account = {
    id,
    type: 'Checking',
    balance: 12500.50,
    number: '4582 1290 3341 8821',
    status: 'Active',
    currency: 'USD',
    dailyLimit: 5000,
    spentToday: 1200.45,
    createdAt: 'Jan 12, 2023'
  };

  const transactions = [
    { id: '1', title: 'Apple Store', date: 'Oct 24, 2023', amount: -999.00, category: 'Electronics', status: 'Completed', ref: 'TRX-9821-442' },
    { id: '2', title: 'Salary Deposit', date: 'Oct 23, 2023', amount: 5000.00, category: 'Income', status: 'Completed', ref: 'TRX-1120-332' },
    { id: '3', title: 'Starbucks', date: 'Oct 22, 2023', amount: -15.50, category: 'Food & Drink', status: 'Completed', ref: 'TRX-5531-110' },
    { id: '4', title: 'Netflix Subscription', date: 'Oct 20, 2023', amount: -19.99, category: 'Entertainment', status: 'Completed', ref: 'TRX-0021-998' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link to="/dashboard/accounts"><ChevronLeft className="w-5 h-5" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold">{account.type} Account</h1>
            <p className="text-sm text-muted-foreground font-mono">{account.number}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2"><Lock className="w-4 h-4" /> Freeze Account</DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive"><XCircle className="w-4 h-4" /> Close Account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="rounded-xl gap-2">
              <Download className="w-4 h-4" /> Statement
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Account Card */}
            <Card className="bg-primary text-primary-foreground border-none relative overflow-hidden p-8">
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
                <div>
                  <p className="text-primary-foreground/70 text-sm font-medium uppercase tracking-wider">Current Balance</p>
                  <h2 className="text-4xl md:text-5xl font-bold mt-2">${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                  <div className="flex gap-4 mt-8">
                    <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 rounded-xl px-6">
                      Send Money
                    </Button>
                    <Button variant="secondary" className="bg-white/20 border-none text-white hover:bg-white/30 rounded-xl px-6">
                      Add Funds
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end text-right">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <Wallet className="w-8 h-8" />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs opacity-70">Daily Limit</p>
                    <p className="font-bold">${account.spentToday} / ${account.dailyLimit}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Transactions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold">Transaction History</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl gap-2 h-9">
                    <Calendar className="w-4 h-4" /> Date
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl gap-2 h-9">
                    <Filter className="w-4 h-4" /> Filter
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {transactions.map((t) => (
                      <div key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-secondary/30 transition-colors gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            t.amount < 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                          }`}>
                            {t.amount < 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{t.title}</p>
                            <p className="text-xs text-muted-foreground">{t.date} • Ref: {t.ref}</p>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                          <p className={`font-bold ${t.amount < 0 ? "text-foreground" : "text-green-600"}`}>
                            {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </p>
                          <Badge variant="secondary" className="text-[10px] uppercase h-5 ml-2 sm:ml-0">
                            {t.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border text-center">
                    <Button variant="ghost" size="sm" className="text-primary font-bold">Load More</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Account Type</span>
                  <span className="font-medium">{account.type}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 uppercase text-[10px]">{account.status}</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Currency</span>
                  <span className="font-medium">{account.currency}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Opened On</span>
                  <span className="font-medium">{account.createdAt}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-4 border-t border-border">
                  <span className="text-muted-foreground">Routing Number</span>
                  <span className="font-medium font-mono">021000021</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-none">
              <CardContent className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Monthly Statements</h3>
                  <p className="text-sm text-muted-foreground mt-1">Download your monthly transaction records in PDF format.</p>
                </div>
                <Button variant="outline" className="w-full rounded-xl">View All Statements</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountDetail;
