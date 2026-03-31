'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export default function PixelClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setTime(new Date()));
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, []);

  if (!time) return null; // Avoid hydration mismatch

  const formatTime = (date: Date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}/${m}/${d}`;
  };

  return (
    <Box 
      sx={{ 
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column', 
        alignItems: 'flex-end',
        bgcolor: '#000',
        color: '#48dbfb',
        p: 1,
        border: '2px solid #fff',
        boxShadow: '2px 2px 0px #000',
        minWidth: '120px'
      }}
    >
      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '1px' }}>
        {formatDate(time)}
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#ff7b9c' }}>
        {formatTime(time)}
      </Typography>
    </Box>
  );
}
