import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { addContact, addImage } from "../../../../api/AdminAPI";
import ButtonUploadComponent from "../../../../components/Button Upload/ButtonUpload.component";
import PreivewsImageComponent from "../../../../components/Previews Image/PreviewsImage.component";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
export default function AddContact(props) {
  const history = useHistory();
  const [image, setImage] = useState();
  const [reload, setReload] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    props.handleLoading(false);
  }, [reload]);
  const handleChangeImage = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        console.log(reader.result);
        reader.onloadend = () => {
          setImage({ url: reader.result, file: file });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async () => {
    const data = {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      image: image,
      type: type,
    };
    if (data.type === "") {
      alert("Xin vui lòng điền đầy đủ thông tin!");
    } else {
      console.log(data);
      props.handleLoading(true);
      await addContact(data).then((res) => {
        history.push(AdminSlug.contactManager);
      });
    }
  };

  const handleRadioChange = (event) => {
    setType(event.target.value);
  };

  const handleChange = (event, status) => {
    if (status === 1) {
      setName(event.target.value);
    } else if (status === 2) {
      setAddress(event.target.value);
    } else if (status === 3) {
      setPhoneNumber(event.target.value);
    } else {
      setEmail(event.target.value);
    }
  };
  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Thêm Liên hệ mới: </span>
      </div>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12}>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="office"
              control={<Radio color="primary" />}
              label="Trụ sở chính"
            />
            <FormControlLabel
              value="partner"
              control={<Radio color="primary" />}
              label="Chi nhánh"
            />
          </RadioGroup>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          {" "}
          <TextField
            id="outlined-basic"
            label="Tên liên hệ"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(event) => {
              handleChange(event, 1);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            label="Địa chỉ"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(event) => {
              handleChange(event, 2);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            label="Điện thoại"
            variant="outlined"
            style={{ width: "100%" }}
            type="number"
            onChange={(event) => {
              handleChange(event, 3);
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(event) => {
              handleChange(event, 4);
            }}
            type="email"
          />
        </Grid>
      </Grid>

      <div className="mt-3">
        <label style={{ fontSize: "16px", fontWeight: "500" }}>Hình ảnh:</label>
        <ButtonUploadComponent
          handleChangeImage={handleChangeImage}
          title="Chọn hình ảnh"
        />
        {image ? <PreivewsImageComponent url={image} /> : <></>}
      </div>
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
