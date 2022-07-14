import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import queryString from "query-string";
import {
  updateBanner,
  getAllCategory,
  getDetailsBanner,
  addBanner,
} from "../../../../api/AdminAPI";
import SelectCategory from "../../../../components/Category Select/CategorySelect.component";
import SelectIndex from "../../../../components/Index Select/IndexSelect.component";
import ImagePreivewsComponent from "../../../../components/Image Previews/ImagePreviews.component";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";

export default function AddBanner(props) {
  const history = useHistory();
  const [banner, setBanner] = useState();
  const [defaultCatgory, setDefaultCategory] = useState({
    categoryName: "",
    _id: "",
  });
  const [index, setIndex] = useState(1);
  const [imagePreview, setImagePreview] = useState();
  const [display, setDisplay] = useState();
  const [url, setUrl] = useState("");
  useEffect(() => {
    props.handleLoading(false);
  }, []);

  const handleChangeIndex = (value) => {
    if (value !== "") {
      setIndex(value.index);
    } else {
      setIndex("");
    }
  };

  const handleChangeImage = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        console.log(reader.result);
        reader.onloadend = () => {
          setImagePreview({ url: reader.result, file: file });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async () => {
    const data = {
      banner: imagePreview,
      index: index,
      url: url,
    };
    console.log(data);
    if (data.index === "" && !data.banner) {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      await addBanner(data).then((res) => {
        history.push(AdminSlug.bannerManager);
      });
    }
  };

  const handleChangeUrl = (event) => {
    setUrl(event.target.value);
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Thêm mới banner </span>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <div className="news-editor mt-1">
              <p>Vị trí:</p>
            </div>

            <SelectIndex handleChange={handleChangeIndex} />
          </Grid>

          <Grid item lg={9}>
            <div className="news-editor mt-1">
              <p>Đường dẫn:</p>
            </div>

            <TextField
              id="outlined-search"
              variant="outlined"
              style={{ width: "100%" }}
              placeholder="Đường dẫn"
              onChange={handleChangeUrl}
            />
          </Grid>

          <Grid item lg={12}>
            <div className="news-editor mt-3">
              <p>Hình ảnh:</p>
            </div>
            <ImagePreivewsComponent
              url={imagePreview}
              handleChangeImage={handleChangeImage}
            />
          </Grid>

          <Grid item lg={12} style={{ marginTop: "60px" }}>
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
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
