import {
  AppBar,
  Toolbar as MuiToolbar,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import HomeButton from "./HomeButton";
import GitHubButton from "./GitHubButton";

const Toolbar = () => {
  const theme = useTheme();

  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <MuiToolbar variant="dense" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            height: { xs: "64px", sm: "70px" },
          }}
        >
          <Box sx={{ 
            display: "flex", 
            alignItems: "center",
          }}>
            <HomeButton />
            <Typography
              variant="h1"
              component="h1"
              sx={{
                display: "flex",
                alignItems: "center",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: { xs: "1.6rem", sm: "1.8rem" },
                fontWeight: 700,
                letterSpacing: "0.01em",
                ml: 0.5,
                color: "#FFFFFF",
                textTransform: "uppercase",
                "& span": {
                  color: theme.palette.secondary.main,
                  fontWeight: 800,
                }
              }}
            >
              STRID<span>R</span>
            </Typography>
          </Box>

          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1
          }}>
            <GitHubButton />
          </Box>
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar;
