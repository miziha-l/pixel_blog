'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { usePlayerStore } from '@/store/usePlayerStore';
import { usePixelSound } from '@/hooks/usePixelSound';

export default function PlayerStatus() {
  const { level, exp, maxExp } = usePlayerStore();
  const [prevLevel, setPrevLevel] = useState(level);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const { playLevelUp } = usePixelSound();

  useEffect(() => {
    if (level > prevLevel) {
      setShowLevelUp(true);
      playLevelUp();
      const timer = setTimeout(() => setShowLevelUp(false), 3000);
      setPrevLevel(level);
      return () => clearTimeout(timer);
    }
  }, [level, prevLevel, playLevelUp]);

  const expPercentage = Math.min(100, (exp / maxExp) * 100);

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
      {/* Player Avatar or Icon */}
      <Box 
        sx={{ 
          width: 40, 
          height: 40, 
          bgcolor: '#ffeaa7', 
          border: '3px solid #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          boxShadow: '2px 2px 0px #000'
        }}
      >
        🧙‍♂️
      </Box>

      {/* Level and EXP Bar */}
      <Box sx={{ width: 120 }}>
        <Typography variant="caption" fontWeight="bold" sx={{ color: '#000', display: 'block', mb: 0.5 }}>
          LVL: {level}
        </Typography>
        <Box sx={{ width: '100%', height: 12, bgcolor: '#fff', border: '2px solid #000', p: '2px', position: 'relative' }}>
          <Box 
            sx={{ 
              height: '100%', 
              width: `${expPercentage}%`, 
              bgcolor: '#55efc4',
              transition: 'width 0.3s ease-in-out'
            }} 
          />
        </Box>
        <Typography variant="caption" sx={{ fontSize: '0.6rem', display: 'block', textAlign: 'right', mt: 0.5 }}>
          EXP: {exp}/{maxExp}
        </Typography>
      </Box>

      {/* Level Up Toast Animation */}
      {showLevelUp && (
        <Box 
          sx={{ 
            position: 'absolute',
            top: '100%',
            left: 0,
            mt: 1,
            bgcolor: '#ff7b9c',
            color: '#fff',
            px: 2,
            py: 1,
            border: '3px solid #000',
            boxShadow: '4px 4px 0px #000',
            zIndex: 9999,
            animation: 'bounceUp 0.5s ease-out, fadeOut 0.5s ease-in 2.5s forwards',
            whiteSpace: 'nowrap'
          }}
        >
          <Typography fontWeight="bold">🎉 LEVEL UP! LVL {level}</Typography>
        </Box>
      )}

      <style jsx global>{`
        @keyframes bounceUp {
          0% { transform: translateY(20px); opacity: 0; }
          50% { transform: translateY(-5px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </Box>
  );
}
