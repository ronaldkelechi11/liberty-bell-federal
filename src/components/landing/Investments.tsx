import { TrendingUp, PieChart, Landmark, Briefcase, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const investmentServices = [
  {
    icon: PieChart,
    title: "Wealth Management",
    desc: "Personalized investment strategies tailored to your long-term financial goals and risk tolerance."
  },
  {
    icon: Landmark,
    title: "Retirement Planning",
    desc: "Plan for a secure future with our IRA options, 401(k) rollovers, and expert retirement advice."
  },
  {
    icon: Briefcase,
    title: "Brokerage Services",
    desc: "Trade stocks, bonds, and ETFs with our intuitive platform and competitive commission rates."
  }
];

const Investments = () => (
  <section id="investments" className="section-padding bg-primary-light">
    <div className="container-bank">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Grow Your Wealth with Liberty Bell
          </h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Whether you're just starting to save or planning for retirement, our investment experts and tools are here to help you build a secure financial future.
          </p>

          <div className="space-y-6">
            {investmentServices.map((service) => (
              <div key={service.title} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg">Start Investing</Button>
            <Button size="lg" variant="outline">Schedule a Consultation</Button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-[2rem] p-1 overflow-hidden shadow-2xl">
            <div className="bg-card rounded-[1.9rem] p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="font-bold text-xl">Market Overview</h4>
                  <p className="text-xs text-muted-foreground">Updated 2 minutes ago</p>
                </div>
                <TrendingUp className="text-green-500 w-6 h-6" />
              </div>

              <div className="space-y-6">
                {[
                  { name: "S&P 500", value: "5,241.53", change: "+1.2%", up: true },
                  { name: "Nasdaq", value: "16,384.47", change: "+1.5%", up: true },
                  { name: "Dow Jones", value: "39,475.90", change: "-0.3%", up: false },
                  { name: "Bitcoin", value: "$67,432.10", change: "+4.2%", up: true }
                ].map((stock) => (
                  <div key={stock.name} className="flex items-center justify-between p-4 rounded-xl bg-primary-light border border-border/50">
                    <div>
                      <span className="block font-bold text-sm">{stock.name}</span>
                      <span className="text-xs text-muted-foreground">{stock.value}</span>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stock.up ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change}
                      <ArrowUpRight className={`w-3 h-3 ${!stock.up && 'rotate-90'}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-primary text-primary-foreground text-center">
                <p className="text-xs opacity-90 mb-1">Your Portfolio Balance</p>
                <h5 className="text-2xl font-bold">$42,560.84</h5>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  </section>
);

export default Investments;
