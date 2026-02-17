import { Bell, BarChart3, CalendarCheck, Globe, TrendingUp, CreditCard } from "lucide-react";

const features = [
  { icon: Bell, title: "Real-Time Notifications", desc: "Get instant alerts for every transaction and account change." },
  { icon: BarChart3, title: "Budget Tracking Tools", desc: "Visualize spending habits and set budgets effortlessly." },
  { icon: CalendarCheck, title: "Automated Bill Payments", desc: "Never miss a payment with scheduled auto-pay." },
  { icon: Globe, title: "International Transfers", desc: "Send money worldwide with competitive exchange rates." },
  { icon: TrendingUp, title: "Smart Insights", desc: "AI-powered spending reports to help you save more." },
  { icon: CreditCard, title: "Virtual Cards", desc: "Create virtual cards for secure online purchases." },
];

const Features = () => (
  <section className="section-padding bg-card">
    <div className="container-bank">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
        Smart Features for Modern Banking
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Everything you need to manage your finances, all in one place.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-banking p-6 hover-lift">
            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
