import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { getProduct, getAllProduct } from "../../api/API";
import Image from "material-ui-image";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

const ListsProductComponent = (props) => {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  useEffect(async () => {
    if (props) {
      if (props.subCategoryID == "") {
        await getAllProduct(props?.categoryID, 0).then((res) => {
          setProduct(res.data);
        });
      } else {
        await getProduct(props?.categoryID, props?.subCategoryID, 0).then(
          (res) => {
            setProduct(res.data);
          }
        );
      }
      props.handleLoading(false);
    }
  }, [props?.categoryID, props?.subCategoryID]);

  const handleClick = (id) => {
    history.push(`/chi-tiet-san-pham/${id}`);
  };

  const lists = product.map((e, index) => {
    return (
      <Grid
        item
        lg={4}
        md={4}
        xs={12}
        key={index}
        onClick={() => {
          handleClick(e._id);
        }}
      >
        <div
          style={{ width: "90%", margin: "0 auto" }}
          className="wrap-product"
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
    <Grid>
      <div>
        <Grid container spacing={3}>
          {props?.loading ? (
            <div className="product-loading">
              <CircularProgress />
            </div>
          ) : (
            <>
              {product.length != 0 ? (
                lists
              ) : (
                <div className="product-loading">
                  <span>Hiện tại chưa có sản phẩm trong danh mục!</span>
                </div>
              )}
            </>
          )}
        </Grid>
      </div>
    </Grid>
  );
};

export default ListsProductComponent;
