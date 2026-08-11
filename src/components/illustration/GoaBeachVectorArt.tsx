'use client';

import React, { useState } from 'react';
import { Sparkles, Sun, Volume2, VolumeX, Compass, Layers } from 'lucide-react';
import { toggleBeachAmbience, isBeachAudioActive } from '@/utils/audio';

export const GoaBeachVectorArt: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');

  const handleAudioToggle = () => {
    const newState = toggleBeachAmbience((playing) => setIsPlayingAudio(playing));
    setIsPlayingAudio(newState);
  };

  // Color mapping based on timeOfDay preset
  const skyBg = timeOfDay === 'sunset' 
    ? 'from-[#7C2D12] via-[#0B3D2E] to-[#062018]' 
    : timeOfDay === 'night'
    ? 'from-[#0F172A] via-[#0B3D2E] to-[#020617]'
    : 'from-[#0B3D2E] via-[#0E4A38] to-[#062018]';

  const sunColor = timeOfDay === 'sunset' ? '#FF4500' : timeOfDay === 'night' ? '#38BDF8' : '#FFD23F';

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-4 border-[#FFD23F]/80 shadow-2xl bg-[#0B3D2E] select-none group">
      
      {/* Top Banner Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3D2E]/90 backdrop-blur-md border border-[#FFD23F]/50 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFD23F] animate-ping" />
          <span className="font-mono text-xs font-bold text-[#FFD23F] tracking-wider uppercase">
            HACKER HOUSE GOA BEACH SCENE
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Time of Day Toggle */}
          <div className="p-1 rounded-xl bg-[#0B3D2E]/90 border border-[#2E5A46] flex gap-1">
            <button
              onClick={() => setTimeOfDay('day')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                timeOfDay === 'day' ? 'bg-[#FFD23F] text-[#0B3D2E]' : 'text-[#D6DCCF] hover:text-white'
              }`}
              title="Tropical Day Sun"
            >
              ☀️ Day
            </button>
            <button
              onClick={() => setTimeOfDay('sunset')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                timeOfDay === 'sunset' ? 'bg-[#FF007A] text-white' : 'text-[#D6DCCF] hover:text-white'
              }`}
              title="Sunset Vibes"
            >
              🌅 Sunset
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                timeOfDay === 'night' ? 'bg-[#38BDF8] text-[#0B3D2E]' : 'text-[#D6DCCF] hover:text-white'
              }`}
              title="Midnight Palms"
            >
              🌙 Night
            </button>
          </div>

          {/* Beach Audio Ambience Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
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
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Sunburst Gradient Pattern */}
          <linearGradient id="sunbeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={sunColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0B3D2E" stopOpacity="0" />
          </linearGradient>

          {/* Ocean Water Gradient */}
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#0B523B" />
            <stop offset="100%" stopColor="#063828" />
          </linearGradient>

          {/* Sand Beach Gradient */}
          <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5F5F4" />
            <stop offset="100%" stopColor="#E7E5E4" />
          </linearGradient>
        </defs>

        {/* 1. RADIATING SUNBURST RAYS (ROTATING ANIMATED LAYER) */}
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

        {/* 2. GIANT GOLDEN SUN */}
        <circle
          cx="600"
          cy="210"
          r="115"
          fill={sunColor}
          filter="url(#sunGlow)"
          className="transition-colors duration-700"
        />
        {/* Sun Outer Rim Ring */}
        <circle
          cx="600"
          cy="210"
          r="124"
          fill="none"
          stroke={sunColor}
          strokeWidth="3"
          strokeOpacity="0.6"
        />

        {/* 3. DISTANT TROPICAL HILLS (BACKGROUND SILHOUETTES) */}
        <path
          d="M0,290 Q200,240 420,280 T800,265 T1200,285 L1200,320 L0,320 Z"
          fill="#064E3B"
          opacity="0.85"
        />
        <path
          d="M0,300 Q300,260 620,295 T1200,290 L1200,340 L0,340 Z"
          fill="#04382A"
        />

        {/* 4. DRIFTING SAILBOAT ON HORIZON */}
        <g className="animate-sailboat" transform="translate(240, 290)">
          {/* Boat Hull */}
          <path d="M0,12 L35,12 L28,20 L5,20 Z" fill="#FFFDF7" stroke="#0B3D2E" strokeWidth="2" />
          {/* Sail */}
          <path d="M18,12 L18,-15 L32,8 Z" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="1.5" />
        </g>

        {/* 5. ANIMATED OCEAN WATER & WAVE REFLECTIONS */}
        <rect x="0" y="320" width="1200" height="110" fill="url(#oceanGrad)" />

        {/* Floating Ocean Wave Lines */}
        <g className="animate-wave">
          <path
            d="M 50,335 Q 120,328 190,335 T 330,335 T 470,335 T 610,335 T 750,335 T 890,335 T 1030,335 T 1170,335"
            fill="none"
            stroke="#FFFDF7"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 100,360 Q 180,352 260,360 T 420,360 T 580,360 T 740,360 T 900,360 T 1060,360"
            fill="none"
            stroke="#6EE7B7"
            strokeWidth="2.5"
            opacity="0.7"
          />
        </g>

        <g className="animate-wave-rev">
          <path
            d="M 20,385 Q 110,378 200,385 T 380,385 T 560,385 T 740,385 T 920,385 T 1100,385"
            fill="none"
            stroke="#FFFDF7"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 140,410 Q 230,402 320,410 T 500,410 T 680,410 T 860,410 T 1040,410"
            fill="none"
            stroke="#34D399"
            strokeWidth="2.5"
            opacity="0.75"
          />
        </g>

        {/* Sun Reflections on Water */}
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
          {/* Cottage 1 (Left Roof & Walls) */}
          <path d="M40,110 L160,50 L280,110 L280,240 L40,240 Z" fill="#0B523B" stroke="#0B3D2E" strokeWidth="4" />
          {/* Corrugated Roof Lines */}
          <path d="M40,110 L160,50 L280,110" fill="none" stroke="#FFFDF7" strokeWidth="4" />
          {[...Array(6)].map((_, i) => (
            <line
              key={i}
              x1={60 + i * 36}
              y1={100 - i * 8}
              x2={60 + i * 36}
              y2={240}
              stroke="#04382A"
              strokeWidth="2"
            />
          ))}
          {/* Window Frames */}
          <rect x="70" y="140" width="45" height="65" fill="#0B3D2E" stroke="#FFD23F" strokeWidth="3" rx="4" />
          <rect x="135" y="140" width="45" height="65" fill="#0B3D2E" stroke="#FFD23F" strokeWidth="3" rx="4" />
          <rect x="200" y="140" width="45" height="65" fill="#0B3D2E" stroke="#FFD23F" strokeWidth="3" rx="4" />
        </g>

        {/* 8. CENTRAL GOAN BEACH SHACK ("GOA BEACH" PINK NEON SIGNBOARD) */}
        <g transform="translate(740, 340)">
          {/* Shack Structure */}
          <path d="M30,120 L150,70 L270,120 L270,240 L30,240 Z" fill="#0E4A38" stroke="#0B3D2E" strokeWidth="4" />
          {/* Roof */}
          <path d="M20,120 L150,60 L280,120 Z" fill="#FFFDF7" stroke="#0B3D2E" strokeWidth="4" />
          <path d="M30,120 L270,120" stroke="#0B3D2E" strokeWidth="4" />

          {/* ICONIC GOA BEACH PINK SIGNBOARD WITH NEON GLOW */}
          <g className="animate-goa-sign" transform="translate(50, 95)">
            <rect x="0" y="0" width="170" height="36" rx="6" fill="#FF007A" stroke="#FFFDF7" strokeWidth="3" />
            <text
              x="85"
              y="25"
              textAnchor="middle"
              fill="#FFFDF7"
              fontSize="17"
              fontWeight="900"
              fontFamily="Space Grotesk, sans-serif"
              letterSpacing="2"
            >
              GOA BEACH
            </text>
          </g>

          {/* Shack Counter Window */}
          <rect x="55" y="145" width="160" height="70" fill="#062018" stroke="#FFFDF7" strokeWidth="3" rx="4" />
          {/* Person Silhouette inside Shack */}
          <circle cx="135" cy="170" r="14" fill="#FFFDF7" />
          <path d="M110,215 Q135,190 160,215 Z" fill="#FFFDF7" />

          {/* Counter Stools */}
          <rect x="75" y="215" width="18" height="25" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="2" />
          <rect x="125" y="215" width="18" height="25" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="2" />
          <rect x="175" y="215" width="18" height="25" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="2" />

          {/* Leaning Surfboards beside Shack */}
          <path d="M280,140 Q290,120 295,170 Q300,240 280,240 Z" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="3" />
          <path d="M295,140 Q305,120 310,170 Q315,240 295,240 Z" fill="#6EE7B7" stroke="#0B3D2E" strokeWidth="3" />
        </g>

        {/* 9. COTTAGES & VILLAS (RIGHT SIDE) */}
        <g transform="translate(940, 390)">
          <path d="M20,110 L140,50 L260,110 L260,240 L20,240 Z" fill="#04382A" stroke="#0B3D2E" strokeWidth="4" />
          <path d="M10,110 L140,45 L270,110" fill="none" stroke="#FFFDF7" strokeWidth="4" />
          {/* Windows */}
          <rect x="50" y="130" width="50" height="70" fill="#FF007A" stroke="#FFFDF7" strokeWidth="3" rx="4" />
          <rect x="150" y="130" width="50" height="70" fill="#FFD23F" stroke="#FFFDF7" strokeWidth="3" rx="4" />
        </g>

        {/* 10. BEACH ACCESSORIES: DECK CHAIRS & STRIPED UMBRELLAS */}
        <g transform="translate(200, 480)">
          {/* Deck Chair 1 */}
          <path d="M10,50 L40,25 L70,50" fill="none" stroke="#0B3D2E" strokeWidth="4" strokeLinecap="round" />
          <line x1="20" y1="50" x2="35" y2="25" stroke="#FFD23F" strokeWidth="4" />
          {/* Deck Chair 2 */}
          <path d="M80,50 L110,25 L140,50" fill="none" stroke="#0B3D2E" strokeWidth="4" strokeLinecap="round" />
          <line x1="90" y1="50" x2="105" y2="25" stroke="#FFD23F" strokeWidth="4" />

          {/* Yellow & White Striped Beach Umbrella 1 */}
          <line x1="55" y1="25" x2="55" y2="-45" stroke="#0B3D2E" strokeWidth="4" />
          <path d="M10,-45 Q55,-90 100,-45 Z" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="3" />
          <path d="M32.5,-45 Q55,-90 77.5,-45 Z" fill="#FFFDF7" stroke="#0B3D2E" strokeWidth="2" />
        </g>

        <g transform="translate(380, 500)">
          {/* Yellow & White Striped Beach Umbrella 2 */}
          <line x1="55" y1="25" x2="55" y2="-45" stroke="#0B3D2E" strokeWidth="4" />
          <path d="M10,-45 Q55,-90 100,-45 Z" fill="#FFD23F" stroke="#0B3D2E" strokeWidth="3" />
          <path d="M32.5,-45 Q55,-90 77.5,-45 Z" fill="#FFFDF7" stroke="#0B3D2E" strokeWidth="2" />
        </g>

        {/* 11. SILHOUETTES OF PEOPLE WALKING ON SAND */}
        <g transform="translate(140, 470)">
          <circle cx="12" cy="12" r="6" fill="#FFFDF7" />
          <line x1="12" y1="18" x2="12" y2="40" stroke="#FFFDF7" strokeWidth="3" />
          <line x1="12" y1="40" x2="5" y2="60" stroke="#FFFDF7" strokeWidth="3" />
          <line x1="12" y1="40" x2="19" y2="60" stroke="#FFFDF7" strokeWidth="3" />
        </g>

        <g transform="translate(1010, 480)">
          <circle cx="12" cy="12" r="6" fill="#FFFDF7" />
          <line x1="12" y1="18" x2="12" y2="40" stroke="#FFFDF7" strokeWidth="3" />
          <line x1="12" y1="40" x2="6" y2="58" stroke="#FFFDF7" strokeWidth="3" />
          <line x1="12" y1="40" x2="18" y2="58" stroke="#FFFDF7" strokeWidth="3" />
        </g>

        {/* 12. TALL VECTOR PALM TREES (SWAYING ANIMATION - LEFT & RIGHT FLANKS) */}
        
        {/* LEFT PALM TREES */}
        <g className="animate-palm-left" transform="translate(0, 0)">
          {/* Main Curved Trunk 1 */}
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
            strokeLinecap="round"
          />

          {/* Palm Fronds Cluster 1 */}
          <g transform="translate(40, 150)">
            {[
              "M0,0 Q-120,-80 -190,0",
              "M0,0 Q-150,-40 -200,60",
              "M0,0 Q-80,-140 -120,-180",
              "M0,0 Q0,-160 80,-180",
              "M0,0 Q80,-120 150,-60",
              "M0,0 Q120,-40 180,40"
            ].map((d, idx) => (
              <g key={idx}>
                <path d={d} fill="none" stroke="#04382A" strokeWidth="16" strokeLinecap="round" />
                <path d={d} fill="none" stroke="#FFD23F" strokeWidth="3" />
              </g>
            ))}
          </g>

          {/* Second Smaller Left Trunk */}
          <path
            d="M 320,650 Q 280,450 250,260"
            fill="none"
            stroke="#0B3D2E"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <path
            d="M 320,650 Q 280,450 250,260"
            fill="none"
            stroke="#FFD23F"
            strokeWidth="4"
            strokeDasharray="12,8"
          />
          <g transform="translate(250, 260)">
            {[
              "M0,0 Q-90,-60 -140,0",
              "M0,0 Q-60,-110 -90,-140",
              "M0,0 Q0,-120 60,-130",
              "M0,0 Q70,-80 120,-40"
            ].map((d, idx) => (
              <path key={idx} d={d} fill="none" stroke="#0B523B" strokeWidth="12" strokeLinecap="round" />
            ))}
          </g>
        </g>

        {/* RIGHT PALM TREES */}
        <g className="animate-palm-right" transform="translate(0, 0)">
          {/* Main Curved Trunk Right */}
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

          {/* Palm Fronds Cluster Right */}
          <g transform="translate(1150, 160)">
            {[
              "M0,0 Q120,-80 190,0",
              "M0,0 Q150,-40 200,60",
              "M0,0 Q80,-140 120,-180",
              "M0,0 Q0,-160 -80,-180",
              "M0,0 Q-80,-120 -150,-60",
              "M0,0 Q-120,-40 -180,40"
            ].map((d, idx) => (
              <g key={idx}>
                <path d={d} fill="none" stroke="#04382A" strokeWidth="16" strokeLinecap="round" />
                <path d={d} fill="none" stroke="#FFD23F" strokeWidth="3" />
              </g>
            ))}
          </g>

          {/* Secondary Right Trunk */}
          <path
            d="M 910,650 Q 940,460 970,290"
            fill="none"
            stroke="#0B3D2E"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 910,650 Q 940,460 970,290"
            fill="none"
            stroke="#FFD23F"
            strokeWidth="3.5"
            strokeDasharray="10,6"
          />
          <g transform="translate(970, 290)">
            {[
              "M0,0 Q80,-50 120,0",
              "M0,0 Q50,-90 80,-120",
              "M0,0 Q0,-100 -50,-110",
              "M0,0 Q-60,-70 -100,-30"
            ].map((d, idx) => (
              <path key={idx} d={d} fill="none" stroke="#0B523B" strokeWidth="11" strokeLinecap="round" />
            ))}
          </g>
        </g>
      </svg>
      
      {/* Bottom Subtitle Caption */}
      <div className="bg-[#062018] py-2 px-4 border-t border-[#FFD23F]/30 flex items-center justify-between text-xs font-mono text-[#D6DCCF]">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#FFD23F]" />
          <span>OFFICIAL HACKER HOUSE GOA VECTOR SCENE</span>
        </div>
        <span className="text-[#FFD23F] font-bold">15.2993° N, 74.1240° E • #FrameInGoa</span>
      </div>
    </div>
  );
};
