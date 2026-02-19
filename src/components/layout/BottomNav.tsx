import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Send,
  CreditCard,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();

  const links = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "Wallet", href: "/dashboard/accounts", icon: Wallet },
    { name: "Send", href: "/dashboard/transfers", icon: Send },
    { name: "Cards", href: "/dashboard/cards", icon: CreditCard },
    { name: "Invest", href: "/dashboard/investments", icon: TrendingUp },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
              isActive(link.href)
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <link.icon className={cn("w-6 h-6", isActive(link.href) && "fill-primary/10")} />
            <span className="text-[10px] font-medium">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
