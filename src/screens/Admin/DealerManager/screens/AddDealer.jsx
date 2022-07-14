import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { addDealer } from "../../../../api/AdminAPI";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";

export default function AddDealer(props) {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    note: "",
    confirm: true,
  });
  useEffect(async () => {
    props.handleLoading(false);
  }, []);

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
      data.email === "" ||
      data.name === "" ||
      data.phoneNumber === "" ||
      data.address === ""
    ) {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      addDealer(data).then((res) => {
        history.push({
          pathname: AdminSlug.dealerManager,
          search: `?q=true`,
        });
      });
    }
  };
  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Thêm đại lý mới:</span>
      </div>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <TextField
            id="outlined-basic"
            label="Họ tên"
            variant="outlined"
            name="name"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
            required
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
            required
            type="email"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            id="outlined-basic"
            label="Điện thoại"
            variant="outlined"
            name="phoneNumber"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
            required
            type="number"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            id="outlined-basic"
            label="Địa chỉ"
            variant="outlined"
            name="address"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
            required
          />
        </Grid>
        <Grid item lg={12}>
          <TextareaAutosize
            label="Ghi chú"
            minRows={9}
            placeholder="Ghi chú"
            style={{ width: "100%" }}
            name="note"
            onChange={handleChangeInput}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: "70px" }}>
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
  );
}
