// Web Audio API procedural camera shutter click synthesizer

let audioCtx: AudioContext | null = null;

export function playCameraShutterSound() {
  try {
    if (typeof window === 'undefined') return;

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtx) {
      audioCtx = new AudioCtx();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // 1. Shutter Click Pulse (Noise)
    const bufferSize = audioCtx.sampleRate * 0.08;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3, now);

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.6, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.08);

    // 2. Secondary Mechanical Click Tone
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now + 0.02);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);

    oscGain.gain.setValueAtTime(0.3, now + 0.02);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);

    osc.start(now + 0.02);
    osc.stop(now + 0.07);
  } catch (e) {
    // Ignore audio autoplay restrictions gracefully
    console.debug('Audio feedback suppressed', e);
  }
}
