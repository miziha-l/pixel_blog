'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AiEmployee, AiMission, AiRun, AiRunEvent, AiRunPlan, AiWallet, AiWorld } from '@/features/ai/types';
import { buildRunPlan, materializeEvent, settleRun } from '@/features/ai/simulate';

type AiFilters = {
  difficulty?: number | null;
  recommendKey?: string | null;
};

type AiState = {
  ownerUserId: string | null;
  hydrated: boolean;

  setHydrated: (v: boolean) => void;

  world: AiWorld | null;
  wallet: AiWallet | null;
  employees: AiEmployee[];
  missions: AiMission[];
  runs: AiRun[];
  events: AiRunEvent[];

  activeMissionId: string | null;
  selectedEmployeeIds: string[];
  activeRunId: string | null;
  runPlans: Record<string, AiRunPlan>;
  missionFilters: AiFilters;

  ensureSeeded: (userId: string) => void;
  setActiveMission: (missionId: string | null) => void;
  toggleSelectEmployee: (employeeId: string) => void;
  clearSelection: () => void;
  setMissionFilters: (filters: Partial<AiFilters>) => void;

  startRun: (input: { missionId: string; employeeIds: string[] }) => { ok: true; runId: string } | { ok: false; reason: string };
  appendNextPlannedEvent: (runId: string) => { done: boolean; lastAppended?: AiRunEvent };
  settleActiveRun: (runId: string) => { ok: true } | { ok: false; reason: string };
  cancelRun: (runId: string) => void;

  upgradeEmployee: (employeeId: string) => { ok: true } | { ok: false; reason: string };
  saveEmployeeLoadout: (employeeId: string, loadout: Record<string, string | null>) => { ok: true } | { ok: false; reason: string };
};

const isoNow = () => new Date().toISOString();

