import { Outlet } from 'react-router';
import { Box, Container } from '@mui/material';
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Index = () => {
    return (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh'
          }}
        >
            <Toolbar />
            <Container 
              maxWidth="lg" 
              sx={{ 
                flex: 1, 
                py: 3,
                px: { xs: 1, sm: 2, md: 3 } 
              }}
            >
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
}

export default Index;