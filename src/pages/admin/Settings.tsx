import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Shield,
  Globe,
  Mail,
  Zap,
  Lock,
  Database,
  RefreshCw,
  Layout
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminSettings = () => {
  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Global Platform Settings</h1>
          <p className="text-muted-foreground">Configure global parameters, security, and integration preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" /> General Configuration
              </CardTitle>
              <CardDescription>Basic platform information and localization.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Platform Name</Label>
                <Input id="siteName" defaultValue="Liberty Bell Federal Bank" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input id="supportEmail" defaultValue="support@libertybellfederal.com" className="rounded-xl" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-xs text-muted-foreground">Disable frontend for regular maintenance.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" /> Security & Auth
              </CardTitle>
              <CardDescription>Manage user authentication and platform security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">Require 2FA for all user logins.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>IP Access Restrictions</Label>
                  <p className="text-xs text-muted-foreground">Block suspicious login attempts from unknown IPs.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Verification</Label>
                  <p className="text-xs text-muted-foreground">Require email verification for new accounts.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> System & APIs
              </CardTitle>
              <CardDescription>External service integrations and performance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Environment</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="rounded-xl border-primary bg-primary/5 text-primary">Production</Button>
                  <Button variant="outline" className="rounded-xl">Sandbox</Button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <Label>Real-time Notifications</Label>
                  <p className="text-xs text-muted-foreground">Enable WebSocket notifications for users.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" /> Backup & Recovery
              </CardTitle>
              <CardDescription>Manage system data and automated backups.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Auto-Backups</Label>
                  <p className="text-xs text-muted-foreground">Snapshot database every 24 hours.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="rounded-xl gap-2 w-full">
                  <RefreshCw className="w-4 h-4" /> Sync Data
                </Button>
                <Button variant="outline" className="rounded-xl gap-2 w-full">
                  <Lock className="w-4 h-4" /> Export Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="ghost" className="rounded-xl">Discard Changes</Button>
          <Button className="rounded-xl px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
            Save Platform Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
