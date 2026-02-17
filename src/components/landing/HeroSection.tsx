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
  <section className="section-padding bg-primary-light">
    <div className="container-bank grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
          Banking That Grows{" "}
          <span className="text-primary">With You</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
          Secure. Simple. Designed for modern America.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {highlights.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-foreground">
              <Icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="btn-glow">
            Open an Account
          </Button>
          <Button size="lg" variant="outline">
            Compare Accounts
          </Button>
        </div>
      </div>
      <div className="relative flex justify-center">
        <div className="animate-float">
          <img
            src={heroDashboard}
            alt="Liberty Bell Federal Bank dashboard showing savings growth and account balance"
            className="rounded-xl shadow-2xl w-full max-w-lg"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
