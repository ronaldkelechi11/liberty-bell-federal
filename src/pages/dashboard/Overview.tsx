import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CreditCard,
  Target,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/api/accounts";
import { profileService } from "@/api/profile";
import { cardService } from "@/api/cards";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import NewAccountModal from "@/components/dashboard/NewAccountModal";
import NewCardModal from "@/components/dashboard/NewCardModal";
import TransactionReceiptModal from "@/components/dashboard/TransactionReceiptModal";
import { Transaction } from "@/api/types";
import { format } from "date-fns";

const Overview = () => {
  const navigate = useNavigate();
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
    throwOnError: false,
  });

  const { data: accounts = [], isLoading: accountsLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountService.getMyAccounts(),
    retry: false,
    throwOnError: false,
  });

  const { data: cards = [] } = useQuery({
    queryKey: ['cards'],
    queryFn: () => cardService.getCards(),
    throwOnError: false,
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => accountService.getAllTransactions(),
    retry: false,
    throwOnError: false,
  });

  const totalBalance = Array.isArray(accounts) ? accounts.reduce((acc, curr) => acc + (curr.balance || 0), 0) : 0;

  const totalDailyLimit = Array.isArray(accounts) ? accounts.reduce((acc, curr) => acc + (curr.dailyLimit || 0), 0) : 0;

  const spentToday = Array.isArray(transactions) ? transactions
    .filter(t => {
      if (!t || !t.createdAt) return false;
      try {
        const today = new Date();
        const tDate = new Date(t.createdAt);
        return t.type === 'debit' &&
          tDate.getDate() === today.getDate() &&
          tDate.getMonth() === today.getMonth() &&
          tDate.getFullYear() === today.getFullYear();
      } catch (e) {
        return false;
      }
    })
    .reduce((acc, curr) => acc + Math.abs(curr.amount || 0), 0) : 0;

  const remainingLimit = Math.max(0, (totalDailyLimit || 0) - (spentToday || 0));
  const limitUsagePercent = totalDailyLimit > 0 ? ((spentToday || 0) / totalDailyLimit) * 100 : 0;

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsReceiptModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">
            {profile ? `Hi, ${profile.firstname || 'User'}` : <Skeleton className="h-8 w-48" />}
          </h1>
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
                {accountsLoading ? <Skeleton className="h-9 w-32 bg-white/20" /> : `$${(totalBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              </div>
              <p className="text-xs mt-1 opacity-70">From all Accounts</p>
              <div className="flex gap-2 mt-6">
                <Button size="sm" variant="secondary" className="bg-white text-primary hover:bg-white/90" onClick={() => navigate('/dashboard/transfers')}>
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
              <CardTitle className="text-sm font-medium">Daily Transaction Limit</CardTitle>
              <Target className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(spentToday || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">You can still spend today out of ${(totalDailyLimit || 0).toLocaleString()} limit</p>
              <p className="text-xs text-muted-foreground mt-2">Available: {(remainingLimit || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <div className="mt-4">
                <Slider
                  value={[limitUsagePercent]}
                  max={100}
                  step={1}
                  className="pointer-events-none"
                  disabled
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
              <CreditCard className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Array.isArray(cards) ? cards.filter(c => c && c.status === 'active').length : 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Active cards on your account</p>
              <div className="mt-4 flex -space-x-2">
                {Array.isArray(cards) && cards.slice(0, 3).map((card, index) => (
                  <div key={card?.id || index} className="w-8 h-5 rounded bg-gradient-to-br from-primary to-primary/60 border border-background shadow-sm" title={card?.cardNumber} />
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
                <Link to="/dashboard/transactions">View All <ChevronRight className="ml-1 w-4 h-4" /></Link>
              </Button>
            </div>

            <Card>
              <CardContent className={(Array.isArray(transactions) && transactions.length > 0) ? "p-0" : "p-6"}>
                {(Array.isArray(transactions) && transactions.length > 0) ? (
                  <div className="divide-y divide-border">
                    {transactions.slice(0, 5).map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                        onClick={() => handleTransactionClick(t)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'debit' ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                            }`}>
                            {t.type === 'debit' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{t.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {t.createdAt ? format(new Date(t.createdAt), 'MMM dd, yyyy') : 'N/A'} • {t.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${t.type === 'debit' ? "text-foreground" : "text-green-600"}`}>
                            {t.type === 'debit' ? "-" : "+"}${(Math.abs(t.amount || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase">{t.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No recent transactions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Accounts & Cards Sidebar */}
          <div className="space-y-8">
            {/* My Accounts Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold">My Accounts</h2>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {Array.isArray(accounts) && accounts.map((acc) => (
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
                          <p className="font-bold">${(acc.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-dashed rounded-2xl py-8 h-auto flex-col gap-2"
                  onClick={() => setIsNewAccountModalOpen(true)}
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xl font-light">+</span>
                  </div>
                  <span className="text-sm font-medium">Open New Account</span>
                </Button>
              </div>
            </div>

            {/* My Cards Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold">My Cards</h2>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {Array.isArray(cards) && cards.map((card) => (
                  <Card key={card.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center group-hover:shadow-lg transition-all">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold capitalize">{card.cardType || 'Card'}</p>
                            <p className="text-xs text-muted-foreground">•••• {(card as any).cardNumber?.slice(-4) || '••••'}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{card.status}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-dashed rounded-2xl py-8 h-auto flex-col gap-2"
                  onClick={() => setIsNewCardModalOpen(true)}
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xl font-light">+</span>
                  </div>
                  <span className="text-sm font-medium">Add New Card</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewAccountModal
        isOpen={isNewAccountModalOpen}
        onOpenChange={setIsNewAccountModalOpen}
      />

      <NewCardModal
        isOpen={isNewCardModalOpen}
        onOpenChange={setIsNewCardModalOpen}
      />

      <TransactionReceiptModal
        transaction={selectedTransaction}
        isOpen={isReceiptModalOpen}
        onOpenChange={setIsReceiptModalOpen}
      />
    </DashboardLayout>
  );
};

export default Overview;
