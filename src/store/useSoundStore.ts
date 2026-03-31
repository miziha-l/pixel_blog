import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SoundState {
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      soundEnabled: true,
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: 'pixel-sound-storage',
    }
  )
);
