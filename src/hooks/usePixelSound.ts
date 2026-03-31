'use client';

import { useSoundStore } from '@/store/useSoundStore';
import { useEffect, useRef } from 'react';

// Using simple audio API for 8-bit sound generation instead of external files
// to avoid missing file errors
export function usePixelSound() {
  const soundEnabled = useSoundStore((state) => state.soundEnabled);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioCtxRef.current) {
      // @ts-expect-error window.webkitAudioContext is not standard
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
  }, []);

  const playTone = (freq: number, type: OscillatorType, duration: number, vol = 0.1) => {
    if (!soundEnabled || !audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playClick = () => {
    playTone(600, 'square', 0.1, 0.05);
  };

  const playHover = () => {
    playTone(800, 'sine', 0.05, 0.02);
  };

  const playSuccess = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    
    // Arpeggio up
    playTone(440, 'square', 0.1, 0.05);
    setTimeout(() => playTone(554, 'square', 0.1, 0.05), 100);
    setTimeout(() => playTone(659, 'square', 0.2, 0.05), 200);
    setTimeout(() => playTone(880, 'square', 0.4, 0.05), 300);
  };

  const playCoin = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    playTone(988, 'square', 0.1, 0.05);
    setTimeout(() => playTone(1319, 'square', 0.3, 0.05), 100);
  };

  const playError = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    playTone(300, 'sawtooth', 0.2, 0.1);
    setTimeout(() => playTone(250, 'sawtooth', 0.4, 0.1), 150);
  };

  return { playClick, playHover, playSuccess, playCoin, playError };
}
