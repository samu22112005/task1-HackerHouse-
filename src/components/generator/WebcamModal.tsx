'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface WebcamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

export const WebcamModal: React.FC<WebcamModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error(err);
      setError('Unable to access camera. Please check browser permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleSnap = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally for natural mirror selfie feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    onCapture(dataUrl);
    stopCamera();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-bg/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-cyber-card border border-cyber-border rounded-3xl p-6 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-cyber-secondary border border-cyber-border text-cyber-muted hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-heading font-bold text-xl text-white mb-1 flex items-center gap-2">
          <Camera className="w-5 h-5 text-cyber-glow" />
          Camera Avatar Snap
        </h3>
        <p className="text-xs text-cyber-muted mb-4">
          Align your face in the center of the frame and click capture.
        </p>

        {error ? (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-sm text-center my-6">
            {error}
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden bg-black border border-cyber-border aspect-video mb-6">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
            <div className="absolute inset-0 border-2 border-dashed border-cyber-glow/40 rounded-2xl pointer-events-none flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-2 border-cyber-glow/60" />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyber-secondary border border-cyber-border text-sm text-cyber-muted font-medium hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSnap}
            disabled={!!error}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-glow text-cyber-bg font-heading font-bold text-sm shadow-neon-emerald hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            Capture Photo
          </button>
        </div>
      </motion.div>
    </div>
  );
};
