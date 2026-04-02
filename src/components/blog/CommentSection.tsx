'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { usePixelSound } from '@/hooks/usePixelSound';
import { usePlayerStore } from '@/store/usePlayerStore';

interface CommentSectionProps {
  postId: string;
}

interface ArticleComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
  avatar: string;
}

const AVATAR_FACES = ['(OwO)', '(^▽^)', '(-_-)', '(;¬_¬)', '(>_<)', '(T_T)'];
const AVATAR_COLORS = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fdcb6e', '#00b894', '#0984e3'];

export default function CommentSection({ postId }: CommentSectionProps) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { playClick, playSuccess, playError } = usePixelSound();
  const { addExp } = usePlayerStore();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
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
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          author: author.trim(),
          content: content.trim(),
          avatar: randomColor
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments(prev => [...prev, newComment]);
        setAuthor('');
        setContent('');
        playSuccess();
        addExp(20); // 留言获得 20 EXP
      } else {
        playError();
      }
    } catch (error) {
      console.error('Failed to post comment:', error);
      playError();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ mt: 6, pt: 4, borderTop: '4px dashed #000' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main', textShadow: '1px 1px 0px #000' }}>
        💬 留言板 ({comments.length})
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5, p: 3, bgcolor: 'background.paper', border: '3px solid #000', boxShadow: '4px 4px 0px #000' }}>
        <TextField
          fullWidth
          placeholder="勇者姓名..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
              bgcolor: '#fff',
              border: '2px solid #000',
              color: '#000',
              '& fieldset': { border: 'none' },
            }
          }}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="写下你的留言..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
              bgcolor: '#fff',
              border: '2px solid #000',
              color: '#000',
              '& fieldset': { border: 'none' },
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={submitting}
          onMouseEnter={playClick}
          sx={{ width: '100%' }}
        >
          {submitting ? 'SUBMITTING...' : '发送留言 (SUBMIT)'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : comments.length === 0 ? (
          <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ p: 4, border: '2px dashed #000' }}>
            还没有人留言，快来抢第一吧！
          </Typography>
        ) : (
          comments.map((comment) => (
            <Box 
              key={comment.id}
            sx={{
              display: 'flex',
              gap: 2,
              p: 2,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: '4px 4px 0px #000',
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: comment.avatar, 
                width: 48, 
                height: 48,
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#000'
              }}
            >
              {AVATAR_FACES[Math.floor(comment.author.length % AVATAR_FACES.length)]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {comment.author}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {comment.date}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {comment.content}</Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
