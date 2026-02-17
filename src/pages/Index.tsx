import TopBar from "@/components/landing/TopBar";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AccountTypes from "@/components/landing/AccountTypes";
import TrustSecurity from "@/components/landing/TrustSecurity";
import Features from "@/components/landing/Features";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Testimonials from "@/components/landing/Testimonials";
import MobileApp from "@/components/landing/MobileApp";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <TopBar />
    <Navbar />
    <HeroSection />
    <AccountTypes />
    <TrustSecurity />
    <Features />
    <WhyChooseUs />
    <Testimonials />
    <MobileApp />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
