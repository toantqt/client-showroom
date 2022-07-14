import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Image from "material-ui-image";
import { Height } from "@material-ui/icons";

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

export default function ModalImageComponent(props) {
  const classes = useStyles();
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [fullWidth, setFullWidth] = React.useState(true);
  console.log(props);
  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <Image src={props?.url} style={{ objectFit: "contain" }} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
