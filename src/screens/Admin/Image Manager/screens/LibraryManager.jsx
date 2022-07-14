import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { getImage, getVideo } from "../../../../api/API";
import queryString from "query-string";
import ReactPlayer from "react-player";
import moment from "moment";
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";
import News from "../../../../components/News/News";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Image from "material-ui-image";
import ModalConfirmComponent from "../../../../components/Modal/ModalConfirm.component";
import { deleteImage, deleteVideo } from "../../../../api/AdminAPI";
import ModalVideoComponent from "../../../../components/Modal Video/ModalVideo.component";

export default function LibraryManager(props) {
  const search = queryString.parse(props.location.search);
  const type = search.q;
  const history = useHistory();
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [total, setTotal] = useState();
  const [imageID, setImageID] = useState("");
  const [openImage, setOpenImage] = useState(false);
  const [reload, setReload] = useState(false);
  const [url, setUrl] = useState("");
  const [openVideo, setOpenVideo] = useState(false);
  const [openConfirmVideo, setOpenConfirmVideo] = useState(false);
  const [videoID, setVideoID] = useState("");
  useEffect(async () => {
    props.handleLoading(true);
    if (type === "image") {
      await getImage().then((res) => {
        setImage(res.data);
        setTotal(res.data.length);
      });
    } else if (type === "video") {
      await getVideo().then((res) => {
        setVideo(res.data);
        setTotal(res.data.length);
      });
    }
    props.handleLoading(false);
  }, [type, reload]);
  console.log(image);

  const handleEditImage = (id) => {
    history.push({ pathname: AdminSlug.editImage, search: `?id=${id}` });
  };

  const handleDeleteImage = (id) => {
    setImageID(id);
    setOpenImage(true);
  };

  const handleCloseConfirmImage = () => {
    setImageID("");
    setOpenImage(false);
  };

  const submitDeleteImage = async () => {
    const data = {
      imageID: imageID,
    };
    await deleteImage(data).then((res) => {
      handleCloseConfirmImage();
      setReload(!reload);
    });
  };

  const handleClickAdd = (type) => {
    if (type === "image") {
      history.push(AdminSlug.createImage);
    } else if (type === "video") {
      history.push(AdminSlug.createVideo);
    }
  };

  const handleClickVideo = (url) => {
    setUrl(url);
    setOpenVideo(true);
  };
  const handleCloseVideo = () => {
    setUrl("");
    setOpenVideo(false);
  };
  const handleDeleteVideo = (id) => {
    setVideoID(id);
    setOpenConfirmVideo(true);
  };
  const handleCloseConfirmVideo = () => {
    setVideoID("");
    setOpenConfirmVideo(false);
  };

  const submitDeleteVideo = async () => {
    const data = {
      videoID: videoID,
    };
    await deleteVideo(data).then((res) => {
      handleCloseConfirmVideo();
      setReload(!reload);
    });
  };

  const handleEditVideo = (id) => {
    history.push({ pathname: AdminSlug.editVideo, search: `?id=${id}` });
  };

  let lists;

  if (type === "image") {
    lists = image.map((e, index) => {
      return (
        <Grid item xl={2} lg={3} md={3} xs={12}>
          <SimpleReactLightbox>
            <SRLWrapper>
              <Grid className="wrap-news">
                <div className="news">
                  <div className="img">
                    <Image
                      src={e?.library[0]?.url}
                      style={{
                        height: "100% ",
                        objectFit: "cover",
                        paddingTop: "0px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                  <div className="news-date">
                    {moment(e?.createAt).format("DD/MM/YYYY")}
                  </div>
                </div>
              </Grid>

              <div
                className="title admin-title"
                style={{ height: "120px !important" }}
              >
                <span>{e?.title}</span>
                <div style={{ float: "right" }}>
                  <IconButton
                    aria-label="delete"
                    className="btn-action btn-a-3"
                    onClick={() => {
                      handleEditImage(e._id);
                    }}
                  >
                    <EditIcon style={{ color: "blue" }} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className="btn-action btn-a-3"
                    onClick={() => {
                      handleDeleteImage(e._id);
                    }}
                  >
                    <DeleteForeverIcon style={{ color: "red" }} />
                  </IconButton>
                </div>
              </div>
            </SRLWrapper>
          </SimpleReactLightbox>
        </Grid>
      );
    });
  } else {
    lists = video.map((e, index) => {
      return (
        <Grid item xl={2} lg={3} md={3} xs={12}>
          <Grid className="wrap-news">
            <div
              className="news"
              onClick={() => {
                handleClickVideo(e.video.url);
              }}
            >
              <div className="img">
                <ReactPlayer
                  url={e.video.url}
                  width="100%"
                  height="100%"
                  controls={true}
                  light={true}
                />
              </div>
              <div
                className="img-bg"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0%",
                }}
              ></div>
            </div>
            <div
              className="title admin-title"
              style={{ width: "120px !important" }}
            >
              <span>{e?.title}</span>
              <div style={{ float: "right" }}>
                <IconButton
                  aria-label="delete"
                  className="btn-action btn-a-3"
                  onClick={() => {
                    handleEditVideo(e._id);
                  }}
                >
                  <EditIcon style={{ color: "blue" }} />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  className="btn-action btn-a-3"
                  onClick={() => {
                    handleDeleteVideo(e._id);
                  }}
                >
                  <DeleteForeverIcon style={{ color: "red" }} />
                </IconButton>
              </div>
            </div>
          </Grid>
        </Grid>
      );
    });
  }

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>
          {type === "image" ? "Quản Lý Hình Ảnh" : "Quản Lý Video"}: ({total}){" "}
        </span>{" "}
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={() => handleClickAdd(type)}
        >
          {type === "image" ? "Thêm hình ảnh" : "Thêm Video"}
        </Button>
      </div>
      <div>
        <Grid container spacing={3} className="mt-5">
          {lists}
        </Grid>
      </div>
      <ModalConfirmComponent
        open={openImage}
        handleClose={handleCloseConfirmImage}
        title="Xác nhận xóa hình ảnh"
        handleDelete={submitDeleteImage}
      />
      <ModalConfirmComponent
        open={openConfirmVideo}
        handleClose={handleCloseConfirmVideo}
        title="Xác nhận xóa video"
        handleDelete={submitDeleteVideo}
      />
      <ModalVideoComponent
        url={url}
        open={openVideo}
        handleClose={handleCloseVideo}
      />
    </Grid>
  );
}
