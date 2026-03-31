'use client';

import React, { useState, useEffect } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TypewriterProps extends TypographyProps {
  text: string;
  speed?: number;
}

export default function Typewriter({ text, speed = 100, sx, ...props }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <Typography sx={{ ...sx }} {...props}>
        {displayedText}
      </Typography>
      <Box 
        component="span" 
        sx={{ 
          display: 'inline-block',
          width: '10px',
          height: '1.2em',
          bgcolor: '#ff7b9c',
          ml: 0.5,
          animation: isComplete ? 'blink 1s step-end infinite' : 'none'
        }} 
      />
    </Box>
  );
}