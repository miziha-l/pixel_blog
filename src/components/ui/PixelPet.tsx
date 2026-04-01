'use client';

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

const DIALOGUES = [
  "主人，欢迎回来！(๑•̀ㅂ•́)و✧",
  "今天也要元气满满哦！✨",
  "代码写完了吗？不要摸鱼啦！👾",
  "我的 MP 快满了，要释放魔法吗？🪄",
  "点我点我！(ﾉ>ω<)ﾉ",
  "需要恢复药水吗？🍎",
  "好晕啊，不要一直晃我... 😵‍💫",
  "戳我也没有金币掉落啦！🪙",
  "再摸我，我就要放电了！⚡",
  "今天的 bug 修完了吗？🐛",
  "好想吃草莓蛋糕啊... 🍰"
];

const FOODS = ['🍎', '🍙', '🍣', '🍗', '🍜', '🍔', '🍦', '🍓'];

export default function PixelPet() {
  // Add dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 }); // offset from original position
  const [isHovered, setIsHovered] = useState(false);
  const [dialogue, setDialogue] = useState('');
  const [showDialogue, setShowDialogue] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [eating, setEating] = useState('');
  
  // Dragging logic
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Handle dragging
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        
        // Prevent dragging too far out of screen
        const newX = positionRef.current.x + dx;
        const newY = positionRef.current.y + dy;
        
        setPosition({ x: newX, y: newY });
      } else {
        // Handle looking direction
        // Calculate pet's absolute position on screen
        const petX = window.innerWidth - 80 + position.x; 
        if (e.clientX < petX && isFlipped) {
          setIsFlipped(false);
        } else if (e.clientX > petX + 40 && !isFlipped) {
          setIsFlipped(true);
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        positionRef.current = { ...position };
        // Show dizzy dialogue if dragged
        setDialogue(DIALOGUES[6]);
        setShowDialogue(true);
        setTimeout(() => setShowDialogue(false), 3000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isFlipped, isDragging, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger click if not dragging
    if (Math.abs(position.x - positionRef.current.x) < 5 && Math.abs(position.y - positionRef.current.y) < 5) {
      const isRightClick = e.type === 'contextmenu';
      
      if (isRightClick) {
        e.preventDefault();
        const randomFood = FOODS[Math.floor(Math.random() * FOODS.length)];
        setEating(randomFood);
        setDialogue(`好吃！${randomFood} 最棒了！😋`);
        setShowDialogue(true);
        
        // Jump animation
        const currentY = position.y;
        setPosition({ x: position.x, y: currentY - 20 });
        setTimeout(() => setPosition({ x: position.x, y: currentY }), 150);
        setTimeout(() => setPosition({ x: position.x, y: currentY - 20 }), 300);
        setTimeout(() => setPosition({ x: position.x, y: currentY }), 450);

        setTimeout(() => {
          setEating('');
          setShowDialogue(false);
        }, 3000);
      } else {
        const randomDialogue = DIALOGUES[Math.floor(Math.random() * (DIALOGUES.length - 1))]; // Exclude dizzy dialogue
        setDialogue(randomDialogue);
        setShowDialogue(true);
        
        // Jump animation
        const currentY = position.y;
        setPosition({ x: position.x, y: currentY - 30 });
        setTimeout(() => setPosition({ x: position.x, y: currentY }), 200);
    
        // Hide dialogue after 3 seconds
        setTimeout(() => {
          setShowDialogue(false);
        }, 3000);
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 30,
        right: 40,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
      }}
    >
      {/* Dialogue Box */}
      <Box 
        sx={{ 
          opacity: showDialogue ? 1 : 0,
          transition: 'opacity 0.2s',
          mb: 2,
          position: 'absolute',
          bottom: '100%',
          right: '-20px',
          width: '200px',
          pointerEvents: 'none'
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            border: '3px solid #000',
            boxShadow: '4px 4px 0px #000',
            bgcolor: '#fff',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              right: '40px',
              borderWidth: '10px 10px 0',
              borderStyle: 'solid',
              borderColor: '#000 transparent transparent transparent',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: '-6px',
              right: '42px',
              borderWidth: '8px 8px 0',
              borderStyle: 'solid',
              borderColor: '#fff transparent transparent transparent',
              zIndex: 1,
            }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold', lineHeight: 1.4 }}>
            {dialogue}
          </Typography>
        </Paper>
      </Box>

      {/* Pet Character */}
      <Box
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onContextMenu={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          cursor: isDragging ? 'grabbing' : 'grab',
          transform: `scaleX(${isFlipped ? -1 : 1}) ${isDragging ? 'scale(1.1) rotate(-5deg)' : ''}`,
          transition: 'transform 0.1s',
          animation: isDragging ? 'none' : 'float 3s ease-in-out infinite',
          filter: isHovered || isDragging ? 'drop-shadow(0px 0px 8px #ff7b9c)' : 'drop-shadow(4px 4px 0px rgba(0,0,0,0.3))',
        }}
      >
        {/* Simple CSS-based Pixel Art Character */}
        <Box sx={{ width: '80px', height: '80px', position: 'relative' }}>
          {/* Head */}
          <Box sx={{ position: 'absolute', top: '10px', left: '15px', width: '50px', height: '40px', bgcolor: '#ffeaa7', border: '3px solid #000' }} />
          
          {/* Hair */}
          <Box sx={{ position: 'absolute', top: '0', left: '10px', width: '60px', height: '20px', bgcolor: '#ff7b9c', border: '3px solid #000' }} />
          <Box sx={{ position: 'absolute', top: '20px', left: '5px', width: '15px', height: '30px', bgcolor: '#ff7b9c', border: '3px solid #000', borderRight: 'none' }} />
          
          {/* Eyes - change to spiral when dragging, heart when eating */}
          {isDragging ? (
            <>
              <Typography sx={{ position: 'absolute', top: '15px', left: '20px', fontSize: '12px', fontWeight: 'bold' }}>X</Typography>
              <Typography sx={{ position: 'absolute', top: '15px', left: '40px', fontSize: '12px', fontWeight: 'bold' }}>X</Typography>
            </>
          ) : eating ? (
            <>
              <Typography sx={{ position: 'absolute', top: '16px', left: '20px', fontSize: '14px', color: '#ff7675' }}>❤</Typography>
              <Typography sx={{ position: 'absolute', top: '16px', left: '40px', fontSize: '14px', color: '#ff7675' }}>❤</Typography>
            </>
          ) : (
            <>
              <Box sx={{ position: 'absolute', top: '25px', left: '25px', width: '6px', height: '10px', bgcolor: '#000' }} />
              <Box sx={{ position: 'absolute', top: '25px', left: '45px', width: '6px', height: '10px', bgcolor: '#000' }} />
            </>
          )}
          
          {/* Mouth - change when eating */}
          {eating ? (
            <Box sx={{ position: 'absolute', top: '38px', left: '35px', width: '10px', height: '6px', bgcolor: '#ff7675', borderRadius: '0 0 10px 10px' }} />
          ) : (
            <Box sx={{ position: 'absolute', top: '38px', left: '38px', width: '4px', height: '2px', bgcolor: '#000' }} />
          )}

          {/* Eating animation */}
          {eating && (
            <Typography 
              sx={{ 
                position: 'absolute', 
                top: '30px', 
                left: '32px', 
                fontSize: '20px', 
                zIndex: 10,
                animation: 'eatFood 0.5s ease-in-out infinite alternate'
              }}
            >
              {eating}
            </Typography>
          )}
          
          {/* Body */}
          <Box sx={{ position: 'absolute', top: '50px', left: '25px', width: '30px', height: '20px', bgcolor: '#74b9ff', border: '3px solid #000' }} />
          
          {/* Arms - flail when dragging */}
          <Box sx={{ position: 'absolute', top: '55px', left: '15px', width: '10px', height: '15px', bgcolor: '#ffeaa7', border: '3px solid #000', transform: isHovered || isDragging ? 'rotate(135deg) translateY(-10px)' : 'rotate(20deg)', transition: 'transform 0.2s' }} />
          <Box sx={{ position: 'absolute', top: '55px', left: '55px', width: '10px', height: '15px', bgcolor: '#ffeaa7', border: '3px solid #000', transform: isDragging ? 'rotate(-135deg) translateY(-10px)' : 'rotate(-20deg)', transition: 'transform 0.2s' }} />
          
          {/* Legs */}
          <Box sx={{ position: 'absolute', top: '70px', left: '30px', width: '8px', height: '10px', bgcolor: '#000' }} />
          <Box sx={{ position: 'absolute', top: '70px', left: '42px', width: '8px', height: '10px', bgcolor: '#000' }} />
        </Box>
      </Box>
      
      {/* Shadow */}
      <Box sx={{ 
        width: '40px', 
        height: '10px', 
        bgcolor: 'rgba(0,0,0,0.2)', 
        borderRadius: '50%', 
        mt: 1,
        animation: isDragging ? 'none' : 'shadowPulse 3s ease-in-out infinite',
        opacity: isDragging ? 0.1 : 1
      }} />

      <style jsx global>{`
        @keyframes shadowPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(0.8); opacity: 0.2; }
        }
        @keyframes eatFood {
          0% { transform: scale(1) translateY(0); }
          100% { transform: scale(0.8) translateY(5px); opacity: 0; }
        }
      `}</style>
    </Box>
  );
}