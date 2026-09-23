import Image from "next/image";
import { Phone } from "lucide-react";
import footerLogoImage from "../../assets/images/logo.png";

export function AuthHeader() {
  return (
    <header className="w-full bg-surface-container-lowest border-b border-surface-container sticky top-0 z-50">
      <div className="max-w-5xl mx-auto h-20 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={footerLogoImage}
            alt="Elevate Heart Foundation logo"
            width={140}
            height={48}
            className="h-11 md:h-12 w-auto object-contain"
            preload
          />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          <span className="font-body text-sm md:text-base text-on-surface-variant">
            Need help? Call{" "}
            <a className="font-bold text-primary hover:underline" href="tel:+2348000000000">
              +234 800 000 0000
            </a>
          </span>
        </div>
      </div>
    </header>
  );
}