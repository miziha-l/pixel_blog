import React from 'react';
import { Container, Typography, Paper, Box, Avatar } from '@mui/material';

export default function About() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4, animation: 'float 3s ease-in-out infinite' }}>
        <Typography variant="h2" sx={{ color: '#ff7b9c', textShadow: '3px 3px 0px #000' }}>
          (ﾉ&gt;ω&lt;)ﾉ 欢迎!
        </Typography>
      </Box>
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '4px solid #000', boxShadow: '8px 8px 0px #ff7b9c' }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar 
            sx={{ 
              width: 120, 
              height: 120, 
              bgcolor: '#48dbfb', 
              fontSize: '4rem',
              border: '4px solid #000',
              boxShadow: '4px 4px 0px #000',
              animation: 'float 4s ease-in-out infinite alternate'
            }}
          >
            👾
          </Avatar>
        </Box>
        <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: '#ff7b9c' }}>
          CHARACTER PROFILE
        </Typography>
        <Box sx={{ textAlign: 'left', mt: 4, p: 3, bgcolor: '#fdf6e3', border: '2px dashed #000', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: -15, right: -15, bgcolor: '#fff', border: '2px solid #000', px: 1, transform: 'rotate(15deg)' }}>
            <Typography variant="caption" fontWeight="bold">Lv.99</Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>
            NAME: 魔法使开发者 🧙‍♂️
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>
            CLASS: FRONTEND MAGE ✨
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', minWidth: '40px' }}>HP:</Typography>
            <Box sx={{ flexGrow: 1, height: '20px', bgcolor: '#ffeaa7', border: '2px solid #000', p: '2px' }}>
              <Box sx={{ width: '100%', height: '100%', bgcolor: '#ff7675' }} />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>999/999</Typography>
          </Box>
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', minWidth: '40px' }}>MP:</Typography>
            <Box sx={{ flexGrow: 1, height: '20px', bgcolor: '#ffeaa7', border: '2px solid #000', p: '2px' }}>
              <Box sx={{ width: '80%', height: '100%', bgcolor: '#74b9ff' }} />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>800/999</Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mt: 4, lineHeight: 1.8, fontWeight: 'bold', fontSize: '1.1rem' }}>
          你好！我是这个博客的作者。我喜欢探索新技术，特别是前端领域的最新发展。
          希望这个像素风格的博客能给你带来复古游戏的乐趣！🌸✨ 
          <br/>
          (๑•̀ㅂ•́)و✧ 一起加油吧！
        </Typography>
      </Paper>
    </Container>
  );
}