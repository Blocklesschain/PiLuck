"use client";

import { Sparkles } from "lucide-react";

const footerLinks = {
  about: [
    { label: "About", href: "#about" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Whitepaper", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "mailto:hello@piLuck.io" },
  ],
  community: [
    { label: "Discord", href: "#" },
    { label: "Telegram", href: "#" },
    { label: "X (Twitter)", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Medium", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0f]">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pi-purple-500 to-pi-purple-700 flex items-center justify-center glow-purple">
                <Sparkles className="w-5 h-5 text-pi-gold-300" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Pi<span className="text-gradient">Luck</span>
              </span>
            </a>
            <p className="text-sm text-white/50 leading-relaxed">
              The Community Luck Platform for Pioneers. One Pi. One Ticket.
              Equal Opportunity.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
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

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
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

          {/* Community */}
          <div>
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
            © {new Date().getFullYear()} PiLuck. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Built for the Pi Network community.
          </p>
        </div>
      </div>
    </footer>
  );
}