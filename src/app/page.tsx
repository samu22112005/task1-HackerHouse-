'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ExpeditionSelector } from '@/components/sections/ExpeditionSelector';
import { IdentityGenerator } from '@/components/generator/IdentityGenerator';
import { Features } from '@/components/sections/Features';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/layout/Footer';
import { PassMode } from '@/types/builder';

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<PassMode>('solo');

  return (
    <main className="min-h-screen flex flex-col justify-between relative overflow-hidden">
      <Navbar />
      <div className="space-y-12">
        <Hero />
        <ExpeditionSelector 
          currentMode={selectedMode} 
          onSelectMode={(mode) => setSelectedMode(mode)} 
        />
        <IdentityGenerator 
          currentMode={selectedMode} 
          onModeChange={(mode) => setSelectedMode(mode)} 
        />
        <Features />
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
