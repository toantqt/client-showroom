import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import "./header.css";
import { useHistory } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import SearchHeader from "../../screens/Home/components/Search/SearchHeader";
import { getCategoryType } from "../../api/API";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
export default function HeaderComponent(props) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [active, setActive] = useState(1);
  const [product, setProduct] = useState([]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  useEffect(() => {
    const header = document.getElementById("header");
    const headerMobile = document.getElementById("header-mobile");
    const sticky = header.offsetTop;

    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 10) {
        header.classList.add("sticky");
        headerMobile.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
        headerMobile.classList.remove("sticky");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  useEffect(async () => {
    await getCategoryType("product").then((res) => {
      setProduct(res.data);
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("active-h")) {
      setActive(localStorage.getItem("active-h"));
    } else {
      setActive(1);
    }
  }, [localStorage.getItem("active-h")]);

  const handleClick = (status, url) => {
    localStorage.setItem("active-h", status);
    history.push(`/trang-chu/${url}`);
  };

  const handleClickSearch = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSubMenu = (id) => {
    localStorage.setItem("active_pd", id);
    history.push(`/trang-chu/san-pham/${id}`);
  };

  const lists = product.map((e, index) => {
    return (
      <li key={index + e.name} className="sub-menu-p-item">
        <div onClick={() => handleClickSubMenu(e._id)}>
          <span>{e.categoryName}</span>{" "}
          {e.subCategory.length !== 0 ? (
            <ChevronRightIcon style={{ float: "right" }} />
          ) : (
            <></>
          )}
        </div>

        {e.subCategory.length !== 0 ? (
          <ul className="sub2-menu-p">
            {e.subCategory.map((eSub, index) => {
              return (
                <li key={index + eSub.name}>
                  <div onClick={() => handleClickSubMenu(eSub._id)}>
                    <span>{eSub.name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <></>
        )}
      </li>
    );
  });

  const productMobile = product.map((e, index) => {
    return (
      <>
        {e.subCategory.length !== 0 ? (
          <>
            <ListItem button onClick={() => handleClickSubMenu(e._id)}>
              <ListItemText
                primary={e.categoryName}
                className={classes.title}
              />
              {true ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {e.subCategory.map((eSub, index) => {
                  return (
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => handleClickSubMenu(eSub._id)}
                    >
                      <ListItemText
                        primary={eSub.name}
                        className={classes.title}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </>
        ) : (
          <ListItem button onClick={() => handleClickSubMenu(e._id)}>
            <ListItemText primary={e.categoryName} className={classes.title} />
          </ListItem>
        )}
      </>
    );
  });

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="" width="40%" />
        </div>
        <Divider />

        {[
          { name: "Trang chủ", slug: "" },
          { name: "Giới thiệu", slug: "gioi-thieu" },
          { name: "Tin tức", slug: "tin-tuc" },
          { name: "Kỹ thuật nuôi trồng", slug: "ky-thuat-nuoi-trong" },
          { name: "Hệ thống cửa hàng", slug: "he-thong-cua-hang" },
          { name: "Liên hệ", slug: "lien-he" },
        ].map((text, index) => (
          <ListItem
            button
            key={text.name}
            onClick={() => {
              handleClick(1, text.slug);
            }}
          >
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
        <Divider />
        {productMobile}
        <Divider />
        <div
          style={{
            textAlign: "center",
            background: "#0d8745 ",
            color: "white",
          }}
        >
          <div>
            <span>Phòng kinh doanh</span>
          </div>
          <div>
            <span>0907 888 428</span>
          </div>
        </div>
      </List>
    </div>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleClickSearchMobile = () => {
    setSearch(!search);
  };
  return (
    <Grid>
      <Grid id="headerDesktop">
        <Grid id="header-top">
          <div className="wrap-body">
            <Grid container spacing={2}>
              <Grid item lg={2}>
                <div className="header-logo">
                  <Link to="/">
                    <img src={logo} alt="" width="100%" />
                  </Link>
                </div>
              </Grid>

              <Grid item lg={8}>
                <SearchHeader />
              </Grid>
              <Grid item lg={2}>
                <div
                  className=" float-right mt-4"
                  style={{ fontSize: "18px", fontWeight: "500" }}
                >
                  <div>
                    <span>Phòng kinh doanh</span>
                  </div>
                  <div>
                    <span>0907 888 428</span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid id="header">
          <div className="wrap-body">
            <ul className="header-option">
              <li className="menu-p">
                <Link to="#">
                  DANH MỤC SẢN PHẨM <ExpandMoreIcon />
                </Link>
                <ul className="sub-menu-p">{lists}</ul>
              </li>
              <li
                onClick={() => {
                  handleClick(1, "");
                }}
                className={parseInt(active) === 1 ? "active" : ""}
              >
                <Link to="/trang-chu">TRANG CHỦ</Link>
              </li>
              <li
                className={parseInt(active) === 2 ? "active" : ""}
                onClick={() => {
                  handleClick(2, "gioi-thieu");
                }}
              >
                <Link to="/trang-chu/gioi-thieu">GIỚI THIỆU</Link>
              </li>
              <li
                onClick={() => {
                  handleClick(3, "tin-tuc");
                }}
                className={parseInt(active) === 3 ? "active" : ""}
              >
                <Link to="/trang-chu/tin-tuc">TIN TỨC</Link>
              </li>
              <li
                className={parseInt(active) === 4 ? "active" : ""}
                onClick={() => {
                  handleClick(4, "ky-thuat-nuoi-trong");
                }}
              >
                <Link to="/trang-chu/ky-thuat-nuoi-trong">
                  KỸ THUẬT NUÔI TRỒNG
                </Link>
              </li>
              <li
                className={parseInt(active) === 5 ? "active" : ""}
                onClick={() => {
                  handleClick(5, "he-thong-cua-hang");
                }}
              >
                <Link to="/trang-chu/he-thong-cua-hang">HỆ THỐNG CỬA HÀNG</Link>
              </li>
              <li
                className={parseInt(active) === 6 ? "active" : ""}
                onClick={() => {
                  handleClick(6, "lien-he");
                }}
              >
                <Link to="/trang-chu/lien-he">LIÊN HỆ</Link>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
      <Grid id="headerMobile">
        <div className="wrap-headerMobile" id="header-mobile">
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Button
                className="button-menu"
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon fontSize="large" style={{ color: "#0d8745" }} />
              </Button>
              <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
              >
                {list("left")}
              </Drawer>
            </Grid>
            <Grid item xs={8}>
              <div className="header-logo">
                <Link to="/">
                  <img src={logo} alt="" width="38%" />
                </Link>
              </div>
            </Grid>
            <Grid item xs={2}>
              <Button className="button-menu" onClick={handleClickSearchMobile}>
                <SearchIcon fontSize="large" style={{ color: "#0d8745" }} />
              </Button>
            </Grid>
            {search ? (
              <Grid item xs={12}>
                <SearchHeader />
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
