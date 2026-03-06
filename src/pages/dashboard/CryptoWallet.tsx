import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  ExternalLink,
  History,
  TrendingUp,
  Wallet as WalletIcon,
  RefreshCw,
  CheckCircle2,
  QrCode
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { accountService } from "@/api/accounts";
import { Account } from "@/api/types";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const chartData = [
  { date: "2024-01-01", price: 42000 },
  { date: "2024-01-05", price: 45000 },
  { date: "2024-01-10", price: 43500 },
  { date: "2024-01-15", price: 48000 },
  { date: "2024-01-20", price: 52000 },
  { date: "2024-01-25", price: 51000 },
  { date: "2024-01-30", price: 58000 },
];

const CryptoWallet = () => {
  const [btcAccount, setBtcAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress] = useState("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh");

  useEffect(() => {
    const fetchBtcAccount = async () => {
      try {
        const response = await accountService.getMyAccounts();
        const btc = response.data.find(acc => acc.type === 'btc' || acc.currency === 'BTC');
        setBtcAccount(btc || null);
      } catch (error) {
        console.error("Error fetching BTC account:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBtcAccount();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Bitcoin Wallet</h1>
            <p className="text-muted-foreground mt-1">Manage your crypto assets and monitor market trends.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl gap-2 border-border/50">
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
            <Button className="rounded-xl gap-2 bg-[#F7931A] hover:bg-[#F7931A]/90 text-white border-none shadow-lg shadow-orange-500/20">
              <Coins className="w-4 h-4" /> Buy BTC
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Balance Card */}
          <Card className="lg:col-span-2 border-none shadow-2xl bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <Coins className="w-64 h-64" />
            </div>
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2 text-orange-400">
                <div className="w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">Available Balance</span>
              </div>
              <div className="mt-4">
                <h2 className="text-5xl font-bold tracking-tight">
                  {btcAccount ? Number(btcAccount.balance).toFixed(8) : "0.00000000"} <span className="text-2xl text-orange-400/80">BTC</span>
                </h2>
                <p className="text-xl text-slate-400 mt-2 font-medium">
                  ≈ ${((btcAccount ? Number(btcAccount.balance) : 0) * 58432.12).toLocaleString()} USD
                </p>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-6">
              <div className="flex flex-wrap gap-4 mt-4">
                <Button className="bg-white/10 hover:bg-white/20 border-white/10 text-white rounded-2xl px-8 h-12 gap-2 backdrop-blur-sm">
                  <ArrowUpRight className="w-5 h-5" /> Send
                </Button>
                <Button className="bg-white/10 hover:bg-white/20 border-white/10 text-white rounded-2xl px-8 h-12 gap-2 backdrop-blur-sm">
                  <ArrowDownLeft className="w-5 h-5" /> Receive
                </Button>
                <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl h-12">
                  <History className="w-5 h-5 mr-2" /> Activity
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Address Card */}
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <WalletIcon className="w-5 h-5 text-primary" /> Wallet Address
              </CardTitle>
              <CardDescription>Your unique Bitcoin receive address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/30 p-6 rounded-2xl flex flex-col items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-inner">
                  <QrCode className="w-32 h-32 text-slate-900" />
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Public Key</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(walletAddress)}>
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <div className="p-3 bg-background rounded-xl border border-border/50 break-all text-xs font-mono text-center leading-relaxed">
                    {walletAddress}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-xs text-emerald-600 dark:text-emerald-400 leading-relaxed font-medium">
                  Verified & Secure. Always double-check addresses before sending crypto.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Analysis & History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Market Analysis
                </CardTitle>
                <CardDescription>BTC/USD price performance (30 days)</CardDescription>
              </div>
              <div className="flex gap-1 bg-secondary/30 p-1 rounded-xl">
                {['1H', '1D', '1W', '1M', '1Y'].map(t => (
                  <Button key={t} variant="ghost" size="sm" className={cn("h-7 px-3 rounded-lg text-[10px] font-bold", t === '1M' ? "bg-background shadow-sm" : "text-muted-foreground")}>
                    {t}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F7931A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F7931A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickFormatter={(str) => format(new Date(str), 'MMM d')}
                  />
                  <YAxis
                    hide
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#F7931A' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#F7931A"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest crypto transactions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto px-0">
              <div className="space-y-1">
                {[
                  { type: 'receive', amount: '0.0425', from: 'External Wallet', date: '2024-03-15', status: 'Completed' },
                  { type: 'send', amount: '0.0120', from: 'Exchange', date: '2024-03-12', status: 'Completed' },
                  { type: 'receive', amount: '0.1500', from: 'Merchant Pay', date: '2024-03-10', status: 'Completed' },
                  { type: 'send', amount: '0.0050', from: 'Gift Card', date: '2024-03-05', status: 'Completed' },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors cursor-pointer border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        tx.type === 'receive' ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                      )}>
                        {tx.type === 'receive' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold capitalize">{tx.type} BTC</p>
                        <p className="text-[10px] text-muted-foreground">{tx.from} • {tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-bold", tx.type === 'receive' ? "text-emerald-600" : "text-rose-600")}>
                        {tx.type === 'receive' ? "+" : "-"}{tx.amount}
                      </p>
                      <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-2 text-primary font-bold text-sm">
                View Full History <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CryptoWallet;
