import { Outlet } from "react-router";
import { Box, Container } from "@mui/material";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Index = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Toolbar />
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          py: 3,
          px: { xs: 1.5, sm: 3, md: 4 },
          width: "100%",
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Index;
