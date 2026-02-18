import TopBar from "@/components/landing/TopBar";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AccountTypes from "@/components/landing/AccountTypes";
import TrustSecurity from "@/components/landing/TrustSecurity";
import Features from "@/components/landing/Features";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Testimonials from "@/components/landing/Testimonials";
import MobileApp from "@/components/landing/MobileApp";
import Cards from "@/components/landing/Cards";
import Loans from "@/components/landing/Loans";
import Investments from "@/components/landing/Investments";
import AboutUsSection from "@/components/landing/AboutUsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import AnimatedSection from "@/components/landing/AnimatedSection";

const Index = () => (
  <div className="min-h-screen">
    <TopBar />
    <Navbar />
    <HeroSection />
    <AnimatedSection id="personal">
      <AccountTypes />
    </AnimatedSection>
    <AnimatedSection id="loans">
      <Loans />
    </AnimatedSection>
    <AnimatedSection id="cards">
      <Cards />
    </AnimatedSection>
    <AnimatedSection id="investments">
      <Investments />
    </AnimatedSection>
    <AnimatedSection id="business">
      <TrustSecurity />
    </AnimatedSection>
    <AnimatedSection id="support">
      <Features />
    </AnimatedSection>
    <AnimatedSection>
      <WhyChooseUs />
    </AnimatedSection>
    <AnimatedSection>
      <Testimonials />
    </AnimatedSection>
    <AnimatedSection>
      <MobileApp />
    </AnimatedSection>
    <AnimatedSection>
      <AboutUsSection />
    </AnimatedSection>
    <AnimatedSection>
      <CTASection />
    </AnimatedSection>
    <Footer />
  </div>
);

export default Index;
