import { Mail, Phone, MapPin } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

export function TrustBar() {
  return (
    <div className="bg-trust-bar text-trust-bar-foreground py-2 text-sm">
      <div className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
        <span className="font-semibold">{BUSINESS_INFO.name}</span>
        <span className="hidden sm:inline text-trust-bar-foreground/40">•</span>
        <span className="hidden sm:flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {BUSINESS_INFO.shortAddress}
        </span>
        <span className="hidden md:inline text-trust-bar-foreground/40">•</span>
        <a 
          href={`mailto:${BUSINESS_INFO.email}`} 
          className="hidden md:flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
          {BUSINESS_INFO.email}
        </a>
        <span className="hidden lg:inline text-trust-bar-foreground/40">•</span>
        <a 
          href={`tel:${BUSINESS_INFO.phone}`} 
          className="hidden lg:flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
          {BUSINESS_INFO.phone}
        </a>
      </div>
    </div>
  );
}
