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
import warning from "../../assets/image/Modal/warning.png";
const ModalConfirmComponent = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose} maxWidth="sm">
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={props.handleClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent style={{ textAlign: "center" }} className="mt-3">
        <img src={warning} alt="" width="30%" />
        <DialogTitle> {props.title}</DialogTitle>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={props.handleDelete}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmComponent;
