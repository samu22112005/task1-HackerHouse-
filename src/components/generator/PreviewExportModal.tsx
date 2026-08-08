'use client';

import React, { useState, useEffect } from 'react';
import { Download, Share2, Twitter, Linkedin, Copy, Check, X, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { StudioState, ExportFormat } from '@/types/builder';

interface PreviewExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: StudioState;
  previewDataUrl: string | null;
}

export const PreviewExportModal: React.FC<PreviewExportModalProps> = ({
  isOpen,
  onClose,
  state,
  previewDataUrl,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  // Keyboard Escape & Browser Back Button (popstate) listener
  useEffect(() => {
    if (!isOpen) return;

    // Push state for browser back button support
    window.history.pushState({ modalOpen: true }, '');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD23F', '#E9B949', '#FFFDF7', '#14532D', '#FF007A'],
    });
  };

  const handleDownload = () => {
    if (!previewDataUrl) return;
    triggerConfetti();

    const link = document.createElement('a');
    const cleanName = (state.solo.name || 'builder').toLowerCase().replace(/\s+/g, '-');
    link.download = `hhgoa2026-${state.builderId}-${cleanName}-${state.selectedExportFormat}.png`;
    link.href = previewDataUrl;
    link.click();
  };

  const handleCopyImage = async () => {
    if (!previewDataUrl) return;
    try {
      const response = await fetch(previewDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2500);
    } catch (err) {
      console.error('Failed to copy image:', err);
    }
  };

  const shareText = `Excited to join Hacker House Goa 2026! Here is my official ${state.mode === 'team' ? 'Expedition Team Pass' : 'Builder Pass'}. See you in Goa! 🌴✨ #FrameInGoa @hackerhousegoa`;

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hhgoa-dark/95 backdrop-blur-2xl overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl bg-hhgoa-card border border-hhgoa-border rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8"
      >
        {/* Top Header Bar with Back Button & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-hhgoa-border/60 mb-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-hhgoa-secondary border border-hhgoa-border text-xs font-mono text-hhgoa-yellow hover:border-hhgoa-yellow transition-all flex items-center gap-2 font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            ← Back to Studio Form
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-hhgoa-secondary border border-hhgoa-border text-hhgoa-muted hover:text-white transition-colors cursor-pointer"
            aria-label="Close Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-hhgoa-secondary border border-hhgoa-border text-xs font-mono text-hhgoa-yellow">
            <Sparkles className="w-3.5 h-3.5 text-hhgoa-yellow" />
            EXPEDITION CREDENTIAL READY
          </div>
          <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-hhgoa-light">
            Your Official HHGoa 2026 Asset
          </h2>
          <p className="text-xs font-mono text-hhgoa-muted">
            ID: {state.builderId} • Format: {state.selectedExportFormat}
          </p>
        </div>

        {/* Live Canvas High-Res Output */}
        <div className="flex justify-center mb-8">
          <div className="relative group max-w-md w-full rounded-2xl overflow-hidden border-2 border-hhgoa-yellow shadow-expedition-yellow bg-hhgoa-bg p-2">
            {previewDataUrl ? (
              <img
                src={previewDataUrl}
                alt="Generated HHGoa Credential Asset"
                className="w-full h-auto rounded-xl object-contain shadow-lg"
              />
            ) : (
              <div className="w-full aspect-square bg-hhgoa-secondary flex items-center justify-center text-hhgoa-muted">
                Rendering High-Res PNG...
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleDownload}
              className="hhgoa-woven-btn text-base sm:text-lg py-3.5 px-6 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Carry Your Pass (Download PNG)
            </button>

            <button
              type="button"
              onClick={handleCopyImage}
              className="py-3.5 px-6 rounded-xl bg-hhgoa-secondary border border-hhgoa-border text-hhgoa-light font-heading font-semibold text-base hover:border-hhgoa-yellow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedImage ? (
                <>
                  <Check className="w-5 h-5 text-hhgoa-yellow" />
                  Copied Image to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-hhgoa-yellow" />
                  Copy Image to Clipboard
                </>
              )}
            </button>
          </div>

          {/* Social Share Grid */}
          <div className="pt-4 border-t border-hhgoa-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={handleShareTwitter}
              className="py-3 px-4 rounded-xl bg-[#1DA1F2]/15 border border-[#1DA1F2]/40 text-white hover:bg-[#1DA1F2]/25 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Twitter className="w-4 h-4 text-[#1DA1F2]" />
              Share to X (#FrameInGoa)
            </button>

            <button
              type="button"
              onClick={handleShareLinkedIn}
              className="py-3 px-4 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/40 text-white hover:bg-[#0A66C2]/25 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              Share to LinkedIn
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="py-3 px-4 rounded-xl bg-hhgoa-card border border-hhgoa-border text-hhgoa-light hover:text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-hhgoa-yellow" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-hhgoa-yellow" />
                  Copy Share Link
                </>
              )}
            </button>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-4 border-t border-hhgoa-border/60 text-center">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-xs font-mono text-hhgoa-muted hover:text-hhgoa-yellow hover:border-hhgoa-yellow transition-all inline-flex items-center gap-2 font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Builder Pass Studio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
