'use client';

import React from 'react';
import { Compass, Heart, Twitter, Github, Linkedin, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-hhgoa-border/70 bg-hhgoa-bg/90 backdrop-blur-xl py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-start leading-none">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-2xl tracking-tighter text-hhgoa-yellow">
                    2:47PM
                  </span>
                  <span className="font-serif italic font-bold text-xl text-hhgoa-light">
                    STUDIO
                  </span>
                  <span className="devanagari-badge text-xs px-2 py-0.5 ml-1">
                    गोवा
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-hhgoa-muted uppercase mt-1">
                  OFFICIAL BUILDER STUDIO • HHGOA 2026
                </span>
                <span className="text-[11px] font-mono text-hhgoa-yellow font-semibold mt-1">
                  Built by Team CODENOVA • Samrudhi
                </span>
              </div>
            </div>
            <p className="text-hhgoa-muted text-sm max-w-sm font-sans">
              The official credential & identity studio for Hacker House Goa 2026. Handcrafted editorial credentials for builders, hackers, and expedition teams.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-hhgoa-card border border-hhgoa-border text-hhgoa-yellow">
                #FrameInGoa
              </span>
              <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-hhgoa-card border border-hhgoa-border text-hhgoa-light">
                HHGOA.COM
              </span>
              <span className="px-3 py-1 text-[11px] font-mono rounded-full bg-hhgoa-card border border-hhgoa-border text-hhgoa-muted flex items-center gap-1">
                <MapPin className="w-3 h-3 text-hhgoa-yellow" />
                15.2993° N, 74.1240° E
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono font-bold text-hhgoa-light text-xs tracking-wider uppercase mb-4 text-hhgoa-yellow">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-sm text-hhgoa-muted font-sans">
              <li>
                <a href="#hero" className="hover:text-hhgoa-yellow transition-colors">Studio Home</a>
              </li>
              <li>
                <a href="#generator" className="hover:text-hhgoa-yellow transition-colors">Solo Builder Pass</a>
              </li>
              <li>
                <a href="#generator" className="hover:text-hhgoa-yellow transition-colors">Expedition Team Pass</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-hhgoa-yellow transition-colors">Pass Gallery</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-hhgoa-yellow transition-colors">FAQ & Support</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono font-bold text-hhgoa-light text-xs tracking-wider uppercase mb-4 text-hhgoa-yellow">
              Expedition Community
            </h4>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-hhgoa-card border border-hhgoa-border flex items-center justify-center text-hhgoa-muted hover:text-hhgoa-yellow hover:border-hhgoa-yellow transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-hhgoa-card border border-hhgoa-border flex items-center justify-center text-hhgoa-muted hover:text-hhgoa-yellow hover:border-hhgoa-yellow transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-hhgoa-card border border-hhgoa-border flex items-center justify-center text-hhgoa-muted hover:text-hhgoa-yellow hover:border-hhgoa-yellow transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-hhgoa-muted font-mono">
              100% Client-Side Canvas Privacy. No server tracking.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-hhgoa-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-hhgoa-muted gap-4">
          <p className="font-mono">© 2026 HHGoa Builder Studio • Built by Team CODENOVA (Samrudhi)</p>
          <p className="flex items-center gap-1 font-mono">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline animate-pulse" /> by Team CODENOVA
          </p>
        </div>
      </div>
    </footer>
  );
};
