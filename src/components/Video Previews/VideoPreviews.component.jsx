import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPreviewsComponent = (props) => {
  console.log(props);
  return (
    <div style={{ width: "100%" }}>
      <ReactPlayer
        url={props.url?.url}
        width="50%"
        controls={true}
        playing={false}
      />
    </div>
  );
};

export default VideoPreviewsComponent;
