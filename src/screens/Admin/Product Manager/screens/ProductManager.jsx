import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import queryString from "query-string";
import { deleteProduct } from "../../../../api/AdminAPI";
import {
  getCategoryNews,
  getNewsCategory,
  covertDate,
  deleteNews,
  productManager,
} from "../../../../api/AdminAPI";
import SelectCategory from "../../../../components/Category Select/CategorySelect.component";
import TableComponent from "../../../../components/Table/Table.component";
import Button from "@material-ui/core/Button";
import AdminSlug from "../../../../resources/AdminSlug";
import ModalConfirmComponent from "../../../../components/Modal/ModalConfirm.component";
import SearchInputComponent from "../../../../components/Search Input/SearchInput.component";
import { searchProduct } from "../../../../api/API";
import ModalViewProduct from "../../../../components/Modal/ModalViewProduct";
export default function ProductManager(props) {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [categoryID, setCategoryID] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [newsID, setNewsID] = useState("");
  const [productID, setProductID] = useState("");
  const [reload, setReload] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [dataViews, setDataViews] = useState();

  useEffect(async () => {
    props.handleLoading(true);
    await productManager().then((res) => {
      setProduct(res.data);
    });

    props.handleLoading(false);
  }, [reload]);

  const handleChangeCategory = (value) => {
    if (value !== "") {
      setCategorySelect(value._id);
    } else {
      setCategorySelect("");
    }
  };

  const rows = product.map((e, index) => {
    console.log(e);
    return {
      id: index,
      stt: index + 1,
      name: e?.product?.productName,
      price: e?.product?.price.toLocaleString("it-IT"),
      code: e.product?.code,
      date: covertDate(e.product?.created) || covertDate(e?.created),
      action: e,
    };
  });

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },
    { field: "name", headerName: "Sản phẩm", width: 300 },
    { field: "code", headerName: "Mã SP", width: 130 },
    { field: "price", headerName: "Giá", width: 130 },

    { field: "date", headerName: "Ngày tạo", width: 150 },
    {
      field: "action",
      headerName: "Chức năng",
      width: 210,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-1"
              onClick={() => {
                hanldeClickView(action.row?.action);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            {/* <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton> */}
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

  const hanldeClickView = (data) => {
    setDataViews(data);
    setModalView(true);
  };

  const handleClickAdd = () => {
    alert("Chức năng đang trong quá trình cập nhật");
    // history.push({
    //   pathname: AdminSlug.createProduct,
    //   search: `?id=${categoryID}`,
    // });
  };

  const handleClickDelete = (id) => {
    setProductID(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setProductID("");
    setOpenConfirm(false);
  };

  const handleCloseView = () => {
    setDataViews();
    setModalView(false);
  };

  const submitDeleteProduct = async () => {
    const data = {
      productID: productID,
    };
    await deleteProduct(data).then((res) => {
      handleCloseConfirm();
      setReload(!reload);
    });
  };

  const handleClickEdit = (id) => {
    history.push({
      pathname: AdminSlug.editProduct,
      search: `?id=${id}`,
    });
  };

  const handleSearch = async (value) => {
    console.log(value);
    if (!value || value === "") {
      alert("Xin vui lòng nhập thông tin cần tìm");
    } else {
      await searchProduct({ search: value }).then((res) => {
        setProduct(res.data);
      });
    }
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Quản Lý Sản Phẩm: ({product.length}) </span>
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
          Thêm sản phẩm
        </Button>
      </div>
      {/* <Grid container spacing={1}>
        {subCategory.length !== 0 ? (
          <Grid item xs={4} className="mb-3">
            <SelectCategory
              data={subCategory}
              handleChange={handleChangeCategory}
            />
          </Grid>
        ) : (
          <Grid item xs={4}></Grid>
        )}
        <Grid item xs={4}></Grid>
        <Grid item xs={4} className="mb-3">
          <SearchInputComponent handleSearch={handleSearch} />
        </Grid>
      </Grid> */}

      <div>
        <TableComponent columns={columns} rows={rows} />
      </div>

      <ModalConfirmComponent
        open={openConfirm}
        handleClose={handleCloseConfirm}
        title="Xác nhận xóa sản phẩm"
        handleDelete={submitDeleteProduct}
      />
      <ModalViewProduct
        open={modalView}
        data={dataViews}
        handleClose={handleCloseView}
      />
    </Grid>
  );
}
