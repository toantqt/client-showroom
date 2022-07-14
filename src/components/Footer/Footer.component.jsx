import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.jpg";
import facebook from "../../assets/image/facebook.png";
import youtube from "../../assets/image/youtube.png";

const FooterComponent = () => {
  return (
    <footer>
      <div style={{ position: "relative" }}>
        <div
          className="bg-footer"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/xuan-nong/image/upload/v1639712680/bgfooter_baqf5c.png)`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="content-footer">
          <div className="wrap-body content-body mt-3">
            <Grid container spacing={2} id="footer">
              <Grid item lg={6} md={6} xs={12}>
                <div>
                  <div className="footer-title">
                    <span>SHOP HẠT GIỐNG CẦN THƠ</span>
                  </div>
                  <div className="footer-lists">
                    <ul>
                      <li>
                        <span>
                          <i class="fas fa-home"></i>
                          381N15 tổ 6, Khu vực 2, đường Trần Nam Phú, P. An
                          Khánh, Q. Ninh Kiêu, TP. Cần Thơ
                        </span>
                      </li>
                      <li>
                        <span>
                          {" "}
                          <i class="fas fa-phone"></i>0907 888 428
                        </span>
                      </li>
                      <li>
                        <span>
                          <i class="fas fa-envelope"></i>
                          hatgiongcantho82@gmail.com
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Grid>
              <Grid item lg={3} md={3} xs={12}></Grid>
              <Grid item lg={3} md={3} xs={12}>
                <div>
                  <div className="footer-title">
                    <span className="footer-title">Danh mục</span>
                  </div>
                  <div className="footer-lists">
                    <ul>
                      <li>
                        <Link to="/trang-chu/lien-he">Liên hệ</Link>
                      </li>
                      <li>
                        <Link to="/trang-chu/tin-tuc">Tin tức</Link>
                      </li>
                      <li className="footer-social-des">
                        <a href="https://www.facebook.com/H%E1%BA%A1t-Gi%E1%BB%91ng-C%E1%BA%A7n-Th%C6%A1-105118041925994">
                          <img src={facebook} alt="" width="16%" />
                        </a>
                        <a href="https://www.youtube.com/channel/UCYwA--kqrPavTMh_AEPeX-g">
                          <img
                            src={youtube}
                            alt=""
                            width="16%"
                            className="ml-2"
                          />
                        </a>
                        <img
                          src={logo}
                          alt=""
                          width="16%"
                          style={{ borderRadius: "6px" }}
                          className="ml-2"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ textAlign: "center" }}
                className="footer-social"
              >
                <a href="https://www.facebook.com/H%E1%BA%A1t-Gi%E1%BB%91ng-C%E1%BA%A7n-Th%C6%A1-105118041925994">
                  <img src={facebook} alt="" width="15%" />
                </a>
                <a href="https://www.youtube.com/channel/UCYwA--kqrPavTMh_AEPeX-g">
                  <img src={youtube} alt="" width="15%" className="ml-2" />
                </a>
                <img
                  src={logo}
                  alt=""
                  width="15%"
                  style={{ borderRadius: "6px" }}
                  className="ml-2"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
