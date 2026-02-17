import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  "Personal Banking",
  "Business Banking",
  "Loans",
  "Credit Cards",
  "Investments",
  "About Us",
  "Support",
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container-bank flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-lg">LB</span>
          </div>
          <span className="font-heading text-xl font-bold text-foreground tracking-tight">
            Liberty Bell
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm">
            Login
          </Button>
          <Button size="sm" className="btn-glow">
            Open Account
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-card px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="block py-2 text-sm text-muted-foreground hover:text-primary"
            >
              {link}
            </a>
          ))}
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" className="flex-1">Login</Button>
            <Button size="sm" className="flex-1">Open Account</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
