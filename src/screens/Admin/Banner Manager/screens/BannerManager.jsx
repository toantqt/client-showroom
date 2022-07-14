import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import TableComponent from "../../../../components/Table/Table.component";
import {
  getAllBanner,
  covertDate,
  deleteBanner,
  getAllCategory,
} from "../../../../api/AdminAPI";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import ModalImageComponent from "../../../../components/Modal Image/ModalImage.component";
import ModalConfirmComponent from "../../../../components/Modal/ModalConfirm.component";
import SelectCategory from "../../../../components/Category Select/CategorySelect.component";
import Button from "@material-ui/core/Button";

export default function BannerManager(props) {
  const history = useHistory();
  const [banner, setBanner] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [url, setUrl] = useState("");
  const [selectID, setSelectID] = useState("");
  const [reload, setReload] = useState(false);
  const [category, setCategory] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState();
  const [categorySelect, setCategorySelect] = useState("");

  useEffect(async () => {
    props.handleLoading(true);
    await getAllBanner().then((res) => {
      setBanner(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const handleClickViewImage = (image) => {
    setOpen(true);
    setUrl(image);
  };

  const handleClose = () => {
    setOpen(false);
    setUrl("");
  };

  const handleClickDelete = (id) => {
    setSelectID(id);
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setSelectID("");
    setOpenConfirm(false);
  };

  const handleDeleteBanner = async () => {
    setSelectID("");
    setOpenConfirm(false);
    props.handleLoading(true);
    let data = {
      bannerID: selectID,
    };
    await deleteBanner(data)
      .then((res) => {
        setReload(true);
      })
      .catch((error) => {});
  };

  const handleClickEdit = (id) => {
    history.push({ pathname: AdminSlug.editBanner, search: `?id=${id}` });
  };

  const handleChangeCategory = (value) => {
    if (value !== "") {
      setCategorySelect(value._id);
    } else {
      setCategorySelect("");
    }
  };

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },
    { field: "index", headerName: "Vị trí", width: 110 },
    { field: "date", headerName: "Ngày tạo", width: 150 },
    {
      field: "action",
      headerName: "Chức năng",
      width: 250,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-1"
              onClick={() => {
                handleClickViewImage(action.row?.action?.image?.url);
              }}
            >
              <VisibilityIcon />
            </IconButton>

            <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-3"
              onClick={() => {
                handleClickDelete(action.row?.action?._id);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = banner.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      index: e.banner?.index,
      date: covertDate(e.banner?.created),
      action: e.banner,
    };
  });

  const handleClickAdd = () => {
    history.push(AdminSlug.addBanner);
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Quản Lý Banner: ({banner.length}) </span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClickAdd}
        >
          Thêm banner mới
        </Button>
      </div>

      <div>
        <TableComponent columns={columns} rows={rows} />
        <ModalImageComponent open={open} url={url} handleClose={handleClose} />
        <ModalConfirmComponent
          open={openConfirm}
          handleClose={handleCloseConfirm}
          title="Xác nhận xóa banner"
          handleDelete={handleDeleteBanner}
        />
      </div>
    </Grid>
  );
}
