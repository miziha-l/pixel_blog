import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerState {
  level: number;
  exp: number;
  maxExp: number;
  addExp: (amount: number) => { leveledUp: boolean };
  deductExp: (amount: number) => boolean;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      level: 1,
      exp: 0,
      maxExp: 100,
      addExp: (amount: number) => {
        const current = get();
        let newExp = current.exp + amount;
        let newLevel = current.level;
        let newMaxExp = current.maxExp;
        let leveledUp = false;

        while (newExp >= newMaxExp) {
          newExp -= newMaxExp;
          newLevel += 1;
          newMaxExp = Math.floor(newMaxExp * 1.5);
          leveledUp = true;
        }

        set({ exp: newExp, level: newLevel, maxExp: newMaxExp });
        return { leveledUp };
      },
      deductExp: (amount: number) => {
        const current = get();
        if (current.exp >= amount) {
          set({ exp: current.exp - amount });
          return true;
        }
        return false;
      }
    }),
    {
      name: 'pixel-player-storage',
    }
  )
);
