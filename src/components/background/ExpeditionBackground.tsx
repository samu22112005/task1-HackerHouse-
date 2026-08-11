'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speedX: number;
  speedY: number;
}

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

    // Floating Golden Tropical Particles (Fireflies / Sun Glare)
    const numParticles = 35;
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3 - 0.2,
      });
    }

    let offset = 0;
    let rayAngle = 0;

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

      // Rotating Sunburst Rays (inspired by hhgoa sunset illustration)
      const sunX = width / 2;
      const sunY = height * 0.22;
      const numRays = 20;
      rayAngle += 0.0008;

      ctx.save();
      ctx.strokeStyle = 'rgba(255, 210, 63, 0.04)';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < numRays; i++) {
        const angle = (i * Math.PI) / (numRays / 2) + rayAngle;
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(sunX + Math.cos(angle) * width * 1.3, sunY + Math.sin(angle) * height * 1.3);
        ctx.stroke();
      }
      ctx.restore();

      // Topographic Water Contour Lines
      ctx.strokeStyle = 'rgba(46, 90, 70, 0.25)';
      ctx.lineWidth = 1.5;
      offset += 0.12;

      for (let r = 120; r < Math.max(width, height) * 0.95; r += 95) {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.08) {
          const wave = Math.sin(a * 4 + offset * 0.04 + r) * 16;
          const x = width / 2 + Math.cos(a) * (r + wave);
          const y = height / 2.5 + Math.sin(a) * (r + wave * 0.85);
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Warm Sunburst Center Glow
      const glowGrad = ctx.createRadialGradient(sunX, sunY, 30, sunX, sunY, 400);
      glowGrad.addColorStop(0, 'rgba(255, 210, 63, 0.09)');
      glowGrad.addColorStop(0.5, 'rgba(233, 185, 73, 0.03)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Floating Fireflies
      ctx.save();
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 210, 63, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD23F';
        ctx.fill();
      }
      ctx.restore();

      // Lat/Long Watermark text in corners
      ctx.fillStyle = 'rgba(216, 221, 211, 0.14)';
      ctx.font = '10px monospace';
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
