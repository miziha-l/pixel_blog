'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Dialog, IconButton, Button, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { usePlayerStore } from '@/store/usePlayerStore';
import { useGalleryStore } from '@/store/useGalleryStore';
import { usePixelSound } from '@/hooks/usePixelSound';

const PIXEL_ARTWORKS = [
  { id: 1, title: '初级史莱姆', color: '#48dbfb', emoji: '💧', desc: '新手村最常见的怪物，掉落黏液。' },
  { id: 2, title: '火之精灵', color: '#ff7b9c', emoji: '🔥', desc: '喜欢在火山附近游荡，温度极高。' },
  { id: 3, title: '剧毒蘑菇', color: '#55efc4', emoji: '🍄', desc: '看起来很可爱，但千万别随便碰！' },
  { id: 4, title: '闪电飞鸟', color: '#ffeaa7', emoji: '⚡', desc: '速度极快，很难用普通攻击打中。' },
  { id: 5, title: '暗影蝙蝠', color: '#a29bfe', emoji: '🦇', desc: '喜欢在夜间出没，吸血能回复它的生命。' },
  { id: 6, title: '岩石傀儡', color: '#b2bec3', emoji: '🪨', desc: '物理防御极高，建议使用魔法攻击。' },
  { id: 7, title: '生命之树', color: '#00b894', emoji: '🌳', desc: '古老的树人，能为你提供持续的恢复效果。' },
  { id: 8, title: '深海巨兽', color: '#0984e3', emoji: '🦑', desc: '沉睡在深海的霸主，只有勇敢的探险者才能见到。' },
];

const SUMMON_COST = 50;

