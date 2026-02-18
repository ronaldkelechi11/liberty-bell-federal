import { Shield, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground/70">
    <div className="container-bank section-padding">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">LB</span>
            </div>
            <span className="font-heading text-lg font-bold text-primary-foreground">Liberty Bell</span>
          </div>
          <p className="text-sm leading-relaxed">
            Liberty Bell Federal Bank — banking that grows with you. Member FDIC.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground mb-3 text-sm">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Checking</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Savings</Link></li>
            <li><Link to="/#cards" className="hover:text-primary transition-colors">Credit Cards</Link></li>
            <li><Link to="/#loans" className="hover:text-primary transition-colors">Loans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Press</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Accessibility</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-8">
        <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" /> Member FDIC
          </span>
          <span className="flex items-center gap-1">
            <Home className="w-3 h-3" /> Equal Housing Lender
          </span>
          <span>NMLS #123456</span>
        </div>
        <p className="text-xs leading-relaxed">
          Liberty Bell Federal Bank is a fictitious bank created for demonstration purposes. 
          Deposits are insured by the FDIC up to $250,000 per depositor, per insured bank. 
          Equal Housing Lender. © {new Date().getFullYear()} Liberty Bell Federal Bank. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
