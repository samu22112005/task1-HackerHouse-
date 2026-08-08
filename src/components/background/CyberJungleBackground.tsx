'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

export const CyberJungleBackground: React.FC = () => {
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

    // Color choices matching Cyber Jungle (#5CF2B2, #3EB489, #F5C542)
    const colors = ['#5CF2B2', '#3EB489', '#F5C542', '#295442'];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.1, // Slight upward drift
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    let scanlineY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark cyber jungle gradient background
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 3, 50,
        width / 2, height / 2, Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#10231D');
      bgGrad.addColorStop(0.5, '#0B1713');
      bgGrad.addColorStop(1, '#08120F');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Grid pattern
      ctx.strokeStyle = 'rgba(41, 84, 66, 0.12)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Slow moving horizontal scanline
      scanlineY = (scanlineY + 0.3) % height;
      const scanGrad = ctx.createLinearGradient(0, scanlineY - 20, 0, scanlineY + 20);
      scanGrad.addColorStop(0, 'rgba(92, 242, 178, 0)');
      scanGrad.addColorStop(0.5, 'rgba(92, 242, 178, 0.04)');
      scanGrad.addColorStop(1, 'rgba(92, 242, 178, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanlineY - 20, width, 40);

      // Connect nearby particles with neural lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.25;
            ctx.strokeStyle = `rgba(92, 242, 178, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges softly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += p.pulseSpeed;
        if (p.alpha > 0.8 || p.alpha < 0.15) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

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
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
