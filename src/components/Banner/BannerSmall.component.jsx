import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import Image from "material-ui-image";
import b4 from "../../assets/image/Banner/b4.png";
import { getHomeBanner } from "../../api/API";

import "./bannerCategory.css";

export default function BannerSmallComponent(props) {
  const history = useHistory();
  const [image, setImage] = useState([]);
  useEffect(() => {
    if (props?.index && props?.index !== 5) {
      getHomeBanner(props?.index).then((res) => {
        setImage(res.data);
      });
    }
  }, [props?.index]);
  console.log(image);

  const handleClickContact = () => {
    history.push("/trang-chu/dang-ky-dai-ly");
  };

  const handleClickUrl = (url) => {
    if (url !== "") {
      window.location.href = url;
    }
  };
  return (
    <Grid>
      <div className="banner-small">
        {props?.index !== 5 ? (
          <Image
            src={image[0]?.image?.url}
            style={{
              width: "100%",
              height: "100%",
              paddingTop: "0px !important",
              objectFit: "cover",
            }}
            imageStyle={{
              objectFit: "cover",
              borderRadius: "10px",
            }}
            onClick={() => {
              handleClickUrl(image[0]?.url);
            }}
          />
        ) : (
          <Image
            src={b4}
            style={{
              width: "100%",
              height: "100%",
              paddingTop: "0px !important",
              objectFit: "cover",
            }}
            imageStyle={{
              objectFit: "cover",
              borderRadius: "10px",
            }}
            onClick={handleClickContact}
          />
        )}
      </div>
    </Grid>
  );
}
