'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, RotateCw, ZoomIn, RefreshCw, Circle, Square, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
}

// Canvas helper to crop image cleanly to a crisp fixed 500x500 output size
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  brightness = 100,
  contrast = 100,
  saturation = 100
): Promise<string> {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = imageSrc;
  });

  // Intermediate canvas for rotation and filter application
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) throw new Error('No 2d context');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = Math.ceil(2 * ((maxSize / 2) * Math.sqrt(2)));

  tempCanvas.width = safeArea;
  tempCanvas.height = safeArea;

  tempCtx.translate(safeArea / 2, safeArea / 2);
  tempCtx.rotate((rotation * Math.PI) / 180);
  tempCtx.translate(-safeArea / 2, -safeArea / 2);
  tempCtx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;

  tempCtx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  // Final cropped output canvas (fixed 500x500 crisp avatar dimension)
  const outputCanvas = document.createElement('canvas');
  const outputCtx = outputCanvas.getContext('2d');
  if (!outputCtx) throw new Error('No 2d context');

  const outputSize = 500;
  outputCanvas.width = outputSize;
  outputCanvas.height = outputSize;

  const cropX = safeArea / 2 - image.width * 0.5 + pixelCrop.x;
  const cropY = safeArea / 2 - image.height * 0.5 + pixelCrop.y;

  outputCtx.drawImage(
    tempCanvas,
    cropX,
    cropY,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize,
    outputSize
  );

  // Output as optimized JPEG data URL
  return outputCanvas.toDataURL('image/jpeg', 0.92);
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [cropShape, setCropShape] = useState<'rect' | 'round'>('round');

  // Keyboard Escape & Browser Back Button (popstate) listener
  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ cropModalOpen: true }, '');

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

  const onCropChange = (crop: { x: number; y: number }) => setCrop(crop);
  const onZoomChange = (zoom: number) => setZoom(zoom);
  const onRotationChange = (rotation: number) => setRotation(rotation);

  const onCropCompleteInternal = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        brightness,
        contrast,
        saturation
      );
      onCropComplete(croppedImage);
      onClose();
    } catch (e) {
      console.error('Failed to crop image', e);
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const handleAutoCenter = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1.15);
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hhgoa-dark/90 backdrop-blur-xl overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl bg-hhgoa-card border border-hhgoa-border rounded-3xl p-6 shadow-2xl relative overflow-hidden"
      >
        {/* Top Header Bar with Back Button & Close */}
        <div className="flex items-center justify-between pb-3 border-b border-hhgoa-border mb-4">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-hhgoa-secondary border border-hhgoa-border text-xs font-mono text-hhgoa-yellow hover:border-hhgoa-yellow transition-all flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            ← Back
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-hhgoa-secondary border border-hhgoa-border text-hhgoa-muted hover:text-white transition-colors cursor-pointer"
            aria-label="Close Photo Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="font-serif font-bold text-2xl text-hhgoa-light mb-1">
          Precision Photo Editor
        </h3>
        <p className="text-xs text-hhgoa-muted mb-4 font-mono">
          Accepts PNG, JPG, JPEG, WEBP & HEIC. Adjust crop, orientation, and color values for your official credential.
        </p>

        {/* Cropper Viewport Container with explicit relative dimensions and overflow containment */}
        <div 
          className="relative w-full h-72 rounded-2xl overflow-hidden border border-hhgoa-border bg-black mb-5"
          style={{
            filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape={cropShape}
            showGrid={true}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            onCropComplete={onCropCompleteInternal}
          />
        </div>

        {/* Controls Toolbar */}
        <div className="space-y-3 mb-5">
          {/* Zoom & Rotate Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-hhgoa-muted">
                <span className="flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-hhgoa-yellow" /> Zoom:
                </span>
                <span>{zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-hhgoa-yellow cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-hhgoa-muted">
                <span className="flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 text-hhgoa-yellow" /> Rotation:
                </span>
                <span>{rotation}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-hhgoa-yellow cursor-pointer"
              />
            </div>
          </div>

          {/* Brightness, Contrast, Saturation */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-hhgoa-border/60">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-hhgoa-muted">
                <span>Bright:</span>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={150}
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-hhgoa-yellow cursor-pointer h-1.5"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-hhgoa-muted">
                <span>Contrast:</span>
                <span>{contrast}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={150}
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full accent-hhgoa-yellow cursor-pointer h-1.5"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-hhgoa-muted">
                <span>Sat:</span>
                <span>{saturation}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={150}
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full accent-hhgoa-yellow cursor-pointer h-1.5"
              />
            </div>
          </div>

          {/* Shape Toggle & Reset */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-hhgoa-muted">Shape:</span>
              <button
                type="button"
                onClick={() => setCropShape('round')}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                  cropShape === 'round'
                    ? 'bg-hhgoa-yellow text-hhgoa-dark border-hhgoa-yellow font-bold'
                    : 'bg-hhgoa-secondary border-hhgoa-border text-hhgoa-muted'
                }`}
              >
                <Circle className="w-3.5 h-3.5" /> Circle
              </button>
              <button
                type="button"
                onClick={() => setCropShape('rect')}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 ${
                  cropShape === 'rect'
                    ? 'bg-hhgoa-yellow text-hhgoa-dark border-hhgoa-yellow font-bold'
                    : 'bg-hhgoa-secondary border-hhgoa-border text-hhgoa-muted'
                }`}
              >
                <Square className="w-3.5 h-3.5" /> Portrait
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAutoCenter}
                className="px-2.5 py-1 rounded-lg bg-hhgoa-card border border-hhgoa-border text-xs font-mono text-hhgoa-yellow hover:border-hhgoa-yellow"
              >
                Auto Center Face
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-hhgoa-muted hover:text-hhgoa-yellow flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Save Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-hhgoa-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-hhgoa-secondary border border-hhgoa-border text-xs font-mono text-hhgoa-muted hover:text-white flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel & Go Back
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-hhgoa-yellow to-hhgoa-gold text-hhgoa-dark font-heading font-bold text-sm shadow-expedition-yellow hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" /> Save Cropped Portrait
          </button>
        </div>
      </motion.div>
    </div>
  );
};
