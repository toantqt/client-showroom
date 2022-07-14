import React, { useState, useEffect } from "react";
import "./scrollTop.css";
import up from "../../assets/image/up.png";
const ScrollTop = () => {
  useEffect(() => {
    const scrollTop = document.getElementById("scroll-top");
    const sticky = scrollTop.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 200) {
        scrollTop.classList.add("show");
      } else {
        scrollTop.classList.remove("show");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div id="scroll-top" onClick={handleClick}>
      <img src={up} alt="" />
    </div>
  );
};

export default ScrollTop;
