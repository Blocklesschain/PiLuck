"use client";

import Link from "next/link";
import SiteLogo from "./SiteLogo";

const footerLinks = {
  about: [
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Features", href: "/features" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "FAQ", href: "/faq" },
  ],
  resources: [
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Documentation", href: "/docs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
  community: [
    { label: "Telegram", href: "#" },
    { label: "X (Twitter)", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export default function Footer() {
  const renderLinks = (
    links: typeof footerLinks.about,
    activeSet: string[]
  ) =>
    links.map((link) => {
      const isActive = activeSet.includes(link.href);
      return (
        <li key={link.label}>
          <Link
            href={link.href}
            className={`text-sm transition-colors ${
              isActive
                ? "text-white font-semibold"
                : "text-white/50 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        </li>
      );
    });

  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0b]">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <SiteLogo className="mb-4" />
            <p className="text-sm text-white/50 leading-relaxed">
              The Community Luck Platform for Pioneers. One base ticket per wallet,
              plus free streak credits. Equal Opportunity.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {renderLinks(footerLinks.about, [
                "/about",
                "/how-it-works",
                "/features",
                "/roadmap",
                "/faq",
              ])}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {renderLinks(footerLinks.resources, ["/whitepaper", "/docs"])}
            </ul>
          </div>

          {/* Legal & Community */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {renderLinks(footerLinks.legal, ["/privacy", "/terms"])}
            </ul>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} PiLuck Labs. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Built for the Pi Network community.
          </p>
        </div>
      </div>
    </footer>
  );
}
