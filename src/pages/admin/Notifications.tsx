import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Send,
  Trash2,
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Info,
  MoreVertical,
  Plus
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { adminService } from "@/api/admin";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Notification } from "@/api/types";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await adminService.getAllNotifications();
        setNotifications(response.data || []);
      } catch (error) {
        console.error("Error fetching admin notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const getIcon = (title: string) => {
    const t = (title || '').toLowerCase();
    if (t.includes('alert') || t.includes('warning') || t.includes('failed')) return <AlertCircle className="w-4 h-4 text-rose-500" />;
    if (t.includes('success') || t.includes('completed') || t.includes('verified')) return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    return <Info className="w-4 h-4 text-blue-500" />;
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">System Notifications</h1>
            <p className="text-muted-foreground mt-1">Manage global broadcasts and audit user-specific alerts.</p>
          </div>
          <Button className="rounded-xl gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" /> Broadcast Message
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardHeader className="bg-secondary/10 border-b border-border/50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" /> Audit Log
                </CardTitle>
                <CardDescription>Historical record of all system-generated notifications.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Retrieving notification history...</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border/50">
                    {notifications.length === 0 ? (
                      <div className="px-6 py-10 text-center text-muted-foreground">
                        No notifications found in the system logs.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className="p-4 hover:bg-secondary/5 transition-colors flex gap-4 group">
                          <div className="mt-1 w-8 h-8 rounded-lg bg-background border border-border/50 flex items-center justify-center shrink-0">
                            {getIcon(n.title)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-bold text-sm text-foreground truncate">{n.title}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                              </div>
                              <span className="text-[10px] text-muted-foreground whitespace-nowrap bg-secondary/30 px-2 py-0.5 rounded">
                                {n.createdAt ? format(new Date(n.createdAt), 'MMM dd, HH:mm') : 'N/A'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                              <Badge variant="outline" className="text-[9px] font-bold tracking-tighter uppercase px-1.5 h-4 border-border/50">
                                User ID: {n._id?.slice(0, 8)}...
                              </Badge>
                              <span className={cn(
                                "text-[10px] font-bold uppercase tracking-widest",
                                n.isRead ? "text-muted-foreground" : "text-primary"
                              )}>
                                {n.isRead ? 'Seen' : 'Unread'}
                              </span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl">
                              <DropdownMenuItem className="gap-2"><Send className="w-4 h-4" /> Resend</DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30"><Trash2 className="w-4 h-4" /> Delete Log</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-primary/5 border border-primary/10 overflow-hidden relative">
              <div className="absolute -right-4 -top-4 opacity-5 rotate-12">
                <Send className="w-32 h-32 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Quick Broadcast</CardTitle>
                <CardDescription>Send a push notification to all platform users.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                  <input className="w-full bg-background border border-border/50 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="e.g., Scheduled Maintenance" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea className="w-full bg-background border border-border/50 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[100px] resize-none" placeholder="Enter broadcast details..." />
                </div>
                <Button className="w-full rounded-xl gap-2 h-11 font-bold">
                  <Send className="w-4 h-4" /> Send Broadcast
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Notification Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm font-medium">Total Sent</span>
                  <span className="font-bold">{notifications.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm font-medium">Read Rate</span>
                  <span className="font-bold text-emerald-600">
                    {notifications.length > 0 ? Math.round((notifications.filter(n => n.isRead).length / notifications.length) * 100) : 0}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminNotifications;
