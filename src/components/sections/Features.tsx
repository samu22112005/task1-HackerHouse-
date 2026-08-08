'use client';

import React from 'react';
import { User, Users, Crop, Code, Image, Share2, ShieldCheck, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <User className="w-6 h-6 text-hhgoa-yellow" />,
      title: "Solo & Team Expedition Pass",
      description: "Generate official individual builder credentials or unified 2-3 member team expedition passes.",
      tag: "EXPEDITION MODES",
    },
    {
      icon: <Crop className="w-6 h-6 text-hhgoa-gold" />,
      title: "Precision Photo Editor",
      description: "Interactive photo editor with drag, zoom, rotation, brightness, contrast, and saturation controls.",
      tag: "PRECISION CROP",
    },
    {
      icon: <Code className="w-6 h-6 text-hhgoa-yellow" />,
      title: "Searchable Tech Chips",
      description: "Select capabilities from 20+ searchable stack chips (Java, Next.js, Python, AI, Rust, Web3, DevOps, etc.).",
      tag: "CAPABILITIES",
    },
    {
      icon: <Compass className="w-6 h-6 text-hhgoa-gold" />,
      title: "Canva-like Live Preview",
      description: "Every input field update renders on the canvas instantly in real time with zero reloads.",
      tag: "INSTANT CANVAS",
    },
    {
      icon: <Image className="w-6 h-6 text-hhgoa-yellow" />,
      title: "High-Res PNG Export",
      description: "Download high-DPI PNG assets for Solo Pass, Team Pass, Circle Avatar Frame, and 9:16 Instagram Stories.",
      tag: "HIGH-RES PNG",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-hhgoa-gold" />,
      title: "100% Client-Side Privacy",
      description: "Zero server uploads. Your photos and details remain 100% private inside your browser.",
      tag: "MAX PRIVACY",
    },
  ];

  return (
    <section id="features" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hhgoa-card border border-hhgoa-border text-xs font-mono text-hhgoa-yellow">
            <Compass className="w-3.5 h-3.5" />
            EXPEDITION CRAFTSMANSHIP
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-hhgoa-light">
            Editorial Features for <br />
            <span className="editorial-gradient-text">Hacker House Goa Builders</span>
          </h2>
          <p className="text-hhgoa-muted text-base sm:text-lg font-sans">
            Crafted like an official expedition credential document for HHGoa 2026.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-hhgoa-card/75 backdrop-blur-xl border border-hhgoa-border rounded-3xl p-6 glass-card-hover flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-hhgoa-secondary border border-hhgoa-border flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-hhgoa-secondary border border-hhgoa-border text-hhgoa-muted group-hover:text-hhgoa-yellow transition-colors">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-hhgoa-light mb-2 group-hover:text-hhgoa-yellow transition-colors">
                  {feature.title}
                </h3>
                <p className="text-hhgoa-muted text-sm leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-hhgoa-border/40 flex items-center gap-2 text-xs font-mono text-hhgoa-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                <span>EXPLORE FEATURE</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
