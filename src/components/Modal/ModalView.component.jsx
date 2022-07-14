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
const ModalViewComponent = (props) => {
  return (
    <Dialog open={props?.open} onClose={props?.handleClose} maxWidth="sm">
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={props?.handleClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent style={{ textAlign: "center" }} className="mt-3">
        <DialogTitle> Thông tin khách hàng cần liên hệ</DialogTitle>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "left !important",
          }}
        >
          <div>
            <span>Họ và tên: {props?.data?.name}</span>
          </div>
          <div>
            <span>Điện thoại: {props?.data?.phoneNumber}</span>
          </div>
          <div>
            <span>Địa chỉ: {props?.data?.address}</span>
          </div>
          <div>
            <span>Email: {props?.data?.email}</span>
          </div>

          <div>
            <span>Ghi chú: {props?.data?.note}</span>
          </div>
        </div>
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

export default ModalViewComponent;
