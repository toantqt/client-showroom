import React, { useState, useEffect } from "react";
import LoadingComponent from "../../../../components/Loading/Loading.component";
import AdminRoutes from "../../../../routes/AdminRoutes";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HeaderComponent from "../components/Header/HeaderComponent";
import SideBarComponent from "../components/Sidebar/SidebarComponent";
import logo from "../../../../assets/image/logo.png";
import "./dashboard.css";
import { onMessageListener, getTokenFb } from "../../../../firebase";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "white",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#0d8745 !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "fafafa",
  },
}));

export default function HomePage(props) {
  // const { window } = props;
  // getTokenFb();
  // onMessageListener()
  //   .then((payload) => {
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleLoading = (status) => {
    setShowLoading(status);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showLoading]);

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
          <img
            src="https://res.cloudinary.com/serviced24/image/upload/v1633589688/logomenu_nliwks.png"
            alt=""
            width="30%"
            style={{ marginTop: "10px" }}
          />
        </div>
      </div>
      <div className="sidebar mt-3">
        <SideBarComponent />
      </div>
    </div>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ backgroundColor: "#009999 " }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ width: "100%" }}>
            <HeaderComponent />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="dashboard-content">
          {showLoading ? <LoadingComponent /> : <></>}

          <AdminRoutes handleLoading={handleLoading} data={props} />
        </div>
      </main>
    </div>
  );
}
