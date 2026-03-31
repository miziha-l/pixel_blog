'use client';

import React, { use, useState, useEffect } from 'react';
import { useBlogStore } from '@/store/useBlogStore';
import { usePixelSound } from '@/hooks/usePixelSound';
import { usePlayerStore } from '@/store/usePlayerStore';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import CommentSection from '@/components/blog/CommentSection';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const posts = useBlogStore((state) => state.posts);
  const likePost = useBlogStore((state) => state.likePost);
  const { playClick, playSuccess, playHover, playCoin } = usePixelSound();
  const { addExp } = usePlayerStore();
  const [isLiked, setIsLiked] = useState(false);
  const post = posts.find((p) => p.id === resolvedParams.id);

  // 增加阅读经验
  useEffect(() => {
    if (post) {
      addExp(10);
    }
  }, [post, addExp]);

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error" gutterBottom sx={{ fontWeight: 'bold' }}>
          [ERROR] 任务不存在或已被删除！
        </Typography>
        <Button startIcon={<ArrowBackIcon />} component={Link} href="/" variant="contained" color="secondary" sx={{ mt: 2 }}>
          返回主城
        </Button>
      </Container>
    );
  }

  const handleLike = () => {
    if (!isLiked) {
      likePost(post.id);
      setIsLiked(true);
      playCoin(); // Use coin sound for like
      addExp(5); // 投喂给经验
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          component={Link} 
          href="/" 
          onClick={playClick}
          onMouseEnter={playHover}
          sx={{ mb: 3, bgcolor: '#fff', '&:hover': { bgcolor: '#ffe6f0' }, border: '2px solid #000', color: '#000', fontWeight: 'bold' }}
        >
          返回主城
        </Button>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: '4px solid #000', boxShadow: '8px 8px 0px #ff7b9c', bgcolor: '#fff' }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: '#ff7b9c', textShadow: '2px 2px 0px #000' }}>
            {post.title}
          </Typography>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'inline-block', bgcolor: '#48dbfb', px: 2, py: 0.5, border: '2px solid #000' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                发布于 {post.date}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#ffeaa7', px: 2, py: 0.5, border: '2px solid #000' }}>
              <Typography variant="subtitle1" fontWeight="bold">
                🔥 热度: {post.likes || 0}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ 
            mt: 2, 
            p: 3,
            bgcolor: 'background.paper',
            border: '4px dashed #000'
          }}>
            <MarkdownRenderer content={post.content} />
          </Box>

          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleLike}
              onMouseEnter={playHover}
              startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              sx={{
                bgcolor: isLiked ? '#ff7b9c' : '#fff',
                color: isLiked ? '#fff' : '#000',
                border: '4px solid #000',
                boxShadow: isLiked ? '0px 0px 0px #000' : '6px 6px 0px #000',
                transform: isLiked ? 'translate(6px, 6px)' : 'none',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: isLiked ? '#ff7b9c' : '#ffeaa7',
                  boxShadow: isLiked ? '0px 0px 0px #000' : '6px 6px 0px #ff7b9c',
                },
                transition: 'all 0.1s'
              }}
            >
              {isLiked ? '感谢投喂！(๑•̀ㅂ•́)و✧' : '投喂体力药水！'}
            </Button>
          </Box>

          <CommentSection postId={post.id} />
        </Paper>
      </Box>
    </Container>
  );
}
