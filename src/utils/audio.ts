// Web Audio API procedural sound synthesizer for camera shutter clicks and beach ocean waves ambience

let audioCtx: AudioContext | null = null;
let wavesGainNode: GainNode | null = null;
let wavesOscillator: OscillatorNode | null = null;
let wavesNoiseSource: AudioBufferSourceNode | null = null;
let isBeachAudioPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;

  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playCameraShutterSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Shutter Click Pulse (Noise)
    const bufferSize = ctx.sampleRate * 0.08;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3, now);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.5, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.08);

    // 2. Secondary Mechanical Click Tone
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now + 0.02);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);

    oscGain.gain.setValueAtTime(0.25, now + 0.02);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now + 0.02);
    osc.stop(now + 0.07);
  } catch (e) {
    console.debug('Audio feedback suppressed', e);
  }
}

// Procedural Beach Waves & Tropical Chime Ambience
export function toggleBeachAmbience(onStateChange?: (playing: boolean) => void): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (isBeachAudioPlaying) {
      // Stop ambience
      if (wavesGainNode) {
        wavesGainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      }
      setTimeout(() => {
        try {
          wavesNoiseSource?.stop();
          wavesOscillator?.stop();
          wavesNoiseSource?.disconnect();
          wavesOscillator?.disconnect();
        } catch {}
      }, 500);

      isBeachAudioPlaying = false;
      onStateChange?.(false);
      return false;
    } else {
      // Start ocean waves simulation
      const bufferSize = ctx.sampleRate * 4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      wavesNoiseSource = ctx.createBufferSource();
      wavesNoiseSource.buffer = noiseBuffer;
      wavesNoiseSource.loop = true;

      // Lowpass Filter for Ocean Waves Rumble
      const waveFilter = ctx.createBiquadFilter();
      waveFilter.type = 'lowpass';
      waveFilter.frequency.setValueAtTime(350, ctx.currentTime);

      // Low Frequency LFO for Gentle Wave Swells
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.2; // 1 wave cycle every 5 seconds
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 200;
      lfo.connect(lfoGain);
      lfoGain.connect(waveFilter.frequency);
      lfo.start();

      wavesGainNode = ctx.createGain();
      wavesGainNode.gain.setValueAtTime(0.01, ctx.currentTime);
      wavesGainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1);

      wavesNoiseSource.connect(waveFilter);
      waveFilter.connect(wavesGainNode);
      wavesGainNode.connect(ctx.destination);

      wavesNoiseSource.start();

      // Soft Tropical Chime (Sine)
      wavesOscillator = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      wavesOscillator.type = 'sine';
      wavesOscillator.frequency.setValueAtTime(440, ctx.currentTime);
      chimeGain.gain.setValueAtTime(0.015, ctx.currentTime);

      wavesOscillator.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      wavesOscillator.start();

      isBeachAudioPlaying = true;
      onStateChange?.(true);
      return true;
    }
  } catch (e) {
    console.debug('Failed to toggle beach ambience', e);
    return false;
  }
}

export function isBeachAudioActive(): boolean {
  return isBeachAudioPlaying;
}
