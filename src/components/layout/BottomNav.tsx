import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Send,
  CreditCard,
  Users,
  BarChart3,
  CreditCard as PaymentIcon,
  Settings,
  ArrowDownLeft,
  Coins
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  isAdmin?: boolean;
}

const BottomNav = ({ isAdmin }: BottomNavProps) => {
  const location = useLocation();

  const userLinks = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "Accounts", href: "/dashboard/accounts", icon: Wallet },
    { name: "Crypto", href: "/dashboard/crypto", icon: Coins },
    { name: "Send", href: "/dashboard/transfers", icon: Send },
    { name: "Cards", href: "/dashboard/cards", icon: CreditCard },
  ];

  const adminLinks = [
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Users", href: "/admin/accounts", icon: Users },
    { name: "Payments", href: "/admin/payment-methods", icon: PaymentIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn(
      "lg:hidden fixed bottom-0 left-0 right-0 border-t px-4 py-2 z-50",
      isAdmin ? "bg-slate-950 border-slate-800" : "bg-card border-border"
    )}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
              isActive(link.href)
                ? (isAdmin ? "text-primary" : "text-primary")
                : (isAdmin ? "text-slate-400" : "text-muted-foreground")
            )}
          >
            <link.icon className={cn("w-5 h-5", isActive(link.href) && (isAdmin ? "fill-primary/10" : "fill-primary/10"))} />
            <span className="text-[10px] font-medium">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
