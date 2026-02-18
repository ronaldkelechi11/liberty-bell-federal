import { Shield, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutUsSection = () => (
  <section id="about-section" className="section-padding bg-card overflow-hidden">
    <div className="container-bank">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-primary/5 rounded-3xl p-6 h-48 flex flex-col justify-end hover-lift transition-all">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold text-lg">Trusted Since 1987</h4>
              </div>
              <div className="bg-foreground rounded-3xl p-6 h-64 flex flex-col justify-end text-white hover-lift transition-all">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold text-xl">250,000+ Customers</h4>
                <p className="text-white/60 text-sm mt-2">Serving individuals and businesses nationwide.</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-primary rounded-3xl p-6 h-64 flex flex-col justify-end text-white hover-lift transition-all">
                <Award className="w-8 h-8 text-white mb-4" />
                <h4 className="font-bold text-xl">Award Winning</h4>
                <p className="text-white/80 text-sm mt-2">Ranked #1 for customer service in 2023.</p>
              </div>
              <div className="bg-primary/10 rounded-3xl p-6 h-48 flex flex-col justify-end hover-lift transition-all border border-primary/20">
                <h4 className="font-bold text-lg text-primary">Member FDIC</h4>
                <p className="text-muted-foreground text-sm">Your deposits are protected.</p>
              </div>
            </div>
          </div>

          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span>Our Story</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            Banking That Puts People First
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Founded on the principles of trust, integrity, and community, Liberty Bell has grown from a local credit union to a nationwide financial partner. We combine the security of traditional banking with the convenience of modern technology.
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-medium">Transparent fees and competitive rates</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-medium">24/7 dedicated customer support</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-medium">Community-focused investment initiatives</p>
            </div>
          </div>

          <Button size="lg" className="group" asChild>
            <Link to="/about">
              Learn More About Us
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default AboutUsSection;
