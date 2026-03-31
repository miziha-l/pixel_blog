'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
  LinearProgress,
  Alert,
} from '@mui/material';
import { ArrowLeft, Bot, Play, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useUserId } from '@/hooks/useUserId';
import { useAiWorldStore } from '@/store/useAiWorldStore';
import type { AiMission } from '@/features/ai/types';

const MissionCard = ({
  mission,
  selected,
  onSelect,
}: {
  mission: AiMission;
  selected: boolean;
  onSelect: () => void;
}) => {
  return (
    <Card
      onClick={onSelect}
      sx={{
        cursor: 'pointer',
        border: selected ? '4px solid #48dbfb' : undefined,
        boxShadow: selected ? '7px 7px 0px #48dbfb' : undefined,
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography fontWeight="bold">{mission.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              难度 {mission.difficulty} · 体力消耗 {mission.costStamina} · {mission.durationSec}s
            </Typography>
          </Box>
          <Chip label={`+${mission.rewardPreview.coins ?? 0} COINS`} color="secondary" sx={{ fontWeight: 'bold' }} />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(mission.recommend).map(([k, v]) => (
            <Chip key={k} label={`推荐 ${k.toUpperCase()} ≥ ${v}`} sx={{ fontWeight: 'bold' }} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function AiWorldPage() {
  const userId = useUserId();
  const ensureSeeded = useAiWorldStore((s) => s.ensureSeeded);
  const world = useAiWorldStore((s) => s.world);
  const wallet = useAiWorldStore((s) => s.wallet);
  const employees = useAiWorldStore((s) => s.employees);
  const missions = useAiWorldStore((s) => s.missions);
  const runs = useAiWorldStore((s) => s.runs);
  const events = useAiWorldStore((s) => s.events);
  const activeMissionId = useAiWorldStore((s) => s.activeMissionId);
  const selectedEmployeeIds = useAiWorldStore((s) => s.selectedEmployeeIds);
  const activeRunId = useAiWorldStore((s) => s.activeRunId);
  const missionFilters = useAiWorldStore((s) => s.missionFilters);

  const setActiveMission = useAiWorldStore((s) => s.setActiveMission);
  const toggleSelectEmployee = useAiWorldStore((s) => s.toggleSelectEmployee);
  const clearSelection = useAiWorldStore((s) => s.clearSelection);
  const setMissionFilters = useAiWorldStore((s) => s.setMissionFilters);
  const startRun = useAiWorldStore((s) => s.startRun);
  const appendNextPlannedEvent = useAiWorldStore((s) => s.appendNextPlannedEvent);
  const settleActiveRun = useAiWorldStore((s) => s.settleActiveRun);
  const cancelRun = useAiWorldStore((s) => s.cancelRun);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    ensureSeeded(userId);
  }, [ensureSeeded, userId]);

  const activeRun = useMemo(() => (activeRunId ? runs.find((r) => r.id === activeRunId) ?? null : null), [activeRunId, runs]);
  const activeRunEvents = useMemo(() => (activeRunId ? events.filter((e) => e.runId === activeRunId).sort((a, b) => a.t - b.t) : []), [activeRunId, events]);

  const filteredMissions = useMemo(() => {
    return missions
      .filter((m) => m.isActive)
      .filter((m) => (missionFilters.difficulty ? m.difficulty === missionFilters.difficulty : true))
      .filter((m) => (missionFilters.recommendKey ? Object.keys(m.recommend).includes(missionFilters.recommendKey) : true))
      .sort((a, b) => a.difficulty - b.difficulty);
  }, [missions, missionFilters.difficulty, missionFilters.recommendKey]);

  const selectedMission = useMemo(
    () => (activeMissionId ? missions.find((m) => m.id === activeMissionId) ?? null : null),
    [activeMissionId, missions]
  );

  const idleEmployees = useMemo(() => employees.filter((e) => e.status === 'idle'), [employees]);

  useEffect(() => {
    if (!activeRunId || !activeRun || activeRun.status !== 'running') return;
    const timer = window.setInterval(() => {
      const res = appendNextPlannedEvent(activeRunId);
      if (res.done) {
        window.clearInterval(timer);
        settleActiveRun(activeRunId);
      }
    }, 650);
    return () => window.clearInterval(timer);
  }, [activeRun, activeRunId, appendNextPlannedEvent, settleActiveRun]);

  const onDispatch = () => {
    setError(null);
    if (!selectedMission) {
      setError('请先选择一个任务');
      return;
    }
    const res = startRun({ missionId: selectedMission.id, employeeIds: selectedEmployeeIds });
    if (!res.ok) {
      setError(res.reason);
      return;
    }
  };

  const progressPct = activeRun && selectedMission ? Math.min(100, Math.round((activeRunEvents.length / Math.max(1, Math.round(selectedMission.durationSec / 12))) * 100)) : 0;

  if (!world || !wallet) {
    return (
      <Container maxWidth="lg">
        <Typography>正在载入...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Button component={Link} href="/ai" variant="outlined" startIcon={<ArrowLeft size={18} />}>
          返回概览
        </Button>
        <Stack direction="row" spacing={1} alignItems="center">
          <Bot size={22} />
          <Typography variant="h5" fontWeight="bold" sx={{ textShadow: '2px 2px 0px #000', color: '#48dbfb' }}>
            世界任务与结算
          </Typography>
        </Stack>
        <Chip label={`${world.name} · Day ${world.day}`} sx={{ fontWeight: 'bold' }} />
        <Chip label={`Progress ${world.progress}/10000`} color="secondary" sx={{ fontWeight: 'bold' }} />
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                  任务列表
                </Typography>
                <Stack direction="row" spacing={2}>
                  <FormControl size="small" sx={{ minWidth: 130 }}>
                    <InputLabel>难度</InputLabel>
                    <Select
                      label="难度"
                      value={missionFilters.difficulty ?? ''}
                      onChange={(e) => {
                        const raw = e.target.value as unknown as string | number;
                        setMissionFilters({ difficulty: raw === '' ? null : Number(raw) });
                      }}
                    >
                      <MenuItem value="">全部</MenuItem>
                      {[1, 2, 3, 4, 5].map((d) => (
                        <MenuItem key={d} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>推荐属性</InputLabel>
                    <Select
                      label="推荐属性"
                      value={missionFilters.recommendKey ?? ''}
                      onChange={(e) => setMissionFilters({ recommendKey: e.target.value === '' ? null : String(e.target.value) })}
                    >
                      <MenuItem value="">全部</MenuItem>
                      {['logic', 'social', 'craft'].map((k) => (
                        <MenuItem key={k} value={k}>
                          {k.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>

              <Stack spacing={2} sx={{ mt: 2 }}>
                {filteredMissions.map((m) => (
                  <MissionCard
                    key={m.id}
                    mission={m}
                    selected={m.id === activeMissionId}
                    onSelect={() => {
                      setActiveMission(m.id);
                      setError(null);
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  编队与派遣
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {selectedMission ? (
                  <Stack spacing={1}>
                    <Typography fontWeight="bold">已选任务：{selectedMission.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      体力消耗：{selectedMission.costStamina} / 人
                    </Typography>
                  </Stack>
                ) : (
                  <Typography color="text.secondary">从左侧选择一个任务。</Typography>
                )}

                <Box sx={{ mt: 2 }}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    可用员工（仅空闲）
                  </Typography>
                  <List dense sx={{ border: '3px solid #000', bgcolor: '#fff' }}>
                    {idleEmployees.map((e) => {
                      const checked = selectedEmployeeIds.includes(e.id);
                      const disabled = Boolean(activeRun && activeRun.status === 'running');
                      return (
                        <ListItem
                          key={e.id}
                          onClick={() => (!disabled ? toggleSelectEmployee(e.id) : undefined)}
                          sx={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}
                        >
                          <ListItemText
                            primary={
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Chip label={checked ? '已选' : '未选'} color={checked ? 'success' : 'default'} size="small" sx={{ fontWeight: 'bold' }} />
                                <Typography fontWeight="bold">
                                  {e.name} · Lv {e.level}
                                </Typography>
                              </Stack>
                            }
                            secondary={`体力 ${e.stamina} · L${e.stats.logic ?? 0} / S${e.stats.social ?? 0} / C${e.stats.craft ?? 0}`}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Play size={18} />}
                    disabled={!selectedMission || selectedEmployeeIds.length === 0 || Boolean(activeRun && activeRun.status === 'running')}
                    onClick={onDispatch}
                  >
                    开始派遣
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<X size={18} />}
                    disabled={!activeRun || activeRun.status !== 'running'}
                    onClick={() => {
                      if (!activeRunId) return;
                      cancelRun(activeRunId);
                      clearSelection();
                    }}
                  >
                    中断
                  </Button>
                </Stack>
                {error ? <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert> : null}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  执行 / 事件流
                </Typography>
                <Divider sx={{ my: 2 }} />

                {!activeRun ? (
                  <Typography color="text.secondary">尚未开始派遣。</Typography>
                ) : activeRun.status === 'running' ? (
                  <Stack spacing={2}>
                    <LinearProgress variant="determinate" value={progressPct} sx={{ height: 14, border: '2px solid #000' }} />
                    <Chip label={`RUNNING · ${progressPct}%`} color="warning" sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }} />
                    <List dense sx={{ border: '3px solid #000', bgcolor: '#fff', maxHeight: 260, overflow: 'auto' }}>
                      {activeRunEvents.length === 0 ? (
                        <ListItem>
                          <ListItemText primary="正在出发..." secondary="准备写入第一条事件" />
                        </ListItem>
                      ) : (
                        activeRunEvents.map((ev) => (
                          <ListItem key={ev.id}>
                            <ListItemText primary={`#${ev.t} ${ev.title}`} secondary={ev.detail} />
                          </ListItem>
                        ))
                      )}
                    </List>
                  </Stack>
                ) : activeRun.status === 'settled' && activeRun.result ? (
                  <Stack spacing={2}>
                    <Chip
                      icon={activeRun.result.success ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                      label={activeRun.result.summary}
                      color={activeRun.result.success ? 'success' : 'warning'}
                      sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }}
                    />
                    <Typography fontWeight="bold">奖励明细</Typography>
                    <List dense sx={{ border: '3px solid #000', bgcolor: '#fff' }}>
                      {Object.entries(activeRun.result.walletDelta).map(([k, v]) => (
                        <ListItem key={k}>
                          <ListItemText primary={k.toUpperCase()} secondary={`${v >= 0 ? '+' : ''}${v}`} />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      variant="contained"
                      onClick={() => {
                        clearSelection();
                        setActiveMission(null);
                      }}
                    >
                      继续下一次派遣
                    </Button>
                  </Stack>
                ) : (
                  <Typography color="text.secondary">派遣已结束。</Typography>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  钱包快照
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {Object.entries(wallet.balances).map(([k, v]) => (
                    <Chip key={k} label={`${k.toUpperCase()}: ${v}`} sx={{ fontWeight: 'bold' }} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
