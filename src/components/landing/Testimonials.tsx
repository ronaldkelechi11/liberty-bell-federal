import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Switching was seamless. I manage everything from my phone now.",
    name: "Sarah M.",
    location: "Austin, TX",
  },
  {
    quote: "The savings tools helped me put away $5,000 in six months without thinking about it.",
    name: "James K.",
    location: "Denver, CO",
  },
  {
    quote: "Best customer support I've ever experienced from a bank. Real humans, every time.",
    name: "Priya R.",
    location: "New York, NY",
  },
];

const Testimonials = () => (
  <section className="section-padding bg-card">
    <div className="container-bank">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
        What Our Customers Say
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="card-banking p-8 hover-lift">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground mb-6 leading-relaxed">"{t.quote}"</p>
            <div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
