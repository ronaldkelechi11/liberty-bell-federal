import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, ChevronRight, MoreVertical } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Accounts = () => {
  const accounts = [
    { id: '1', type: 'Checking', balance: 12500.50, number: '4582 1290 3341 8821', status: 'Active', currency: 'USD' },
    { id: '2', type: 'Savings', balance: 45000.00, number: '1290 8821 4582 3341', status: 'Active', currency: 'USD' },
    { id: '3', type: 'Investment', balance: 0.00, number: '3341 4582 8821 1290', status: 'Inactive', currency: 'USD' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Your Accounts</h1>
            <p className="text-muted-foreground">Manage and monitor all your bank accounts in one place.</p>
          </div>
          <Button className="rounded-xl gap-2">
            <Plus className="w-4 h-4" /> Open Account
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc) => (
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
                    <h3 className="font-bold text-lg">{acc.type} Account</h3>
                    <Badge variant={acc.status === 'Active' ? 'default' : 'secondary'} className="text-[10px] uppercase font-bold px-2 py-0">
                      {acc.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">{acc.number}</p>
                </div>

                <div className="mt-8">
                  <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Available Balance</p>
                  <p className="text-3xl font-bold mt-1">
                    {acc.currency === 'USD' ? '$' : acc.currency}
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
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
