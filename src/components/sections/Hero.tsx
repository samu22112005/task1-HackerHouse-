'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, ShieldCheck, Code, Award, MapPin, Sparkles } from 'lucide-react';


export const Hero: React.FC = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 18);
    setRotateY(x / 18);
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
    <section id="hero" className="relative py-12 md:py-20 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP HERO HEADLINE & BADGES */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-12">
          
          {/* Expedition Badges */}
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hhgoa-card/90 border border-hhgoa-border text-xs font-mono text-hhgoa-yellow shadow-md">
              <Compass className="w-4 h-4 text-hhgoa-yellow animate-spin-slow" />
              <span>HACKER HOUSE GOA 2026 • 28 - 31 OCT</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hhgoa-yellow/10 border border-hhgoa-yellow/50 text-xs font-mono text-hhgoa-yellow font-bold shadow-md">
              <Code className="w-4 h-4 text-hhgoa-yellow" />
              <span>Built by Team CODENOVA • Samrudhi</span>
            </div>
          </div>

          {/* Headline */}
          <div className="relative">
            <h1 className="font-serif text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05] text-hhgoa-light">
              Every Expedition <br />
              <span className="editorial-gradient-text">Begins With An Identity.</span>
            </h1>
            <span className="devanagari-badge text-lg sm:text-2xl px-4 py-1 absolute -top-4 right-4 sm:right-24 animate-bounce">
              गोवा
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-hhgoa-muted text-lg sm:text-2xl max-w-3xl mx-auto font-normal leading-relaxed font-sans">
            Craft your official Builder Pass for Hacker House Goa 2026. Handcrafted vector credentials for builders, hackers, and explorers.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={scrollToExpedition}
              className="hhgoa-woven-btn text-base sm:text-lg flex items-center justify-center gap-3 cursor-pointer py-4 px-8"
            >
              Choose Your Expedition Mode
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToGenerator}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-hhgoa-card/90 border border-hhgoa-border text-hhgoa-light font-heading font-bold text-base hover:border-hhgoa-yellow hover:bg-hhgoa-card transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-hhgoa-yellow" />
              Open Builder Pass Studio
            </button>
          </div>
        </div>



        {/* HIGHLIGHT STRIP BAR */}
        <div className="pt-6 border-t border-hhgoa-border/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-hhgoa-muted max-w-5xl mx-auto">
          <div className="flex items-center gap-2 justify-center">
            <ShieldCheck className="w-4 h-4 text-hhgoa-yellow" />
            <span>Solo & Team Credentials</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Award className="w-4 h-4 text-hhgoa-gold" />
            <span>Verified Expedition Badge</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Code className="w-4 h-4 text-hhgoa-yellow" />
            <span>Capabilities & Stack Chips</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <MapPin className="w-4 h-4 text-hhgoa-gold" />
            <span>#FrameInGoa</span>
          </div>
        </div>

      </div>
    </section>
  );
};
