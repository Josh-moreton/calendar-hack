import { IconButton, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const GitHubButton = () => {
  return (
    <Tooltip title="GitHub Repository">
      <IconButton
        href="https://github.com/nanreh/calendar-hack"
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        aria-label="GitHub Repository"
        sx={{ margin: "0 4px" }}
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  );
};

export default GitHubButton;
