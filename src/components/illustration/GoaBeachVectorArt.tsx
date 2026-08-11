'use client';

import React, { useState } from 'react';
import { Sparkles, Sun, Volume2, VolumeX, Compass, Trees, Flame, Music, Waves } from 'lucide-react';
import { toggleBeachAmbience, isBeachAudioActive } from '@/utils/audio';

interface GoaBeachVectorArtProps {
  currentTheme?: 'jungle' | 'sunset' | 'midnight';
  onThemeSelect?: (theme: 'jungle' | 'sunset' | 'midnight') => void;
}

export const GoaBeachVectorArt: React.FC<GoaBeachVectorArtProps> = ({
  currentTheme = 'jungle',
  onThemeSelect,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [internalTheme, setInternalTheme] = useState<'jungle' | 'sunset' | 'midnight'>('jungle');

  const activeTheme = currentTheme || internalTheme;

  const handleThemeChange = (theme: 'jungle' | 'sunset' | 'midnight') => {
    setInternalTheme(theme);
    if (onThemeSelect) onThemeSelect(theme);
  };

  const handleAudioToggle = () => {
    const newState = toggleBeachAmbience((playing) => setIsPlayingAudio(playing));
    setIsPlayingAudio(newState);
  };

  // Color mappings for 3 thematic modes
  const skyBg = activeTheme === 'sunset' 
    ? 'from-[#7C2D12] via-[#C2410C] to-[#451A03]' 
    : activeTheme === 'midnight'
    ? 'from-[#0F172A] via-[#020617] to-[#1E1B4B]'
    : 'from-[#0B3D2E] via-[#0E4A38] to-[#062018]';

  const sunColor = activeTheme === 'sunset' ? '#FF4500' : activeTheme === 'midnight' ? '#FF007A' : '#FFD23F';
  const oceanColor1 = activeTheme === 'sunset' ? '#9A3412' : activeTheme === 'midnight' ? '#0F2B48' : '#0284C7';
  const oceanColor2 = activeTheme === 'sunset' ? '#451A03' : activeTheme === 'midnight' ? '#020617' : '#0369A1';

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-4 border-[#FFD23F]/80 shadow-2xl bg-[#0B3D2E] select-none group">
      
      {/* Top Controls Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3D2E]/90 backdrop-blur-md border border-[#FFD23F]/50 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFD23F] animate-ping" />
          <span className="font-mono text-xs font-bold text-[#FFD23F] tracking-wider uppercase flex items-center gap-1.5">
            {activeTheme === 'jungle' && <Trees className="w-3.5 h-3.5 text-[#34D399]" />}
            {activeTheme === 'sunset' && <Sun className="w-3.5 h-3.5 text-[#FF4500]" />}
            {activeTheme === 'midnight' && <Music className="w-3.5 h-3.5 text-[#FF007A]" />}
            <span>
              {activeTheme === 'jungle' && '🌿 JUNGLE PALMS & CURLING SURF WAVE'}
              {activeTheme === 'sunset' && '🌅 GOAN SUNSET GLOW SCENE'}
              {activeTheme === 'midnight' && '🎉 GOA BEACH NIGHT PARTY SCENE'}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Selector Tabs */}
          <div className="p-1 rounded-xl bg-[#0B3D2E]/90 border border-[#2E5A46] flex gap-1 shadow-md">
            <button
              onClick={() => handleThemeChange('jungle')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                activeTheme === 'jungle' ? 'bg-[#10B981] text-white shadow-md' : 'text-[#D6DCCF] hover:text-white'
              }`}
            >
              🌴 Jungle Palms & Wave
            </button>
            <button
              onClick={() => handleThemeChange('sunset')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                activeTheme === 'sunset' ? 'bg-[#FF4500] text-white shadow-md' : 'text-[#D6DCCF] hover:text-white'
              }`}
            >
              🌅 Sunset Glow
            </button>
            <button
              onClick={() => handleThemeChange('midnight')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                activeTheme === 'midnight' ? 'bg-[#FF007A] text-white shadow-md' : 'text-[#D6DCCF] hover:text-white'
              }`}
            >
              🎉 Night Party
            </button>
          </div>

          {/* Beach Audio Ambience Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#FF007A] text-white border-[#FF007A] shadow-lg animate-pulse'
                : 'bg-[#0B3D2E]/90 border-[#FFD23F]/60 text-[#FFD23F] hover:bg-[#FFD23F] hover:text-[#0B3D2E]'
            }`}
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{isPlayingAudio ? 'Waves ON' : 'Beach Sound'}</span>
          </button>
        </div>
      </div>

      {/* MAIN VECTOR SVG CONTAINER (1200 x 650 Responsive Aspect Ratio) */}
      <svg
        viewBox="0 0 1200 650"
        className={`w-full h-auto bg-gradient-to-b ${skyBg} transition-colors duration-700`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sun Glow Filter */}
          <filter id="sunGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Ocean Water Gradient */}
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={oceanColor1} />
            <stop offset="100%" stopColor={oceanColor2} />
          </linearGradient>

          {/* Curling Wave Tube Gradient */}
          <linearGradient id="surfWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="40%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Sand Beach Gradient */}
          <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={activeTheme === 'midnight' ? '#334155' : '#F5F5F4'} />
            <stop offset="100%" stopColor={activeTheme === 'midnight' ? '#1E293B' : '#E7E5E4'} />
          </linearGradient>
        </defs>

        {/* NIGHT PARTY STARS */}
        {activeTheme === 'midnight' && (
          <g>
            {[...Array(30)].map((_, i) => (
              <circle
                key={i}
                cx={(i * 47) % 1200}
                cy={(i * 23) % 250}
                r={i % 2 === 0 ? "2" : "1.2"}
                fill="#FFFDF7"
                opacity={(i % 5 + 3) / 10}
                className="animate-pulse"
              />
            ))}
          </g>
        )}

        {/* 1. RADIATING SUNBURST RAYS */}
        <g className="animate-sunbeam" style={{ transformOrigin: '600px 210px' }}>
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <line
                key={i}
                x1="600"
                y1="210"
                x2={600 + Math.cos((angle * Math.PI) / 180) * 1100}
                y2={210 + Math.sin((angle * Math.PI) / 180) * 1100}
                stroke={sunColor}
                strokeWidth="4"
                strokeOpacity={i % 2 === 0 ? "0.22" : "0.1"}
                strokeDasharray="20,10"
              />
            );
          })}
        </g>

        {/* 2. GIANT SUN / MOON */}
        <circle
          cx="600"
          cy="210"
          r="115"
          fill={sunColor}
          filter="url(#sunGlow)"
          className="transition-colors duration-700"
        />
        <circle
          cx="600"
          cy="210"
          r="124"
          fill="none"
          stroke={sunColor}
          strokeWidth="3"
          strokeOpacity="0.6"
        />

        {/* 3. TROPICAL HILLS */}
        <path
          d="M0,290 Q200,240 420,280 T800,265 T1200,285 L1200,320 L0,320 Z"
          fill={activeTheme === 'jungle' ? '#044E3B' : activeTheme === 'sunset' ? '#78350F' : '#091E3A'}
          opacity="0.9"
        />
        <path
          d="M0,300 Q300,260 620,295 T1200,290 L1200,340 L0,340 Z"
          fill={activeTheme === 'jungle' ? '#022C22' : activeTheme === 'sunset' ? '#451A03' : '#020617'}
        />

        {/* 4. DRIFTING SAILBOAT */}
        <g className="animate-sailboat" transform="translate(240, 290)">
          <path d="M0,12 L35,12 L28,20 L5,20 Z" fill="#FFFDF7" stroke="#0B3D2E" strokeWidth="2" />
          <path d="M18,12 L18,-15 L32,8 Z" fill={activeTheme === 'midnight' ? '#FF007A' : '#FFD23F'} stroke="#0B3D2E" strokeWidth="1.5" />
        </g>

        {/* 5. ANIMATED OCEAN WATER */}
        <rect x="0" y="320" width="1200" height="110" fill="url(#oceanGrad)" />

        {/* DRAMATIC CURLING SURF WAVE WITH SEA FOAM & SPLASH DROPLETS (EXACT RECREATION OF USER SUBMITTED WAVE IMAGE) */}
        <g transform="translate(480, 260) scale(0.85)" className="animate-wave">
          {/* Main Wave Body Tube */}
          <path
            d="M 10,170 Q 50,20 180,10 Q 280,0 330,60 Q 360,100 320,130 Q 270,160 210,120 Q 150,80 120,100 Q 80,120 40,160 Z"
            fill="url(#surfWaveGrad)"
            stroke="#1E3A8A"
            strokeWidth="5"
          />
          {/* Inner Wave Flow Lines */}
          <path d="M 40,150 Q 80,40 180,30 Q 250,20 290,65" fill="none" stroke="#7DD3FC" strokeWidth="4" />
          <path d="M 60,160 Q 100,60 190,45 Q 240,40 275,80" fill="none" stroke="#38BDF8" strokeWidth="3" />
          <path d="M 80,165 Q 120,80 200,65 Q 230,60 255,90" fill="none" stroke="#0284C7" strokeWidth="2.5" />

          {/* Crashing White Sea Foam Crest */}
          <path
            d="M 280,30 Q 320,-10 370,20 Q 410,50 380,90 Q 350,120 310,100 Q 280,80 300,50 Z"
            fill="#FFFDF7"
            stroke="#1E3A8A"
            strokeWidth="4"
          />
          <path d="M 310,15 Q 340,0 375,30 Q 395,55 365,80" fill="none" stroke="#E0F2FE" strokeWidth="4" />
          <circle cx="345" cy="45" r="10" fill="#E0F2FE" />
          <circle cx="370" cy="65" r="7" fill="#E0F2FE" />

          {/* Flying Splash Droplets */}
          <circle cx="410" cy="70" r="5" fill="#38BDF8" stroke="#1E3A8A" strokeWidth="2" />
          <circle cx="430" cy="95" r="7" fill="#FFFDF7" stroke="#1E3A8A" strokeWidth="2" />
          <circle cx="395" cy="115" r="6" fill="#38BDF8" stroke="#1E3A8A" strokeWidth="2" />
          <circle cx="420" cy="135" r="4" fill="#FFFDF7" stroke="#1E3A8A" strokeWidth="1.5" />
          <circle cx="445" cy="115" r="5" fill="#7DD3FC" stroke="#1E3A8A" strokeWidth="2" />
        </g>

        {/* Sun/Moon Reflections on Water */}
        {[...Array(9)].map((_, i) => (
          <ellipse
            key={i}
            cx={600 + (i % 2 === 0 ? i * 8 : -i * 8)}
            cy={330 + i * 10}
            rx={90 - i * 8}
            ry="2.5"
            fill={sunColor}
            opacity={0.7 - i * 0.06}
          />
        ))}

        {/* 6. SANDY BEACH SHORE */}
        <path
          d="M0,425 Q400,410 800,425 T1200,420 L1200,650 L0,650 Z"
          fill="url(#sandGrad)"
          stroke="#0B3D2E"
          strokeWidth="3"
        />

        <path
          d="M0,425 Q400,410 800,425 T1200,420"
          fill="none"
          stroke="#FFFDF7"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 7. BEACH HUTS & COTTAGES */}
        <g transform="translate(-20, 390)">
          <path d="M40,110 L160,50 L280,110 L280,240 L40,240 Z" fill={activeTheme === 'midnight' ? '#1E293B' : '#0B523B'} stroke="#0B3D2E" strokeWidth="4" />
          <path d="M40,110 L160,50 L280,110" fill="none" stroke="#FFFDF7" strokeWidth="4" />
          <rect x="70" y="140" width="45" height="65" fill="#0B3D2E" stroke="#FFD23F" strokeWidth="3" rx="4" />
          <rect x="135" y="140" width="45" height="65" fill="#0B3D2E" stroke="#FFD23F" strokeWidth="3" rx="4" />
          <rect x="200" y="140" width="45" height="65" fill="#0B3D2E" stroke="#FFD23F" strokeWidth="3" rx="4" />
        </g>

        {/* 8. CENTRAL GOAN BEACH SHACK */}
        <g transform="translate(740, 340)">
          <path d="M30,120 L150,70 L270,120 L270,240 L30,240 Z" fill={activeTheme === 'midnight' ? '#0F172A' : '#0E4A38'} stroke="#0B3D2E" strokeWidth="4" />
          <path d="M20,120 L150,60 L280,120 Z" fill="#FFFDF7" stroke="#0B3D2E" strokeWidth="4" />

          <g className="animate-goa-sign" transform="translate(45, 95)">
            <rect x="0" y="0" width="180" height="38" rx="8" fill="#FF007A" stroke="#FFFDF7" strokeWidth="3" />
            <text
              x="90"
              y="25"
              textAnchor="middle"
              fill="#FFFDF7"
              fontSize="16"
              fontWeight="900"
              fontFamily="Space Grotesk, sans-serif"
              letterSpacing="2"
            >
              {activeTheme === 'midnight' ? 'GOA NIGHT RAVE' : 'GOA BEACH'}
            </text>
          </g>

          <rect x="55" y="145" width="160" height="70" fill="#062018" stroke="#FFFDF7" strokeWidth="3" rx="4" />
          <circle cx="135" cy="170" r="14" fill="#FFFDF7" />

          <rect x="75" y="215" width="18" height="25" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="2" />
          <rect x="125" y="215" width="18" height="25" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="2" />
          <rect x="175" y="215" width="18" height="25" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="2" />
        </g>

        {/* SEGMENTED COCONUT PALM TREES (EXACT RECREATION OF USER SUBMITTED PALM TREE IMAGE) */}
        
        {/* LEFT SEGMENTED PALM TREE */}
        <g className="animate-palm-left" transform="translate(10, 80) scale(0.9)">
          {/* Stacked Segmented Brown Bark Trunk */}
          {[
            { y: 530, w: 42, h: 45, rx: 8 },
            { y: 490, w: 40, h: 45, rx: 7 },
            { y: 450, w: 38, h: 45, rx: 7 },
            { y: 410, w: 36, h: 45, rx: 6 },
            { y: 370, w: 34, h: 45, rx: 6 },
            { y: 330, w: 32, h: 45, rx: 5 },
            { y: 290, w: 30, h: 45, rx: 5 },
            { y: 250, w: 28, h: 45, rx: 4 },
            { y: 210, w: 26, h: 45, rx: 4 },
            { y: 170, w: 24, h: 45, rx: 4 },
          ].map((seg, i) => (
            <rect
              key={i}
              x={90 + i * 2.5}
              y={seg.y}
              width={seg.w}
              height={seg.h}
              rx={seg.rx}
              fill={i % 2 === 0 ? "#8B4513" : "#CD853F"}
              stroke="#451A03"
              strokeWidth="3.5"
            />
          ))}

          {/* Tropical Palm Fronds Crown */}
          <g transform="translate(130, 160)">
            {/* Top Upright Frond */}
            <path d="M 0,0 Q -40,-120 -10,-170 Q 20,-120 0,0 Z" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
            <path d="M 0,0 Q -10,-90 -10,-170" fill="none" stroke="#86EFAC" strokeWidth="3" />

            {/* Left Top Frond */}
            <path d="M 0,0 Q -100,-110 -170,-80 Q -110,-40 0,0 Z" fill="#16A34A" stroke="#14532D" strokeWidth="3" />
            <path d="M 0,0 Q -90,-75 -170,-80" fill="none" stroke="#86EFAC" strokeWidth="3" />

            {/* Far Left Frond */}
            <path d="M 0,0 Q -130,-40 -190,30 Q -110,40 0,0 Z" fill="#15803D" stroke="#14532D" strokeWidth="3" />
            
            {/* Right Top Frond */}
            <path d="M 0,0 Q 80,-110 150,-70 Q 90,-30 0,0 Z" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
            <path d="M 0,0 Q 75,-70 150,-70" fill="none" stroke="#86EFAC" strokeWidth="3" />

            {/* Far Right Frond */}
            <path d="M 0,0 Q 110,-30 170,40 Q 90,40 0,0 Z" fill="#166534" stroke="#14532D" strokeWidth="3" />

            {/* Coconuts Cluster */}
            <circle cx="-8" cy="-5" r="11" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            <circle cx="10" cy="-2" r="10" fill="#8B4513" stroke="#451A03" strokeWidth="2" />
            <circle cx="2" cy="10" r="11" fill="#78350F" stroke="#451A03" strokeWidth="2" />
          </g>
        </g>

        {/* RIGHT SEGMENTED PALM TREE */}
        <g className="animate-palm-right" transform="translate(940, 80) scale(0.9)">
          {[
            { y: 530, w: 42, h: 45, rx: 8 },
            { y: 490, w: 40, h: 45, rx: 7 },
            { y: 450, w: 38, h: 45, rx: 7 },
            { y: 410, w: 36, h: 45, rx: 6 },
            { y: 370, w: 34, h: 45, rx: 6 },
            { y: 330, w: 32, h: 45, rx: 5 },
            { y: 290, w: 30, h: 45, rx: 5 },
            { y: 250, w: 28, h: 45, rx: 4 },
            { y: 210, w: 26, h: 45, rx: 4 },
            { y: 170, w: 24, h: 45, rx: 4 },
          ].map((seg, i) => (
            <rect
              key={i}
              x={90 - i * 2.5}
              y={seg.y}
              width={seg.w}
              height={seg.h}
              rx={seg.rx}
              fill={i % 2 === 0 ? "#8B4513" : "#CD853F"}
              stroke="#451A03"
              strokeWidth="3.5"
            />
          ))}

          <g transform="translate(100, 160)">
            <path d="M 0,0 Q 40,-120 10,-170 Q -20,-120 0,0 Z" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
            <path d="M 0,0 Q 100,-110 170,-80 Q 110,-40 0,0 Z" fill="#16A34A" stroke="#14532D" strokeWidth="3" />
            <path d="M 0,0 Q -80,-110 -150,-70 Q -90,-30 0,0 Z" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
            
            <circle cx="-8" cy="-5" r="11" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            <circle cx="10" cy="-2" r="10" fill="#8B4513" stroke="#451A03" strokeWidth="2" />
          </g>
        </g>
      </svg>
      
      {/* Bottom Subtitle Caption */}
      <div className="bg-[#062018] py-2.5 px-4 border-t border-[#FFD23F]/30 flex items-center justify-between text-xs font-mono text-[#D6DCCF]">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#FFD23F]" />
          <span>
            {activeTheme === 'jungle' && '🌿 JUNGLE COCONUT PALMS & SURF WAVE • HACKER HOUSE GOA'}
            {activeTheme === 'sunset' && '🌅 GOAN SUNSET GLOW • HACKER HOUSE GOA'}
            {activeTheme === 'midnight' && '🎉 NIGHT RAVE BEACH PARTY • HACKER HOUSE GOA'}
          </span>
        </div>
        <span className="text-[#FFD23F] font-bold">15.2993° N, 74.1240° E • #FrameInGoa</span>
      </div>
    </div>
  );
};
