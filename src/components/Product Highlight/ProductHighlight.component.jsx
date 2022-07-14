import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./highlight.css";
import { getProductHighlight } from "../../api/API";
import Image from "material-ui-image";

const ProductHighlightComponent = (props) => {
  const [product, setProduct] = useState([]);
  useEffect(async () => {
    await getProductHighlight().then((res) => {
      setProduct(res.data);
    });
  }, []);

  const lists = product.map((e, index) => {
    return (
      <Grid item lg={12} md={12} xs={12} key={index}>
        <div
          style={{ width: "90%", margin: "0 auto" }}
          className="wrap-product mt-3"
        >
          <div className="img-product">
            <Image
              src={e.image[0]?.url}
              style={{
                width: "100%",
                height: "100%",
                paddingTop: "0px !important",
                objectFit: "contain",
              }}
              imageStyle={{ borderRadius: "10px" }}
            />
          </div>
          <div className="name-product mt-3">
            <span>{e.name}</span>
          </div>
        </div>
      </Grid>
    );
  });
  return (
    <Grid className="mt-5 mb-5">
      <div className="wrap-highlight">
        <div className="header-highlight">
          <span>Sản phẩm nổi bật</span>
        </div>
        <div className="content-highlight">
          <Grid container spacing={2}>
            {product.length != 0 ? (
              lists
            ) : (
              <div>
                <span>Chưa có sản phẩm nổi bật!</span>
              </div>
            )}
          </Grid>
        </div>
      </div>
    </Grid>
  );
};

export default ProductHighlightComponent;
