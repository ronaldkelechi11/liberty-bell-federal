import { Shield, Lock, Eye, Fingerprint } from "lucide-react";

const items = [
  { icon: Shield, title: "Bank-Grade Encryption", desc: "256-bit AES encryption protects every transaction." },
  { icon: Lock, title: "Multi-Factor Authentication", desc: "Extra layers of security for every login." },
  { icon: Eye, title: "Fraud Monitoring 24/7", desc: "AI-powered systems watch for suspicious activity." },
  { icon: Fingerprint, title: "Biometric Login", desc: "Use Face ID or fingerprint for instant secure access." },
];

const TrustSecurity = () => (
  <section className="section-padding bg-primary-light">
    <div className="container-bank text-center">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
        <Lock className="w-4 h-4 animate-pulse-secure" />
        Your Security Is Our Priority
      </div>
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
        Your Money. Fully Protected.
      </h2>
      <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
        We invest in cutting-edge security so you can bank with confidence.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-banking p-6 hover-lift text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSecurity;
