import { createTheme } from '@mui/material/styles';

const baseTypography = {
  fontFamily: '"DotGothic16", "Microsoft YaHei", "SimHei", monospace',
  h1: { fontWeight: 700, textTransform: 'uppercase' as const },
  h2: { fontWeight: 700, textTransform: 'uppercase' as const },
  h3: { fontWeight: 700, textTransform: 'uppercase' as const },
  h4: { fontWeight: 700, textTransform: 'uppercase' as const },
  h5: { fontWeight: 700, textTransform: 'uppercase' as const },
  h6: { fontWeight: 700, textTransform: 'uppercase' as const },
  button: { fontWeight: 700, textTransform: 'none' as const },
};

const baseShape = {
  borderRadius: 0, // Pixel art doesn't have smooth corners usually
};

const getBaseComponents = (primaryMain: string, secondaryMain: string, paperBg: string, textPrimary: string) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        border: `2px solid ${textPrimary}`,
        boxShadow: `3px 3px 0px ${textPrimary}`,
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          transform: 'translate(1px, 1px)',
          boxShadow: `2px 2px 0px ${textPrimary}`,
        },
        '&:active': {
          transform: 'translate(3px, 3px)',
          boxShadow: 'none',
        },
      },
      containedPrimary: {
        backgroundColor: primaryMain,
        color: '#fff',
        '&:hover': {
          backgroundColor: primaryMain,
          filter: 'brightness(1.1)',
        },
      },
      containedSecondary: {
        backgroundColor: secondaryMain,
        color: '#000',
        '&:hover': {
          backgroundColor: secondaryMain,
          filter: 'brightness(1.1)',
        },
      }
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        border: `3px solid ${textPrimary}`,
        boxShadow: `5px 5px 0px ${textPrimary}`,
        backgroundColor: paperBg,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translate(-2px, -2px)',
          boxShadow: `7px 7px 0px ${primaryMain}`,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        border: `3px solid ${textPrimary}`,
        boxShadow: `5px 5px 0px ${textPrimary}`,
        backgroundColor: paperBg,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        borderBottom: `3px solid ${textPrimary}`,
        boxShadow: `0px 4px 0px ${textPrimary}`,
        backgroundColor: primaryMain,
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        border: `2px solid ${textPrimary}`,
      }
    }
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        color: textPrimary,
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: textPrimary,
      }
    }
  }
});

export const themes = {
  classic: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#ff7b9c', contrastText: '#fff' }, // Anime pink
      secondary: { main: '#48dbfb', contrastText: '#000' }, // Cyan
      background: { default: 'transparent', paper: '#ffffff' },
      text: { primary: '#2d3436', secondary: '#636e72' },
    },
    typography: baseTypography,
    shape: baseShape,
    components: getBaseComponents('#ff7b9c', '#48dbfb', '#ffffff', '#2d3436'),
  }),
  gameboy: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#8bac0f', contrastText: '#0f380f' },
      secondary: { main: '#306230', contrastText: '#9bbc0f' },
      background: { default: 'transparent', paper: '#9bbc0f' },
      text: { primary: '#0f380f', secondary: '#306230' },
    },
    typography: baseTypography,
    shape: baseShape,
    components: getBaseComponents('#8bac0f', '#306230', '#9bbc0f', '#0f380f'),
  }),
  cyberpunk: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#ff003c', contrastText: '#fff' }, // Neon Red
      secondary: { main: '#00f0ff', contrastText: '#000' }, // Neon Cyan
      background: { default: 'transparent', paper: '#111111' },
      text: { primary: '#fcee0a', secondary: '#00f0ff' }, // Cyber yellow
    },
    typography: baseTypography,
    shape: baseShape,
    components: {
      ...getBaseComponents('#ff003c', '#00f0ff', '#111111', '#fcee0a'),
      MuiCard: {
        styleOverrides: {
          root: {
            border: `3px solid #00f0ff`,
            boxShadow: `5px 5px 0px #ff003c`,
            backgroundColor: '#111111',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translate(-2px, -2px)',
              boxShadow: `7px 7px 0px #00f0ff`,
            },
          },
        },
      },
    },
  }),
};

export type ThemeName = keyof typeof themes;

export default themes.classic;
