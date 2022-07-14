import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import "./news.css";
const News = (props) => {
  return (
    <Grid className="wrap-news">
      <div className="news">
        <div className="img">
          <Image
            src={props?.img}
            style={{
              height: "100% ",
              objectFit: "cover",
              paddingTop: "0px",
              borderRadius: "6px",
            }}
          />
        </div>
        <div className="news-date">{props?.date}</div>
      </div>
      <div className="title">
        <span>{props?.title}</span>
      </div>
    </Grid>
  );
};

export default News;
