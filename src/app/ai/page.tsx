'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Box, Button, Card, CardContent, Chip, Container, Divider, Grid, LinearProgress, Skeleton, Stack, Typography } from '@mui/material';
import { Bot, Briefcase, ClipboardList, Sparkles } from 'lucide-react';
import { useUserId } from '@/hooks/useUserId';
import { selectLastRun, useAiWorldStore } from '@/store/useAiWorldStore';

const StatChip = ({ label, value }: { label: string; value: number }) => {
  return <Chip label={`${label}: ${value}`} sx={{ fontWeight: 'bold' }} />;
};

export default function AiOverviewPage() {
  const userId = useUserId();
  const hydrated = useAiWorldStore((s) => s.hydrated);
  const ensureSeeded = useAiWorldStore((s) => s.ensureSeeded);
  const world = useAiWorldStore((s) => s.world);
  const wallet = useAiWorldStore((s) => s.wallet);
  const employees = useAiWorldStore((s) => s.employees);
  const runs = useAiWorldStore((s) => s.runs);

  useEffect(() => {
    if (!userId) return;
    ensureSeeded(userId);
  }, [ensureSeeded, userId]);

  const lastRun = useMemo(() => selectLastRun(runs), [runs]);

  const progressPct = world ? Math.round((world.progress / 10000) * 100) : 0;

  if (!hydrated || !userId || !world || !wallet) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#48dbfb', textShadow: '3px 3px 0px #000' }}>
            🤖 AI 员工世界
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            正在载入世界数据...
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Skeleton height={32} width="60%" />
                <Skeleton height={18} width="40%" />
                <Skeleton height={18} width="80%" />
                <Skeleton height={120} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Skeleton height={28} width="60%" />
                <Skeleton height={120} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
          <Bot size={26} />
          <Typography variant="h4" fontWeight="bold" sx={{ textShadow: '3px 3px 0px #000', color: '#48dbfb' }}>
            AI 员工世界
          </Typography>
        </Stack>
        <Typography variant="subtitle1" color="text.secondary">
          {world.name} · Season {world.seasonNo} · Day {world.day}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      世界进度
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      进度到 100% 解锁下一段主线
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button component={Link} href="/ai/world" variant="contained" startIcon={<ClipboardList size={18} />}>
                      去任务
                    </Button>
                    <Button component={Link} href="/ai/world" variant="outlined" startIcon={<Briefcase size={18} />}>
                      快速派遣
                    </Button>
                  </Stack>
                </Stack>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={progressPct} sx={{ height: 14, border: '2px solid #000' }} />
                  <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                    <Typography variant="caption" fontWeight="bold">
                      {world.progress}/10000
                    </Typography>
                    <Typography variant="caption" fontWeight="bold">
                      {progressPct}%
                    </Typography>
                  </Stack>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Sparkles size={18} />
                  <Typography variant="h6" fontWeight="bold">
                    员工状态
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  {employees.map((e) => (
                    <Grid key={e.id} size={{ xs: 12, sm: 6 }}>
                      <Card variant="outlined" sx={{ borderWidth: '3px' }}>
                        <CardContent>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                              <Typography fontWeight="bold">
                                {e.name} <Typography component="span" color="text.secondary">({e.role})</Typography>
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Lv {e.level} · 体力 {e.stamina} · {e.rarity}
                              </Typography>
                            </Box>
                            <Chip
                              label={e.status === 'idle' ? '空闲' : '派遣中'}
                              color={e.status === 'idle' ? 'success' : 'warning'}
                              sx={{ fontWeight: 'bold' }}
                            />
                          </Stack>
                          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                            <StatChip label="逻辑" value={e.stats.logic ?? 0} />
                            <StatChip label="社交" value={e.stats.social ?? 0} />
                            <StatChip label="工艺" value={e.stats.craft ?? 0} />
                          </Stack>
                          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Button component={Link} href={`/ai/employees/${e.id}`} size="small" variant="outlined">
                              查看
                            </Button>
                            <Button component={Link} href="/ai/world" size="small" variant="contained" disabled={e.status !== 'idle'}>
                              派遣
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  最近结算
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {!lastRun ? (
                  <Typography color="text.secondary">还没有派遣记录，先去做一次任务吧。</Typography>
                ) : (
                  <Stack spacing={1}>
                    <Typography fontWeight="bold">Run · {lastRun.status.toUpperCase()}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      开始时间：{new Date(lastRun.startedAt).toLocaleString()}
                    </Typography>
                    {lastRun.result ? (
                      <Chip label={lastRun.result.summary} color={lastRun.result.success ? 'success' : 'warning'} sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }} />
                    ) : (
                      <Chip label="执行中..." color="warning" sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }} />
                    )}
                    <Button component={Link} href="/ai/world" variant="outlined" sx={{ alignSelf: 'flex-start' }}>
                      打开任务页
                    </Button>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  资源面板
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  你的基地库存
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(wallet.balances).map(([k, v]) => (
                    <Grid key={k} size={{ xs: 6 }}>
                      <Card variant="outlined" sx={{ borderWidth: '3px' }}>
                        <CardContent sx={{ py: 2 }}>
                          <Typography variant="caption" color="text.secondary" fontWeight="bold">
                            {k.toUpperCase()}
                          </Typography>
                          <Typography variant="h6" fontWeight="bold">
                            {v}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  今日状态
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  用派遣推动世界进度
                </Typography>
                <Stack spacing={1}>
                  <Chip label={`在线身份：${userId.slice(0, 8)}…`} sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }} />
                  <Chip label={`员工总数：${employees.length}`} sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }} />
                  <Chip label={`最近派遣：${lastRun ? new Date(lastRun.startedAt).toLocaleDateString() : '暂无'}`} sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }} />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
