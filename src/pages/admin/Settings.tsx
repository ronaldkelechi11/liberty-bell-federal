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
  Layout,
  Save,
  RotateCcw
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSettings = () => {
  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">System Settings</h1>
            <p className="text-muted-foreground mt-1">Configure global platform parameters, security policies, and integrations.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl gap-2 border-border/50">
              <RotateCcw className="w-4 h-4" /> Reset to Defaults
            </Button>
            <Button className="rounded-xl gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-secondary/20 p-1 rounded-xl mb-8">
            <TabsTrigger value="general" className="rounded-lg px-6">General</TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg px-6">Security</TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-lg px-6">Integrations</TabsTrigger>
            <TabsTrigger value="advanced" className="rounded-lg px-6">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" /> General Configuration
                  </CardTitle>
                  <CardDescription>Basic platform information and localization.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Platform Name</Label>
                    <Input id="siteName" defaultValue="Liberty Bell Federal Bank" className="rounded-xl bg-background/50 border-border/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Support Email</Label>
                    <Input id="supportEmail" defaultValue="support@libertybellfederal.com" className="rounded-xl bg-background/50 border-border/50" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Maintenance Mode</Label>
                      <p className="text-xs text-muted-foreground">Disable frontend for regular maintenance.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="w-5 h-5 text-primary" /> Appearance
                  </CardTitle>
                  <CardDescription>Customize the look and feel of the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Dark Mode Default</Label>
                      <p className="text-xs text-muted-foreground">Set dark mode as the default for new users.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Custom Branding</Label>
                      <p className="text-xs text-muted-foreground">Show custom logo in the dashboard.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" /> Auth Policies
                  </CardTitle>
                  <CardDescription>Manage user authentication and platform security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Two-Factor Authentication</Label>
                      <p className="text-xs text-muted-foreground">Require 2FA for all user logins.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">IP Access Restrictions</Label>
                      <p className="text-xs text-muted-foreground">Block suspicious login attempts from unknown IPs.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Email Verification</Label>
                      <p className="text-xs text-muted-foreground">Require email verification for new accounts.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" /> Password Requirements
                  </CardTitle>
                  <CardDescription>Enforce strong password rules.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Minimum Length (8)</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Require Special Characters</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" /> API Environment
                </CardTitle>
                <CardDescription>External service integrations and performance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Environment Selection</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline" className="rounded-xl h-16 border-primary bg-primary/5 text-primary flex flex-col items-center justify-center">
                      <span className="font-bold">Production</span>
                      <span className="text-[10px] opacity-70 italic">Live financial processing</span>
                    </Button>
                    <Button variant="outline" className="rounded-xl h-16 border-border/50 flex flex-col items-center justify-center">
                      <span className="font-bold text-muted-foreground">Sandbox</span>
                      <span className="text-[10px] opacity-70 italic">Test environment only</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold">Real-time Notifications</Label>
                    <p className="text-xs text-muted-foreground">Enable WebSocket notifications for users.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" /> Backup & Recovery
                </CardTitle>
                <CardDescription>Manage system data and automated backups.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-bold">Daily Auto-Backups</Label>
                    <p className="text-xs text-muted-foreground">Snapshot database every 24 hours.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
                  <Button variant="outline" className="rounded-xl gap-2 w-full border-border/50">
                    <RefreshCw className="w-4 h-4" /> Sync Cloud Data
                  </Button>
                  <Button variant="outline" className="rounded-xl gap-2 w-full border-border/50">
                    <Lock className="w-4 h-4" /> Export System Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
