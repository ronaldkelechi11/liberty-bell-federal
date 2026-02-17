import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="section-padding bg-primary">
    <div className="container-bank text-center">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
        Ready to Experience Smarter Banking?
      </h2>
      <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
        Join over 250,000 Americans who trust Liberty Bell Federal Bank with their financial future.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          size="lg"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          Open Your Account Today
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
        >
          Speak to an Advisor
        </Button>
      </div>
    </div>
  </section>
);

export default CTASection;
