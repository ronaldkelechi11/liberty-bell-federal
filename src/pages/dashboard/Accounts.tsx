import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, MoreVertical } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import NewAccountModal from "@/components/dashboard/NewAccountModal";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/api/accounts";
import { Skeleton } from "@/components/ui/skeleton";

const Accounts = () => {
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountService.getMyAccounts(),
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Your Accounts</h1>
            <p className="text-muted-foreground">Manage and monitor all your bank accounts in one place.</p>
          </div>
          <Button
            className="rounded-xl gap-2"
            onClick={() => setIsNewAccountModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Open Account
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="border-none bg-secondary/20 h-64 animate-pulse">
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-12 w-12 rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="mt-auto pt-8">
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : accounts.length > 0 ? (
            accounts.map((acc) => (
              <Card key={acc.id} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-card to-secondary/50">
                <div className="absolute top-0 right-0 p-4">
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Wallet className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg capitalize">{acc.type} Account</h3>
                      <Badge variant={acc.status === 'active' ? 'default' : 'secondary'} className="text-[10px] uppercase font-bold px-2 py-0">
                        {acc.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">{acc.accountNumber}</p>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Available Balance</p>
                    <p className="text-3xl font-bold mt-1">
                      {acc.currency === 'USD' || !acc.currency ? '$' : acc.currency}
                      {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl" asChild>
                      <Link to={`/dashboard/accounts/${acc.id}`}>Details</Link>
                    </Button>
                    <Button variant="default" size="sm" className="flex-1 rounded-xl" asChild>
                      <Link to="/dashboard/transfers">Transfer</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No accounts found.</p>
            </div>
          )}
        </div>
      </div>
      <NewAccountModal
        isOpen={isNewAccountModalOpen}
        onOpenChange={setIsNewAccountModalOpen}
      />
    </DashboardLayout>
  );
};

export default Accounts;
