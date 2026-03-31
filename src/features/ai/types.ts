export type AiWorld = {
  id: string;
  name: string;
  seasonNo: number;
  progress: number;
  day: number;
  createdAt: string;
};

export type AiWallet = {
  balances: Record<string, number>;
  updatedAt: string;
};

export type AiEmployeeStatus = 'idle' | 'running';

export type AiEmployee = {
  id: string;
  name: string;
  role: string;
  rarity: 'N' | 'R' | 'SR' | 'SSR';
  level: number;
  exp: number;
  stamina: number;
  status: AiEmployeeStatus;
  traits: string[];
  stats: Record<string, number>;
  loadout: Record<string, string | null>;
  updatedAt: string;
  createdAt: string;
};

export type AiMission = {
  id: string;
  name: string;
  difficulty: number;
  costStamina: number;
  durationSec: number;
  recommend: Record<string, number>;
  rewardPreview: Record<string, number>;
  isActive: boolean;
};

export type AiRunStatus = 'running' | 'settled' | 'cancelled';

export type AiRun = {
  id: string;
  missionId: string;
  employeeIds: string[];
  status: AiRunStatus;
  startedAt: string;
  endedAt: string | null;
  result: AiSettlement | null;
};

export type AiRunEvent = {
  id: string;
  runId: string;
  t: number;
  type: 'encounter' | 'progress' | 'challenge' | 'loot' | 'boss' | 'result';
  title: string;
  detail: string;
  createdAt: string;
};

export type AiSettlement = {
  success: boolean;
  summary: string;
  walletDelta: Record<string, number>;
  worldDelta: { progress: number; dayDelta: number };
  employeeDelta: Record<
    string,
    {
      expDelta: number;
      levelUp: number;
      staminaDelta: number;
    }
  >;
};

export type AiRunPlan = {
  runId: string;
  totalTicks: number;
  tickMs: number;
  plannedEvents: Omit<AiRunEvent, 'id' | 'createdAt'>[];
};

