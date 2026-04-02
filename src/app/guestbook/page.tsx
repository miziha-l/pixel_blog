'use client';

import React, { useState, useEffect } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { usePixelSound } from '@/hooks/usePixelSound';
import { Container, Typography, Box, Paper, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface GuestbookMessage {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar: string;
}

const AVATAR_COLORS = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fdcb6e', '#00b894', '#0984e3'];

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { addExp } = usePlayerStore();
  const { playSuccess, playError } = usePixelSound();
  
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/guestbook');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim() || submitting) {
      playError();
      return;
    }
    
    setSubmitting(true);
    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author.trim(),
          content: content.trim(),
          avatar: randomColor
        }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages(prev => [newMessage, ...prev]);
        setAuthor('');
        setContent('');
        playSuccess();
        addExp(30); // 留言获得较多经验
      } else {
        playError();
      }
    } catch (error) {
      console.error('Failed to post message:', error);
      playError();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: '#48dbfb', textShadow: '3px 3px 0px #000' }}>
          💬 TAVERN / 冒险者酒馆
        </Typography>
        <Typography variant="h6" color="text.secondary">
          留下你的足迹吧，旅行者！
        </Typography>
      </Box>

      {/* Message Input Form */}
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 6, 
          border: '4px solid #000', 
          boxShadow: '8px 8px 0px #ffeaa7',
          bgcolor: '#fff'
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, borderBottom: '2px dashed #000', display: 'inline-block' }}>
          ✍️ 写点什么...
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="你的名字 (Nickname)"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                border: '2px solid #000',
                borderRadius: 0,
                backgroundColor: '#fdf6e3',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
              }
            }}
          />
          
          <TextField
            label="留言内容 (Message)"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={3}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                border: '2px solid #000',
                borderRadius: 0,
                backgroundColor: '#fdf6e3',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
              }
            }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={submitting}
            endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            sx={{ 
              alignSelf: 'flex-end',
              py: 1.5,
              px: 4,
              fontSize: '1.1rem'
            }}
          >
            {submitting ? 'SUBMITTING...' : 'SUBMIT / 提交'}
          </Button>
        </Box>
      </Paper>

      {/* Message List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : messages.length === 0 ? (
          <Typography variant="body1" textAlign="center" color="text.secondary">
            还没有人留言，来抢沙发吧！
          </Typography>
        ) : (
          messages.map((msg) => (
            <Box key={msg.id} sx={{ display: 'flex', gap: 2 }}>
              <Avatar 
                sx={{ 
                  width: 60, 
                  height: 60, 
                  bgcolor: msg.avatar, 
                  border: '3px solid #000',
                  boxShadow: '2px 2px 0px #000',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}
              >
              {msg.author.charAt(0).toUpperCase()}
            </Avatar>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                flexGrow: 1,
                border: '3px solid #000',
                boxShadow: '4px 4px 0px #000',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '20px',
                  left: '-12px',
                  borderWidth: '10px 12px 10px 0',
                  borderStyle: 'solid',
                  borderColor: 'transparent #000 transparent transparent',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '20px',
                  left: '-8px',
                  borderWidth: '10px 12px 10px 0',
                  borderStyle: 'solid',
                  borderColor: 'transparent #fff transparent transparent',
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, borderBottom: '2px dashed #eee', pb: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ff7b9c' }}>
                  {msg.author}
                </Typography>
                <Typography variant="caption" fontWeight="bold" sx={{ bgcolor: '#000', color: '#fff', px: 1 }}>
                  {msg.date}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mt: 1, fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
                {msg.content}
              </Typography></Paper>
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
}