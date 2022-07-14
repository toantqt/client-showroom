import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function SearchComponent(props) {
  //   const handleClose = () => {
  //     props.setOpen(false);
  //   };

  return (
    <div>
      <Dialog
        open={props?.open}
        onClose={props?.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Tìm kiếm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Xin vui lòng nhập từ khóa cần tìm kiếm
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Từ khóa"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={props?.handleClose} color="primary">
            Tìm kiếm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
