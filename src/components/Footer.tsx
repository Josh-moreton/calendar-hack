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
        py: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" gutterBottom>
          No Ads. No Tracking.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
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
