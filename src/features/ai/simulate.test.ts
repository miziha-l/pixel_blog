import { describe, expect, it } from 'vitest';
import { buildRunPlan, calcTeamScore, settleRun } from './simulate';
import type { AiEmployee, AiMission } from './types';

const mission: AiMission = {
  id: 'm',
  name: 'test',
  difficulty: 3,
  costStamina: 2,
  durationSec: 120,
  recommend: { logic: 10, craft: 8 },
  rewardPreview: { coins: 100, material: 10 },
  isActive: true,
};

const team: AiEmployee[] = [
  {
    id: 'e1',
    name: 'A',
    role: 'Analyst',
    rarity: 'R',
    level: 1,
    exp: 0,
    stamina: 10,
    status: 'idle',
    traits: [],
    stats: { logic: 12, craft: 10, social: 1 },
    loadout: { slot1: null, slot2: null, slot3: null, slot4: null },
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'e2',
    name: 'B',
    role: 'Crafter',
    rarity: 'R',
    level: 1,
    exp: 0,
    stamina: 10,
    status: 'idle',
    traits: [],
    stats: { logic: 6, craft: 9, social: 1 },
    loadout: { slot1: null, slot2: null, slot3: null, slot4: null },
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

describe('ai simulate', () => {
  it('calcTeamScore increases when team matches recommend', () => {
    const score = calcTeamScore(team, mission.recommend);
    const badScore = calcTeamScore(team, { social: 30 });
    expect(score).toBeGreaterThan(badScore);
  });

  it('buildRunPlan returns deterministic planned events per runId', () => {
    const p1 = buildRunPlan('run_x', mission, team);
    const p2 = buildRunPlan('run_x', mission, team);
    expect(p1.totalTicks).toBe(p2.totalTicks);
    expect(p1.plannedEvents.map((e) => e.title)).toEqual(p2.plannedEvents.map((e) => e.title));
  });

  it('settleRun returns bounded deltas and summary', () => {
    const s = settleRun('run_s', mission, team, 9000);
    expect(typeof s.summary).toBe('string');
    expect(s.worldDelta.progress).toBeGreaterThan(0);
    expect(s.worldDelta.progress).toBeLessThanOrEqual(300);
    expect(s.walletDelta.coins).toBeTypeOf('number');
  });
});
