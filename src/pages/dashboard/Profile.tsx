import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Camera, ShieldCheck, Lock, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  };

  const user = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 000-0000',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    username: 'johndoe',
    joined: 'Jan 2023'
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your personal information and security preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="text-center py-8">
              <CardContent className="space-y-4">
                <div className="relative inline-block">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl mx-auto">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-4xl bg-primary/10 text-primary">JD</AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg">
                    <Camera className="w-5 h-5" />
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.firstname} {user.lastname}</h2>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
                </div>
                <div className="pt-4 flex flex-wrap justify-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Verified Account</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-between rounded-xl h-12">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4" /> Change Password
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Button variant="outline" className="w-full justify-between rounded-xl h-12">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4" /> Transfer PIN
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input defaultValue={user.firstname} className="pl-10 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input defaultValue={user.lastname} className="pl-10 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input defaultValue={user.email} className="pl-10 rounded-xl" disabled />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input defaultValue={user.phone} className="pl-10 rounded-xl" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Residential Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input defaultValue={user.address} className="pl-10 rounded-xl" />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="rounded-xl px-8" loading={isSaving} onClick={handleSave}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-destructive/5 border-destructive/10">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Once you close your account, there is no going back. Please be certain.</p>
                <Button variant="destructive" className="rounded-xl">Close Account</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
