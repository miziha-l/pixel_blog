import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlayerState {
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  addExp: (amount: number) => { leveledUp: boolean };
  deductExp: (amount: number) => boolean;
  takeDamage: (amount: number) => void;
  healHp: (amount: number) => void;
  deductMp: (amount: number) => boolean;
  restoreMp: (amount: number) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 100,
      maxHp: 100,
      mp: 50,
      maxMp: 50,
      addExp: (amount: number) => {
        const current = get();
        let newExp = current.exp + amount;
        let newLevel = current.level;
        let newMaxExp = current.maxExp;
        let newMaxHp = current.maxHp;
        let newMaxMp = current.maxMp;
        let leveledUp = false;

        while (newExp >= newMaxExp) {
          newExp -= newMaxExp;
          newLevel += 1;
          newMaxExp = Math.floor(newMaxExp * 1.5);
          newMaxHp += 20;
          newMaxMp += 10;
          leveledUp = true;
        }

        set({ 
          exp: newExp, 
          level: newLevel, 
          maxExp: newMaxExp,
          maxHp: newMaxHp,
          maxMp: newMaxMp,
          ...(leveledUp ? { hp: newMaxHp, mp: newMaxMp } : {}) // Full restore on level up
        });
        return { leveledUp };
      },
      deductExp: (amount: number) => {
        const current = get();
        if (current.exp >= amount) {
          set({ exp: current.exp - amount });
          return true;
        }
        return false;
      },
      takeDamage: (amount: number) => {
        set((state) => ({ hp: Math.max(0, state.hp - amount) }));
      },
      healHp: (amount: number) => {
        set((state) => ({ hp: Math.min(state.maxHp, state.hp + amount) }));
      },
      deductMp: (amount: number) => {
        const current = get();
        if (current.mp >= amount) {
          set({ mp: current.mp - amount });
          return true;
        }
        return false;
      },
      restoreMp: (amount: number) => {
        set((state) => ({ mp: Math.min(state.maxMp, state.mp + amount) }));
      }
    }),
    {
      name: 'pixel-player-storage',
    }
  )
);
