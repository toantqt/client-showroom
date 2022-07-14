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
import check from "../../assets/image/Modal/check.png";
const ModalSuccessComponent = (props) => {
  return (
    <Dialog open={props?.open} onClose={props?.handleClose} maxWidth="sm">
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={props?.handleClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent style={{ textAlign: "center" }} className="mt-3">
        <img src={check} alt="" width="30%" />
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

export default ModalSuccessComponent;
