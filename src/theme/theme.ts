import { createTheme } from "@mui/material/styles";

// Create a custom forest theme inspired by Stridr (Aragorn from LOTR)
const theme = createTheme({
  palette: {
    primary: {
      main: "#2E6D4A", // Forest green
      dark: "#1B4332", // Deep forest
      light: "#52B788", // Light green
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#74A892", // Sage green
      dark: "#5E8C6A", // Dark sage
      light: "#95C1B1", // Light sage
      contrastText: "#1B4332",
    },
    error: {
      main: "#BC4749", // Rusty red - forest warning
    },
    background: {
      default: "#1B3A4B", // Deep forest night blue
      paper: "#F8F9FA", // Light parchment color
    },
    text: {
      primary: "#2F3E46", // Dark forest charcoal
      secondary: "#54626F", // Forest ash
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
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
          borderRadius: "8px",
          textTransform: "none",
        },
        contained: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          backgroundImage: "linear-gradient(to right, #2E6D4A, #1B4332)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
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
