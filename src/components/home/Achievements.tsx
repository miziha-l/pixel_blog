'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ACHIEVEMENTS = [
  { 
    title: 'First Blood!', 
    desc: '完成了第一个完整的全栈项目', 
    date: '2022.05', 
    unlocked: true,
    icon: '🗡️'
  },
  { 
    title: 'Pixel Master', 
    desc: '使用纯 CSS 绘制像素风 UI 组件', 
    date: '2023.10', 
    unlocked: true,
    icon: '🎨'
  },
  { 
    title: 'Bug Hunter', 
    desc: '连续 30 天没有写出 P0 级 Bug', 
    date: '2023.11', 
    unlocked: true,
    icon: '🐛'
  },
  { 
    title: 'Open Source Contributor', 
    desc: '向知名开源项目提交 PR 并被 Merge', 
    date: '???', 
    unlocked: false,
    icon: '🌟'
  },
];

export default function Achievements() {
  return (
    <Box sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ borderBottom: '4px dashed #ffeaa7', display: 'inline-block', pb: 1, mb: 4 }}>
        🏆 ACHIEVEMENTS / 成就系统
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {ACHIEVEMENTS.map((achievement, index) => (
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