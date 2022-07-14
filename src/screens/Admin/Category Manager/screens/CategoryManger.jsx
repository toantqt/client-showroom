import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import TableComponent from "../../../../components/Table/Table.component";
import {
  covertDate,
  getAllCategory,
  addCategory,
  deleteCategory,
} from "../../../../api/AdminAPI";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import ModalImageComponent from "../../../../components/Modal Image/ModalImage.component";
import ModalConfirmComponent from "../../../../components/Modal/ModalConfirm.component";
import SelectCategory from "../../../../components/Category Select/CategorySelect.component";
import Button from "@material-ui/core/Button";
import ModalAddSubCategoryComponent from "../../../../components/Modal/ModalAddSubCategory.component";

export default function CategoryManager(props) {
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
  const [openAdd, setOpenAdd] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  useEffect(async () => {
    props.handleLoading(true);
    await getAllCategory().then((result) => {
      setCategory(result.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const handleClickDelete = (id) => {
    setSelectID(id);
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setSelectID("");
    setOpenConfirm(false);
  };

  const handleDeleteCategory = async () => {
    const data = {
      categoryID: selectID,
    };
    await deleteCategory(data).then((res) => {
      handleCloseConfirm();
      setReload(!reload);
    });
  };

  const handleClickEdit = (id) => {
    history.push({ pathname: AdminSlug.editCategory, search: `?id=${id}` });
  };

  const handleChangeCategory = (value) => {
    if (value !== "") {
      setCategorySelect(value._id);
    } else {
      setCategorySelect("");
    }
  };

  const handleClickAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleChaneCategoryName = (event) => {
    setCategoryName(event.target.value);
  };

  const handleAddCategory = async () => {
    const data = {
      categoryName: categoryName,
    };
    if (data.categoryName === "") {
      alert("Xin vui lòng nhập đầy đủ thông tin!");
    } else {
      await addCategory(data).then((res) => {
        handleCloseAdd();
        setReload(!reload);
      });
    }
  };
  const columns = [
    { field: "stt", headerName: "STT", width: 90 },

    { field: "category", headerName: "Danh mục", width: 250 },
    {
      field: "subCategory",
      headerName: "Danh mục con",
      width: 200,
      renderCell: (subCategory) => {
        return subCategory.row.subCategory.length;
      },
    },
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
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton>
            {/* <IconButton
              aria-label="delete"
              className="btn-action btn-a-3"
              onClick={() => {
                handleClickDelete(action.row?.action?._id);
              }}
            >
              <DeleteForeverIcon />
            </IconButton> */}
          </>
        );
      },
    },
  ];

  const rows = category
    .filter((category) => {
      if (categorySelect === "") {
        return category;
      } else {
        return category._id === categorySelect;
      }
    })
    .map((e, index) => {
      console.log(e);
      return {
        id: index,
        stt: index + 1,
        category: e.categoryName,
        subCategory: e.subCategory,
        date: covertDate(e.createAt),
        action: e,
      };
    });

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Quản Lý Danh Mục: ({category.length}) </span>{" "}
        {/* <Button
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
          Tạo danh mục
        </Button> */}
      </div>
      <div style={{ width: "30%" }} className="mb-3">
        <SelectCategory
          value={defaultCategory}
          data={category}
          handleChange={handleChangeCategory}
        />
      </div>

      <div>
        <TableComponent columns={columns} rows={rows} />
        <ModalConfirmComponent
          open={openConfirm}
          handleClose={handleCloseConfirm}
          title="Xác nhận xóa danh mục"
          handleDelete={handleDeleteCategory}
        />
      </div>
      <ModalAddSubCategoryComponent
        open={openAdd}
        handleClose={handleCloseAdd}
        title="Tạo danh mục"
        handleAdd={handleAddCategory}
        handleChangeName={handleChaneCategoryName}
      />
    </Grid>
  );
}
