import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GalleryState {
  unlockedIds: number[];
  unlockArt: (id: number) => void;
}

export const useGalleryStore = create<GalleryState>()(
  persist(
    (set) => ({
      unlockedIds: [1], // Initially unlock the first one
      unlockArt: (id: number) => set((state) => ({
        unlockedIds: state.unlockedIds.includes(id) ? state.unlockedIds : [...state.unlockedIds, id]
      }))
    }),
    {
      name: 'pixel-gallery-storage'
    }
  )
);