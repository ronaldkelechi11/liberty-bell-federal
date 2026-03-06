import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import SetupWizard from "../auth/SetupWizard";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileService } from "@/api/profile";
import { authService } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ui/theme-toggle";
import { User } from "@/api/types";

const DEFAULT_ADMIN = {
  firstname: 'Admin',
  lastname: 'User',
  email: 'admin@example.com',
  role: 'admin',
} as any;

interface DashboardLayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
  profile?: any;
}

const DashboardLayout = ({ children, isAdmin: isAdminProp, profile: profileProp }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileProp && !isAdminProp) {
        try {
          const response = await profileService.getProfile();
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching profile in layout:", error);
        }
      }
    };

    fetchProfile();
  }, [profileProp, isAdminProp]);

  const currentProfile = isAdminProp ? DEFAULT_ADMIN : (profileProp || profile);
  const isAdmin = isAdminProp ?? currentProfile?.role === 'admin';

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-secondary/20">
      <Sidebar isAdmin={isAdmin} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto w-full">
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search transactions, accounts..."
                  className="w-full pl-10 pr-4 py-2 bg-secondary/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <img src="/logo_liberty.jpg" alt="Liberty Bell Logo" className="w-full h-full " />
              </div>
              <span className="font-heading font-bold text-sm">Liberty Bell Federal Bank</span>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="lg:hidden">
                <ThemeToggle />
              </div>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={currentProfile?.profilePicture} alt="User" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {currentProfile?.firstname || currentProfile?.lastname
                          ? `${currentProfile?.firstname?.[0] ?? ''}${currentProfile?.lastname?.[0] ?? ''}`
                          : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {currentProfile ? `${currentProfile.firstname || ''} ${currentProfile.lastname || ''}`.trim() || 'User' : 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {currentProfile?.email || 'user@example.com'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      <BottomNav isAdmin={isAdmin} />
      <SetupWizard />
    </div>
  );
};

export default DashboardLayout;
