import { createTheme } from "@mui/material/styles";

// Create a modern tech startup theme with bright, vibrant colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#3366FF", // Vibrant blue
      dark: "#2952CC", // Darker blue
      light: "#6690FF", // Light blue
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF5630", // Coral orange
      dark: "#E64B2C", // Darker orange
      light: "#FF7A59", // Light orange
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FF4242", // Modern error red
    },
    background: {
      default: "#F4F5F7", // Light gray background
      paper: "#FFFFFF", // White card backgrounds
    },
    text: {
      primary: "#253858", // Dark blue-gray text
      secondary: "#5E6C84", // Medium gray text
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
