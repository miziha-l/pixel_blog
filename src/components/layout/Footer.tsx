'use client';

import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 'auto',
        py: 4, 
        bgcolor: '#000', 
        color: '#fff',
        borderTop: '4px solid #ff7b9c'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          
          {/* Copyright Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1" fontWeight="bold">
              © {new Date().getFullYear()} PIXEL_BLOG.
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Made with <FavoriteIcon sx={{ color: '#ff7b9c', fontSize: '1rem', animation: 'pulse 1.5s infinite' }} /> and Coffee.
            </Typography>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {[
              { icon: <GitHubIcon />, label: 'GitHub' },
              { icon: <TwitterIcon />, label: 'Twitter' },
              { icon: <EmailIcon />, label: 'Email' }
            ].map((social, idx) => (
              <IconButton 
                key={idx}
                sx={{ 
                  color: '#fff',
                  bgcolor: '#333',
                  border: '2px solid #fff',
                  borderRadius: 0,
                  '&:hover': {
                    bgcolor: '#ff7b9c',
                    color: '#fff',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 0 #fff'
                  },
                  transition: 'all 0.2s'
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Decorative Pixel Art Line */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
          {[...Array(5)].map((_, i) => (
            <Box key={i} sx={{ width: '8px', height: '8px', bgcolor: i % 2 === 0 ? '#48dbfb' : '#ff7b9c' }} />
          ))}
        </Box>
      </Container>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Box>
  );
}