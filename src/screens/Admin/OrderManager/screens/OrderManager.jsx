import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import queryString from "query-string";
import {
  deleteOrder,
  deleteProduct,
  orderManager,
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
import { searchProduct } from "../../../../api/API";
import TabComponent from "../components/Tab.component";
import ReplayIcon from "@material-ui/icons/Replay";
export default function OrderManager(props) {
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
  const [type, setType] = useState(1);
  useEffect(async () => {
    props.handleLoading(true);
    await orderManager(type).then((res) => {
      setProduct(res.data);
    });
    props.handleLoading(false);
  }, [type, reload]);

  const handleChangeCategory = (value) => {
    if (value !== "") {
      setCategorySelect(value._id);
    } else {
      setCategorySelect("");
    }
  };

  const rows = product.map((e, index) => {
    let price = 0;
    for (let item of e.listsProduct) {
      price += item.price * item.quantity;
    }

    return {
      id: index,
      stt: index + 1,
      fullName: e?.fullName,
      price: price.toLocaleString("it-IT"),
      count: e?.listsProduct?.length,
      date: covertDate(e.product?.created) || covertDate(e?.created),
      action: e?.product || e,
    };
  });

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },
    { field: "fullName", headerName: "Tên Người Đặt", width: 200 },
    { field: "count", headerName: "Tổng số hàng", width: 160 },
    { field: "price", headerName: "Tổng tiền", width: 130 },

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
                handleClickEdit(action.row?.action?._id);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            {action.row?.action?.confirm ? (
              <></>
            ) : (
              <IconButton
                aria-label="delete"
                className="btn-action btn-a-3"
                onClick={() => {
                  handleClickDelete(action.row?.action?._id);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            )}
          </>
        );
      },
    },
  ];

  const handleClickView = (slug) => {
    history.push(`/bai-viet/${slug}`);
  };

  const handleClickAdd = () => {
    setReload(!reload);
  };

  const handleClickDelete = (id) => {
    setProductID(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setProductID("");
    setOpenConfirm(false);
  };

  const submitDeleteOrder = async () => {
    if (productID) {
      await deleteOrder(productID).then((res) => {
        handleCloseConfirm();
        setReload(!reload);
      });
    }
  };

  const handleClickEdit = (id) => {
    history.push({
      pathname: AdminSlug.editOrder,
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

  const handleChangeTab = (value) => {
    setType(value);
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Quản Lý Đơn Hàng: ({product.length}) </span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<ReplayIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClickAdd}
        >
          Làm mới
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
      <Grid>
        <TabComponent handleChangeTab={handleChangeTab} />
      </Grid>

      <Grid className="mt-3">
        <TableComponent columns={columns} rows={rows} />
      </Grid>
      <ModalConfirmComponent
        open={openConfirm}
        title="Xác nhận xóa đơn đặt hàng"
        handleClose={handleCloseConfirm}
        handleDelete={submitDeleteOrder}
      />
    </Grid>
  );
}
