'use client';

import React from 'react';
import { User, Users, Compass, Camera, Sparkles, Award, Twitter, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PassMode } from '@/types/builder';

interface ExpeditionSelectorProps {
  currentMode: PassMode;
  onSelectMode: (mode: PassMode) => void;
}

export const ExpeditionSelector: React.FC<ExpeditionSelectorProps> = ({
  currentMode,
  onSelectMode,
}) => {
  const handleModeClick = (mode: PassMode) => {
    onSelectMode(mode);
    const generatorEl = document.getElementById('generator');
    if (generatorEl) {
      generatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      num: '①',
      title: 'Choose Your Expedition',
      desc: 'Select Solo Builder Pass or 2-3 Member Team Expedition Pass.',
      icon: <Compass className="w-5 h-5 text-hhgoa-yellow" />,
    },
    {
      num: '②',
      title: 'Upload & Adjust Your Portrait',
      desc: 'Use precision crop, rotation, brightness, and auto-face-center editor.',
      icon: <Camera className="w-5 h-5 text-hhgoa-gold" />,
    },
    {
      num: '③',
      title: 'Tell Us About Yourself',
      desc: 'Fill your name, role, college, location, motto, and searchable tech stack.',
      icon: <Sparkles className="w-5 h-5 text-hhgoa-yellow" />,
    },
    {
      num: '④',
      title: 'Claim Your Builder Pass',
      desc: 'Live 4K canvas renders your official HHGoa verified credential instant preview.',
      icon: <Award className="w-5 h-5 text-hhgoa-gold" />,
    },
    {
      num: '⑤',
      title: 'Download & Share on X',
      desc: 'Export high-res PNG and share directly to X with #FrameInGoa.',
      icon: <Twitter className="w-5 h-5 text-hhgoa-yellow" />,
    },
  ];

  return (
    <section id="expedition" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hhgoa-card border border-hhgoa-border text-xs font-mono text-hhgoa-yellow">
            <Compass className="w-3.5 h-3.5" />
            START YOUR HHGOA 2026 JOURNEY
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-hhgoa-light">
            Choose Your <span className="editorial-gradient-text">Expedition</span>
          </h2>
          <p className="text-hhgoa-muted text-base sm:text-lg font-sans">
            Select your mode to begin crafting your official Hacker House Goa 2026 credential pass.
          </p>
        </div>

        {/* Interactive Mode Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
          
          {/* SOLO BUILDER CARD */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleModeClick('solo')}
            className={`p-8 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              currentMode === 'solo'
                ? 'bg-hhgoa-card/95 border-hhgoa-yellow text-white shadow-expedition-yellow ring-2 ring-hhgoa-yellow/50'
                : 'bg-hhgoa-card/60 border-hhgoa-border text-hhgoa-muted hover:border-hhgoa-yellow/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-hhgoa-secondary border border-hhgoa-border flex items-center justify-center shadow-md">
                  <User className="w-7 h-7 text-hhgoa-yellow" />
                </div>
                {currentMode === 'solo' ? (
                  <span className="px-3.5 py-1 rounded-full bg-hhgoa-yellow text-hhgoa-dark font-mono text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    SELECTED MODE
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-hhgoa-secondary border border-hhgoa-border font-mono text-xs text-hhgoa-muted">
                    INDIVIDUAL
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-3xl text-hhgoa-light mb-1">
                👤 SOLO BUILDER
              </h3>
              <p className="font-mono text-sm text-hhgoa-yellow mb-3 font-semibold">
                Official Builder Pass
              </p>
              <p className="text-sm text-hhgoa-muted leading-relaxed font-sans mb-8">
                Perfect for individual hackers joining HHGoa. Customize your portrait, title, role, college, location, motto, capabilities chips, and social handles.
              </p>
            </div>

            <button
              type="button"
              className={`w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                currentMode === 'solo'
                  ? 'hhgoa-woven-btn text-base'
                  : 'bg-hhgoa-secondary border border-hhgoa-border text-hhgoa-yellow hover:border-hhgoa-yellow'
              }`}
            >
              <span>Choose Solo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* TEAM EXPEDITION CARD */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleModeClick('team')}
            className={`p-8 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              currentMode === 'team'
                ? 'bg-hhgoa-card/95 border-hhgoa-yellow text-white shadow-expedition-yellow ring-2 ring-hhgoa-yellow/50'
                : 'bg-hhgoa-card/60 border-hhgoa-border text-hhgoa-muted hover:border-hhgoa-yellow/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-hhgoa-secondary border border-hhgoa-border flex items-center justify-center shadow-md">
                  <Users className="w-7 h-7 text-hhgoa-yellow" />
                </div>
                {currentMode === 'team' ? (
                  <span className="px-3.5 py-1 rounded-full bg-hhgoa-yellow text-hhgoa-dark font-mono text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    SELECTED MODE
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-hhgoa-secondary border border-hhgoa-border font-mono text-xs text-hhgoa-muted">
                    SQUAD
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-3xl text-hhgoa-light mb-1">
                👥 TEAM EXPEDITION
              </h3>
              <p className="font-mono text-sm text-hhgoa-yellow mb-3 font-semibold">
                Official Expedition Pass
              </p>
              <p className="text-sm text-hhgoa-muted leading-relaxed font-sans mb-8">
                Create a shared Builder Pass for 2–3 builders. Render multi-member portraits together on one official expedition credential pass.
              </p>
            </div>

            <button
              type="button"
              className={`w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                currentMode === 'team'
                  ? 'hhgoa-woven-btn text-base'
                  : 'bg-hhgoa-secondary border border-hhgoa-border text-hhgoa-yellow hover:border-hhgoa-yellow'
              }`}
            >
              <span>Choose Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

        </div>

        {/* HOW IT WORKS TIMELINE */}
        <div className="pt-12 border-t border-hhgoa-border/60">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold text-hhgoa-yellow uppercase tracking-widest block mb-2">
              SIMPLE 5-STEP JOURNEY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-hhgoa-light">
              HOW IT WORKS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-hhgoa-card/70 border border-hhgoa-border/80 flex flex-col justify-between space-y-4 group hover:border-hhgoa-yellow/60 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono font-extrabold text-xl text-hhgoa-yellow">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-hhgoa-secondary border border-hhgoa-border flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-hhgoa-light mb-2 group-hover:text-hhgoa-yellow transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-hhgoa-muted font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
