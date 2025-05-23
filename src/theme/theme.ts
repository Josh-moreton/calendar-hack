import { createTheme } from '@mui/material/styles';

// Create a custom theme based on the current color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#B391D2', // --primary-color from original CSS
      dark: '#9271B2',
      light: '#D3B1F2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#C2C5EB', // --secondary-color from original CSS
      dark: '#A2A5CB',
      light: '#E2E5FB',
      contrastText: '#424242',
    },
    error: {
      main: '#FF6FDF', // --focus-color from original CSS
    },
    background: {
      default: '#677c96', // --app-bg-color from original CSS
      paper: '#E3F7F8',   // --card-color from original CSS
    },
    text: {
      primary: '#424242', // --text-color from original CSS
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
