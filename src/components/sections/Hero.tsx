'use client';

import React, { useState } from 'react';
import { Compass, ArrowRight, ShieldCheck, CheckCircle, Code, Award, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 16);
    setRotateY(x / 16);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExpedition = () => {
    document.getElementById('expedition')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative py-16 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Expedition Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-hhgoa-card/80 border border-hhgoa-border text-xs font-mono text-hhgoa-yellow shadow-sm">
              <Compass className="w-4 h-4 text-hhgoa-yellow animate-spin-slow" />
              <span>HACKER HOUSE GOA 2026 • 28 - 31 OCT</span>
            </div>

            {/* Headline with Cormorant Garamond Serif */}
            <div className="relative">
              <h1 className="font-serif text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05] text-hhgoa-light">
                Every Expedition <br />
                <span className="editorial-gradient-text">Begins With An Identity.</span>
              </h1>
              <span className="devanagari-badge text-base sm:text-xl px-4 py-1 absolute -top-4 right-4 sm:right-12">
                गोवा
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-hhgoa-muted text-lg sm:text-2xl max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Create your official Builder Pass for Hacker House Goa 2026. Handcrafted editorial credentials for builders, hackers, and explorers.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-3">
              <button
                onClick={scrollToExpedition}
                className="hhgoa-woven-btn text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer py-3.5 px-8"
              >
                Choose Your Expedition
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToGenerator}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-hhgoa-card/80 border border-hhgoa-border text-hhgoa-light font-heading font-semibold text-base hover:border-hhgoa-yellow hover:bg-hhgoa-card transition-all flex items-center justify-center gap-2"
              >
                Go To Studio Form
              </button>
            </div>

            {/* Highlight Strip */}
            <div className="pt-6 border-t border-hhgoa-border/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-hhgoa-muted">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-hhgoa-yellow" />
                <span>Solo & Team Pass</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Award className="w-4 h-4 text-hhgoa-gold" />
                <span>Verified Expedition Badge</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Code className="w-4 h-4 text-hhgoa-yellow" />
                <span>Searchable Tech Chips</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <MapPin className="w-4 h-4 text-hhgoa-gold" />
                <span>#FrameInGoa</span>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Empty Pass Template Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="w-full max-w-md bg-gradient-to-b from-hhgoa-card/95 to-hhgoa-secondary/95 backdrop-blur-xl border border-hhgoa-yellow/40 rounded-3xl p-6 shadow-expedition-yellow relative group overflow-hidden"
            >
              {/* Gold Ambient Glow Corner */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-hhgoa-yellow/15 rounded-full blur-3xl group-hover:bg-hhgoa-yellow/25 transition-all pointer-events-none" />

              {/* Header Stamp */}
              <div className="flex items-center justify-between pb-4 border-b border-hhgoa-border/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-hhgoa-yellow animate-pulse" />
                  <span className="font-mono text-xs text-hhgoa-yellow uppercase tracking-wider font-semibold">
                    OFFICIAL BUILDER PASS TEMPLATE
                  </span>
                </div>
                <span className="font-mono text-xs text-hhgoa-gold font-bold bg-hhgoa-gold/10 px-2.5 py-1 rounded-md border border-hhgoa-gold/30">
                  HHGOA-2026-EXP
                </span>
              </div>

              {/* Avatar + Main Details Empty Template */}
              <div className="flex items-start gap-4 my-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-hhgoa-bg border-2 border-dashed border-hhgoa-yellow/70 flex flex-col items-center justify-center text-center p-1 shadow-md">
                    <Compass className="w-6 h-6 text-hhgoa-yellow opacity-70 mb-0.5" />
                    <span className="text-[9px] font-mono text-hhgoa-muted">PORTRAIT</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-hhgoa-muted italic tracking-tight">
                    Your Name Here
                  </h3>
                  <p className="text-hhgoa-yellow text-xs font-mono font-medium">
                    ⚡ Builder Title
                  </p>
                  <p className="text-hhgoa-muted text-xs">
                    College / Organization
                  </p>
                  <p className="text-hhgoa-muted/80 text-[11px] font-mono">
                    📍 Goa, India
                  </p>
                </div>
              </div>

              {/* Motto Block */}
              <div className="p-3 rounded-xl bg-hhgoa-bg/80 border border-hhgoa-border text-xs font-serif text-hhgoa-muted italic mb-4">
                "Your motto / tagline here"
              </div>

              {/* Tech Stack Chips Placeholder */}
              <div className="space-y-2 mb-5">
                <span className="text-[10px] font-mono text-hhgoa-muted tracking-wider uppercase block">
                  CAPABILITIES & STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'Next.js', 'AI', 'Select Stack'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-hhgoa-bg border border-hhgoa-border text-xs font-mono text-hhgoa-muted flex items-center gap-1"
                    >
                      <Code className="w-3 h-3 text-hhgoa-yellow" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-3 border-t border-hhgoa-border/60 flex items-center justify-between text-[11px] font-mono text-hhgoa-muted">
                <span>HHGOA.COM</span>
                <span className="text-hhgoa-yellow font-bold">#FrameInGoa</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
