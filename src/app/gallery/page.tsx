'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

export default function GalleryPage() {
  const [selectedArt, setSelectedArt] = useState<typeof PIXEL_ARTWORKS[0] | null>(null);

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

      <Grid container spacing={4}>
        {PIXEL_ARTWORKS.map((art) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={art.id}>
            <Box 
              onClick={() => setSelectedArt(art)}
              sx={{ 
                bgcolor: '#fff',
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                  transform: 'translate(-4px, -4px)',
                  boxShadow: `10px 10px 0px ${art.color}`
                }
              }}
            >
              <Box 
                sx={{ 
                  width: '100%', 
                  aspectRatio: '1', 
                  bgcolor: art.color, 
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
                {art.emoji}
              </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 'auto' }}>
                {art.title}
              </Typography>
              <Typography variant="caption" sx={{ mt: 1, bgcolor: '#f1f2f6', px: 1, border: '2px solid #000' }}>
                No. {String(art.id).padStart(3, '0')}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

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
    </Container>
  );
}
