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
      <DialogTitle> Thông Tin Nhà Phân Phối</DialogTitle>
      <DialogContent style={{ textAlign: "left" }} className="mt-3">
        <div
          style={{
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "left !important",
          }}
        >
          <div>
            <span>
              <span style={{ color: "rgb(13, 135, 69)" }}>Tên NPP</span>:{" "}
              {props?.data?.companyName}
            </span>
          </div>
          <div>
            <span>
              <span style={{ color: "rgb(13, 135, 69)" }}>Mã NPP</span>:{" "}
              {props?.data?.acronym}
            </span>
          </div>
          <div>
            <span>
              <span style={{ color: "rgb(13, 135, 69)" }}>Email</span>:{" "}
              {props?.data?.email}
            </span>
          </div>
          <div>
            <span>
              <span style={{ color: "rgb(13, 135, 69)" }}>Địa chỉ</span>:{" "}
              {props?.data?.address}
            </span>
          </div>

          <div>
            <span>
              <span style={{ color: "rgb(13, 135, 69)" }}>Điện thoại</span>:{" "}
              {props?.data?.phoneNumber}
            </span>
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
