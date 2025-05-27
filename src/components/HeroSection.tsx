import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

// Animate components with framer-motion
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: "white",
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: "0 0 24px 24px", md: "0 0 32px 32px" },
        mb: 5,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* Abstract background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: "url('/path-pattern.svg')", // You would need to create this SVG pattern
          backgroundSize: "cover",
          zIndex: 1,
        }}
      />

      {/* Animated circles */}
      {!isMobile && (
        <>
          <MotionBox
            initial={{ x: "-50%", y: "-50%" }}
            animate={{
              x: "-45%",
              y: "-45%",
              transition: {
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            sx={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.palette.secondary.main}30 0%, ${theme.palette.secondary.main}00 70%)`,
              top: "0%",
              left: "0%",
              zIndex: 1,
            }}
          />
          <MotionBox
            initial={{ x: "50%", y: "50%" }}
            animate={{
              x: "45%",
              y: "45%",
              transition: {
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            sx={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.palette.primary.light}30 0%, ${theme.palette.primary.light}00 70%)`,
              bottom: "-10%",
              right: "-10%",
              zIndex: 1,
            }}
          />
        </>
      )}

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 2, py: { xs: 6, md: 8 } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 4, md: 2 },
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "50%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <MotionTypography
              variant="h5"
              component="p"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              sx={{
                color: theme.palette.secondary.main,
                fontWeight: 600,
                mb: 1,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Run Smarter, Train Better
            </MotionTypography>

            <MotionTypography
              variant="h2"
              component="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              sx={{
                fontWeight: 800,
                mb: 2,
                fontFamily: "'Manrope', sans-serif",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Your Personal Running Training Calendar
            </MotionTypography>

            <MotionTypography
              variant="body1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                mb: 4,
                maxWidth: "600px",
                mx: { xs: "auto", md: 0 },
              }}
            >
              Customize your perfect training plan for any race distance and
              achieve your personal best. Designed for runners of all levels to
              reach their goals.
            </MotionTypography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <MotionButton
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<DirectionsRunIcon />}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                }}
              >
                Get Started
              </MotionButton>
            </Box>
          </Box>

          {!isMobile && (
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              sx={{
                maxWidth: "50%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src="/training-illustration.svg" // You would need to create/add this illustration
                alt="Running Calendar Illustration"
                sx={{
                  width: "100%",
                  maxWidth: "450px",
                  filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))",
                }}
              />
            </MotionBox>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
