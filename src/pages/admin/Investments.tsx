import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Calendar,
  DollarSign
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/api/admin";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AdminInvestments = () => {
  const queryClient = useQueryClient();
  const { data: investmentsResponse, isLoading } = useQuery({
    queryKey: ['admin-investments'],
    queryFn: () => adminService.getInvestments(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) =>
      adminService.updateInvestmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-investments'] });
      toast.success("Investment status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update investment status");
    }
  });

  const investments = investmentsResponse?.data || [];

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'active':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Active</Badge>;
      case 'matured':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"><Calendar className="w-3 h-3 mr-1" /> Matured</Badge>;
      case 'cancelled':
        return <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> {status}</Badge>;
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Investment Portfolio</h1>
            <p className="text-muted-foreground mt-1">Review and manage all user investment plans and maturities.</p>
          </div>
          <div className="flex gap-3">
             <Card className="flex items-center gap-4 px-4 py-2 bg-primary/5 border-primary/10 shadow-none">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                   <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none">Total Assets</p>
                   <p className="text-lg font-bold text-foreground">
                      ${investments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                   </p>
                </div>
             </Card>
          </div>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Analyzing investment data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      <th className="px-6 py-4">User ID</th>
                      <th className="px-6 py-4">Plan / Amount</th>
                      <th className="px-6 py-4">Returns</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-sm">
                    {investments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                          No active investments found in the system.
                        </td>
                      </tr>
                    ) : (
                      investments.map((inv) => (
                        <tr key={inv.id} className="hover:bg-secondary/5 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="font-mono text-xs text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded inline-block">
                              {inv.userId.slice(0, 12)}...
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-foreground capitalize">{inv.planId} Plan</span>
                              <span className="text-xs text-muted-foreground">${inv.amount.toLocaleString()} Principal</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-emerald-600">+${inv.expectedReturns.toLocaleString()}</span>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-tighter font-bold">Estimated ROI</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                               <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                  <Clock className="w-3 h-3" /> Start: {format(new Date(inv.startDate), 'MMM dd, yyyy')}
                               </div>
                               <div className="flex items-center gap-1.5 text-[10px] text-foreground font-medium">
                                  <Calendar className="w-3 h-3" /> End: {format(new Date(inv.endDate), 'MMM dd, yyyy')}
                               </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{getStatusBadge(inv.status)}</td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-xl">
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/30"
                                  onClick={() => updateStatusMutation.mutate({ id: inv.id, status: 'active' })}
                                >
                                  <CheckCircle2 className="w-4 h-4" /> Mark Active
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer text-blue-600 focus:text-blue-600 focus:bg-blue-50 dark:focus:bg-blue-950/30"
                                  onClick={() => updateStatusMutation.mutate({ id: inv.id, status: 'matured' })}
                                >
                                  <Calendar className="w-4 h-4" /> Mark Matured
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30"
                                  onClick={() => updateStatusMutation.mutate({ id: inv.id, status: 'cancelled' })}
                                >
                                  <XCircle className="w-4 h-4" /> Cancel Plan
                                </DropdownMenuItem>
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

export default AdminInvestments;
