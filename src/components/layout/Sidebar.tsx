import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Send,
  CreditCard,
  TrendingUp,
  Bell,
  User,
  Settings,
  LogOut,
  BarChart3,
  Users,
  ShieldCheck,
  ArrowDownLeft,
  History,
  Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { authService } from "@/api/auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar = ({ isAdmin }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const userLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Accounts", href: "/dashboard/accounts", icon: Wallet },
    { name: "Deposits", href: "/dashboard/deposits", icon: ArrowDownLeft },
    { name: "Transfers", href: "/dashboard/transfers", icon: Send },
    { name: "Cards", href: "/dashboard/cards", icon: CreditCard },
    { name: "Investments", href: "/dashboard/investments", icon: TrendingUp },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  const adminLinks = [
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "User Accounts", href: "/admin/accounts", icon: Users },
    { name: "Transactions", href: "/admin/transactions", icon: History },
    { name: "Payments", href: "/admin/payment-methods", icon: ShieldCheck },
    { name: "System Settings", href: "/admin/settings", icon: Settings2 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-heading font-bold">LB</span>
          </div>
          <span className="font-heading text-xl font-bold text-foreground">Liberty Bell Federal Bank</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="py-2">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Main Menu
          </p>
          {userLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
        </div>

        {isAdmin && (
          <div className="py-2 mt-4 border-t border-border">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 pt-4">
              Admin Panel
            </p>
            {adminLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <div className="flex items-center justify-between mb-2">
          <Link to="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors flex-1">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          <ThemeToggle />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 py-2 rounded-xl text-sm font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
