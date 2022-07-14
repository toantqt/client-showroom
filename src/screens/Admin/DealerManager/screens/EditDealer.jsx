import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {
  addDealer,
  getDetailsDealer,
  updateDealer,
} from "../../../../api/AdminAPI";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Switch from "@material-ui/core/Switch";

export default function EditDealer(props) {
  const history = useHistory();
  const search = queryString.parse(props.location.search);
  console.log(search);
  const id = search.id;

  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    note: "",
    confirm: false,
  });
  const [dealer, setDealer] = useState();
  useEffect(async () => {
    props.handleLoading(false);
    if (id) {
      await getDetailsDealer(id).then((res) => {
        setData(res.data);
        setDealer(res.data);
      });
      props.handleLoading(false);
    }
  }, [id]);

  const handleClickAdd = () => {
    // history.push(AdminSlug.addDealer);
  };
  const handleChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(value);
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
      data.dealerID = id;
      await updateDealer(data).then((res) => {
        history.push({
          pathname: AdminSlug.dealerManager,
          search: `?q=${data.confirm}`,
        });
      });
    }
  };

  const handleChangeConfirm = () => {
    setData({ ...data, ["confirm"]: !data.confirm });
  };
  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Cập nhật thông tin đại lý:</span>
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
            defaultValue={dealer?.name}
            key={dealer?.name}
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
            defaultValue={dealer?.email}
            key={dealer?.email}
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
            defaultValue={dealer?.phoneNumber}
            key={dealer?.phoneNumber}
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
            defaultValue={dealer?.address}
            key={dealer?.address}
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
            defaultValue={dealer?.note}
            key={dealer?.note}
          />
        </Grid>
        <Grid item lg={12}>
          <div className="header-title mb-3">
            <span>Đã xác thực:</span>

            <Switch
              key={dealer?.confirm}
              checked={data?.confirm}
              onChange={handleChangeConfirm}
              color="primary"
              name="confirm"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
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
