import { AppBar, Toolbar as MuiToolbar, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import HomeButton from "./HomeButton";
import GitHubButton from "./GitHubButton";

const Toolbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <MuiToolbar>
        <Box 
          sx={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            py: isMobile ? 1 : 0
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeButton />
          </Box>
          
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              flexGrow: 1, 
              textAlign: isMobile ? 'center' : 'left',
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 500,
              my: isMobile ? 1 : 0,
              px: 2
            }}
          >
            Calendar Hack
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GitHubButton />
          </Box>
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar;
