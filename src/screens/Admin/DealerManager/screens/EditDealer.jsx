import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {
  addDealer,
  createCompany,
  getDetailsCompany,
  updateCompany,
} from "../../../../api/AdminAPI";
import AdminSlug from "../../../../resources/AdminSlug";
import { useHistory } from "react-router-dom";
import ModalErrorComponent from "../../../../components/Modal/ModalError.component";
import queryString from "query-string";

export default function EditDealer(props) {
  const search = queryString.parse(props.location.search);
  const companyID = search.id;
  const history = useHistory();
  const [data, setData] = useState({
    companyName: "",
    acronym: "",
    phoneNumber: "",
    address: "",
    email: "",
  });
  const [defaultValue, setDefaultVaule] = useState();
  useEffect(async () => {
    props.handleLoading(false);
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(async () => {
    props.handleLoading(true);
    if (companyID) {
      await getDetailsCompany(companyID).then((res) => {
        setData({
          companyName: res.data.companyName,
          acronym: res.data.acronym,
          phoneNumber: res.data.phoneNumber,
          address: res.data.address,
          email: res.data.email,
        });
        setDefaultVaule(res.data);
      });
      props.handleLoading(false);
    }
  }, [companyID]);

  const handleClickAdd = () => {
    // history.push(AdminSlug.addDealer);
  };
  const handleChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    props.handleLoading(true);
    await updateCompany(companyID, data)
      .then((res) => {
        history.push(AdminSlug.dealerManager);
      })
      .catch((error) => {
        props.handleLoading(false);
        setTitle(error.data.message);
        setOpenModal(true);
      });
    // if (
    //   data.email === "" ||
    //   data.name === "" ||
    //   data.phoneNumber === "" ||
    //   data.address === ""
    // ) {
    //   alert("Xin vui lòng điền đầy đủ thông tin");
    // } else {
    //   addDealer(data).then((res) => {
    //     history.push({
    //       pathname: AdminSlug.dealerManager,
    //       search: `?q=true`,
    //     });
    //   });
    // }
  };

  const handleClose = () => {
    setOpenModal(false);
    setTitle("");
  };
  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Cập nhật thông tin nhà phân phối:</span>
      </div>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <TextField
            id="outlined-basic"
            label="Tên nhà phân phối"
            variant="outlined"
            name="companyName"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
            defaultValue={defaultValue?.companyName}
            key={defaultValue?.companyName}
            required
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            id="outlined-basic"
            label="Tên viết tắt"
            variant="outlined"
            name="acronym"
            style={{ width: "100%" }}
            onChange={handleChangeInput}
            defaultValue={defaultValue?.acronym}
            key={defaultValue?.acronym}
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
            defaultValue={defaultValue?.email}
            key={defaultValue?.email}
            required
            disabled
            type="email"
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
            defaultValue={defaultValue?.address}
            key={defaultValue?.address}
            required
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
            defaultValue={defaultValue?.phoneNumber}
            key={defaultValue?.phoneNumber}
            required
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
      <ModalErrorComponent
        open={openModal}
        title={title}
        handleClose={handleClose}
      />
    </Grid>
  );
}
