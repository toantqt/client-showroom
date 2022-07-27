import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import queryString from "query-string";
import {
  deleteProduct,
  getDealer,
  productPagiManager,
  searchProduct,
} from "../../../../api/AdminAPI";
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
import ModalViewProduct from "../../../../components/Modal/ModalViewProduct";
import TablePagiComponent from "../../../../components/Table/TablePagi.component";
export default function ProductManager(props) {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productID, setProductID] = useState("");
  const [reload, setReload] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [dataViews, setDataViews] = useState();
  const [company, setCompany] = useState([
    {
      _id: "all",
      companyName: "Tất cả",
    },
  ]);

  const [companySelect, setCompanySelect] = useState("all");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(async () => {
    props.handleLoading(true);
    await getDealer().then((res) => {
      for (let item of res.data) {
        setCompany((company) => [...company, item]);
      }
    });
  }, []);
  useEffect(async () => {
    props.handleLoading(true);
    await productPagiManager(companySelect, page).then((res) => {
      setCount(res.data.count);
      setProduct(res.data.listsProduct);
    });
    props.handleLoading(false);
  }, [page, companySelect]);

  const handleChangeCategory = (value) => {
    console.log(value);
    if (value !== "") {
      setCompanySelect(value._id);
    } else {
      setCompanySelect("all");
    }
    setPage(0);
  };

  const rows = product.map((e, index) => {
    return {
      id: index,
      stt: page * 16 + index + 1,
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
    { field: "code", headerName: "Mã SP", width: 190 },
    { field: "price", headerName: "Giá", width: 130 },

    { field: "date", headerName: "Ngày tạo", width: 150 },
    {
      field: "action",
      headerName: "Chức năng",
      width: 160,
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
    // setProductID(id);
    // setOpenConfirm(true);
    alert("Chức năng đang trong quá trình cập nhật");
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

  // const handleSearch = async (value) => {
  //   if (!value || value === "") {
  //     alert("Xin vui lòng nhập thông tin cần tìm");
  //   } else {
  //     await searchProduct(companySelect, value).then((res) => {
  //       setProduct(res.data);
  //     });
  //   }
  // };

  const handleChangePage = (page) => {
    setPage(page);
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Quản Lý Sản Phẩm: ({count}) </span>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={4} className="mb-3">
          <SelectCategory
            data={company}
            handleChange={handleChangeCategory}
            companySelect={companySelect}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        {/* <Grid item xs={4} className="mb-3">
          <SearchInputComponent handleSearch={handleSearch} />
        </Grid> */}
      </Grid>

      <div>
        <TablePagiComponent
          columns={columns}
          rows={rows}
          count={count}
          page={page}
          handleChangePage={handleChangePage}
        />
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
