'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Github, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-hhgoa-bg/85 backdrop-blur-xl border-b border-hhgoa-border/70 shadow-lg py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex flex-col items-start leading-none">
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-2xl tracking-tighter text-hhgoa-yellow group-hover:scale-105 transition-transform duration-300">
                  2:47PM
                </span>
                <span className="font-serif italic font-bold text-xl text-hhgoa-light">
                  STUDIO
                </span>
                <span className="devanagari-badge text-xs px-2 py-0.5 ml-1">
                  गोवा
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-hhgoa-muted uppercase mt-0.5">
                HHGOA 2026 OFFICIAL
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium tracking-wide text-hhgoa-muted hover:text-hhgoa-yellow transition-colors"
            >
              Studio
            </button>
            <button
              onClick={() => scrollToSection('expedition')}
              className="text-sm font-medium tracking-wide text-hhgoa-muted hover:text-hhgoa-yellow transition-colors"
            >
              Choose Expedition
            </button>
            <button
              onClick={() => scrollToSection('generator')}
              className="text-sm font-medium tracking-wide text-hhgoa-muted hover:text-hhgoa-yellow transition-colors"
            >
              Builder Pass
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium tracking-wide text-hhgoa-muted hover:text-hhgoa-yellow transition-colors"
            >
              Craftsmanship
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium tracking-wide text-hhgoa-muted hover:text-hhgoa-yellow transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-hhgoa-card/70 border border-hhgoa-border text-hhgoa-muted hover:text-hhgoa-yellow hover:border-hhgoa-yellow transition-all"
              aria-label="Theme Toggle"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-hhgoa-card/70 border border-hhgoa-border text-hhgoa-muted hover:text-white hover:border-hhgoa-yellow transition-all"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Handcrafted Woven Pattern Button */}
            <button
              onClick={() => scrollToSection('generator')}
              className="hhgoa-woven-btn text-sm cursor-pointer"
            >
              Claim Builder Pass
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-hhgoa-card border border-hhgoa-border text-hhgoa-muted"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-hhgoa-bg/95 backdrop-blur-2xl border-b border-hhgoa-border px-4 py-6 space-y-4"
          >
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left py-2 text-hhgoa-muted hover:text-hhgoa-yellow font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('generator')}
              className="block w-full text-left py-2 text-hhgoa-muted hover:text-hhgoa-yellow font-medium"
            >
              Builder Pass (Solo)
            </button>
            <button
              onClick={() => scrollToSection('generator')}
              className="block w-full text-left py-2 text-hhgoa-muted hover:text-hhgoa-yellow font-medium"
            >
              Expedition Pass (Team)
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left py-2 text-hhgoa-muted hover:text-hhgoa-yellow font-medium"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left py-2 text-hhgoa-muted hover:text-hhgoa-yellow font-medium"
            >
              FAQ
            </button>

            <div className="pt-4 border-t border-hhgoa-border flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('generator')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-hhgoa-yellow to-hhgoa-gold text-hhgoa-dark font-heading font-bold text-center shadow-expedition-yellow"
              >
                Generate Pass
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
