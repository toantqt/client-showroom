import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "./sidebar.css";
import { getCategoryType } from "../../api/API";
import slug from "../../resources/slug";

const SidebarComponent = (props) => {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [active, setActive] = useState();
  useEffect(() => {
    setActive(localStorage.getItem("active_pd"));
  }, [localStorage.getItem("active_pd")]);
  console.log(localStorage.getItem("active_pd"));
  useEffect(async () => {
    await getCategoryType("product").then((res) => {
      setProduct(res.data);
    });
  }, []);
  const handleClick = (id) => {
    localStorage.setItem("active_pd", id);
    localStorage.setItem("active-h", 0);

    history.push(`/trang-chu/san-pham/${id}`);
  };
  const lists = product?.map((e, index) => {
    return (
      <div key={index} className="product-category">
        <div className="main-category">
          <span
            className={active === e._id ? "active" : ""}
            onClick={() => handleClick(e?._id)}
          >
            {e?.categoryName}
          </span>
        </div>
        {e?.subCategory?.map((sub) => {
          return (
            <div key={sub} className="sub-category">
              <span
                className={active === sub._id ? "active" : ""}
                onClick={() => handleClick(sub?._id)}
              >
                {sub?.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }, []);
  return (
    <Grid>
      <div className="wrap-product-category">{lists}</div>
    </Grid>
  );
};

export default SidebarComponent;
