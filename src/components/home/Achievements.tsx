'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const INITIAL_ACHIEVEMENTS = [
  { 
    id: 'first-blood',
    title: 'First Blood!', 
    desc: '完成了第一个完整的全栈项目', 
    date: '2022.05', 
    unlocked: true,
    icon: '🗡️'
  },
  { 
    id: 'pixel-master',
    title: 'Pixel Master', 
    desc: '使用纯 CSS 绘制像素风 UI 组件', 
    date: '2023.10', 
    unlocked: true,
    icon: '🎨'
  },
  { 
    id: 'bug-hunter',
    title: 'Bug Hunter', 
    desc: '连续 30 天没有写出 P0 级 Bug', 
    date: '2023.11', 
    unlocked: true,
    icon: '🐛'
  },
  { 
    id: 'open-source',
    title: 'Open Source Contributor', 
    desc: '向知名开源项目提交 PR 并被 Merge', 
    date: '???', 
    unlocked: false,
    icon: '🌟'
  },
  {
    id: 'konami',
    title: '30 命大挑战',
    desc: '在网页中输入神秘的 Konami 秘籍 (⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA)',
    date: '???',
    unlocked: false,
    icon: '🎮'
  }
];

export default function Achievements() {
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);

  useEffect(() => {
    // Check if konami code has been unlocked
    const checkAchievements = () => {
      const isKonamiUnlocked = localStorage.getItem('konami-unlocked') === 'true';
      
      if (isKonamiUnlocked) {
        setAchievements(prev => 
          prev.map(a => 
            a.id === 'konami' 
              ? { ...a, unlocked: true, date: new Date().toISOString().split('T')[0].replace(/-/g, '.') } 
              : a
          )
        );
      }
    };

    checkAchievements();
    
    // Set up a small interval to check if it gets unlocked while on the page
    const interval = setInterval(checkAchievements, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ borderBottom: '4px dashed #ffeaa7', display: 'inline-block', pb: 1, mb: 4 }}>
        🏆 ACHIEVEMENTS / 成就系统
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {achievements.map((achievement, index) => (
          <Paper 
            key={index}
            elevation={0}
            sx={{ 
              p: 3, 
              border: '3px solid #000',
              bgcolor: achievement.unlocked ? '#fff' : '#f5f6fa',
              opacity: achievement.unlocked ? 1 : 0.6,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              position: 'relative',
              overflow: 'hidden',
              filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
            }}
          >
            {/* Icon Box */}
            <Box 
              sx={{ 
                width: '60px', 
                height: '60px', 
                bgcolor: achievement.unlocked ? '#ffeaa7' : '#dcdde1',
                border: '3px solid #000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
                flexShrink: 0
              }}
            >
              {achievement.unlocked ? achievement.icon : '🔒'}
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: achievement.unlocked ? '#ff7b9c' : '#7f8fa6' }}>
                {achievement.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {achievement.desc}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ 
                bgcolor: '#000', 
                color: '#fff', 
                px: 2, 
                py: 0.5, 
                border: '2px solid #000' 
              }}>
                {achievement.unlocked ? `UNLOCKED: ${achievement.date}` : 'LOCKED'}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}