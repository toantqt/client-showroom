import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import slug from "../../resources/slug";
import "./product.css";

const ProductComponent = (props) => {
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/trang-chu/chi-tiet-san-pham/${id}`);
  };
  return (
    <Grid
      item
      lg={3}
      md={3}
      xs={6}
      onClick={() => {
        handleClick(props?.data?._id);
      }}
    >
      <div
        style={{ width: "100%", margin: "0 auto" }}
        className="wrap-product mt-3"
      >
        <div className="img-product">
          <Image
            src={props?.data?.image[0]?.url}
            style={{
              width: "100%",
              height: "100%",
              paddingTop: "0px !important",
              objectFit: "contain",
            }}
            imageStyle={{ borderRadius: "10px" }}
          />
        </div>
        {props?.price ? (
          <div className="price-product mt-3">
            <span>{props?.data?.price?.toLocaleString("it-IT")}</span>
            <span className="ml-1">VND</span>
          </div>
        ) : (
          <></>
        )}
        <div className="name-product mt-1">
          <span>{props?.data?.name}</span>
        </div>
        {props?.price ? (
          <></>
        ) : (
          <div className="btn-product">
            <span>Mua hàng</span>
          </div>
        )}
      </div>
    </Grid>
  );
};

export default ProductComponent;
