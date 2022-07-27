import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {
  addDealer,
  createCompany,
  updatePassword,
} from "../../../../api/AdminAPI";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import ModalErrorComponent from "../../../../components/Modal/ModalError.component";
import ModalSuccessComponent from "../../../../components/Modal/ModalSuccess.component";

export default function UpdatePassword(props) {
  const history = useHistory();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(async () => {
    props.handleLoading(false);
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const handleClickAdd = () => {
    // history.push(AdminSlug.addDealer);
  };
  const handleChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      data.newPassword == "" ||
      data.oldPassword == "" ||
      data.confirmPassword == ""
    ) {
      alert("Xin vui lòng nhập đầy đủ thông tin");
    } else if (data.newPassword != data.confirmPassword) {
      alert("Xác nhận mật khẩu mới không chính xác");
    } else {
      props.handleLoading(true);

      await updatePassword(data)
        .then((res) => {
          props.handleLoading(false);
          setTitle(
            "Đổi mật khẩu thành công, vui lòng đăng nhập lại với mật khẩu vừa cập nhật"
          );
          setOpenModalSuccess(true);
        })
        .catch((error) => {
          props.handleLoading(false);
          if (error.status == 403) {
            setTitle(error.data.message);
          } else {
            setTitle("Đã có lỗi xảy ra, vui lòng thử lại sau");
          }
          setOpenModal(true);
        });
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setTitle("");
  };

  const handleCloseSuccess = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Cập nhật mật khẩu mới: </span>
      </div>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <TextField
            id="outlined-basic"
            label="Mật khẩu củ"
            variant="outlined"
            name="oldPassword"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
            required
            type="password"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className="mt-2">
        <Grid item lg={6}>
          <TextField
            id="outlined-basic"
            label="Mật khẩu mới"
            variant="outlined"
            name="newPassword"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
            required
            type="password"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className="mt-2">
        <Grid item lg={6}>
          <TextField
            id="outlined-basic"
            label="Xác nhận mật khẩu mới"
            variant="outlined"
            name="confirmPassword"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
            required
            type="password"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              style={{ float: "right" }}
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
          </div>
        </Grid>
      </Grid>

      <ModalErrorComponent
        open={openModal}
        title={title}
        handleClose={handleClose}
      />
      <ModalSuccessComponent
        open={openModalSuccess}
        title={title}
        handleClose={handleCloseSuccess}
      />
    </Grid>
  );
}
