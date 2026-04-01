'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { usePlayerStore } from '@/store/usePlayerStore';
import { usePixelSound } from '@/hooks/usePixelSound';

export default function WildBug() {
  const [bugState, setBugState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    clicks: number;
    escaped: boolean;
  }>({
    visible: false,
    x: 0,
    y: 0,
    clicks: 0,
    escaped: false,
  });

  const { addExp } = usePlayerStore();
  const { playClick, playSuccess, playError } = usePixelSound();

  useEffect(() => {
    // Randomly spawn a bug every 15-45 seconds
    const spawnTimer = setInterval(() => {
      if (Math.random() > 0.5 && !bugState.visible) {
        setBugState({
          visible: true,
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100),
          clicks: 0,
          escaped: false,
        });

        // Bug escapes after 5 seconds if not caught
        setTimeout(() => {
          setBugState((prev) => {
            if (prev.visible && prev.clicks < 3) {
              playError();
              return { ...prev, visible: false, escaped: true };
            }
            return prev;
          });
        }, 5000);
      }
    }, 15000);

    return () => clearInterval(spawnTimer);
  }, [bugState.visible, playError]);

  const handleBugClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!bugState.visible) return;

    playClick();
    const newClicks = bugState.clicks + 1;

    if (newClicks >= 3) {
      // Caught the bug!
      playSuccess();
      addExp(50); // Big reward
      setBugState((prev) => ({ ...prev, visible: false, clicks: newClicks }));
    } else {
      // Bug jumps away slightly
      setBugState((prev) => ({
        ...prev,
        clicks: newClicks,
        x: Math.min(Math.max(0, prev.x + (Math.random() * 200 - 100)), window.innerWidth - 100),
        y: Math.min(Math.max(0, prev.y + (Math.random() * 200 - 100)), window.innerHeight - 100),
      }));
    }
  };

  if (!bugState.visible && !bugState.escaped && bugState.clicks < 3) return null;

  return (
    <Box
      onClick={handleBugClick}
      sx={{
        position: 'fixed',
        left: bugState.x,
        top: bugState.y,
        zIndex: 9998,
        cursor: 'crosshair',
        transition: 'all 0.2s',
        display: bugState.visible ? 'block' : 'none',
        animation: 'scurry 0.5s infinite alternate',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Typography sx={{ fontSize: '3rem', filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.5))' }}>
          🐛
        </Typography>
        
        {/* HP Bar */}
        <Box sx={{ position: 'absolute', top: -10, left: 0, width: '100%', height: '6px', bgcolor: '#000', border: '1px solid #fff' }}>
          <Box sx={{ width: `${((3 - bugState.clicks) / 3) * 100}%`, height: '100%', bgcolor: '#ff7675', transition: 'width 0.2s' }} />
        </Box>
        
        <Typography 
          variant="caption" 
          sx={{ 
            position: 'absolute', 
            bottom: -20, 
            left: '50%', 
            transform: 'translateX(-50%)', 
            bgcolor: '#000', 
            color: '#fff', 
            px: 1, 
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            border: '2px solid #fff'
          }}
        >
          抓住它!
        </Typography>
      </Box>

      <style jsx global>{`
        @keyframes scurry {
          0% { transform: rotate(-10deg) translateY(0); }
          100% { transform: rotate(10deg) translateY(-5px); }
        }
      `}</style>
    </Box>
  );
}