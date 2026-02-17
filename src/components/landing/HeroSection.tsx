import { Shield, Smartphone, Eye, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const highlights = [
  { icon: Shield, text: "FDIC Insured up to $250,000" },
  { icon: Smartphone, text: "24/7 Online & Mobile Access" },
  { icon: Eye, text: "No Hidden Fees" },
  { icon: Zap, text: "Instant Transfers" },
];

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img
        src={heroDashboard}
        alt="Liberty Bell Federal Bank dashboard"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/40" />
    </div>

    {/* Content */}
    <div className="relative container-bank px-4 md:px-8 py-20">
      <div className="max-w-2xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
          Banking That Grows{" "}
          <span className="text-primary">With You</span>
        </h1>
        <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
          Secure. Simple. Designed for modern America.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {highlights.map(({ icon: Icon, text }, i) => (
            <div
              key={text}
              className="flex items-center gap-2 text-sm text-primary-foreground/90 opacity-0 animate-fade-in"
              style={{ animationDelay: `${200 + i * 100}ms`, animationFillMode: "forwards" }}
            >
              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="btn-glow">
            Open an Account
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            Compare Accounts
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
