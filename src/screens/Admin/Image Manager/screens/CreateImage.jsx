import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { addImage } from "../../../../api/AdminAPI";
import ButtonUploadComponent from "../../../../components/Button Upload/ButtonUpload.component";
import PreivewsImageComponent from "../../../../components/Previews Image/PreviewsImage.component";
export default function CreateImage(props) {
  const history = useHistory();
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [reload, setReload] = useState(false);
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

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      title: title,
      image: image,
    };
    if (title === "" || !image) {
      alert("Xin vui lòng điền đầy đủ thông tin!");
    } else {
      props.handleLoading(true);

      await addImage(data).then((res) => {
        history.push({
          pathname: AdminSlug.libraryManager,
          search: `?q=image`,
        });
      });
    }
  };
  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Thêm hình ảnh mới: </span>
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
