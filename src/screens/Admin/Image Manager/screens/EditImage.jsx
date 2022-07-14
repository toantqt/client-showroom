import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import queryString from "query-string";
import TextField from "@material-ui/core/TextField";
import { getDetailsImage } from "../../../../api/API";
import ImagePreivewsComponent from "../../../../components/Image Previews/ImagePreviews.component";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { updateImage } from "../../../../api/AdminAPI";
export default function EditImage(props) {
  const search = queryString.parse(props.location.search);
  const imgID = search.id;
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [titleDefault, setTitleDefault] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(async () => {
    if (imgID) {
      props.handleLoading(true);

      await getDetailsImage(imgID).then((res) => {
        setTitle(res.data.title);
        setTitleDefault(res.data.title);
        setImage({ url: res.data.library[0].url });
      });
      props.handleLoading(false);
    }
  }, [imgID, reload]);

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

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      imageID: imgID,
      title: title,
      image: image,
    };
    if (data.title === "") {
      alert("Xin vui lòng điền đầy đủ thông tin!");
    } else {
      props.handleLoading(true);

      await updateImage(data).then((res) => {
        setReload(!reload);
      });
    }
  };
  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Cập nhật hình ảnh </span>
      </div>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12}>
          <div className="mt-4 mb-3">
            <TextField
              id="outlined-basic"
              label="Tiêu đề"
              variant="outlined"
              style={{ width: "100%" }}
              key={titleDefault}
              defaultValue={titleDefault}
              onChange={handleChangeTitle}
            />
          </div>
        </Grid>
        <Grid item lg={8}>
          <div className="mt-3">
            <label style={{ fontSize: "16px", fontWeight: "500" }}>
              Hình ảnh:
            </label>
            <ImagePreivewsComponent
              url={image}
              handleChangeImage={handleChangeImage}
            />
          </div>
        </Grid>
      </Grid>

      <div style={{ marginTop: "70px", bottom: 0 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          style={{ float: "right" }}
          onClick={handleSubmit}
        >
          Cập nhật
        </Button>
      </div>
    </Grid>
  );
}
