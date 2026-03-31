'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Box from '@mui/material/Box';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Box
      sx={{
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          fontWeight: 'bold',
          mt: 4,
          mb: 2,
          color: 'primary.main',
          borderBottom: '2px dashed #000',
          pb: 1,
        },
        '& p': {
          mb: 2,
          lineHeight: 1.8,
        },
        '& a': {
          color: 'secondary.main',
          textDecoration: 'none',
          borderBottom: '2px solid',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: 'secondary.main',
            color: '#000',
          }
        },
        '& ul, & ol': {
          pl: 3,
          mb: 2,
        },
        '& li': {
          mb: 1,
        },
        '& blockquote': {
          borderLeft: '4px solid #000',
          pl: 2,
          py: 1,
          my: 2,
          bgcolor: 'rgba(0,0,0,0.05)',
          fontStyle: 'italic',
        },
        '& code': {
          fontFamily: 'monospace',
          bgcolor: '#000',
          color: '#48dbfb',
          px: 1,
          py: 0.5,
          fontWeight: 'bold',
        },
        '& pre': {
          bgcolor: '#000',
          p: 2,
          my: 2,
          border: '4px solid #48dbfb',
          boxShadow: '4px 4px 0px #000',
          overflowX: 'auto',
          '& code': {
            bgcolor: 'transparent',
            p: 0,
          }
        },
        '& img': {
          maxWidth: '100%',
          border: '4px solid #000',
          boxShadow: '4px 4px 0px #000',
        },
        '& table': {
          width: '100%',
          borderCollapse: 'collapse',
          my: 2,
          border: '2px solid #000',
        },
        '& th, & td': {
          border: '2px solid #000',
          p: 1,
        },
        '& th': {
          bgcolor: 'primary.main',
          color: '#fff',
        }
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
}
