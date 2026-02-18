import TopBar from "@/components/landing/TopBar";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AnimatedSection from "@/components/landing/AnimatedSection";
import { Shield, Users, TrendingUp, Award, Heart, Globe, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  { icon: Shield, title: "Trust & Integrity", desc: "We operate with full transparency and hold ourselves to the highest ethical standards." },
  { icon: Heart, title: "Customer First", desc: "Every decision we make starts with how it benefits the people we serve." },
  { icon: Lightbulb, title: "Innovation", desc: "We embrace technology to deliver smarter, faster, and more secure banking." },
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
    <section className="relative pt-32 pb-24 bg-primary-light overflow-hidden">
      <div className="container-bank px-4 md:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <span>Established 1987</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 animate-fade-in">
          Banking Built on <span className="text-primary">Liberty</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: "150ms" }}>
          We're building a bank that puts people first — combining the trust of
          traditional banking with the innovation of modern fintech.
        </p>
      </div>
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
    </section>

    {/* Mission & Vision */}
    <AnimatedSection>
      <section className="section-padding bg-card">
        <div className="container-bank px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              To empower every American with accessible, transparent, and secure financial tools
              that help them build wealth and achieve their goals.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              We believe banking should be simple, fair, and available to everyone — regardless of
              background or balance size.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-primary-light border border-border">
                <div className="text-2xl font-heading font-bold text-primary">250K+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Customers</div>
              </div>
              <div className="p-4 rounded-2xl bg-primary-light border border-border">
                <div className="text-2xl font-heading font-bold text-primary">$1.2B+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Assets</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-primary/5 flex items-center justify-center p-8 border border-primary/10">
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center hover-lift">
                  <Users className="w-10 h-10 text-primary mb-3" />
                  <span className="font-bold text-sm">People Centric</span>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center hover-lift mt-8">
                  <Shield className="w-10 h-10 text-primary mb-3" />
                  <span className="font-bold text-sm">Secure Banking</span>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center hover-lift -mt-8">
                  <Award className="w-10 h-10 text-primary mb-3" />
                  <span className="font-bold text-sm">Top Rated</span>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center hover-lift">
                  <Globe className="w-10 h-10 text-primary mb-3" />
                  <span className="font-bold text-sm">Community Led</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>

    {/* Values */}
    <AnimatedSection>
      <section className="section-padding bg-primary-light">
        <div className="container-bank px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card p-8 rounded-3xl border border-border hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>

    {/* Journey/Timeline */}
    <AnimatedSection>
      <section className="section-padding bg-card">
        <div className="container-bank px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">Our Journey</h2>
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full border-4 border-primary bg-card z-10" />
                    {i < milestones.length - 1 && <div className="w-0.5 h-full min-h-[5rem] bg-border group-hover:bg-primary/30 transition-colors" />}
                  </div>
                  <div className="pb-12 pt-0.5">
                    <span className="text-lg font-bold text-primary block mb-1">{m.year}</span>
                    <p className="text-muted-foreground text-lg">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>

    {/* Community Impact */}
    <AnimatedSection>
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-bank px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Community Impact</h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
                We believe in giving back to the communities we serve. Every year, we dedicate a portion of our profits and thousands of volunteer hours to local initiatives that make a difference.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl">10K+</div>
                  <p className="font-medium">Volunteer hours served annually</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl">$2M+</div>
                  <p className="font-medium">Donated to local nonprofits and schools</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl">500+</div>
                  <p className="font-medium">Small businesses supported with microloans</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8">
              <h3 className="text-2xl font-heading font-bold mb-4 italic">"Liberty Bell isn't just my bank, they're my partner in growing my bakery and supporting our local high school team."</h3>
              <p className="text-primary-foreground/60">— Maria Rodriguez, Owner of Sunshine Bakery</p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>

    {/* Leadership */}
    <AnimatedSection>
      <section className="section-padding bg-primary-light">
        <div className="container-bank px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((l) => (
              <div key={l.name} className="bg-card p-10 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                  <span className="text-2xl font-heading font-bold text-primary">
                    {l.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-1">{l.name}</h3>
                <p className="text-sm text-primary font-semibold mb-4 uppercase tracking-wider">{l.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>

    {/* Careers CTA */}
    <AnimatedSection>
      <section className="section-padding bg-card">
        <div className="container-bank px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto p-12 rounded-[3rem] bg-primary-light border border-primary/10">
            <h2 className="text-3xl font-heading font-bold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Want to help us redefine banking? We're always looking for passionate individuals to join our growing team.
            </p>
            <Button size="lg" className="rounded-full px-8">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>
    </AnimatedSection>

    <Footer />
  </div>
);

export default About;
