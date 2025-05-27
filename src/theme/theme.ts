import { createTheme } from "@mui/material/styles";

// Create a professional running startup theme with a sophisticated color palette
const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3E50", // Professional dark blue-gray
      dark: "#1A252F", // Darker blue-gray
      light: "#34495E", // Lighter blue-gray
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#3498DB", // Modern blue
      dark: "#2980B9", // Darker blue
      light: "#5DADE2", // Lighter blue
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#E74C3C", // Professional error red
    },
    background: {
      default: "#ECEFF1", // Subtle light gray background
      paper: "#FFFFFF", // Pure white card backgrounds
    },
    text: {
      primary: "#2C3E50", // Dark blue-gray for main text
      secondary: "#7F8C8D", // Muted gray for secondary text
    },
  },
  typography: {
    fontFamily: [
      "'Open Sans'",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
          transition: "all 0.2s ease",
        },
        contained: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          "&:hover": {
            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          backgroundImage: "linear-gradient(to right, #2C3E50, #1A252F)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          transition: "all 0.2s ease",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          letterSpacing: "-0.01em",
          fontWeight: 600,
        },
        h2: {
          letterSpacing: "-0.01em",
          fontWeight: 600,
        },
        h3: {
          letterSpacing: "-0.01em",
          fontWeight: 500,
        }
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
