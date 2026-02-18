import { CreditCard, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  {
    title: "Liberty Platinum Visa",
    desc: "Premium benefits for those who want more from their credit card.",
    features: ["2% Cashback on all purchases", "No annual fee", "Travel insurance included", "Low APR"],
    color: "bg-slate-900",
    textColor: "text-white"
  },
  {
    title: "Rewards Mastercard",
    desc: "Earn points for every dollar spent and redeem for travel or gift cards.",
    features: ["3x points on dining & travel", "Contactless payments", "Mobile wallet integration", "Fraud protection"],
    color: "bg-primary",
    textColor: "text-primary-foreground"
  }
];

const Cards = () => (
  <section id="cards" className="section-padding bg-primary-light">
    <div className="container-bank">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Cards Designed for Your Lifestyle
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose from our range of credit and debit cards with industry-leading security and rewards.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {cards.map((card) => (
          <div key={card.title} className={`${card.color} ${card.textColor} rounded-3xl p-8 shadow-xl hover-lift relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <CreditCard className="w-24 h-24" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-2">{card.title}</h3>
            <p className="opacity-80 mb-6 text-sm">{card.desc}</p>
            <ul className="space-y-3 mb-8">
              {card.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant={card.color === "bg-primary" ? "secondary" : "default"} className="w-full">
              Apply Now
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
        <div className="p-6">
          <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
          <h4 className="font-bold mb-2">Secure by Design</h4>
          <p className="text-sm text-muted-foreground">Advanced encryption and fraud monitoring for every transaction.</p>
        </div>
        <div className="p-6">
          <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
          <h4 className="font-bold mb-2">Instant Issuance</h4>
          <p className="text-sm text-muted-foreground">Get a virtual card immediately after approval to start shopping.</p>
        </div>
        <div className="p-6">
          <CreditCard className="w-10 h-10 text-primary mx-auto mb-4" />
          <h4 className="font-bold mb-2">Global Acceptance</h4>
          <p className="text-sm text-muted-foreground">Accepted at millions of locations worldwide and online.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Cards;
