import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import queryString from "query-string";
import {
  addSubCategory,
  deleteSubCategory,
  getDetailsCategory,
  updateCategory,
  updateSubCategory,
} from "../../../../api/AdminAPI";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TableComponent from "../../../../components/Table/Table.component";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ModalConfirmComponent from "../../../../components/Modal/ModalConfirm.component";
import ModalAddSubCategoryComponent from "../../../../components/Modal/ModalAddSubCategory.component";
import ModalUpdateSubCategoryComponent from "../../../../components/Modal/ModalUpdateSubCategory.component";
export default function EditCategory(props) {
  const search = queryString.parse(props.location.search);
  const categoryID = search.id;
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [subCategoryID, setSubCategoryID] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    if (categoryID) {
      await getDetailsCategory(categoryID).then((res) => {
        setCategory(res.data);
        setCategoryName(res.data.categoryName);
        setSubCategory(res.data.subCategory);
      });
      props.handleLoading(false);
    }
  }, [categoryID, reload]);
  console.log(category);

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },

    { field: "category", headerName: "Danh mục", width: 300 },

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
                handleClickEdit(
                  action.row?.action?._id,
                  action.row?.action?.name
                );
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
  const rows = subCategory?.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      category: e.name,
      action: e,
    };
  });

  const handleClickDelete = (id) => {
    setSubCategoryID(id);
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setSubCategoryID("");

    setOpenConfirm(false);
  };

  const handleClickAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleChangeCategoryName = (event) => {
    setCategoryName(event.target.value);
  };
  const handleSubmitCategoryName = async () => {
    if (categoryName === "") {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      const data = {
        categoryID: category._id,
        categoryName: categoryName,
      };
      await updateCategory(data).then((res) => {
        setReload(!reload);
      });
    }
  };

  const handleChangeSubCategoryName = (event) => {
    setSubCategoryName(event.target.value);
  };

  const handleAddCategory = async () => {
    if (subCategoryName === "") {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      const data = {
        categoryID: category._id,
        subCategoryName: subCategoryName,
      };
      await addSubCategory(data).then((res) => {
        setOpenAdd(false);
        setReload(!reload);
      });
    }
  };

  const handleDeleteSubCategory = async () => {
    const data = {
      categoryID: category._id,
      subCategoryID: subCategoryID,
    };
    await deleteSubCategory(data).then((res) => {
      setOpenConfirm(false);
      setReload(!reload);
    });
  };

  const handleClickEdit = (id, name) => {
    setSubCategoryID(id);
    setSubCategoryName(name);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setSubCategoryID("");
    setSubCategoryName("");
    setOpenEdit(false);
  };

  const handleEditCategory = async () => {
    const data = {
      subCategoryName: subCategoryName,
      subCategoryID: subCategoryID,
    };
    if (data.subCategoryName === "") {
      alert("Xin vui lòng điền đầy đủ thông tin");
    } else {
      await updateSubCategory(data).then((res) => {
        handleCloseEdit();
        setReload(!reload);
      });
    }
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Cập nhật danh mục</span>
      </div>
      <div>
        <div className="mt-3 mb-5">
          <TextField
            id="outlined-basic"
            label="Danh mục chính"
            variant="outlined"
            style={{ width: "100%" }}
            key={category?.categoryName}
            defaultValue={category?.categoryName}
            onChange={handleChangeCategoryName}
          />
          <div className="mt-2">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<SaveIcon />}
              style={{ float: "right", textTransform: "none" }}
              onClick={handleSubmitCategoryName}
            >
              Cập nhật
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <label style={{ fontSize: "16px", fontWeight: "500" }}>
            Danh mục con:
          </label>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            style={{ textTransform: "none", marginLeft: "20px" }}
            onClick={handleClickAdd}
          >
            Thêm danh mục con
          </Button>
          <div className="mt-2">
            <TableComponent columns={columns} rows={rows} />
          </div>
        </div>
      </div>
      <ModalConfirmComponent
        open={openConfirm}
        handleClose={handleCloseConfirm}
        title="Xác nhận xóa danh mục"
        handleDelete={handleDeleteSubCategory}
      />
      <ModalAddSubCategoryComponent
        open={openAdd}
        handleClose={handleCloseAdd}
        title="Thêm danh mục con"
        handleAdd={handleAddCategory}
        handleChangeName={handleChangeSubCategoryName}
      />

      <ModalUpdateSubCategoryComponent
        open={openEdit}
        handleClose={handleCloseEdit}
        title="Cập nhật danh mục con"
        subCategoryName={subCategoryName}
        handleAdd={handleEditCategory}
        handleChangeName={handleChangeSubCategoryName}
      />
    </Grid>
  );
}
