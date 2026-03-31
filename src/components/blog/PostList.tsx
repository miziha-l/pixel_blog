'use client';

import React from 'react';
import { useBlogStore } from '@/store/useBlogStore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { Box } from '@mui/material';

export default function PostList() {
  const posts = useBlogStore((state) => state.posts);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ borderBottom: '4px dashed #ff7b9c', display: 'inline-block', pb: 1, mb: 4 }}>
        📜 QUEST LOG / 任务列表
      </Typography>
      <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'stretch' }}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ 
              width: '100%', 
              height: '100%',
              display: 'flex', 
              flexDirection: 'column', 
              bgcolor: '#fff',
              border: '4px solid #000',
              boxShadow: '6px 6px 0px #000',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translate(-4px, -4px)',
                boxShadow: '10px 10px 0px #ff7b9c'
              }
            }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#ff7b9c', fontWeight: 'bold', lineHeight: 1.4 }}>
                  {post.title}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ display: 'inline-block', bgcolor: '#48dbfb', px: 1, py: 0.5, border: '2px solid #000', fontWeight: 'bold' }}>
                    {post.date}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1, flexGrow: 1 }}>
                  {post.excerpt}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
                <Button 
                  size="small" 
                  variant="contained" 
                  color="secondary"
                  component={Link} 
                  href={`/post/${post.id}`}
                  fullWidth
                  sx={{
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0px #000',
                    '&:hover': { boxShadow: '4px 4px 0px #000', transform: 'translate(-2px, -2px)' }
                  }}
                >
                  READ MORE &gt;&gt;
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}