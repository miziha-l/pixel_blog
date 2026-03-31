'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const SKILLS = [
  { name: 'React/Next.js', level: 95, color: '#61dafb', icon: '⚛️' },
  { name: 'TypeScript', level: 85, color: '#3178c6', icon: '📘' },
  { name: 'CSS/Tailwind', level: 90, color: '#38b2ac', icon: '🎨' },
  { name: 'Node.js', level: 75, color: '#339933', icon: '🟢' },
  { name: 'Pixel Art', level: 60, color: '#ff7b9c', icon: '👾' },
  { name: 'Coffee Brewing', level: 99, color: '#795548', icon: '☕' },
];

export default function Inventory() {
  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ borderBottom: '4px dashed #48dbfb', display: 'inline-block', pb: 1, mb: 4 }}>
        🎒 INVENTORY / 装备库
      </Typography>
      
      <Grid container spacing={3}>
        {SKILLS.map((skill, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <Box 
              sx={{ 
                p: 2, 
                bgcolor: '#fff', 
                border: '3px solid #000',
                boxShadow: '4px 4px 0px #000',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateX(5px)', boxShadow: `4px 4px 0px ${skill.color}` }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {skill.icon} {skill.name}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: skill.color }}>
                  Lv.{skill.level}
                </Typography>
              </Box>
              
              {/* Pixel Progress Bar */}
              <Box sx={{ height: '24px', width: '100%', bgcolor: '#f1f2f6', border: '2px solid #000', p: '2px' }}>
                <Box 
                  sx={{ 
                    height: '100%', 
                    width: `${skill.level}%`, 
                    bgcolor: skill.color,
                    transition: 'width 1s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      bgcolor: 'rgba(255,255,255,0.3)'
                    }
                  }} 
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}