import { CreditCard, PiggyBank, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const accounts = [
  {
    icon: CreditCard,
    title: "Checking Account",
    features: [
      "No monthly maintenance fee",
      "Free debit card",
      "Early direct deposit",
      "Mobile check deposit",
    ],
    cta: "Create Account",
  },
  {
    icon: PiggyBank,
    title: "Savings Account",
    features: [
      "High yield APY",
      "Automated savings tools",
      "No minimum balance",
      "Interest compounded daily",
    ],
    cta: "Start Saving",
  },
  {
    icon: Crown,
    title: "Current Account",
    badge: "Premium",
    features: [
      "Higher transaction limits",
      "Dedicated relationship manager",
      "Free wire transfers",
      "Business features included",
    ],
    cta: "Open Premium",
  },
];

const AccountTypes = () => (
  <section className="section-padding bg-card">
    <div className="container-bank">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
        Accounts Built Around Your Life
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        From everyday spending to long-term savings, find the account that fits your goals.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.title} className="card-banking-accent p-8 hover-lift flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                <account.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold">{account.title}</h3>
                {account.badge && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    {account.badge}
                  </span>
                )}
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {account.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full">
              <Link to={'/register'}>
                {account.cta}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AccountTypes;
