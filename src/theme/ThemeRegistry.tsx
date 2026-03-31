'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes, ThemeName } from './theme';

function MuiThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const { theme: currentThemeName } = useNextTheme();
  
  // Default to classic if not found or during SSR
  const themeKey = (currentThemeName as ThemeName) || 'classic';
  const muiTheme = themes[themeKey] || themes.classic;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider defaultTheme="classic" themes={['classic', 'gameboy', 'cyberpunk']}>
      <MuiThemeProviderWrapper>
        {children}
      </MuiThemeProviderWrapper>
    </NextThemesProvider>
  );
}
