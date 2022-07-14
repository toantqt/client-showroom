import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../../resources/AdminSlug";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ButtonUploadComponent from "../../../../../components/Button Upload/ButtonUpload.component";
import VideoPreviewsComponent from "../../../../../components/Video Previews/VideoPreviews.component";
import { addVideo } from "../../../../../api/AdminAPI";
export default function CreateVideo(props) {
  const history = useHistory();
  const [video, setVideo] = useState();
  const [title, setTitle] = useState("");
  const [reload, setReload] = useState(false);
  const [type, setType] = useState("");
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
          setVideo({ url: reader.result, file: file });
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
      title: title,
      video: video,
    };
    if (title === "" || !video) {
      alert("Xin vui lòng điền đầy đủ thông tin!");
    } else {
      console.log(data);
      props.handleLoading(true);

      await addVideo(data).then((res) => {
        history.push({
          pathname: AdminSlug.libraryManager,
          search: `?q=video`,
        });
      });
    }
  };

  const handleRadioChange = (event) => {
    setType(event.target.value);
    setVideo();
  };

  const handleChangeUrl = (event) => {
    setVideo({ url: event.target.value });
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Thêm video mới: </span>
      </div>
      <div className="mt-4 mb-3">
        <TextField
          id="outlined-basic"
          label="Tiêu đề"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={handleChangeTitle}
        />
      </div>
      <div className="mt-3">
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="url"
            control={<Radio color="primary" />}
            label="Đường dẫn"
          />
          <FormControlLabel
            value="file"
            control={<Radio color="primary" />}
            label="Upload file"
          />
        </RadioGroup>
      </div>
      <div className="mt-3 mb-3">
        {type === "url" ? (
          <TextField
            id="outlined-basic"
            label="Link video"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleChangeUrl}
          />
        ) : (
          <>
            {type === "file" ? (
              <ButtonUploadComponent
                handleChangeImage={handleChangeImage}
                title="Chọn video"
              />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      {video ? <VideoPreviewsComponent url={video} /> : <></>}

      {/* <div className="mt-3">
        <label style={{ fontSize: "16px", fontWeight: "500" }}>Hình ảnh:</label>
        <ButtonUploadComponent handleChangeImage={handleChangeImage} />
        {image ? <PreivewsImageComponent url={image} /> : <></>}
      </div> */}
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
