import React, { useState, useEffect } from "react";
import Image from "material-ui-image";
import CircularProgress from "@material-ui/core/CircularProgress";

const ImageComponent = (props) => {
  return (
    <Image
      src={props.url}
      style={{ position: "none !important" }}
      imageStyle={{ objectFit: "initial" }}
    />
  );
};

export default ImageComponent;
