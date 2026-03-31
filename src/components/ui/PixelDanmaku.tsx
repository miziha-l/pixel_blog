'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePixelSound } from '@/hooks/usePixelSound';

interface Bullet {
  id: number;
  text: string;
  top: number;
  speed: number;
  color: string;
}

const COLORS = ['#ff7b9c', '#48dbfb', '#ffeaa7', '#55efc4', '#fff'];
const MOCK_MESSAGES = [
  '这个博客太酷了吧！(๑•̀ㅂ•́)و✧',
  '前方高能反应...',
  '像素风赛高！',
  '博主什么时候更新？',
  '233333333',
  '打卡留念~',
  'BGM 好听！',
  'AWSL',
  '这里是新手村吗？',
];

export default function PixelDanmaku() {
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const { playHover } = usePixelSound();
  
  useEffect(() => {
    let bulletId = 0;
    
    const interval = setInterval(() => {
      // 30% chance to spawn a new bullet every second
      if (Math.random() > 0.3) return;
      
      const text = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
      const top = Math.random() * 60 + 10; // 10% to 70% from top
      const speed = Math.random() * 5 + 8; // 8s to 13s
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      const newBullet: Bullet = {
        id: bulletId++,
        text,
        top,
        speed,
        color,
      };
      
      setBullets((prev) => [...prev, newBullet]);
      
      // Clean up bullet after it finishes animation
      setTimeout(() => {
        setBullets((prev) => prev.filter((b) => b.id !== newBullet.id));
      }, speed * 1000 + 1000);
      
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        pointerEvents: 'none', 
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      {bullets.map((bullet) => (
        <Typography
          key={bullet.id}
          variant="h6"
          onMouseEnter={playHover}
          sx={{
            position: 'absolute',
            top: `${bullet.top}%`,
            right: '-20%',
            whiteSpace: 'nowrap',
            color: bullet.color,
            fontWeight: 'bold',
            textShadow: '2px 2px 0px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            pointerEvents: 'auto', // Allow hover
            cursor: 'pointer',
            animation: `danmaku ${bullet.speed}s linear forwards`,
            '&:hover': {
              animationPlayState: 'paused',
              zIndex: 10000,
              transform: 'scale(1.2)',
            }
          }}
        >
          {bullet.text}
        </Typography>
      ))}
      <style jsx global>{`
        @keyframes danmaku {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-150vw);
          }
        }
      `}</style>
    </Box>
  );
}
