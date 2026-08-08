'use client';

import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TerminalLoadingProps {
  onComplete: () => void;
}

export const TerminalLoading: React.FC<TerminalLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const logs = [
    { text: "Scanning Builder DNA Matrix...", sub: "Extracting bio-code & hacker signatures" },
    { text: "Analyzing Neural Profile...", sub: "Evaluating problem solving & chaos tolerance" },
    { text: "Synthesizing Cyber Jungle Canvas...", sub: "Applying 4K glassmorphism & holographic foil" },
    { text: "HHGoa 2026 Identity Verified!", sub: "Generating downloadable asset pack" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next > 25 && next < 50) setCurrentStepIndex(1);
        if (next >= 50 && next < 85) setCurrentStepIndex(2);
        if (next >= 85) setCurrentStepIndex(3);

        return Math.min(next, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Generate ASCII progress bar
  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const asciiBar = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-bg/95 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-cyber-card/90 border border-cyber-glow/50 rounded-3xl p-6 sm:p-8 shadow-neon-emerald font-mono relative overflow-hidden"
      >
        {/* Glow Header */}
        <div className="flex items-center justify-between border-b border-cyber-border/60 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-cyber-glow" />
            <span className="text-xs text-cyber-muted tracking-widest uppercase ml-2">
              HHGOA DNA SYNTHESIZER v2.6
            </span>
          </div>
          <Cpu className="w-5 h-5 text-cyber-glow animate-spin" />
        </div>

        {/* Console Log Stream */}
        <div className="space-y-4 mb-6 min-h-[160px]">
          {logs.slice(0, currentStepIndex + 1).map((log, idx) => (
            <motion.div
              key={log.text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              <div className="flex items-center gap-2 text-sm text-cyber-glow font-bold">
                {idx < currentStepIndex ? (
                  <CheckCircle2 className="w-4 h-4 text-cyber-glow" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-cyber-gold animate-ping" />
                )}
                <span>&gt; {log.text}</span>
              </div>
              <p className="text-xs text-cyber-muted pl-6">{log.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ASCII Progress Bar & Status */}
        <div className="space-y-2 pt-4 border-t border-cyber-border/60">
          <div className="flex items-center justify-between text-xs text-cyber-muted">
            <span>SYNTHESIS PROGRESS</span>
            <span className="text-cyber-glow font-bold">{progress}%</span>
          </div>

          <div className="p-3 rounded-xl bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-glow tracking-widest break-all overflow-hidden">
            {asciiBar}
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-6 text-[11px] text-cyber-muted text-center flex items-center justify-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-cyber-gold" />
          <span>Processing locally via Canvas 2D Engine...</span>
        </div>
      </motion.div>
    </div>
  );
};
