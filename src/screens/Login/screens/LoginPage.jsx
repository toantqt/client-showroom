import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import "./login.css";
import { login } from "../../../api/AdminAPI";
import logo from "../../../assets/image/logo.png";
import { getTokenFb } from "../../../firebase";
// import LoadingComponent from "../../../components/Loading/Loading.component";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
    },
  },
}));
const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [token, setToken] = useState();
  useEffect(async () => {
    await getTokenFb().then((res) => {
      setToken(res);
    });
  }, []);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const handleClickLogin = async () => {
    setShowLoading(true);
    const data = {
      email: email,
      password: password,
      token: token,
    };
    await login(data).then(async (res) => {
      if (res.status === 500) {
        alert(res.data.message);
      } else {
        // alert(
        //   "Hệ thống đang trong quá trình fix lỗi, xin vùi lòng truy cập lại sau. Thanks"
        // );
        // localStorage.clear();
        if (res === "admin") {
          history.push("/admin");
        } else {
          alert("Bạn không có quyền để truy cập");
          localStorage.clear();
          window.location.reload();
        }
      }
    });
  };

  return (
    <div className="limiter">
      <div className="container-login">
        <Grid className="wrap">
          <div className="title-login ">
            <img src={logo} alt="" width="69%" />
          </div>

          <div className="form-login ">
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                type="text"
                label="Email"
                name="email"
                onChange={handleChangeInput}
                required
              />
              <TextField
                type="password"
                className="mt-4"
                label="Mật khẩu"
                name="password"
                onChange={handleChangeInput}
                required
              />
            </form>
          </div>

          <div style={{ marginTop: "60px" }} onClick={handleClickLogin}>
            <a className="btn-login">Đăng nhập</a>
          </div>
        </Grid>
      </div>
      {/* {showLoading ? <LoadingComponent /> : <></>} */}
    </div>
  );
};

export default LoginPage;
