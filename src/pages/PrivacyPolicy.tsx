import TopBar from "@/components/landing/TopBar";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AnimatedSection from "@/components/landing/AnimatedSection";

const PrivacyPolicy = () => (
  <div className="min-h-screen">
    <TopBar />
    <Navbar />

    {/* Hero */}
    <section className="relative pt-32 pb-20 bg-primary-light overflow-hidden">
      <div className="container-bank px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 animate-fade-in">
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "150ms" }}>
          Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
        </p>
      </div>
    </section>

    <section className="section-padding bg-card">
      <div className="container-bank max-w-4xl px-4 md:px-8">
        <AnimatedSection>
          <div className="prose prose-slate max-w-none">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Liberty Bell Federal Bank, we collect personal information that you provide to us directly, such as when you open an account, apply for a loan, or contact our customer service team. This information may include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Name, address, and date of birth</li>
                <li>Social Security number and other government identifiers</li>
                <li>Financial history and employment information</li>
                <li>Contact information, including email and phone number</li>
                <li>Biometric data for security and authentication purposes</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to provide, maintain, and improve our services, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Processing transactions and maintaining your accounts</li>
                <li>Verifying your identity and preventing fraud</li>
                <li>Evaluating your eligibility for loans and other products</li>
                <li>Communicating with you about your account and our services</li>
                <li>Complying with legal and regulatory requirements</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">3. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Affiliates and subsidiaries for business purposes</li>
                <li>Service providers who perform functions on our behalf</li>
                <li>Credit bureaus and reporting agencies</li>
                <li>Government agencies and law enforcement as required by law</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">4. Your Privacy Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Reviewing and updating your account information</li>
                <li>Opting out of marketing communications</li>
                <li>Requesting a copy of the information we hold about you</li>
                <li>Closing your account and requesting data deletion (subject to legal requirements)</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">5. Security Measures</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. These measures include encryption, firewalls, secure data centers, and regular security audits. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">6. Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date at the bottom of this page.
              </p>
            </div>

            <p className="text-sm text-muted-foreground mt-12">
              Last Updated: May 22, 2024
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <Footer />
  </div>
);

export default PrivacyPolicy;
