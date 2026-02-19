import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, AlertCircle, Info, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { notificationService } from "@/api/notifications";
import { Skeleton } from "@/components/ui/skeleton";

const Notifications = () => {
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getMyNotifications(),
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-amber-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-amber-50';
      default: return 'bg-blue-50';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your account activity.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">Mark all as read</Button>
            <Button variant="outline" size="icon" className="rounded-xl text-destructive hover:bg-destructive/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-2xl" />
            ))
          ) : notifications.length > 0 ? (
            notifications.map((notif) => (
              <Card key={notif.id} className={`border-none transition-all duration-200 ${notif.isRead ? 'opacity-80' : 'shadow-md border-l-4 border-l-primary'}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${getBg('info')}`}>
                      {getIcon('info')}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">{notif.title}</h3>
                        <span className="text-xs text-muted-foreground">{new Date(notif.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{notif.message}</p>
                      {!notif.isRead && (
                        <div className="pt-2">
                          <Button variant="link" className="p-0 h-auto text-xs font-bold text-primary">Mark as read</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No notifications found.</p>
            </div>
          )}
        </div>

        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">You're all caught up!</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
