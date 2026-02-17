import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Personal Banking", href: "#" },
  { label: "Business Banking", href: "#" },
  { label: "Loans", href: "#" },
  { label: "Credit Cards", href: "#" },
  { label: "Investments", href: "#" },
  { label: "About Us", href: "/about" },
  { label: "Support", href: "#" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300 rounded-2xl ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border border-border"
          : "bg-card/60 backdrop-blur-sm border border-border/50 shadow-md"
      }`}
    >
      <div className="flex items-center justify-between py-3 px-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-sm">LB</span>
          </div>
          <span className="font-heading text-lg font-bold text-foreground tracking-tight">
            Liberty Bell
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button variant="outline" size="sm">Login</Button>
          <Button size="sm" className="btn-glow">Open Account</Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border px-5 pb-4 animate-fade-in">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="block py-2 text-sm text-muted-foreground hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 text-sm text-muted-foreground hover:text-primary"
              >
                {link.label}
              </a>
            )
          )}
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
