import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import youtube from "../../assets/image/ytb.png";
import msg from "../../assets/image/messenger.png";
import phone from "../../assets/image/phone.png";
import email from "../../assets/image/email.png";
import zalo from "../../assets/image/zalo.png";
import sms from "../../assets/image/sms.png";
import "./contact.css";

export default function ContactComponent(props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickItem = (url) => {
    window.location.href = url;
  };
  return (
    <Grid>
      <div className={"popup-contact " + (open ? "show" : "")}>
        <a href="sms:0907888428">
          <div>
            <img src={sms} width="26%" />
            <span className="ml-2">SMS</span>
          </div>
        </a>
        <a href="tel:0907888428">
          <div>
            <img src={phone} width="26%" />
            <span className="ml-2">Gọi 0907888428</span>
          </div>
        </a>
        <a href="mailto:hatgiongcantho82@gmail.com">
          <div>
            <img src={email} width="26%" />
            <span className="ml-2">Email</span>
          </div>
        </a>

        <div
          onClick={() => {
            handleClickItem("https://m.me/105118041925994");
          }}
        >
          <img src={msg} width="26%" />
          <span className="ml-2">Messenger</span>
        </div>
        <div
          onClick={() => {
            handleClickItem(
              "https://www.youtube.com/channel/UCYwA--kqrPavTMh_AEPeX-g"
            );
          }}
        >
          <img src={youtube} width="26%" />
          <span className="ml-2">Youtube</span>
        </div>
        <div
          onClick={() => {
            handleClickItem("https://zalo.me/0907888428");
          }}
        >
          <img src={zalo} width="26%" />
          <span className="ml-2">Zalo</span>
        </div>
      </div>
      <div className="contact" onClick={handleClick}>
        <div className={"btn-close " + (open ? "btn-show" : "")}>x</div>
        <div className={"image-container " + (open ? "img-close" : "")}>
          <img src={phone} />
          <img src={email} />
          <img src={msg} />
          <img src={youtube} />
          <img src={zalo} />
          <img src={sms} />
        </div>
      </div>
    </Grid>
  );
}
