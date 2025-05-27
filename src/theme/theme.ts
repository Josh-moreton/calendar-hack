import { createTheme } from "@mui/material/styles";

// Create a vibrant, modern running startup theme with an inspiring color palette
const theme = createTheme({
  palette: {
    primary: {
      main: "#1E40AF", // Bold electric blue - strong brand presence
      dark: "#0F2167", // Deeper blue for hover states
      light: "#3B82F6", // Lighter blue for accents
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#10B981", // Vibrant emerald green for success states and accents
      dark: "#047857", // Deeper green
      light: "#34D399", // Light mint green
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#10B981", // Match secondary for consistency
      dark: "#047857",
      light: "#34D399",
    },
    error: {
      main: "#EF4444", // Modern red
      dark: "#B91C1C",
      light: "#F87171",
    },
    warning: {
      main: "#F59E0B", // Amber for warnings
      dark: "#D97706",
      light: "#FBBF24",
    },
    info: {
      main: "#3B82F6", // Match primary light
      dark: "#2563EB",
      light: "#60A5FA",
    },
    background: {
      default: "#F8FAFC", // Very light blue-gray background
      paper: "#FFFFFF", // Pure white card backgrounds
    },
    text: {
      primary: "#0F172A", // Near black with slight blue tint - better accessibility
      secondary: "#475569", // Slate gray for secondary text
    },
  },
  typography: {
    fontFamily: [
      "'Inter'",
      "'Manrope'", 
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: "1.25rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: "1.125rem",
      fontWeight: 600, 
    },
    h6: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: "1rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1.125rem",
      lineHeight: 1.5,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
      letterSpacing: "0.01em",
    },
    overline: {
      fontWeight: 600,
      fontSize: "0.75rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
          fontSize: "0.9375rem",
          lineHeight: 1.5,
          letterSpacing: "0.02em",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.1)",
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
          "&:hover": {
            "&:before": {
              opacity: 1,
            }
          },
          "&:focus": {
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
          },
        },
        contained: {
          boxShadow: "0 1px 2px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(1px)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            transform: "translateY(-1px)",
          },
        },
        text: {
          "&:hover": {
            backgroundColor: "rgba(59, 130, 246, 0.04)",
          },
        },
        startIcon: {
          marginRight: "8px",
        },
        endIcon: {
          marginLeft: "8px",
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.812rem",
        },
        sizeLarge: {
          padding: "12px 32px",
          fontSize: "1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.4s ease, transform 0.4s ease",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            transform: "translateY(-5px)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
          backgroundImage: "linear-gradient(to right, #1E40AF, #0F2167)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          transition: "all 0.3s ease",
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)",
        },
        elevation2: {
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        },
        elevation3: {
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
        },
        elevation4: {
          boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
        },
        elevation5: {
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: 'rgba(203, 213, 225, 0.8)',
              transition: 'all 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(59, 130, 246, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        outlined: {
          padding: '12px 14px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '10px 16px',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(243, 244, 246, 0.8)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        sizeSmall: {
          height: '24px',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #FFFFFF',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          padding: '8px 12px',
          fontSize: '0.75rem',
          fontWeight: 500,
          borderRadius: '6px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(226, 232, 240, 0.8)',
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
