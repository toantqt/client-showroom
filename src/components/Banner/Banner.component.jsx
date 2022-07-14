import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import home from "../../assets/image/Banner/home.png";
import "./bannerCategory.css";
import Slider from "react-slick";
import { getHomeBanner } from "../../api/API";

const BannerComponent = (props) => {
  const [image, setImage] = useState([]);
  useEffect(() => {
    if (props?.index) {
      getHomeBanner(props?.index).then((res) => {
        setImage(res.data);
      });
    }
  }, [props?.index]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
  };

  const handleClick = (url) => {
    if (url !== "") {
      window.location.href = url;
    }
  };

  const lists = image.map((e, index) => {
    return (
      <div className="banner-img" key={index}>
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Image
            src={e?.image?.url}
            style={{
              width: "100%",
              height: "100%",
              paddingTop: "0px !important",
              objectFit: "cover",
              position: "none !important",
            }}
            imageStyle={{
              width: "100%",
              objectFit: "cover",
            }}
            onClick={() => {
              handleClick(e?.url);
            }}
          />
        </div>
      </div>
    );
  });
  return (
    <Grid id="home-banner">
      <Slider {...settings}>{lists}</Slider>
    </Grid>
  );
};

export default BannerComponent;
