import { Shield, Smartphone, Eye, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const highlights = [
  { icon: Shield, text: "FDIC Insured up to $250,000" },
  { icon: Smartphone, text: "24/7 Online & Mobile Access" },
  { icon: Eye, text: "No Hidden Fees" },
  { icon: Zap, text: "Instant Transfers" },
];

const HeroSection = () => (
  <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div
      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1550565118-3d1428df7305?q=80&w=2070&auto=format&fit=crop")',
      }}
    >
      <div className="absolute inset-0 bg-background/80 md:bg-background/60 backdrop-blur-[2px]" />
    </div>

    <div className="container-bank px-4 md:px-8 relative z-10 py-20">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-8 border border-primary/20"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          NEW: Premium Savings Account at 4.50% APY
        </motion.div>

        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.2
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[1.1] mb-8"
        >
          The Future of <br />
          <span className="text-primary italic">Personal Banking</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
        >
          Experience a bank that works as hard as you do. Secure, intuitive, and built for your financial growth. Join over 2 million Americans who trust Liberty Bell.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {highlights.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-card/50 backdrop-blur-md p-3 pr-6 rounded-2xl border border-border shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm">{text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5
          }}
          className="flex flex-wrap gap-4"
        >
          <Button size="xl" className="btn-glow group px-10 h-16 rounded-2xl text-lg" asChild>
            <Link to="/register">
              Open an Account
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
          <Button size="xl" variant="outline" className="px-10 h-16 rounded-2xl text-lg backdrop-blur-md" asChild>
            <Link to="/#investments">
              Learn More
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>

    {/* Decorative bouncy elements */}
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute bottom-20 right-[10%] hidden lg:block"
    >
      <div className="bg-card p-6 rounded-[2.5rem] shadow-2xl border border-border flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-600">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Instant Deposit</div>
          <div className="text-xl font-bold">+$2,500.00</div>
        </div>
      </div>
    </motion.div>

    <motion.div
      animate={{
        y: [0, 20, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
      className="absolute top-40 left-[5%] hidden lg:block"
    >
      <div className="bg-card p-6 rounded-[2.5rem] shadow-2xl border border-border flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-600">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Bank Grade Security</div>
          <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
