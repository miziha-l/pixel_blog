import type { AiEmployee, AiMission, AiRunEvent, AiRunPlan, AiSettlement } from '@/features/ai/types';

const nowIso = () => new Date().toISOString();

const hashSeed = (input: string) => {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const makeRng = (seed: number) => {
  let x = seed || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 10000) / 10000;
  };
};

export const calcTeamScore = (employees: AiEmployee[], recommend: Record<string, number>) => {
  const keys = Object.keys(recommend);
  if (keys.length === 0) return 0;
  let sum = 0;
  for (const k of keys) {
    const t = recommend[k] ?? 0;
    const v = employees.reduce((acc, e) => acc + (e.stats[k] ?? 0), 0);
    sum += Math.min(1.4, v / Math.max(1, t));
  }
  return sum / keys.length;
};

export const buildRunPlan = (runId: string, mission: AiMission, employees: AiEmployee[]): AiRunPlan => {
  const rng = makeRng(hashSeed(runId));
  const score = calcTeamScore(employees, mission.recommend);
  const totalTicks = Math.max(6, Math.min(14, Math.round(mission.durationSec / 12)));
  const tickMs = 650;
  const types: AiRunEvent['type'][] = ['encounter', 'progress', 'challenge', 'loot'];
  const titles = {
    encounter: ['野外信号', '异常请求', '迷雾数据包', '路口巡检'],
    progress: ['推进路线', '同步情报', '校准坐标', '扫清障碍'],
    challenge: ['突发难题', '对抗干扰', '校验权限', '压测边界'],
    loot: ['拾取素材', '发现缓存', '回收奖励', '解锁箱子'],
    boss: ['核心事件', '世界节点', '主线关卡', '关键交付'],
    result: ['结算完成', '回到基地', '数据归档', '阶段结束'],
  } as const;

  const plannedEvents: Omit<AiRunEvent, 'id' | 'createdAt'>[] = [];
  for (let i = 0; i < totalTicks - 1; i += 1) {
    const t = i + 1;
    const baseType = types[Math.floor(rng() * types.length)] ?? 'progress';
    const titleArr = titles[baseType];
    const title = titleArr[Math.floor(rng() * titleArr.length)] ?? titleArr[0];
    const swing = (rng() - 0.5) * 0.3;
    const mood = score + swing;
    const detail =
      baseType === 'loot'
        ? `团队收集到一批素材。表现系数：${mood.toFixed(2)}`
        : baseType === 'challenge'
          ? `遇到一个需要即时决策的难题。表现系数：${mood.toFixed(2)}`
          : `推进中，系统稳定。表现系数：${mood.toFixed(2)}`;

    plannedEvents.push({ runId, t, type: baseType, title, detail });
  }

  plannedEvents.push({
    runId,
    t: totalTicks,
    type: 'boss',
    title: titles.boss[Math.floor(rng() * titles.boss.length)] ?? titles.boss[0],
    detail: `抵达关键节点，准备结算。团队匹配度：${score.toFixed(2)}`,
  });

  return { runId, totalTicks, tickMs, plannedEvents };
};

export const settleRun = (
  runId: string,
  mission: AiMission,
  employees: AiEmployee[],
  currentWorldProgress: number
): AiSettlement => {
  const rng = makeRng(hashSeed(runId + ':settle'));
  const score = calcTeamScore(employees, mission.recommend);
  const base = Math.max(0.15, Math.min(0.95, 0.45 + (score - 1) * 0.35));
  const roll = rng();
  const success = roll < base;
  const mult = success ? 1 : 0.35;

  const walletDelta: Record<string, number> = {};
  for (const [k, v] of Object.entries(mission.rewardPreview)) {
    const n = Math.round(v * mult * (0.9 + rng() * 0.25));
    walletDelta[k] = n;
  }

  const progressGain = Math.round((20 + mission.difficulty * 18) * mult * (0.9 + rng() * 0.3));
  const clampedGain = Math.max(1, Math.min(300, progressGain));
  const nextProgress = Math.min(10000, currentWorldProgress + clampedGain);
  const dayDelta = success ? 1 : 0;

  const employeeDelta: AiSettlement['employeeDelta'] = {};
  for (const e of employees) {
    const expDelta = Math.round((18 + mission.difficulty * 9) * mult * (0.9 + rng() * 0.4));
    const levelUp = Math.floor((e.exp + expDelta) / 100) - Math.floor(e.exp / 100);
    employeeDelta[e.id] = {
      expDelta,
      levelUp: Math.max(0, levelUp),
      staminaDelta: 0,
    };
  }

  const outcome = success ? 'SUCCESS' : 'PARTIAL';
  const summary = `${outcome} · 匹配度 ${(score * 100).toFixed(0)}% · 世界进度 +${nextProgress - currentWorldProgress}`;

  return {
    success,
    summary,
    walletDelta,
    worldDelta: { progress: nextProgress - currentWorldProgress, dayDelta },
    employeeDelta,
  };
};

export const materializeEvent = (base: Omit<AiRunEvent, 'id' | 'createdAt'>): AiRunEvent => {
  return {
    ...base,
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${base.runId}_${base.t}_${Date.now()}`,
    createdAt: nowIso(),
  };
};

