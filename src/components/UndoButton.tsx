
import { Button } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';

interface Props {
  undoHandler: () => void;
  disabled: boolean;
}

const UndoButton = ({ undoHandler, disabled }: Props) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<UndoIcon />}
      onClick={undoHandler}
      disabled={disabled}
      sx={{
        borderRadius: 1,
        textTransform: 'none',
        fontWeight: 500,
        boxShadow: 1
      }}
    >
      Undo
    </Button>
  );
};

export default UndoButton;
