import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import error from "../../assets/image/Modal/error.png";
const ModalErrorComponent = (props) => {
  return (
    <Dialog open={props?.open} onClose={props?.handleClose} maxWidth="sm">
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={props?.handleClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent style={{ textAlign: "center" }} className="mt-3">
        <img src={error} alt="" width="30%" />
        <DialogTitle> {props?.title}</DialogTitle>
      </DialogContent>
      <DialogActions>
        <Button
          style={{
            backgroundColor: "#0d8745",
            color: "white",
          }}
          variant="contained"
          onClick={props?.handleClose}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalErrorComponent;
