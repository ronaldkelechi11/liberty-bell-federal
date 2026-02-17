import TopBar from "@/components/landing/TopBar";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AnimatedSection from "@/components/landing/AnimatedSection";
import { Shield, Users, TrendingUp, Award, Heart, Globe } from "lucide-react";

const values = [
  { icon: Shield, title: "Trust & Integrity", desc: "We operate with full transparency and hold ourselves to the highest ethical standards." },
  { icon: Heart, title: "Customer First", desc: "Every decision we make starts with how it benefits the people we serve." },
  { icon: TrendingUp, title: "Innovation", desc: "We embrace technology to deliver smarter, faster, and more secure banking." },
  { icon: Globe, title: "Community", desc: "We invest in the communities that make America strong." },
];

const milestones = [
  { year: "1987", event: "Founded in Philadelphia as a community credit union." },
  { year: "1995", event: "Received federal charter and became Liberty Bell Federal Bank." },
  { year: "2005", event: "Launched online banking platform for all customers." },
  { year: "2015", event: "Surpassed $500M in managed assets." },
  { year: "2020", event: "Released the Liberty Bell mobile app." },
  { year: "2024", event: "Reached 250,000+ customers nationwide." },
];

const leadership = [
  { name: "Margaret Ellis", role: "CEO & Chairwoman", desc: "30+ years in banking & fintech leadership." },
  { name: "David Chen", role: "Chief Technology Officer", desc: "Former VP of Engineering at a top-10 US bank." },
  { name: "Angela Torres", role: "Chief Risk Officer", desc: "Expert in regulatory compliance and fraud prevention." },
];

const About = () => (
  <div className="min-h-screen">
    <TopBar />
    <Navbar />

    {/* Hero */}
    <section className="relative pt-32 pb-20 bg-primary-light overflow-hidden">
      <div className="container-bank px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 animate-fade-in">
          About Liberty Bell
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "150ms" }}>
          Since 1987, we've been building a bank that puts people first — combining the trust of
          traditional banking with the innovation of modern fintech.
        </p>
      </div>
    </section>

    {/* Mission */}
    <AnimatedSection>
      <section className="section-padding bg-card">
        <div className="container-bank px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To empower every American with accessible, transparent, and secure financial tools
              that help them build wealth and achieve their goals.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe banking should be simple, fair, and available to everyone — regardless of
              background or balance size.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card-banking p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold">250K+</div>
              <div className="text-sm text-muted-foreground">Customers</div>
            </div>
            <div className="card-banking p-6 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold">$1.2B+</div>
              <div className="text-sm text-muted-foreground">Assets</div>
            </div>
            <div className="card-banking p-6 text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold">37 yrs</div>
              <div className="text-sm text-muted-foreground">In Service</div>
            </div>
            <div className="card-banking p-6 text-center">
              <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-heading font-bold">50</div>
              <div className="text-sm text-muted-foreground">States Served</div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>

    {/* Values */}
    <AnimatedSection>
      <section className="section-padding bg-primary-light">
        <div className="container-bank px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-banking p-6 text-center hover-lift">
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
    </AnimatedSection>

    {/* Timeline */}
    <AnimatedSection>
      <section className="section-padding bg-card">
        <div className="container-bank px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-2xl mx-auto space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-4 items-start group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mt-1.5" />
                  {i < milestones.length - 1 && <div className="w-0.5 h-full min-h-[3rem] bg-border" />}
                </div>
                <div className="pb-8">
                  <span className="text-sm font-bold text-primary">{m.year}</span>
                  <p className="text-muted-foreground">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>

    {/* Leadership */}
    <AnimatedSection>
      <section className="section-padding bg-primary-light">
        <div className="container-bank px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Leadership</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {leadership.map((l) => (
              <div key={l.name} className="card-banking p-8 text-center hover-lift">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-heading font-bold text-primary">
                    {l.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg">{l.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{l.role}</p>
                <p className="text-sm text-muted-foreground">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>

    <Footer />
  </div>
);

export default About;
