'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is HHGoa Builder Studio?',
      a: 'HHGoa Builder Studio is the official credential and identity studio for Hacker House Goa (HHGoa) 2026. It allows individual hackers and 2-3 member teams to generate handcrafted, high-res editorial Builder Passes and Expedition Team Passes in seconds.',
    },
    {
      q: 'What is the difference between Solo Builder Pass and Team Expedition Pass?',
      a: 'Solo Builder Pass is designed for individual builders, featuring custom photo crops, capabilities chips, location, and motto. Team Expedition Pass supports 2 or 3 team members rendered together on one unified official credential document.',
    },
    {
      q: 'What image formats and photo editing features are supported?',
      a: 'Supports PNG, JPG, JPEG, WEBP, and HEIC files. Integrates react-easy-crop with precision controls for drag, zoom, rotation, brightness, contrast, saturation, and auto-face-center alignment.',
    },
    {
      q: 'Is my photo or personal information uploaded to external servers?',
      a: 'No. HHGoa Builder Studio operates 100% client-side inside your browser sandbox using HTML5 Canvas 2D API. Your photos and details stay strictly private on your device.',
    },
    {
      q: 'How do I share my generated pass on X (Twitter) or LinkedIn?',
      a: 'Click "Claim Your Builder Identity" or "Download & Share" to open the asset modal. You can download high-res PNG files or click "Share to X" to post directly with prefilled text and hashtag #FrameInGoa.',
    },
  ];

  return (
    <section id="faq" className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hhgoa-card border border-hhgoa-border text-xs font-mono text-hhgoa-yellow">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-hhgoa-light">
            Everything You Need to Know
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-hhgoa-card/75 backdrop-blur-xl border border-hhgoa-border rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-serif font-bold text-xl text-hhgoa-light hover:text-hhgoa-yellow transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-hhgoa-yellow transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-hhgoa-muted text-sm leading-relaxed border-t border-hhgoa-border/40 pt-4 font-sans"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
