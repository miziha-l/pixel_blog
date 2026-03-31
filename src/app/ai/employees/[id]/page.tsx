'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Alert,
} from '@mui/material';
import { ArrowLeft, Wrench, ArrowUpCircle, PackageOpen } from 'lucide-react';
import { useUserId } from '@/hooks/useUserId';
import { useAiWorldStore } from '@/store/useAiWorldStore';
import type { AiMission } from '@/features/ai/types';
import { calcTeamScore } from '@/features/ai/simulate';

const LOADOUT_ITEMS = [
  { id: 'LOG-BOOST', name: 'LOG-BOOST', hint: '逻辑 +2' },
  { id: 'SOCIAL-BOOST', name: 'SOCIAL-BOOST', hint: '社交 +2' },
  { id: 'CRAFT-BOOST', name: 'CRAFT-BOOST', hint: '工艺 +2' },
  { id: 'STAMINA-PACK', name: 'STAMINA-PACK', hint: '体力回复 +1/日(展示用)' },
];

export default function AiEmployeeDetailPage() {
  const userId = useUserId();
  const params = useParams<{ id: string }>();
  const employeeId = params?.id;

  const ensureSeeded = useAiWorldStore((s) => s.ensureSeeded);
  const employees = useAiWorldStore((s) => s.employees);
  const wallet = useAiWorldStore((s) => s.wallet);
  const missions = useAiWorldStore((s) => s.missions);
  const upgradeEmployee = useAiWorldStore((s) => s.upgradeEmployee);
  const saveEmployeeLoadout = useAiWorldStore((s) => s.saveEmployeeLoadout);

  const [tab, setTab] = useState(0);
  const [err, setErr] = useState<string | null>(null);
  const [slotDialog, setSlotDialog] = useState<{ open: boolean; slotKey: string | null }>({ open: false, slotKey: null });

  useEffect(() => {
    if (!userId) return;
    ensureSeeded(userId);
  }, [ensureSeeded, userId]);

  const employee = useMemo(() => employees.find((e) => e.id === employeeId) ?? null, [employeeId, employees]);

  const topMissions = useMemo(() => {
    const list = missions.filter((m) => m.isActive).slice();
    list.sort((a, b) => a.difficulty - b.difficulty);
    return list.slice(0, 3);
  }, [missions]);

  const missionFit = useMemo(() => {
    if (!employee) return [] as { mission: AiMission; pct: number }[];
    return topMissions.map((m) => {
      const score = calcTeamScore([employee], m.recommend);
      return { mission: m, pct: Math.round(Math.min(1.4, score) * 100) };
    });
  }, [employee, topMissions]);

  if (!employee || !wallet) {
    return (
      <Container maxWidth="lg">
        <Typography>正在载入...</Typography>
      </Container>
    );
  }

  const openSlot = (slotKey: string) => {
    setErr(null);
    setSlotDialog({ open: true, slotKey });
  };

  const setSlotItem = (itemId: string | null) => {
    if (!slotDialog.slotKey) return;
    const next = { ...employee.loadout, [slotDialog.slotKey]: itemId };
    const res = saveEmployeeLoadout(employee.id, next);
    if (!res.ok) setErr(res.reason);
    setSlotDialog({ open: false, slotKey: null });
  };

  const onUpgrade = () => {
    setErr(null);
    const res = upgradeEmployee(employee.id);
    if (!res.ok) setErr(res.reason);
  };

  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Button component={Link} href="/ai" variant="outlined" startIcon={<ArrowLeft size={18} />}>
          返回概览
        </Button>
        <Typography variant="h5" fontWeight="bold" sx={{ textShadow: '2px 2px 0px #000', color: '#48dbfb' }}>
          员工详情
        </Typography>
        <Chip label={`${employee.name} · ${employee.rarity}`} sx={{ fontWeight: 'bold' }} />
        <Chip label={employee.status === 'idle' ? '空闲' : '派遣中'} color={employee.status === 'idle' ? 'success' : 'warning'} sx={{ fontWeight: 'bold' }} />
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                档案
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1}>
                <Typography fontWeight="bold">{employee.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {employee.role} · Lv {employee.level} · EXP {employee.exp}/100
                </Typography>
                <Chip label={`体力 ${employee.stamina}`} sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }} />
              </Stack>

              <Box sx={{ mt: 2 }}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  核心属性
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  <Chip label={`LOGIC ${employee.stats.logic ?? 0}`} sx={{ fontWeight: 'bold' }} />
                  <Chip label={`SOCIAL ${employee.stats.social ?? 0}`} sx={{ fontWeight: 'bold' }} />
                  <Chip label={`CRAFT ${employee.stats.craft ?? 0}`} sx={{ fontWeight: 'bold' }} />
                </Stack>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  特质
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {employee.traits.map((t) => (
                    <Chip key={t} label={t} color="secondary" sx={{ fontWeight: 'bold' }} />
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab icon={<ArrowUpCircle size={18} />} iconPosition="start" label="培养升级" />
                <Tab icon={<Wrench size={18} />} iconPosition="start" label="配置" />
                <Tab icon={<PackageOpen size={18} />} iconPosition="start" label="影响预览" />
              </Tabs>
              <Divider sx={{ my: 2 }} />

              {err ? <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert> : null}

              {tab === 0 ? (
                <Stack spacing={2}>
                  <Typography fontWeight="bold">升级</Typography>
                  <Typography variant="body2" color="text.secondary">
                    消耗随等级增长（金币 + 材料）。派遣中不可升级。
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    <Chip label={`COINS: ${wallet.balances.coins ?? 0}`} sx={{ fontWeight: 'bold' }} />
                    <Chip label={`MATERIAL: ${wallet.balances.material ?? 0}`} sx={{ fontWeight: 'bold' }} />
                  </Stack>
                  <Button variant="contained" onClick={onUpgrade} disabled={employee.status !== 'idle'}>
                    升级 +1
                  </Button>
                </Stack>
              ) : null}

              {tab === 1 ? (
                <Stack spacing={2}>
                  <Typography fontWeight="bold">槽位配置</Typography>
                  <Typography variant="body2" color="text.secondary">
                    点击槽位选择配置项。派遣中不可修改。
                  </Typography>
                  <Grid container spacing={2}>
                    {(['slot1', 'slot2', 'slot3', 'slot4'] as const).map((slotKey) => (
                      <Grid key={slotKey} size={{ xs: 12, sm: 6 }}>
                        <Card variant="outlined" sx={{ borderWidth: '3px' }}>
                          <CardContent>
                            <Typography fontWeight="bold">{slotKey.toUpperCase()}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {employee.loadout[slotKey] ?? 'EMPTY'}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                              <Button variant="contained" size="small" onClick={() => openSlot(slotKey)} disabled={employee.status !== 'idle'}>
                                选择
                              </Button>
                              <Button variant="outlined" size="small" onClick={() => setSlotItem(null)} disabled={employee.status !== 'idle'}>
                                清空
                              </Button>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              ) : null}

              {tab === 2 ? (
                <Stack spacing={2}>
                  <Typography fontWeight="bold">对常用任务的匹配度</Typography>
                  <List dense sx={{ border: '3px solid #000', bgcolor: '#fff' }}>
                    {missionFit.map((x) => (
                      <ListItem key={x.mission.id}>
                        <ListItemText
                          primary={`${x.mission.name} (D${x.mission.difficulty})`}
                          secondary={`匹配度：${x.pct}% · 推荐：${Object.keys(x.mission.recommend).map((k) => k.toUpperCase()).join(' / ')}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button component={Link} href="/ai/world" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                    去任务页
                  </Button>
                </Stack>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={slotDialog.open} onClose={() => setSlotDialog({ open: false, slotKey: null })} maxWidth="sm" fullWidth>
        <DialogTitle>选择配置项</DialogTitle>
        <DialogContent>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setSlotItem(null)}>
                <ListItemText primary="EMPTY" secondary="清空该槽位" />
              </ListItemButton>
            </ListItem>
            {LOADOUT_ITEMS.map((it) => (
              <ListItem key={it.id} disablePadding>
                <ListItemButton onClick={() => setSlotItem(it.id)}>
                  <ListItemText primary={it.name} secondary={it.hint} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSlotDialog({ open: false, slotKey: null })}>关闭</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
