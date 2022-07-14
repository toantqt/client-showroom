import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../../resources/AdminSlug";
import queryString from "query-string";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { getDetailsVideo } from "../../../../../api/API";
import VideoPreviewsComponent from "../../../../../components/Video Previews/VideoPreviews.component";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ButtonUploadComponent from "../../../../../components/Button Upload/ButtonUpload.component";
import { updateVideo } from "../../../../../api/AdminAPI";
export default function EditVideo(props) {
  const search = queryString.parse(props.location.search);
  const videoID = search.id;
  const [video, setVideo] = useState();
  const [title, setTitle] = useState("");
  const [titleDefault, setTitleDefault] = useState("");
  const [reload, setReload] = useState(false);
  const [type, setType] = useState("");

  useEffect(async () => {
    if (videoID) {
      props.handleLoading(true);
      await getDetailsVideo(videoID).then((res) => {
        console.log(res);
        setTitleDefault(res.data.title);
        setTitle(res.data.title);
        setVideo(res.data.video);
      });
      props.handleLoading(false);
    }
  }, [videoID, reload]);

  //   console.log(video);

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
  const handleRadioChange = (event) => {
    setVideo();
    setType(event.target.value);
  };
  const handleChangeUrl = (event) => {
    setVideo({ url: event.target.value });
  };

  const handleSubmit = async () => {
    const data = {
      videoID: videoID,
      title: title,
      video: video,
    };
    if (data.title === "" || !data.video) {
      alert("Xin vui lòng điền đầy đủ thông tin!");
    } else {
      props.handleLoading(true);
      await updateVideo(data).then((res) => {
        setReload(!reload);
      });
    }
  };
  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Cập nhật video </span>
      </div>
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
      <div className="mt-3">
        <label style={{ fontSize: "16px", fontWeight: "500" }}>Video:</label>
        <div className="mt-1">
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
        <div className="mt-2 mb-3">
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
        <VideoPreviewsComponent url={video} />
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
          Cập nhật
        </Button>
      </div>
    </Grid>
  );
}
