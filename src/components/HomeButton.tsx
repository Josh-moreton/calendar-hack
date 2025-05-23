import { IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

const HomeButton = () => {
  return (
    <Tooltip title="Home">
      <IconButton
        component={NavLink}
        to="/"
        color="inherit"
        sx={{
          margin: "0 4px",
          "&.active": {
            color: "secondary.main",
          },
        }}
      >
        <HomeIcon />
      </IconButton>
    </Tooltip>
  );
};

export default HomeButton;
