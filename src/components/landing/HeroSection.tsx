import { Shield, Smartphone, Eye, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const highlights = [
  { icon: Shield, text: "FDIC Insured up to $250,000" },
  { icon: Smartphone, text: "24/7 Online & Mobile Access" },
  { icon: Eye, text: "No Hidden Fees" },
  { icon: Zap, text: "Instant Transfers" },
];

const HeroSection = () => (
  <section className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-background">
    {/* Decorative background elements */}
    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

    <div className="container-bank px-4 md:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            NEW: Premium Savings Account at 4.50% APY
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.1] mb-6">
            The Future of <br />
            <span className="text-primary italic">Personal Banking</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
            Experience a bank that works as hard as you do. Secure, intuitive, and built for your financial growth. Join over 2 million Americans who trust Liberty Bell.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {highlights.map(({ icon: Icon, text }, i) => (
              <div
                key={text}
                className="flex items-center gap-3 text-foreground/80"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm">{text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="xl" className="btn-glow group" asChild>
              <Link to="/register">
                Open an Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="px-8 shadow-sm"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative lg:block">
          <div className="relative z-10 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-[2rem] p-4 backdrop-blur-sm border border-primary/10">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop"
                alt="Liberty Bell Digital Banking"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[4/3]"
              />
            </div>

            {/* Floating Card UI Elements */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border animate-bounce-slow max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Transfer Success</div>
              </div>
              <div className="text-lg font-bold">+$1,240.00</div>
            </div>

            <div className="absolute -top-6 -right-6 bg-card p-4 rounded-2xl shadow-xl border border-border animate-float max-w-[180px]">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Secure Encryption</div>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-primary" />
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
