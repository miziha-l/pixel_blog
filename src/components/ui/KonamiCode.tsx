'use client';

import React, { useState, useEffect } from 'react';
import { usePlayerStore } from '@/store/usePlayerStore';
import { usePixelSound } from '@/hooks/usePixelSound';
import { Snackbar, Alert, Typography } from '@mui/material';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export default function KonamiCode() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '' });
  
  const { addExp } = usePlayerStore();
  const { playLevelUp, playSuccess } = usePixelSound();

  useEffect(() => {
    // Check if already unlocked in local storage
    const hasUnlocked = localStorage.getItem('konami-unlocked');
    if (hasUnlocked) {
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (unlocked) return; // Only unlock once

      const key = e.key;
      setInputSequence(prev => {
        const newSeq = [...prev, key].slice(-10); // Keep last 10 keys
        
        // Check if sequence matches Konami code
        if (newSeq.join(',') === KONAMI_CODE.join(',')) {
          // Konami Code entered correctly!
          playLevelUp();
          setTimeout(() => playSuccess(), 1000);
          addExp(999);
          setUnlocked(true);
          localStorage.setItem('konami-unlocked', 'true');
          
          setToast({
            open: true,
            message: '🎉 秘籍输入成功！获得了 999 EXP 和隐藏成就！'
          });
          
          return []; // Reset sequence
        }
        
        return newSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unlocked, addExp, playLevelUp, playSuccess]);

  const handleClose = () => setToast({ ...toast, open: false });

  return (
    <Snackbar 
      open={toast.open} 
      autoHideDuration={6000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity="success" 
        sx={{ 
          border: '4px solid #000', 
          borderRadius: 0, 
          fontWeight: 'bold',
          bgcolor: '#ffeaa7',
          color: '#000',
          boxShadow: '8px 8px 0px #000',
          '& .MuiAlert-icon': {
            color: '#000'
          }
        }}
      >
        <Typography variant="h6" fontWeight="bold">⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA</Typography>
        {toast.message}
      </Alert>
    </Snackbar>
  );
}