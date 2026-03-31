'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PaletteIcon from '@mui/icons-material/Palette';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          bgcolor: '#fff',
          color: '#000',
          border: '3px solid #000',
          boxShadow: '4px 4px 0px #000',
          borderRadius: 0,
          ml: 2,
          '&:hover': {
            bgcolor: '#f1f2f6',
            transform: 'translate(-2px, -2px)',
            boxShadow: '6px 6px 0px #000',
          },
          '&:active': {
            transform: 'translate(2px, 2px)',
            boxShadow: '2px 2px 0px #000',
          },
        }}
      >
        <PaletteIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            border: '3px solid #000',
            bgcolor: '#fff',
            p: 0,
          }
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 0,
            boxShadow: '8px 8px 0px #000',
            mt: 1,
          }
        }}
      >
        <MenuItem 
          onClick={() => handleThemeChange('classic')}
          sx={{ fontWeight: 'bold', borderBottom: '2px solid #000', bgcolor: theme === 'classic' ? '#ff7b9c' : 'transparent', color: theme === 'classic' ? '#fff' : '#000' }}
        >
          💖 Classic Pink
        </MenuItem>
        <MenuItem 
          onClick={() => handleThemeChange('gameboy')}
          sx={{ fontWeight: 'bold', borderBottom: '2px solid #000', bgcolor: theme === 'gameboy' ? '#8bac0f' : 'transparent', color: theme === 'gameboy' ? '#fff' : '#000' }}
        >
          🟩 GameBoy Green
        </MenuItem>
        <MenuItem 
          onClick={() => handleThemeChange('cyberpunk')}
          sx={{ fontWeight: 'bold', bgcolor: theme === 'cyberpunk' ? '#ff003c' : 'transparent', color: theme === 'cyberpunk' ? '#fff' : '#000' }}
        >
          🌃 Cyberpunk Neon
        </MenuItem>
      </Menu>
    </>
  );
}
