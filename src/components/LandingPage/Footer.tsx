import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import footerLogoImage from "../../assets/images/logo.png";


const ABOUT_LINKS = [
  { label: "About", href: "#empowerment" },
  { label: "Mission", href: "#empowerment" },
  { label: "Programs", href: "#programs" },
];

const INVOLVED_LINKS = [
  { label: "Join Elevate Heart", href: "#programs" },
  { label: "Explore Programs", href: "#programs" },
  { label: "Contact", href: "#contact" },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Community Guidelines"];

export function Footer() {
  return (
    <footer className="w-full bg-[#00382b] text-on-primary py-16 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-white rounded-2xl p-3 w-fit backdrop-blur-sm">
              <Image
                src={footerLogoImage}
                alt="Elevate Heart Foundation logo"
                width={140}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="font-sans text-sm font-semibold text-aqua-brand">
              Elevating Minds. Empowering Lives.
            </p>
            <p className="font-sans text-sm text-surface-container-highest max-w-sm leading-7">
              A disciplined community foundation championing education, vocational
              skills, youth empowerment, women support, and structured mutual
              savings.
            </p>
            <p className="font-sans text-xs text-surface-dim mt-2">
              © 2026 Elevate Heart Foundation. All rights reserved.
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="font-sans text-xs uppercase tracking-widest text-aqua-brand font-bold">
              About
            </span>
            <div className="flex flex-col gap-2.5 font-sans text-sm text-surface-container-highest">
              {ABOUT_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-aqua-brand transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-sans text-xs uppercase tracking-widest text-aqua-brand font-bold">
              Get Involved
            </span>
            <div className="flex flex-col gap-2.5 font-sans text-sm text-surface-container-highest">
              {INVOLVED_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-aqua-brand transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-sans text-xs uppercase tracking-widest text-aqua-brand font-bold">
              Connect
            </span>
            <div className="flex flex-col gap-2.5 font-sans text-sm text-surface-container-highest">
              <a href="mailto:hello@elevateheartfoundation.org" className="hover:text-aqua-brand transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4 text-aqua-brand" />
                hello@elevateheartfoundation.org
              </a>
              <a href="tel:+2348000000000" className="hover:text-aqua-brand transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4 text-aqua-brand" />
                +234 800 000 0000
              </a>
            </div>
            <div className="pt-2">
              <SocialLinks variant="dark" />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-surface-dim font-sans text-xs">
          <p>
            © 2026 Elevate Heart Foundation. All Rights Reserved. Empowering lives
            through disciplined community programs.
          </p>
          <div className="flex items-center gap-6 font-medium">
            {LEGAL_LINKS.map((label) => (
              <a key={label} href="#" className="hover:text-aqua-brand transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}