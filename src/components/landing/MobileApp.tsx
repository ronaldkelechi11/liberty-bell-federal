import { Scan, Bell, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import mobileBanking from "@/assets/mobile-banking.jpg";

const features = [
  { icon: Scan, text: "Face ID Login" },
  { icon: Bell, text: "Instant Alerts" },
  { icon: CreditCard, text: "Card Controls" },
  { icon: Zap, text: "Transfer in Seconds" },
];

const MobileApp = () => (
  <section className="section-padding bg-primary-light">
    <div className="container-bank grid lg:grid-cols-2 gap-12 items-center">
      <div className="flex justify-center order-2 lg:order-1">
        <img
          src={mobileBanking}
          alt="Liberty Bell Federal Bank mobile app showing dashboard and transactions"
          className="rounded-2xl shadow-xl max-w-xs w-full animate-float"
        />
      </div>
      <div className="order-1 lg:order-2">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Bank Anywhere, Anytime
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Our mobile app puts the full power of Liberty Bell Federal Bank in your pocket.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm">
              <Icon className="w-4 h-4 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="btn-glow">
            App Store
          </Button>
          <Button size="lg" variant="outline">
            Google Play
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default MobileApp;