export default function GalleryPage() {
  const [selectedArt, setSelectedArt] = useState<typeof PIXEL_ARTWORKS[0] | null>(null);
  const [newArt, setNewArt] = useState<typeof PIXEL_ARTWORKS[0] | null>(null);
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({ open: false, message: '', type: 'success' });
  const [mounted, setMounted] = useState(false);

  const { exp, deductExp } = usePlayerStore();
  const { unlockedIds, unlockArt } = useGalleryStore();
  const { playClick, playSuccess, playError, playCoin } = usePixelSound();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSummon = () => {
    playClick();
    const lockedItems = PIXEL_ARTWORKS.filter(art => !unlockedIds.includes(art.id));
    
    if (lockedItems.length === 0) {
      playError();
      setToast({ open: true, message: '你已经收集了所有的图鉴！', type: 'error' });
      return;
    }

    if (exp < SUMMON_COST) {
      playError();
      setToast({ open: true, message: `EXP 不足！需要 ${SUMMON_COST} EXP。去其他地方获取一些吧！`, type: 'error' });
      return;
    }

    // Deduct EXP and unlock
    if (deductExp(SUMMON_COST)) {
      playCoin();
      setTimeout(() => {
        playSuccess();
        const randomIndex = Math.floor(Math.random() * lockedItems.length);
        const summoned = lockedItems[randomIndex];
        unlockArt(summoned.id);
        setNewArt(summoned);
      }, 500);
    }
  };

  const handleCloseToast = () => setToast(prev => ({ ...prev, open: false }));

  if (!mounted) return null; // 避免水合问题

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" fontWeight="bold" sx={{ color: '#55efc4', textShadow: '4px 4px 0px #000', display: 'inline-block' }}>
          🖼️ PIXEL GALLERY / 像素画廊
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
          收集的各种怪物图鉴和像素碎片
        </Typography>
      </Box>

      {/* Summon Section */}
      <Box sx={{ mb: 6, p: 4, bgcolor: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0px #000', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          召唤新图鉴
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          当前 EXP: <Box component="span" sx={{ fontWeight: 'bold', color: '#0984e3' }}>{exp}</Box>
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={handleSummon}
          startIcon={<AutoAwesomeIcon />}
          sx={{ 
            bgcolor: '#ffeaa7', 
            color: '#000', 
            border: '4px solid #000', 
            boxShadow: '4px 4px 0px #000',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            '&:hover': {
              bgcolor: '#fdcb6e',
              transform: 'translate(-2px, -2px)',
              boxShadow: '6px 6px 0px #000',
            }
          }}
        >
          召唤图鉴 ({SUMMON_COST} EXP)
        </Button>
      </Box>

      <Grid container spacing={4}>
        {PIXEL_ARTWORKS.map((art) => {
          const isUnlocked = unlockedIds.includes(art.id);

          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={art.id}>
              <Box 
                onClick={() => {
                  if (isUnlocked) {
                    playClick();
                    setSelectedArt(art);
                  } else {
                    playError();
                    setToast({ open: true, message: '该图鉴尚未解锁！', type: 'error' });
                  }
                }}
                sx={{ 
                  bgcolor: isUnlocked ? '#fff' : '#dfe6e9',
                  border: '4px solid #000',
                  boxShadow: '6px 6px 0px #000',
                  p: 2,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  filter: isUnlocked ? 'none' : 'grayscale(100%)',
                  '&:hover': {
                    transform: isUnlocked ? 'translate(-4px, -4px)' : 'none',
                    boxShadow: isUnlocked ? `10px 10px 0px ${art.color}` : '6px 6px 0px #000'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    width: '100%', 
                    aspectRatio: '1', 
                    bgcolor: isUnlocked ? art.color : '#b2bec3', 
                    border: '4px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '5rem',
                    mb: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
                      backgroundSize: '20px 20px',
                      opacity: 0.5
                    }
                  }}
                >
                  {isUnlocked ? art.emoji : '❓'}
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 'auto' }}>
                  {isUnlocked ? art.title : '???'}
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, bgcolor: isUnlocked ? '#f1f2f6' : '#636e72', color: isUnlocked ? '#000' : '#fff', px: 1, border: '2px solid #000' }}>
                  No. {String(art.id).padStart(3, '0')}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* New Summoned Art Dialog */}
      <Dialog 
        open={!!newArt} 
        onClose={() => setNewArt(null)}
        PaperProps={{
          sx: {
            border: '4px solid #000',
            boxShadow: '12px 12px 0px #000',
            borderRadius: 0,
            bgcolor: '#fff',
            overflow: 'visible',
            animation: 'bounce 0.5s'
          }
        }}
      >
        {newArt && (
          <Box sx={{ position: 'relative', p: 4, minWidth: { xs: '300px', sm: '400px' }, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#ff7b9c', textShadow: '2px 2px 0px #000', mb: 2 }}>
              ✨ 召唤成功! ✨
            </Typography>
            <Box 
              sx={{ 
                width: '100%', 
                aspectRatio: '1', 
                bgcolor: newArt.color, 
                border: '4px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem',
                mb: 3
              }}
            >
              {newArt.emoji}
            </Box>
            
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ borderBottom: '4px dashed #000', pb: 1 }}>
              {newArt.title}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mt: 2, mb: 4 }}>
              {newArt.desc}
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => setNewArt(null)}
              sx={{ bgcolor: '#000', color: '#fff', border: '2px solid #000', '&:hover': { bgcolor: '#333' } }}
            >
              收下
            </Button>
          </Box>
        )}
      </Dialog>

      {/* Selected Art Details Dialog */}
      <Dialog 
        open={!!selectedArt} 
        onClose={() => setSelectedArt(null)}
        PaperProps={{
          sx: {
            border: '4px solid #000',
            boxShadow: '12px 12px 0px #000',
            borderRadius: 0,
            bgcolor: '#fff',
            overflow: 'visible'
          }
        }}
      >
        {selectedArt && (
          <Box sx={{ position: 'relative', p: 4, minWidth: { xs: '300px', sm: '400px' } }}>
            <IconButton 
              onClick={() => setSelectedArt(null)}
              sx={{ 
                position: 'absolute', 
                top: -20, 
                right: -20, 
                bgcolor: '#ff7b9c', 
                border: '4px solid #000',
                color: '#fff',
                '&:hover': { bgcolor: '#ff4757' }
              }}
            >
              <CloseIcon />
            </IconButton>
            
            <Box 
              sx={{ 
                width: '100%', 
                aspectRatio: '1', 
                bgcolor: selectedArt.color, 
                border: '4px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem',
                mb: 3
              }}
            >
              {selectedArt.emoji}
            </Box>
            
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ borderBottom: '4px dashed #000', pb: 1 }}>
              {selectedArt.title}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mt: 2 }}>
              {selectedArt.desc}
            </Typography>
          </Box>
        )}
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={toast.type} sx={{ border: '2px solid #000', borderRadius: 0, fontWeight: 'bold' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
