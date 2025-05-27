import { Box, Typography, Link, Container } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import TagIcon from "@mui/icons-material/Tag";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.dark",
        color: "white",
        py: 3,
        mt: "auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 -4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 2, sm: 0 },
          }}
        >
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.05em",
              mb: { xs: 1, sm: 0 },
              color: "rgba(255,255,255,0.9)",
              textTransform: "uppercase",
            }}
          >
            STRID<Box component="span" sx={{ color: "secondary.main" }}>R</Box>
          </Typography>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              opacity: 0.8,
              letterSpacing: "0.02em",
            }}
          >
            Professional Training Plans for Runners
          </Typography>
        </Box>

        <Box 
          sx={{ 
            borderTop: "1px solid rgba(255,255,255,0.1)", 
            pt: 2, 
            mt: 2 
          }}
        />
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Link href="mailto:run@defy.org" color="inherit" underline="hover">
              email
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TagIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Link
              href="https://sfba.social/@nanreh"
              color="inherit"
              underline="hover"
              rel="me"
            >
              mastodon
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
