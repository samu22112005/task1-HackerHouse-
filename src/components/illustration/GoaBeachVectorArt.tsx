'use client';

import React, { useState } from 'react';
import { Sparkles, Sun, Volume2, VolumeX, Compass, Trees, Flame, Music } from 'lucide-react';
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
  const oceanColor1 = activeTheme === 'sunset' ? '#9A3412' : activeTheme === 'midnight' ? '#0F2B48' : '#047857';
  const oceanColor2 = activeTheme === 'sunset' ? '#451A03' : activeTheme === 'midnight' ? '#020617' : '#063828';

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
              {activeTheme === 'jungle' && '🌿 DEEP JUNGLE TREES SCENE'}
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
              🌿 Jungle Trees
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

          {/* Sand Beach Gradient */}
          <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={activeTheme === 'midnight' ? '#334155' : '#F5F5F4'} />
            <stop offset="100%" stopColor={activeTheme === 'midnight' ? '#1E293B' : '#E7E5E4'} />
          </linearGradient>
        </defs>

        {/* NIGHT PARTY TWINKLING STARS & NEON DISCO LASERS LAYER */}
        {activeTheme === 'midnight' && (
          <g>
            {/* Stars */}
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
            {/* Neon Party Disco Lasers */}
            <line x1="0" y1="0" x2="600" y2="400" stroke="#FF007A" strokeWidth="2" opacity="0.6" strokeDasharray="10,10" />
            <line x1="1200" y1="0" x2="600" y2="400" stroke="#38BDF8" strokeWidth="2" opacity="0.6" strokeDasharray="10,10" />
            <line x1="300" y1="0" x2="750" y2="420" stroke="#F59E0B" strokeWidth="2" opacity="0.5" strokeDasharray="15,10" />
          </g>
        )}

        {/* SUNSET EVENING CLOUDS LAYER */}
        {activeTheme === 'sunset' && (
          <g opacity="0.7">
            <path d="M100,140 Q160,110 240,140 Q320,110 400,140 Z" fill="#FB923C" opacity="0.6" />
            <path d="M700,160 Q780,130 860,160 Q940,130 1020,160 Z" fill="#F43F5E" opacity="0.5" />
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

        {/* 2. GIANT SUN / NIGHT MOON / PARTY SPHERE */}
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

        {/* 3. TROPICAL HILLS WITH DENSE JUNGLE TREES CANOPY (FOR JUNGLE THEME) */}
        <path
          d="M0,290 Q200,240 420,280 T800,265 T1200,285 L1200,320 L0,320 Z"
          fill={activeTheme === 'jungle' ? '#044E3B' : activeTheme === 'sunset' ? '#78350F' : '#091E3A'}
          opacity="0.9"
        />

        {/* DENSE JUNGLE TREE CANOPY OVERLAYS */}
        {activeTheme === 'jungle' && (
          <g fill="#022C22">
            {[...Array(16)].map((_, i) => (
              <circle key={i} cx={40 + i * 75} cy={275 + (i % 3) * 6} r={28 + (i % 4) * 5} />
            ))}
          </g>
        )}

        <path
          d="M0,300 Q300,260 620,295 T1200,290 L1200,340 L0,340 Z"
          fill={activeTheme === 'jungle' ? '#022C22' : activeTheme === 'sunset' ? '#451A03' : '#020617'}
        />

        {/* 4. DRIFTING SAILBOAT ON HORIZON */}
        <g className="animate-sailboat" transform="translate(240, 290)">
          <path d="M0,12 L35,12 L28,20 L5,20 Z" fill="#FFFDF7" stroke="#0B3D2E" strokeWidth="2" />
          <path d="M18,12 L18,-15 L32,8 Z" fill={activeTheme === 'midnight' ? '#FF007A' : '#FFD23F'} stroke="#0B3D2E" strokeWidth="1.5" />
        </g>

        {/* 5. ANIMATED OCEAN WATER & WAVE REFLECTIONS */}
        <rect x="0" y="320" width="1200" height="110" fill="url(#oceanGrad)" />

        {/* Wave Lines */}
        <g className="animate-wave">
          <path
            d="M 50,335 Q 120,328 190,335 T 330,335 T 470,335 T 610,335 T 750,335 T 890,335 T 1030,335 T 1170,335"
            fill="none"
            stroke="#FFFDF7"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
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

        {/* Shoreline Water Foam Line */}
        <path
          d="M0,425 Q400,410 800,425 T1200,420"
          fill="none"
          stroke="#FFFDF7"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 7. BEACH HUTS & COTTAGES (LEFT SIDE) */}
        <g transform="translate(-20, 390)">
          <path d="M40,110 L160,50 L280,110 L280,240 L40,240 Z" fill={activeTheme === 'midnight' ? '#1E293B' : '#0B523B'} stroke="#0B3D2E" strokeWidth="4" />
          <path d="M40,110 L160,50 L280,110" fill="none" stroke="#FFFDF7" strokeWidth="4" />
          <rect x="70" y="140" width="45" height="65" fill="#0B3D2E" stroke="#FFD23F" strokeWidth="3" rx="4" />
          <rect x="135" y="140" width="45" height="65" fill="#0B3D2E" stroke="#FFD23F" strokeWidth="3" rx="4" />
          <rect x="200" y="140" width="45" height="65" fill="#0B3D2E" stroke="#FFD23F" strokeWidth="3" rx="4" />
        </g>

        {/* 8. CENTRAL GOAN BEACH SHACK (NEON SIGN: "GOA BEACH" / "GOA NIGHT RAVE") */}
        <g transform="translate(740, 340)">
          <path d="M30,120 L150,70 L270,120 L270,240 L30,240 Z" fill={activeTheme === 'midnight' ? '#0F172A' : '#0E4A38'} stroke="#0B3D2E" strokeWidth="4" />
          <path d="M20,120 L150,60 L280,120 Z" fill="#FFFDF7" stroke="#0B3D2E" strokeWidth="4" />

          {/* NEON SIGNBOARD */}
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

        {/* NIGHT PARTY BEACH BONFIRE / FIRE LIGHTS (NIGHT THEME) */}
        {activeTheme === 'midnight' && (
          <g transform="translate(600, 480)">
            {/* Bonfire Logs */}
            <line x1="-15" y1="15" x2="15" y2="-5" stroke="#78350F" strokeWidth="5" />
            <line x1="-15" y1="-5" x2="15" y2="15" stroke="#78350F" strokeWidth="5" />
            {/* Glowing Flame */}
            <path d="M0,-5 Q-15,-25 0,-45 Q15,-25 0,-5 Z" fill="#FF4500" className="animate-bounce" />
            <path d="M0,-8 Q-8,-20 0,-32 Q8,-20 0,-8 Z" fill="#FFD23F" />
          </g>
        )}

        {/* 9. TALL VECTOR PALM TREES & JUNGLE FOLIAGE */}
        
        {/* LEFT PALM TREES & JUNGLE TREES */}
        <g className="animate-palm-left">
          <path
            d="M 120,650 Q 80,400 40,150"
            fill="none"
            stroke="#0B3D2E"
            strokeWidth="28"
            strokeLinecap="round"
          />
          <path
            d="M 120,650 Q 80,400 40,150"
            fill="none"
            stroke="#FFD23F"
            strokeWidth="5"
            strokeDasharray="15,10"
          />

          <g transform="translate(40, 150)">
            {[
              "M0,0 Q-120,-80 -190,0",
              "M0,0 Q-150,-40 -200,60",
              "M0,0 Q-80,-140 -120,-180",
              "M0,0 Q0,-160 80,-180",
              "M0,0 Q80,-120 150,-60"
            ].map((d, idx) => (
              <g key={idx}>
                <path d={d} fill="none" stroke={activeTheme === 'jungle' ? '#022C22' : '#04382A'} strokeWidth="16" strokeLinecap="round" />
                <path d={d} fill="none" stroke="#FFD23F" strokeWidth="3" />
              </g>
            ))}
          </g>
        </g>

        {/* RIGHT PALM TREES */}
        <g className="animate-palm-right">
          <path
            d="M 1080,650 Q 1120,400 1150,160"
            fill="none"
            stroke="#0B3D2E"
            strokeWidth="28"
            strokeLinecap="round"
          />
          <path
            d="M 1080,650 Q 1120,400 1150,160"
            fill="none"
            stroke="#FFD23F"
            strokeWidth="5"
            strokeDasharray="15,10"
          />

          <g transform="translate(1150, 160)">
            {[
              "M0,0 Q120,-80 190,0",
              "M0,0 Q150,-40 200,60",
              "M0,0 Q80,-140 120,-180",
              "M0,0 Q0,-160 -80,-180"
            ].map((d, idx) => (
              <g key={idx}>
                <path d={d} fill="none" stroke={activeTheme === 'jungle' ? '#022C22' : '#04382A'} strokeWidth="16" strokeLinecap="round" />
                <path d={d} fill="none" stroke="#FFD23F" strokeWidth="3" />
              </g>
            ))}
          </g>
        </g>
      </svg>
      
      {/* Bottom Subtitle Caption */}
      <div className="bg-[#062018] py-2.5 px-4 border-t border-[#FFD23F]/30 flex items-center justify-between text-xs font-mono text-[#D6DCCF]">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#FFD23F]" />
          <span>
            {activeTheme === 'jungle' && '🌿 JUNGLE CANOPY TREES • HACKER HOUSE GOA'}
            {activeTheme === 'sunset' && '🌅 GOAN SUNSET GLOW • HACKER HOUSE GOA'}
            {activeTheme === 'midnight' && '🎉 NIGHT RAVE BEACH PARTY • HACKER HOUSE GOA'}
          </span>
        </div>
        <span className="text-[#FFD23F] font-bold">15.2993° N, 74.1240° E • #FrameInGoa</span>
      </div>
    </div>
  );
};
