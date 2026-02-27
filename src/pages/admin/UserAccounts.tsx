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
  History,
  Loader2
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

const UserAccounts = () => {
  const { data: usersResponse, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminService.getUsers(),
  });

  const users = usersResponse?.data || [];

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">Monitor users, manage accounts, and handle administrative actions.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl gap-2 border-slate-200 dark:border-slate-800">
              <Mail className="w-4 h-4" /> Message All
            </Button>
            <Button className="rounded-xl gap-2 bg-primary hover:bg-primary/90">
              <User className="w-4 h-4" /> Create User
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
          <div className="p-4 border-b border-border/50 flex flex-col md:flex-row gap-4 justify-between bg-secondary/5">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users by name or email..." className="pl-10 rounded-xl bg-background/50 border-border/50" />
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
                <p className="text-sm text-muted-foreground animate-pulse">Fetching system users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      <th className="px-6 py-4">User Details</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Email Status</th>
                      <th className="px-6 py-4">Age/Location</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-sm">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                          No users found in the system.
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="hover:bg-secondary/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20 group-hover:scale-110 transition-transform">
                                {u.firstname?.[0]}{u.lastname?.[0]}
                              </div>
                              <div>
                                <p className="font-bold text-foreground">{u.firstname} {u.lastname}</p>
                                <p className="text-xs text-muted-foreground">@{u.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={u.role === 'admin' ? 'default' : 'secondary'} className="rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                              {u.role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${u.isEmailVerified ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              <span className="text-xs font-medium">{u.isEmailVerified ? 'Verified' : 'Unverified'}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{u.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-xs font-medium">{u.age} yrs • {u.maritalStatus}</p>
                            <p className="text-[10px] text-muted-foreground">{u.city}, {u.country}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-xl">
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer"><User className="w-4 h-4" /> View Profile</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer"><History className="w-4 h-4" /> Transactions</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/30"><CreditCard className="w-4 h-4" /> Credit Account</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30"><Ban className="w-4 h-4" /> Debit Account</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer"><ShieldAlert className="w-4 h-4" /> Reset 2FA</DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer text-amber-600 focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-950/30"><Lock className="w-4 h-4" /> Freeze User</DropdownMenuItem>
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

export default UserAccounts;
