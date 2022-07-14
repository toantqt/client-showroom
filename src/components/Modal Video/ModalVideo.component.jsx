import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import "./video.css";
export default function ModalVideoComponent(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Dialog
      open={props?.open}
      onClose={props?.handleClose}
      style={{ width: "900px !important", margin: "0 auto" }}
      className="video"
    >
      <div style={{ width: "100%", height: "100%" }} className="wrap-video">
        <ReactPlayer
          url={props?.url}
          width="100%"
          height="100%"
          controls={true}
          playing={true}
        />
      </div>
    </Dialog>
  );
}
