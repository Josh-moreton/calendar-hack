import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { NavLink } from "react-router-dom";

const AboutButton = () => {
  return (
    <Tooltip title="About">
      <IconButton
        component={NavLink}
        to="/about"
        color="inherit"
        sx={{
          margin: "0 4px",
          "&.active": {
            color: "secondary.main",
          },
        }}
      >
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AboutButton;
