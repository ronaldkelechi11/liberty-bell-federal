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
  Coins,
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
    { name: "Crypto Wallet", href: "/dashboard/crypto", icon: Coins },
    { name: "Deposits", href: "/dashboard/deposits", icon: ArrowDownLeft },
    { name: "Transfers", href: "/dashboard/transfers", icon: Send },
    { name: "Cards", href: "/dashboard/cards", icon: CreditCard },
    { name: "Investments", href: "/dashboard/investments", icon: TrendingUp },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  const adminLinks = [
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Users", href: "/admin/accounts", icon: Users },
    { name: "Transactions", href: "/admin/transactions", icon: History },
    { name: "Investments", href: "/admin/investments", icon: TrendingUp },
    { name: "Payments", href: "/admin/payment-methods", icon: ShieldCheck },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "System Settings", href: "/admin/settings", icon: Settings2 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn(
      "hidden lg:flex flex-col w-64 border-r border-border h-screen sticky top-0 transition-colors",
      isAdmin ? "bg-slate-950 text-slate-50 border-slate-800" : "bg-card text-foreground"
    )}>
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
            <img src="/logo_liberty.jpg" alt="Liberty Bell Logo" className="w-full h-full object-cover" />
          </div>
          <span className={cn(
            "font-heading text-xl font-bold transition-colors",
            isAdmin ? "text-slate-50" : "text-foreground"
          )}>Liberty Bell</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {!isAdmin ? (
          <div className="py-2">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Main Menu
            </p>
            {userLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-2">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Administration
            </p>
            {adminLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive(link.href)
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-50"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className={cn(
        "p-4 border-t space-y-2",
        isAdmin ? "border-slate-800" : "border-border"
      )}>
        <div className="flex items-center justify-between px-3 py-2 mb-2">
          <span className={cn(
            "text-xs font-medium",
            isAdmin ? "text-slate-400" : "text-muted-foreground"
          )}>Theme</span>
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            isAdmin
              ? "text-slate-400 hover:text-red-400 hover:bg-red-400/10"
              : "text-destructive hover:text-destructive hover:bg-destructive/10"
          )}
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
