'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Users, Crop, Sparkles, Check, Code, MapPin, 
  Instagram, Twitter, Github, Linkedin, RefreshCw, Globe, ChevronRight, Dices, ArrowRight, Plus, Heart, Palette
} from 'lucide-react';
import { motion } from 'framer-motion';
import { StudioState, PassMode, TeamSize, ExportFormat, PassTheme } from '@/types/builder';
import { 
  SEARCHABLE_TECH_STACKS, 
  PRESET_HOBBIES,
  PRESET_ROLES, 
  BUILDER_TITLES, 
  getRandomBuilderTitle, 
  getRandomMotto,
  generateHHGoaID,
  createEmptyStudioState,
  DEFAULT_CROP_ADJUSTMENTS
} from '@/utils/aiGenerator';
import { renderBuilderPass, renderTeamPass, renderProfileFrame, renderInstagramStory } from './CanvasRenderer';
import { ImageCropModal } from '../cropper/ImageCropModal';
import { PreviewExportModal } from './PreviewExportModal';
import { playCameraShutterSound } from '@/utils/audio';

interface IdentityGeneratorProps {
  currentMode?: PassMode;
  onModeChange?: (mode: PassMode) => void;
}

export const IdentityGenerator: React.FC<IdentityGeneratorProps> = ({
  currentMode,
  onModeChange,
}) => {
  const [state, setState] = useState<StudioState>(() => createEmptyStudioState());

  const [techSearch, setTechSearch] = useState('');
  const [customTechInput, setCustomTechInput] = useState('');
  const [allTechOptions, setAllTechOptions] = useState<string[]>(SEARCHABLE_TECH_STACKS);

  const [customHobbyInput, setCustomHobbyInput] = useState('');
  const [allHobbyOptions, setAllHobbyOptions] = useState<string[]>(PRESET_HOBBIES);

  const [activeCropTarget, setActiveCropTarget] = useState<'solo' | number | null>(null);
  const [cropperRawImage, setCropperRawImage] = useState<string | null>(null);
  
  const [livePreviewUrl, setLivePreviewUrl] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync external mode from ExpeditionSelector if provided
  useEffect(() => {
    if (currentMode && currentMode !== state.mode) {
      setState((prev) => ({
        ...prev,
        mode: currentMode,
        selectedExportFormat: currentMode === 'team' ? 'team-pass' : 'builder-pass',
      }));
    }
  }, [currentMode]);

  // Client-side hydration initialization for Builder ID
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      builderId: generateHHGoaID(),
      generatedAt: new Date().toISOString(),
    }));
  }, []);

  // Live Canvas Rendering Effect (Canva-like live update)
  useEffect(() => {
    let isMounted = true;
    const updatePreview = async () => {
      const canvas = canvasRef.current || document.createElement('canvas');
      let dataUrl: string;

      if (state.mode === 'team') {
        dataUrl = await renderTeamPass(state, canvas);
      } else {
        if (state.selectedExportFormat === 'circle-frame') {
          dataUrl = await renderProfileFrame(state, canvas);
        } else if (state.selectedExportFormat === 'instagram-story') {
          dataUrl = await renderInstagramStory(state, canvas);
        } else {
          dataUrl = await renderBuilderPass(state, canvas);
        }
      }

      if (isMounted) {
        setLivePreviewUrl(dataUrl);
      }
    };

    updatePreview();
    return () => {
      isMounted = false;
    };
  }, [state]);

  // Rotate Title Client-Side
  const randomizeTitle = () => {
    const newTitle = getRandomBuilderTitle();
    setState((prev) => ({
      ...prev,
      solo: { ...prev.solo, title: newTitle },
    }));
  };

  // Randomize Motto Suggestion
  const randomizeMotto = () => {
    const newMotto = getRandomMotto();
    setState((prev) => ({
      ...prev,
      solo: { ...prev.solo, motto: newMotto },
    }));
  };

  // File Select Handler with automatic pre-scaling to max 1000px
  const handleFileChange = (target: 'solo' | number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          const rawUrl = evt.target.result as string;
          const img = new Image();
          img.onload = () => {
            const maxDim = 1000;
            if (img.width > maxDim || img.height > maxDim) {
              const canvas = document.createElement('canvas');
              const scale = Math.min(maxDim / img.width, maxDim / img.height);
              canvas.width = Math.round(img.width * scale);
              canvas.height = Math.round(img.height * scale);
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const scaledUrl = canvas.toDataURL('image/jpeg', 0.9);
                setCropperRawImage(scaledUrl);
                setActiveCropTarget(target);
                return;
              }
            }
            setCropperRawImage(rawUrl);
            setActiveCropTarget(target);
          };
          img.src = rawUrl;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply Crop Result with shutter audio feedback
  const handleCropComplete = (croppedDataUrl: string) => {
    playCameraShutterSound();
    if (activeCropTarget === 'solo') {
      setState((prev) => ({
        ...prev,
        solo: { ...prev.solo, avatarUrl: croppedDataUrl },
      }));
    } else if (typeof activeCropTarget === 'number') {
      setState((prev) => {
        const updated = [...prev.teamMembers];
        updated[activeCropTarget] = {
          ...updated[activeCropTarget],
          avatarUrl: croppedDataUrl,
        };
        return { ...prev, teamMembers: updated };
      });
    }
    setCropperRawImage(null);
    setActiveCropTarget(null);
  };

  // Toggle Tech Stack Item
  const toggleTech = (tech: string) => {
    setState((prev) => {
      const current = prev.solo.techStack;
      const exists = current.includes(tech);
      const updated = exists ? current.filter((t) => t !== tech) : [...current, tech];
      return {
        ...prev,
        solo: { ...prev.solo, techStack: updated },
      };
    });
  };

  // Add Custom Tech Stack Option
  const handleAddCustomTech = () => {
    const trimmed = customTechInput.trim();
    if (!trimmed) return;
    if (!allTechOptions.includes(trimmed)) {
      setAllTechOptions((prev) => [trimmed, ...prev]);
    }
    if (!state.solo.techStack.includes(trimmed)) {
      toggleTech(trimmed);
    }
    setCustomTechInput('');
  };

  // Toggle Hobby Item
  const toggleHobby = (hobby: string) => {
    setState((prev) => {
      const current = prev.solo.hobbies || [];
      const exists = current.includes(hobby);
      const updated = exists ? current.filter((h) => h !== hobby) : [...current, hobby];
      return {
        ...prev,
        solo: { ...prev.solo, hobbies: updated },
      };
    });
  };

  // Add Custom Hobby Option
  const handleAddCustomHobby = () => {
    const trimmed = customHobbyInput.trim();
    if (!trimmed) return;
    if (!allHobbyOptions.includes(trimmed)) {
      setAllHobbyOptions((prev) => [trimmed, ...prev]);
    }
    if (!state.solo.hobbies?.includes(trimmed)) {
      toggleHobby(trimmed);
    }
    setCustomHobbyInput('');
  };

  // Filtered Tech Stack Chips
  const filteredTech = allTechOptions.filter((t) =>
    t.toLowerCase().includes(techSearch.toLowerCase())
  );

  const handleModeToggle = (mode: PassMode) => {
    setState((prev) => ({
      ...prev,
      mode,
      selectedExportFormat: mode === 'team' ? 'team-pass' : 'builder-pass',
    }));
    if (onModeChange) {
      onModeChange(mode);
    }
  };

  const handleGeneratePassClick = () => {
    playCameraShutterSound();
    setIsPreviewModalOpen(true);
  };

  return (
    <section id="generator" className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hhgoa-card border border-hhgoa-border text-xs font-mono text-hhgoa-yellow">
            <Sparkles className="w-3.5 h-3.5" />
            BUILDER DETAILS FORM & LIVE PREVIEW
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight text-hhgoa-light">
            Tell Us About <span className="editorial-gradient-text">Yourself</span>
          </h2>
          <p className="text-hhgoa-muted text-base sm:text-lg max-w-2xl mx-auto font-sans">
            Fill in your details below. Every edit updates the live canvas preview instantly in real time.
          </p>
        </div>

        {/* MODE SWITCHER TAB BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <div className="p-1.5 rounded-2xl bg-hhgoa-card border border-hhgoa-border flex items-center gap-2 shadow-md">
            <button
              type="button"
              onClick={() => handleModeToggle('solo')}
              className={`px-6 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                state.mode === 'solo'
                  ? 'bg-hhgoa-yellow text-hhgoa-dark shadow-expedition-yellow'
                  : 'text-hhgoa-muted hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              Solo Builder Pass
            </button>
            <button
              type="button"
              onClick={() => handleModeToggle('team')}
              className={`px-6 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                state.mode === 'team'
                  ? 'bg-hhgoa-yellow text-hhgoa-dark shadow-expedition-yellow'
                  : 'text-hhgoa-muted hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Team Expedition Pass (2-3 Members)
            </button>
          </div>

          {/* PALETTE THEME SWITCHER */}
          <div className="p-1.5 rounded-2xl bg-hhgoa-card border border-hhgoa-border flex items-center gap-1 shadow-md">
            <span className="px-2 text-xs font-mono text-hhgoa-yellow font-bold flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-hhgoa-yellow" /> Theme:
            </span>
            {[
              { id: 'jungle', label: '🌿 Jungle' },
              { id: 'sunset', label: '🌅 Sunset' },
              { id: 'midnight', label: '🌙 Midnight' },
            ].map((th) => (
              <button
                key={th.id}
                type="button"
                onClick={() => setState((prev) => ({ ...prev, theme: th.id as PassTheme }))}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  state.theme === th.id
                    ? 'bg-hhgoa-yellow text-hhgoa-dark shadow-expedition-yellow'
                    : 'text-hhgoa-muted hover:text-white'
                }`}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN STUDIO WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT FORM CONTROLS (7 Cols) */}
          <div className="lg:col-span-7 bg-hhgoa-card/85 backdrop-blur-2xl border border-hhgoa-border rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* SOLO BUILDER FORM */}
            {state.mode === 'solo' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-hhgoa-border pb-4">
                  <h3 className="font-serif font-bold text-2xl text-hhgoa-light">
                    Solo Builder Details
                  </h3>
                  <span className="font-mono text-xs text-hhgoa-yellow font-bold bg-hhgoa-yellow/10 px-3 py-1 rounded-md border border-hhgoa-yellow/30">
                    {state.builderId}
                  </span>
                </div>

                {/* Photo & Crop Action */}
                <div className="flex items-center gap-4">
                  <div className="relative w-22 h-22 rounded-2xl overflow-hidden border-2 border-hhgoa-yellow bg-hhgoa-bg flex-shrink-0 shadow-md flex items-center justify-center">
                    {state.solo.avatarUrl ? (
                      <img src={state.solo.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-2">
                        <User className="w-8 h-8 text-hhgoa-yellow mx-auto mb-1 opacity-70" />
                        <span className="text-[10px] font-mono text-hhgoa-muted block leading-tight">No Photo</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-hhgoa-light text-base">
                      Bring Your Portrait
                    </h4>
                    <p className="text-xs text-hhgoa-muted mb-2 font-mono">
                      Accepts PNG, JPG, JPEG, WEBP & HEIC. Precision crop & filter editor.
                    </p>
                    <label className="px-4 py-2 rounded-xl bg-hhgoa-secondary border border-hhgoa-border text-xs font-mono text-hhgoa-yellow cursor-pointer hover:border-hhgoa-yellow inline-flex items-center gap-2 font-bold shadow-sm">
                      <Crop className="w-4 h-4 text-hhgoa-yellow" />
                      Bring Your Portrait & Edit
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange('solo', e)}
                      />
                    </label>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-hhgoa-muted uppercase">Builder Name</label>
                    <input
                      type="text"
                      placeholder="Your Name Here"
                      value={state.solo.name}
                      onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, name: e.target.value } }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-white text-sm focus:outline-none focus:border-hhgoa-yellow font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-hhgoa-muted uppercase">Builder Title</label>
                      <button
                        type="button"
                        onClick={randomizeTitle}
                        className="text-[11px] font-mono text-hhgoa-yellow hover:underline flex items-center gap-1"
                      >
                        <Dices className="w-3 h-3" /> Rotate Title
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Builder Title (e.g. Neural Nomad)"
                      value={state.solo.title}
                      onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, title: e.target.value } }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-hhgoa-yellow font-mono font-bold text-sm focus:outline-none focus:border-hhgoa-yellow"
                    />
                  </div>
                </div>

                {/* Primary Role & College */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-hhgoa-muted uppercase">Primary Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Fullstack Architect"
                      value={state.solo.role}
                      onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, role: e.target.value } }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-white text-sm focus:outline-none focus:border-hhgoa-yellow font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-hhgoa-muted uppercase">College / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Bombay / Superteam"
                      value={state.solo.collegeOrOrg}
                      onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, collegeOrOrg: e.target.value } }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-white text-sm focus:outline-none focus:border-hhgoa-yellow font-sans"
                    />
                  </div>
                </div>

                {/* Location & Motto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-hhgoa-muted uppercase">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Goa, India / Bangalore"
                      value={state.solo.location}
                      onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, location: e.target.value } }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-white text-sm focus:outline-none focus:border-hhgoa-yellow font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-hhgoa-muted uppercase">Builder Motto</label>
                      <button
                        type="button"
                        onClick={randomizeMotto}
                        className="text-[11px] font-mono text-hhgoa-yellow hover:underline flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-hhgoa-yellow" /> ✨ Surprise Me
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Building non-stop until sunrise"
                      value={state.solo.motto}
                      onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, motto: e.target.value } }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-white text-sm focus:outline-none focus:border-hhgoa-yellow font-serif italic"
                    />
                  </div>
                </div>

                {/* SEARCHABLE TECH STACK & CUSTOM SKILL ADDER */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-mono text-hhgoa-muted uppercase">Select Capabilities & Stack:</label>
                    
                    {/* Add Custom Skill Input Bar */}
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="+ Add custom skill..."
                        value={customTechInput}
                        onChange={(e) => setCustomTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomTech();
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-hhgoa-bg border border-hhgoa-border text-xs text-white focus:outline-none focus:border-hhgoa-yellow font-mono w-40 sm:w-44"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomTech}
                        className="px-2.5 py-1 rounded-lg bg-hhgoa-yellow text-hhgoa-dark font-mono text-xs font-bold hover:bg-hhgoa-gold transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2.5 rounded-xl bg-hhgoa-bg border border-hhgoa-border">
                    {filteredTech.map((tech) => {
                      const isSelected = state.solo.techStack.includes(tech);
                      return (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => toggleTech(tech)}
                          className={`px-3 py-1 rounded-lg font-mono text-xs transition-all flex items-center gap-1 ${
                            isSelected
                              ? 'bg-hhgoa-yellow text-hhgoa-dark font-bold shadow-expedition-yellow'
                              : 'bg-hhgoa-secondary text-hhgoa-muted hover:text-white border border-hhgoa-border'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          {tech}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* HOBBIES & PASSIONS SECTION */}
                <div className="space-y-2 pt-2 border-t border-hhgoa-border/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-mono text-hhgoa-yellow uppercase font-bold flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-hhgoa-yellow" /> HOBBIES & PASSIONS
                    </label>

                    {/* Add Custom Hobby Input Bar */}
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="+ Add custom hobby..."
                        value={customHobbyInput}
                        onChange={(e) => setCustomHobbyInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomHobby();
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-hhgoa-bg border border-hhgoa-border text-xs text-white focus:outline-none focus:border-hhgoa-yellow font-mono w-40 sm:w-44"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomHobby}
                        className="px-2.5 py-1 rounded-lg bg-hhgoa-gold text-hhgoa-dark font-mono text-xs font-bold hover:bg-hhgoa-yellow transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2.5 rounded-xl bg-hhgoa-bg border border-hhgoa-border">
                    {allHobbyOptions.map((hobby) => {
                      const isSelected = state.solo.hobbies?.includes(hobby);
                      return (
                        <button
                          key={hobby}
                          type="button"
                          onClick={() => toggleHobby(hobby)}
                          className={`px-3 py-1 rounded-lg font-mono text-xs transition-all flex items-center gap-1 ${
                            isSelected
                              ? 'bg-hhgoa-gold text-hhgoa-dark font-bold shadow-expedition-yellow'
                              : 'bg-hhgoa-secondary text-hhgoa-muted hover:text-white border border-hhgoa-border'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          🌴 {hobby}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Social Handles */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-hhgoa-muted uppercase">Social Handles & Links</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-xs">
                      <Twitter className="w-4 h-4 text-hhgoa-yellow" />
                      <input
                        type="text"
                        placeholder="X handle"
                        value={state.solo.socials.x || ''}
                        onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, socials: { ...prev.solo.socials, x: e.target.value } } }))}
                        className="w-full bg-transparent text-white focus:outline-none font-sans"
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-xs">
                      <Github className="w-4 h-4 text-hhgoa-yellow" />
                      <input
                        type="text"
                        placeholder="GitHub username"
                        value={state.solo.socials.github || ''}
                        onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, socials: { ...prev.solo.socials, github: e.target.value } } }))}
                        className="w-full bg-transparent text-white focus:outline-none font-sans"
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-xs">
                      <Linkedin className="w-4 h-4 text-hhgoa-yellow" />
                      <input
                        type="text"
                        placeholder="LinkedIn handle"
                        value={state.solo.socials.linkedin || ''}
                        onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, socials: { ...prev.solo.socials, linkedin: e.target.value } } }))}
                        className="w-full bg-transparent text-white focus:outline-none font-sans"
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-hhgoa-bg border border-hhgoa-border text-xs">
                      <Instagram className="w-4 h-4 text-hhgoa-yellow" />
                      <input
                        type="text"
                        placeholder="Instagram handle"
                        value={state.solo.socials.instagram || ''}
                        onChange={(e) => setState((prev) => ({ ...prev, solo: { ...prev.solo, socials: { ...prev.solo.socials, instagram: e.target.value } } }))}
                        className="w-full bg-transparent text-white focus:outline-none font-sans"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TEAM EXPEDITION FORM */
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-hhgoa-border pb-4">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-hhgoa-light">
                      Expedition Team Details
                    </h3>
                    <p className="text-xs text-hhgoa-muted font-mono">
                      Configure 2 or 3 members for one official expedition pass.
                    </p>
                  </div>

                  {/* Team Size Toggle */}
                  <div className="p-1 rounded-xl bg-hhgoa-secondary border border-hhgoa-border flex gap-1">
                    <button
                      type="button"
                      onClick={() => setState((prev) => ({ ...prev, teamSize: 2 }))}
                      className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                        state.teamSize === 2 ? 'bg-hhgoa-yellow text-hhgoa-dark' : 'text-hhgoa-muted'
                      }`}
                    >
                      2 Members
                    </button>
                    <button
                      type="button"
                      onClick={() => setState((prev) => ({ ...prev, teamSize: 3 }))}
                      className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                        state.teamSize === 3 ? 'bg-hhgoa-yellow text-hhgoa-dark' : 'text-hhgoa-muted'
                      }`}
                    >
                      3 Members
                    </button>
                  </div>
                </div>

                {/* Member Input Fields */}
                <div className="space-y-6">
                  {state.teamMembers.slice(0, state.teamSize).map((m, idx) => (
                    <div key={m.id} className="p-4 rounded-2xl bg-hhgoa-bg border border-hhgoa-border space-y-4">
                      <div className="flex items-center justify-between border-b border-hhgoa-border/60 pb-2">
                        <span className="font-serif font-bold text-lg text-hhgoa-yellow">
                          Member #{idx + 1}
                        </span>
                        <label className="px-3 py-1 rounded-lg bg-hhgoa-secondary text-xs font-mono text-hhgoa-yellow cursor-pointer hover:border hover:border-hhgoa-yellow flex items-center gap-1">
                          <Crop className="w-3.5 h-3.5" /> Upload & Edit Photo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(idx, e)}
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder={`Member #${idx + 1} Name`}
                          value={m.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setState((prev) => {
                              const updated = [...prev.teamMembers];
                              updated[idx] = { ...updated[idx], name: val };
                              return { ...prev, teamMembers: updated };
                            });
                          }}
                          className="px-3.5 py-2 rounded-xl bg-hhgoa-card border border-hhgoa-border text-white text-xs focus:outline-none focus:border-hhgoa-yellow font-sans"
                        />
                        <input
                          type="text"
                          placeholder="Primary Role"
                          value={m.role}
                          onChange={(e) => {
                            const val = e.target.value;
                            setState((prev) => {
                              const updated = [...prev.teamMembers];
                              updated[idx] = { ...updated[idx], role: val };
                              return { ...prev, teamMembers: updated };
                            });
                          }}
                          className="px-3.5 py-2 rounded-xl bg-hhgoa-card border border-hhgoa-border text-white text-xs focus:outline-none focus:border-hhgoa-yellow font-sans"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export Format Selector Bar */}
            <div className="pt-4 border-t border-hhgoa-border space-y-3">
              <label className="text-xs font-mono text-hhgoa-muted uppercase block">
                Select Export Asset Format:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'builder-pass', label: 'Official Pass' },
                  { id: 'circle-frame', label: 'Circle PFP' },
                  { id: 'instagram-story', label: 'IG Story (9:16)' },
                  { id: 'team-pass', label: 'Team Pass' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setState((prev) => ({ ...prev, selectedExportFormat: fmt.id as ExportFormat }))}
                    className={`py-2 px-3 rounded-xl border font-mono text-xs font-bold transition-all ${
                      state.selectedExportFormat === fmt.id
                        ? 'bg-hhgoa-yellow text-hhgoa-dark border-hhgoa-yellow shadow-expedition-yellow'
                        : 'bg-hhgoa-bg border-hhgoa-border text-hhgoa-muted hover:text-white'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleGeneratePassClick}
              className="hhgoa-woven-btn text-base sm:text-lg w-full py-4 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-hhgoa-dark" />
              Generate Your Pass →
            </button>
          </div>

          {/* RIGHT CANVA-LIKE LIVE PREVIEW DISPLAY (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-hhgoa-yellow flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-hhgoa-yellow animate-ping" />
                REALTIME CANVAS PREVIEW
              </span>
              <span className="text-[11px] font-mono text-hhgoa-muted">
                1080x1080 High-DPI Output
              </span>
            </div>

            <div className="relative rounded-3xl overflow-hidden border-2 border-hhgoa-yellow/60 shadow-expedition-yellow bg-hhgoa-bg p-2 group">
              {livePreviewUrl ? (
                <img
                  src={livePreviewUrl}
                  alt="Live Realtime Preview"
                  className="w-full h-auto rounded-2xl object-contain shadow-lg"
                />
              ) : (
                <div className="w-full aspect-square bg-hhgoa-secondary flex items-center justify-center text-hhgoa-muted text-xs">
                  Rendering Canvas...
                </div>
              )}
            </div>

            <p className="text-center text-xs text-hhgoa-muted font-mono">
              Live empty template preview. Renders your details instantly as you type.
            </p>
          </div>

        </div>

      </div>

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={cropperRawImage !== null}
        imageSrc={cropperRawImage}
        onClose={() => setCropperRawImage(null)}
        onCropComplete={handleCropComplete}
      />

      {/* Preview & Export Modal */}
      <PreviewExportModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        state={state}
        previewDataUrl={livePreviewUrl}
      />
    </section>
  );
};
