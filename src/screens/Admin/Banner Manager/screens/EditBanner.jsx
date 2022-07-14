import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import queryString from "query-string";
import {
  updateBanner,
  getAllCategory,
  getDetailsBanner,
} from "../../../../api/AdminAPI";
import SelectCategory from "../../../../components/Category Select/CategorySelect.component";
import SelectIndex from "../../../../components/Index Select/IndexSelect.component";
import ImagePreivewsComponent from "../../../../components/Image Previews/ImagePreviews.component";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";

export default function BannerManager(props) {
  const history = useHistory();
  const search = queryString.parse(props.location.search);
  const bannerID = search.id;
  const [banner, setBanner] = useState();
  const [categoryID, setCategoryID] = useState();
  const [index, setIndex] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [url, setUrl] = useState();
  useEffect(async () => {
    props.handleLoading(true);

    if (bannerID) {
      await getDetailsBanner(bannerID).then(async (res) => {
        setBanner(res.data);
        setImagePreview({ url: res.data.image.url });
        setIndex(res.data.index);
        setUrl(res.data.url);
      });
      props.handleLoading(false);
    }
  }, [bannerID]);

  const handleChangeIndex = (value) => {
    if (value !== "") {
      setIndex(value.index);
    } else {
      setIndex(0);
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
      index: index,
      image: imagePreview,
      bannerID: banner._id,
      url: url,
    };
    if (data.index === 0) {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      await updateBanner(data).then((res) => {
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
        <span>Cập nhật banner </span>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <div className="news-editor mt-1">
              <p>Vị trí:</p>
            </div>
            {index ? (
              <SelectIndex
                display={banner?.display}
                index={banner?.index}
                handleChange={handleChangeIndex}
              />
            ) : (
              <></>
            )}
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
              defaultValue={banner?.url}
              key={banner?.url}
            />
          </Grid>

          <Grid item lg={12}>
            <div className="news-editor mt-2 mb-2">
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
              Cập nhật banner
            </Button>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
