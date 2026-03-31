'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const DAILY_DROPS = [
  { item: '传说中的机械键盘', rarity: 'Legendary', buff: '打字速度 +100%, Bug产生率 -50%', color: '#f39c12' },
  { item: '破旧的马克杯', rarity: 'Common', buff: '精神力 +10, 疲劳度 -5', color: '#7f8fa6' },
  { item: '无尽的咖啡壶', rarity: 'Epic', buff: '熬夜能力 +MAX, 脱发概率 +100%', color: '#9b59b6' },
  { item: '防蓝光眼镜', rarity: 'Rare', buff: '视力保护 +50, 魅力值 +5', color: '#3498db' },
  { item: '橡皮鸭', rarity: 'Mythic', buff: '代码理解力 +200%, 孤独感 -99%', color: '#e74c3c' },
];

export default function DailyDrop() {
  const [drop, setDrop] = useState<typeof DAILY_DROPS[0] | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setDrop(null);
    
    // 模拟开箱动画延迟
    setTimeout(() => {
      const randomItem = DAILY_DROPS[Math.floor(Math.random() * DAILY_DROPS.length)];
      setDrop(randomItem);
      setIsOpening(false);
    }, 1500);
  };

  return (
    <Box sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ borderBottom: '4px dashed #9b59b6', display: 'inline-block', pb: 1, mb: 4 }}>
        🎁 DAILY DROP / 每日补给
      </Typography>
      
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          textAlign: 'center', 
          border: '4px solid #000',
          boxShadow: '8px 8px 0px #000',
          bgcolor: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {!drop && !isOpening && (
          <>
            <Typography variant="h6" sx={{ mb: 3 }}>
              你发现了一个神秘的补给箱...
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleOpen}
              sx={{ 
                bgcolor: '#f1c40f', 
                color: '#000',
                fontSize: '1.2rem',
                py: 1.5,
                px: 4,
                '&:hover': { bgcolor: '#f39c12' }
              }}
            >
              OPEN / 开启
            </Button>
          </>
        )}

        {isOpening && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h5" sx={{ animation: 'blink 0.5s infinite', fontWeight: 'bold' }}>
              正在开启...
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
              <Box sx={{ width: 10, height: 10, bgcolor: '#000', animation: 'bounce 0.5s infinite alternate' }} />
              <Box sx={{ width: 10, height: 10, bgcolor: '#000', animation: 'bounce 0.5s infinite alternate', animationDelay: '0.1s' }} />
              <Box sx={{ width: 10, height: 10, bgcolor: '#000', animation: 'bounce 0.5s infinite alternate', animationDelay: '0.2s' }} />
            </Box>
          </Box>
        )}

        {drop && !isOpening && (
          <Box sx={{ animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#7f8fa6', mb: 1 }}>
              ✨ 获得了装备 ✨
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ color: drop.color, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <AutoAwesomeIcon /> {drop.item}
            </Typography>
            <Box sx={{ display: 'inline-block', bgcolor: '#000', color: '#fff', px: 1, mb: 2 }}>
              <Typography variant="caption" fontWeight="bold">Rarity: {drop.rarity}</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold', bgcolor: '#f1f2f6', p: 2, border: '2px dashed #000' }}>
              BUFF: {drop.buff}
            </Typography>
            
            <Button 
              onClick={() => setDrop(null)}
              sx={{ mt: 3, color: '#000', textDecoration: 'underline' }}
            >
              放入背包 (关闭)
            </Button>
          </Box>
        )}
      </Paper>

      <style jsx global>{`
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
        @keyframes popIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}