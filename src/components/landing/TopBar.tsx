import { Shield, Phone, Lock } from "lucide-react";

const TopBar = () => (
  <div className="bg-foreground text-primary-foreground py-2 px-4 text-xs">
    <div className="container-bank flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          FDIC Insured
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Secure Banking
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Phone className="w-3 h-3" />
        <span>1-800-LIBERTY</span>
      </div>
    </div>
  </div>
);

export default TopBar;
