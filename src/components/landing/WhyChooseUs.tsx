import { DollarSign, HeartHandshake, Cloud, Users, Landmark, Activity } from "lucide-react";

const reasons = [
  { icon: DollarSign, title: "Transparent Fees", desc: "No surprises. Ever." },
  { icon: HeartHandshake, title: "Human Support", desc: "Real people. 24/7." },
  { icon: Cloud, title: "Modern Technology", desc: "Built on secure cloud infrastructure." },
];

const stats = [
  { icon: Users, value: "250,000+", label: "Customers" },
  { icon: Landmark, value: "$1.2B+", label: "Assets Managed" },
  { icon: Activity, value: "99.99%", label: "Platform Uptime" },
];

const WhyChooseUs = () => (
  <section className="section-padding bg-primary-light">
    <div className="container-bank">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
        A Better Way to Bank
      </h2>
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {reasons.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">{title}</h3>
            <p className="text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-xl border border-border p-8">
        <div className="grid grid-cols-3 divide-x divide-border">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center px-4 animate-count-up">
              <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-heading font-bold text-foreground">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
