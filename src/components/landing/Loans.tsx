import { Home, Car, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const loans = [
  {
    icon: User,
    title: "Personal Loans",
    desc: "Fixed rates and flexible terms for whatever you need.",
    rate: "Starting at 5.99% APR",
    benefits: ["No origination fees", "Fast funding", "Autopay discounts"]
  },
  {
    icon: Home,
    title: "Mortgages",
    desc: "Find your dream home with a mortgage that fits your budget.",
    rate: "Competitive Market Rates",
    benefits: ["Low down payment options", "Expert guidance", "Fast pre-approval"]
  },
  {
    icon: Car,
    title: "Auto Loans",
    desc: "Get on the road faster with our quick approval process.",
    rate: "Starting at 3.49% APR",
    benefits: ["New and used vehicles", "Refinancing options", "Flexible terms"]
  }
];

const Loans = () => (
  <section id="loans" className="section-padding bg-card">
    <div className="container-bank">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Financial Support When You Need It
          </h2>
          <p className="text-muted-foreground">
            We offer a variety of loan options with competitive rates and transparent terms to help you achieve your goals.
          </p>
        </div>
        <Button variant="outline" className="group">
          View All Loan Products
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {loans.map((loan) => (
          <div key={loan.title} className="card-banking p-8 flex flex-col hover-lift">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <loan.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">{loan.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">{loan.desc}</p>
            <div className="mb-6">
              <span className="text-primary font-bold">{loan.rate}</span>
            </div>
            <ul className="space-y-2 mb-8">
              {loan.benefits.map((benefit) => (
                <li key={benefit} className="text-xs flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button className="w-full">Check My Rate</Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Loans;
