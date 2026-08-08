'use client';

import React, { useEffect, useRef } from 'react';

export const ExpeditionBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep Jungle Green background gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 3, 50,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#14532D');
      bgGrad.addColorStop(0.6, '#0B3D2E');
      bgGrad.addColorStop(1, '#062018');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Sunburst Rays (inspired by hhgoa sunset illustration)
      const sunX = width / 2;
      const sunY = height * 0.25;
      const numRays = 18;
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 210, 63, 0.035)';
      ctx.lineWidth = 2;
      for (let i = 0; i < numRays; i++) {
        const angle = (i * Math.PI) / (numRays - 1) - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(sunX + Math.cos(angle) * width * 1.2, sunY + Math.sin(angle) * height * 1.2);
        ctx.stroke();
      }
      ctx.restore();

      // Topographic Contour Lines
      ctx.strokeStyle = 'rgba(46, 90, 70, 0.24)';
      ctx.lineWidth = 1.5;
      offset += 0.12;

      for (let r = 120; r < Math.max(width, height) * 0.9; r += 100) {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const wave = Math.sin(a * 4 + offset * 0.04 + r) * 14;
          const x = width / 2 + Math.cos(a) * (r + wave);
          const y = height / 2.5 + Math.sin(a) * (r + wave * 0.8);
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Warm Sunburst Center Glow
      const glowGrad = ctx.createRadialGradient(sunX, sunY, 30, sunX, sunY, 350);
      glowGrad.addColorStop(0, 'rgba(255, 210, 63, 0.08)');
      glowGrad.addColorStop(0.5, 'rgba(233, 185, 73, 0.03)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Lat/Long Watermark text in corners
      ctx.fillStyle = 'rgba(216, 221, 211, 0.12)';
      ctx.font = '10px var(--font-ibm-plex-mono), monospace';
      ctx.fillText('GOA EXPEDITION • 15.2993° N, 74.1240° E', 24, height - 24);
      ctx.fillText('HHGOA 2026 • 28 - 31 OCT 2026', width - 240, height - 24);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
    />
  );
};
