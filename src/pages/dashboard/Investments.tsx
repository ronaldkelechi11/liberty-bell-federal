import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Plus, ArrowUpRight, Clock, ShieldCheck, ChevronRight, BarChart3, PieChart } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/api/investments";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const cryptoData = [
  { name: 'Mon', Bitcoin: 62000, Ethereum: 2400 },
  { name: 'Tue', Bitcoin: 63500, Ethereum: 2550 },
  { name: 'Wed', Bitcoin: 61000, Ethereum: 2300 },
  { name: 'Thu', Bitcoin: 64000, Ethereum: 2600 },
  { name: 'Fri', Bitcoin: 67000, Ethereum: 2800 },
  { name: 'Sat', Bitcoin: 66500, Ethereum: 2750 },
  { name: 'Sun', Bitcoin: 68000, Ethereum: 2900 },
];

const stockData = [
  { name: 'AAPL', value: 185.92, change: +1.2 },
  { name: 'MSFT', value: 420.55, change: -0.5 },
  { name: 'GOOGL', value: 150.32, change: +2.1 },
  { name: 'TSLA', value: 175.40, change: +3.5 },
  { name: 'NVDA', value: 875.20, change: +4.8 },
];

const Investments = () => {
  const plans = [
    { id: 'starter', name: 'Starter Plan', roi: '8.5%', term: '6 Months', min: 500, description: 'Low risk, steady growth for beginners.' },
    { id: 'balanced', name: 'Balanced Plan', roi: '12.2%', term: '12 Months', min: 2500, description: 'Medium risk with diversified portfolio.' },
    { id: 'advanced', name: 'Advanced Plan', roi: '18.5%', term: '24 Months', min: 10000, description: 'Higher risk for maximum returns.' },
  ];

  const { data: myInvestments = [], isLoading } = useQuery({
    queryKey: ['investments'],
    queryFn: () => investmentService.getMyInvestments(),
  });

  const totalInvested = myInvestments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalProfit = myInvestments.reduce((acc, curr) => acc + (curr.expectedReturns || 0), 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Investments</h1>
            <p className="text-muted-foreground">Grow your wealth with our tailored investment plans.</p>
          </div>
          <Button className="rounded-xl gap-2 bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4" /> New Investment
          </Button>
        </div>

        {/* Market Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 overflow-hidden border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Crypto Market Analysis
                </CardTitle>
                <CardDescription>Live tracking of Bitcoin and Ethereum performance</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-primary border-primary/20">Bitcoin</Badge>
                <Badge variant="outline" className="opacity-50">Ethereum</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cryptoData}>
                    <defs>
                      <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(val) => `$${val/1000}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => [`$${value.toLocaleString()}`, 'Price']}
                    />
                    <Area type="monotone" dataKey="Bitcoin" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorBtc)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="pb-8">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> Top Stocks
              </CardTitle>
              <CardDescription>Performance of major tech stocks today</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="h-[200px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Bar dataKey="change" radius={[4, 4, 0, 0]}>
                      {stockData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.change >= 0 ? '#10b981' : '#ef4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {stockData.slice(0, 3).map((stock) => (
                  <div key={stock.name} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                    <span className="font-bold text-sm">{stock.name}</span>
                    <div className="text-right">
                      <p className="text-sm font-bold">${stock.value}</p>
                      <p className={`text-[10px] font-bold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-6">
              <p className="text-sm opacity-80 uppercase tracking-wider font-medium">Total Invested</p>
              <p className="text-3xl font-bold mt-2">
                ${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1 mt-4 text-green-300">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-bold">Live</span>
                <span className="text-xs opacity-70 ml-1">tracking active plans</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Expected Profit</p>
              <p className="text-3xl font-bold mt-2 text-green-600">
                +${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted-foreground mt-4">Calculated at maturity</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Active Plans</p>
              <p className="text-3xl font-bold mt-2">{myInvestments.length}</p>
              <div className="flex items-center gap-2 mt-4">
                <Badge variant="secondary" className="bg-green-50 text-green-600 border-green-100 uppercase text-[10px]">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold">Investment Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="hover:border-primary transition-colors flex flex-col">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Expected ROI</p>
                      <p className="text-2xl font-bold text-primary">{plan.roi}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase">Term</p>
                      <p className="font-bold">{plan.term}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border mt-auto">
                    <p className="text-sm text-muted-foreground mb-4">Minimum Investment: <span className="font-bold text-foreground">${plan.min}</span></p>
                    <Button className="w-full rounded-xl">Invest Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-8">
          <h2 className="text-xl font-heading font-bold">Your Portfolio</h2>
          {isLoading ? (
            <div className="space-y-4">
              {Array(1).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
          ) : myInvestments.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {myInvestments.map((inv) => (
                    <div key={inv.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold capitalize">{inv.planId} Plan</h3>
                          <p className="text-xs text-muted-foreground">Started on {new Date(inv.startDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 md:max-w-md">
                        <div>
                          <p className="text-[10px] uppercase text-muted-foreground font-semibold">Amount</p>
                          <p className="font-bold">${inv.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-muted-foreground font-semibold">Expected Profit</p>
                          <p className="font-bold text-green-600">+${(inv.expectedReturns || 0).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-muted-foreground font-semibold">Status</p>
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 uppercase text-[10px] mt-1">{inv.status}</Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-secondary/20 border-dashed py-12">
              <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold">No active investments</h3>
                  <p className="text-sm text-muted-foreground mt-1">Start growing your money by choosing an investment plan.</p>
                </div>
                <Button variant="outline" className="rounded-xl">Browse Plans</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Investments;
