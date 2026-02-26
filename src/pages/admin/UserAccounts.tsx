import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MoreVertical,
  User,
  Filter,
  ArrowUpDown,
  Lock,
  Unlock,
  CreditCard,
  Ban,
  Mail,
  ShieldAlert,
  History
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const UserAccounts = () => {
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', account: '4582...8821', balance: 12500.50, status: 'Active', joined: 'Oct 2023' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', account: '1120...3321', balance: 45000.00, status: 'Frozen', joined: 'Sep 2023' },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com', account: '9921...0012', balance: 1200.00, status: 'Active', joined: 'Oct 2023' },
  ];

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Monitor balances, freeze accounts, and manage user limits across the platform.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl gap-2">
              <Mail className="w-4 h-4" /> Message All
            </Button>
            <Button className="rounded-xl gap-2 bg-primary hover:bg-primary/90">
              <User className="w-4 h-4" /> Create User
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-secondary/20 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users, accounts..." className="pl-10 rounded-xl" />
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
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Account Number</th>
                    <th className="px-6 py-4">Balance</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-secondary/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                            {u.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono">{u.account}</td>
                      <td className="px-6 py-4 font-bold">${u.balance.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <Badge variant={u.status === 'Active' ? 'default' : 'destructive'} className="uppercase text-[10px]">
                          {u.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{u.joined}</td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2"><User className="w-4 h-4" /> View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><History className="w-4 h-4" /> Transactions</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><CreditCard className="w-4 h-4" /> Credit Account</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><Ban className="w-4 h-4" /> Debit Account</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><ShieldAlert className="w-4 h-4" /> Reset 2FA</DropdownMenuItem>
                            {u.status === 'Active' ? (
                              <DropdownMenuItem className="gap-2 text-destructive"><Lock className="w-4 h-4" /> Freeze Account</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="gap-2 text-primary"><Unlock className="w-4 h-4" /> Unfreeze Account</DropdownMenuItem>
                            )}
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

export default UserAccounts;
