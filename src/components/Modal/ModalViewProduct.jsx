import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function ModalViewProduct(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  console.log(props);

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props?.open}
        onClose={props?.handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Thông tin sản phẩm
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item lg={4}>
              <div className="product-img">
                <img
                  src={props?.data?.product?.image[0]?.url || ""}
                  alt=""
                  width="100%"
                />
              </div>
            </Grid>
            <Grid item lg={8}>
              <div
                style={{ fontSize: "25px", fontWeight: "500", color: "red" }}
              >
                <span>{props?.data?.product?.productName || ""}</span>
              </div>
              <div style={{ fontSize: "18px", fontWeight: "500" }}>
                <span>{props?.data?.company?.companyName || ""}</span>
              </div>

              <div
                style={{ fontSize: "20px", fontWeight: "500", color: "red" }}
                className="mt-3"
              >
                <span>
                  Giá:{" "}
                  {props?.data?.product?.price.toLocaleString("it-IT") || ""}
                </span>
              </div>
              <div className="mt-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: props?.data?.product?.description,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
