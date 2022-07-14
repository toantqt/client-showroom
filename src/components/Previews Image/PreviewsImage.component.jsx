import React, { useState, useEffect } from "react";
import Image from "material-ui-image";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
const PreivewsImageComponent = (props) => {
  return (
    <div style={{ width: "100%", height: "auto" }}>
      <Image
        src={props.url?.url}
        style={{
          width: "100%",
          height: "auto",
          paddingTop: "0px !important",
        }}
        imageStyle={{ width: "60%", height: "auto", position: "none" }}
      />
    </div>
  );
};

export default PreivewsImageComponent;