const makeId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return `${prefix}_${crypto.randomUUID()}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const seedForUser = (userId: string) => {
  const now = isoNow();
  const world: AiWorld = {
    id: 'w_alpha',
    name: 'ALPHA-SECTOR',
    seasonNo: 1,
    progress: 520,
    day: 7,
    createdAt: now,
  };

  const wallet: AiWallet = {
    balances: {
      energy: 18,
      coins: 260,
      material: 36,
      reputation: 4,
    },
    updatedAt: now,
  };

  const employees: AiEmployee[] = [
    {
      id: 'e_aya',
      name: 'AYA',
      role: 'Analyst',
      rarity: 'SR',
      level: 6,
      exp: 42,
      stamina: 10,
      status: 'idle',
      traits: ['冷静', '高专注'],
      stats: { logic: 14, social: 6, craft: 8 },
      loadout: { slot1: 'LOG-BOOST', slot2: null, slot3: null, slot4: null },
      updatedAt: now,
      createdAt: now,
    },
    {
      id: 'e_mio',
      name: 'MIO',
      role: 'Operator',
      rarity: 'R',
      level: 4,
      exp: 10,
      stamina: 12,
      status: 'idle',
      traits: ['社牛', '救火队'],
      stats: { logic: 7, social: 13, craft: 6 },
      loadout: { slot1: 'SOCIAL-BOOST', slot2: null, slot3: null, slot4: null },
      updatedAt: now,
      createdAt: now,
    },
    {
      id: 'e_ren',
      name: 'REN',
      role: 'Crafter',
      rarity: 'SSR',
      level: 8,
      exp: 78,
      stamina: 9,
      status: 'idle',
      traits: ['匠心', '稳健'],
      stats: { logic: 10, social: 8, craft: 16 },
      loadout: { slot1: 'CRAFT-BOOST', slot2: 'STAMINA-PACK', slot3: null, slot4: null },
      updatedAt: now,
      createdAt: now,
    },
  ];

  const missions: AiMission[] = [
    {
      id: 'm_1',
      name: '边境巡检',
      difficulty: 1,
      costStamina: 2,
      durationSec: 60,
      recommend: { social: 8 },
      rewardPreview: { coins: 38, material: 6, reputation: 1 },
      isActive: true,
    },
    {
      id: 'm_2',
      name: '数据回收',
      difficulty: 2,
      costStamina: 3,
      durationSec: 90,
      recommend: { logic: 10, craft: 8 },
      rewardPreview: { coins: 56, material: 12, reputation: 2 },
      isActive: true,
    },
    {
      id: 'm_3',
      name: '异常应答',
      difficulty: 3,
      costStamina: 4,
      durationSec: 120,
      recommend: { logic: 14, social: 10 },
      rewardPreview: { coins: 80, material: 16, reputation: 3 },
      isActive: true,
    },
    {
      id: 'm_4',
      name: '节点攻坚',
      difficulty: 4,
      costStamina: 5,
      durationSec: 150,
      recommend: { craft: 16, logic: 12 },
      rewardPreview: { coins: 110, material: 24, reputation: 4 },
      isActive: true,
    },
    {
      id: 'm_5',
      name: '主线交付',
      difficulty: 5,
      costStamina: 6,
      durationSec: 180,
      recommend: { logic: 16, social: 14, craft: 16 },
      rewardPreview: { coins: 160, material: 32, reputation: 6 },
      isActive: true,
    },
  ];

  return { ownerUserId: userId, world, wallet, employees, missions, runs: [] as AiRun[], events: [] as AiRunEvent[] };
};

export const useAiWorldStore = create<AiState>()(
  persist(
    (set, get) => ({
      ownerUserId: null,
      hydrated: false,

      setHydrated: (v) => set({ hydrated: v }),

      world: null,
      wallet: null,
      employees: [],
      missions: [],
      runs: [],
      events: [],

      activeMissionId: null,
      selectedEmployeeIds: [],
      activeRunId: null,
      runPlans: {},
      missionFilters: { difficulty: null, recommendKey: null },

      ensureSeeded: (userId) => {
        const state = get();
        if (!state.ownerUserId || state.ownerUserId !== userId) {
          const seeded = seedForUser(userId);
          set({
            ...seeded,
            activeMissionId: null,
            selectedEmployeeIds: [],
            activeRunId: null,
            runPlans: {},
            missionFilters: { difficulty: null, recommendKey: null },
          });
          return;
        }
        if (!state.world || !state.wallet || state.employees.length === 0 || state.missions.length === 0) {
          const seeded = seedForUser(userId);
          set({
            ...seeded,
            activeMissionId: state.activeMissionId,
            selectedEmployeeIds: state.selectedEmployeeIds,
            activeRunId: state.activeRunId,
            runPlans: state.runPlans,
            missionFilters: state.missionFilters,
          });
        }

        const running = get().runs.filter((r) => r.status === 'running');
        if (running.length > 0) {
          const first = running[0];
          set({ activeRunId: first.id });
        }
      },

      setActiveMission: (missionId) => set({ activeMissionId: missionId }),

      toggleSelectEmployee: (employeeId) => {
        const state = get();
        const exists = state.selectedEmployeeIds.includes(employeeId);
        const next = exists ? state.selectedEmployeeIds.filter((id) => id !== employeeId) : [...state.selectedEmployeeIds, employeeId];
        set({ selectedEmployeeIds: next });
      },

      clearSelection: () => set({ selectedEmployeeIds: [] }),

      setMissionFilters: (filters) => set({ missionFilters: { ...get().missionFilters, ...filters } }),

      startRun: ({ missionId, employeeIds }) => {
        const state = get();
        if (!state.world || !state.wallet) return { ok: false, reason: '世界尚未初始化' };

        const mission = state.missions.find((m) => m.id === missionId);
        if (!mission || !mission.isActive) return { ok: false, reason: '任务不可用' };
        if (employeeIds.length === 0) return { ok: false, reason: '请选择员工' };
        if (state.runs.some((r) => r.status === 'running')) return { ok: false, reason: '已有执行中的派遣' };

        const employees = employeeIds
          .map((id) => state.employees.find((e) => e.id === id))
          .filter((v): v is AiEmployee => Boolean(v));

        if (employees.length !== employeeIds.length) return { ok: false, reason: '员工选择无效' };
        if (employees.some((e) => e.status !== 'idle')) return { ok: false, reason: '存在派遣中的员工' };
        if (employees.some((e) => e.stamina < mission.costStamina)) return { ok: false, reason: '存在体力不足的员工' };

        const runId = makeId('run');
        const startedAt = isoNow();
        const run: AiRun = {
          id: runId,
          missionId,
          employeeIds,
          status: 'running',
          startedAt,
          endedAt: null,
          result: null,
        };

        const nextEmployees = state.employees.map((e) => {
          if (!employeeIds.includes(e.id)) return e;
          return { ...e, status: 'running' as const, stamina: e.stamina - mission.costStamina, updatedAt: isoNow() };
        });

        const plan = buildRunPlan(runId, mission, employees);

        set({
          employees: nextEmployees,
          runs: [run, ...state.runs],
          activeRunId: runId,
          runPlans: { ...state.runPlans, [runId]: plan },
        });

        return { ok: true, runId };
      },

      appendNextPlannedEvent: (runId) => {
        const state = get();
        const plan = state.runPlans[runId];
        const run = state.runs.find((r) => r.id === runId);
        if (!plan || !run || run.status !== 'running') return { done: true };
        const existing = state.events.filter((e) => e.runId === runId).length;
        if (existing >= plan.plannedEvents.length) return { done: true };

        const base = plan.plannedEvents[existing];
        const ev = materializeEvent(base);
        set({ events: [...state.events, ev] });
        return { done: existing + 1 >= plan.plannedEvents.length, lastAppended: ev };
      },

      settleActiveRun: (runId) => {
        const state = get();
        if (!state.world || !state.wallet) return { ok: false, reason: '世界尚未初始化' };
        const run = state.runs.find((r) => r.id === runId);
        if (!run || run.status !== 'running') return { ok: false, reason: '派遣状态无效' };
        const mission = state.missions.find((m) => m.id === run.missionId);
        if (!mission) return { ok: false, reason: '任务不存在' };
        const employees = run.employeeIds
          .map((id) => state.employees.find((e) => e.id === id))
          .filter((v): v is AiEmployee => Boolean(v));
        if (employees.length !== run.employeeIds.length) return { ok: false, reason: '员工数据缺失' };

        const settlement = settleRun(runId, mission, employees, state.world.progress);

        const nextWorld: AiWorld = {
          ...state.world,
          progress: clamp(state.world.progress + settlement.worldDelta.progress, 0, 10000),
          day: state.world.day + settlement.worldDelta.dayDelta,
        };

        const nextWallet: AiWallet = {
          balances: {
            ...state.wallet.balances,
          },
          updatedAt: isoNow(),
        };
        for (const [k, d] of Object.entries(settlement.walletDelta)) {
          nextWallet.balances[k] = (nextWallet.balances[k] ?? 0) + d;
        }

        const nextEmployees = state.employees.map((e) => {
          const delta = settlement.employeeDelta[e.id];
          if (!delta) {
            return e;
          }

          const nextExp = e.exp + delta.expDelta;
          const nextLevel = e.level + delta.levelUp;
          const nextStats = { ...e.stats };
          if (delta.levelUp > 0) {
            nextStats.logic = (nextStats.logic ?? 0) + delta.levelUp * 2;
            nextStats.social = (nextStats.social ?? 0) + delta.levelUp * 1;
            nextStats.craft = (nextStats.craft ?? 0) + delta.levelUp * 2;
          }

          return {
            ...e,
            exp: nextExp,
            level: nextLevel,
            stats: nextStats,
            status: 'idle' as const,
            updatedAt: isoNow(),
          };
        });

        const endedAt = isoNow();
        const nextRuns = state.runs.map((r) => (r.id === runId ? { ...r, status: 'settled' as const, endedAt, result: settlement } : r));

        const lastT = state.events.filter((e) => e.runId === runId).reduce((m, e) => Math.max(m, e.t), 0);
        const resultEvent = materializeEvent({
          runId,
          t: lastT + 1,
          type: 'result',
          title: '结算结果',
          detail: settlement.summary,
        });

        set({
          world: nextWorld,
          wallet: nextWallet,
          employees: nextEmployees,
          runs: nextRuns,
          events: [...state.events, resultEvent],
          activeRunId: runId,
        });

        return { ok: true };
      },

      cancelRun: (runId) => {
        const state = get();
        const run = state.runs.find((r) => r.id === runId);
        if (!run || run.status !== 'running') return;
        const mission = state.missions.find((m) => m.id === run.missionId);
        const cost = mission?.costStamina ?? 0;
        const nextEmployees = state.employees.map((e) => {
          if (!run.employeeIds.includes(e.id)) return e;
          return { ...e, status: 'idle' as const, stamina: e.stamina + cost, updatedAt: isoNow() };
        });
        const nextRuns = state.runs.map((r) => (r.id === runId ? { ...r, status: 'cancelled' as const, endedAt: isoNow() } : r));
        set({ employees: nextEmployees, runs: nextRuns, activeRunId: null });
      },

      upgradeEmployee: (employeeId) => {
        const state = get();
        if (!state.wallet) return { ok: false, reason: '钱包未初始化' };
        const emp = state.employees.find((e) => e.id === employeeId);
        if (!emp) return { ok: false, reason: '员工不存在' };
        if (emp.status !== 'idle') return { ok: false, reason: '派遣中不可培养' };

        const costCoins = 20 + emp.level * 8;
        const costMat = 6 + Math.floor(emp.level / 2) * 2;
        const coins = state.wallet.balances.coins ?? 0;
        const material = state.wallet.balances.material ?? 0;
        if (coins < costCoins) return { ok: false, reason: '金币不足' };
        if (material < costMat) return { ok: false, reason: '材料不足' };

        const nextWallet: AiWallet = {
          balances: {
            ...state.wallet.balances,
            coins: coins - costCoins,
            material: material - costMat,
          },
          updatedAt: isoNow(),
        };

        const nextEmployees = state.employees.map((e) => {
          if (e.id !== employeeId) return e;
          return {
            ...e,
            level: e.level + 1,
            stats: {
              ...e.stats,
              logic: (e.stats.logic ?? 0) + 2,
              social: (e.stats.social ?? 0) + 1,
              craft: (e.stats.craft ?? 0) + 2,
            },
            updatedAt: isoNow(),
          };
        });

        set({ wallet: nextWallet, employees: nextEmployees });
        return { ok: true };
      },

      saveEmployeeLoadout: (employeeId, loadout) => {
        const state = get();
        const emp = state.employees.find((e) => e.id === employeeId);
        if (!emp) return { ok: false, reason: '员工不存在' };
        if (emp.status !== 'idle') return { ok: false, reason: '派遣中不可修改配置' };
        const nextEmployees = state.employees.map((e) => (e.id === employeeId ? { ...e, loadout: { ...loadout }, updatedAt: isoNow() } : e));
        set({ employees: nextEmployees });
        return { ok: true };
      },
    }),
    {
      name: 'ai_world_store_v1',
      version: 1,
      partialize: (state) => ({
        ownerUserId: state.ownerUserId,
        world: state.world,
        wallet: state.wallet,
        employees: state.employees,
        missions: state.missions,
        runs: state.runs,
        events: state.events,
        activeMissionId: state.activeMissionId,
        selectedEmployeeIds: state.selectedEmployeeIds,
        activeRunId: state.activeRunId,
        missionFilters: state.missionFilters,
      }),
      onRehydrateStorage: () => (state) => {
        state?.ensureSeeded(state.ownerUserId ?? 'local_user');
        state?.setHydrated(true);
      },
    }
  )
);

export const selectLastRun = (runs: AiRun[]) => {
  return runs.slice().sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1))[0] ?? null;
};
