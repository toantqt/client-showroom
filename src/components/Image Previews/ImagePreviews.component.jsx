import React, { useState, useEffect } from "react";
import Image from "material-ui-image";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
const ImagePreivewsComponent = (props) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="mb-3">
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          style={{ display: "none" }}
          onChange={props.handleChangeImage}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            style={{ textTransform: "none" }}
            component="span"
          >
            Thay đổi ảnh
          </Button>
        </label>
      </div>
      {props.url?.url ? (
        <Image
          src={props.url?.url}
          style={{
            width: "100%",
            height: "100%",
            paddingTop: "0px !important",
          }}
          imageStyle={{ width: "40%", height: "auto", position: "none" }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImagePreivewsComponent;
