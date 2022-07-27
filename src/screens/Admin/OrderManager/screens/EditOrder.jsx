import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import queryString from "query-string";
import {
  confirmOrder,
  deleteProduct,
  getDetailsOrder,
  orderManager,
  removeProductOrder,
  updateQuantityOrder,
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
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ModalViewProduct from "../../../../components/Modal/ModalViewProduct";
import CheckIcon from "@material-ui/icons/Check";
export default function EditOrder(props) {
  const history = useHistory();
  const search = queryString.parse(props.location.search);
  const orderID = search.id;
  const [productID, setProductID] = useState("");
  const [reload, setReload] = useState(false);
  const [type, setType] = useState(1);
  const [order, setOrder] = useState({ listsProduct: [] });
  const [customerDefault, setCustomerDeafault] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const [customer, setCustomer] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [dataDelete, setDataDelete] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalViews, setModalViews] = useState(false);
  const [dataViews, setDataViews] = useState();
  const [openCheck, setOpenCheck] = useState([]);
  const [editQuantity, setEditQuantity] = useState([]);
  useEffect(async () => {
    props.handleLoading(true);
    if (orderID) {
      await getDetailsOrder(orderID).then((res) => {
        setCustomer({
          fullName: res.data.order.fullName,
          phoneNumber: res.data.order.phoneNumber,
          address: res.data.order.address,
        });
        setCustomerDeafault({
          fullName: res.data.order.fullName,
          phoneNumber: res.data.order.phoneNumber,
          address: res.data.order.address,
        });
        setOrder(res.data);
        let price = 0;
        for (let item of res.data.order.listsProduct) {
          price += item.price * (item.quantity || 1);
        }
        setTotalPrice(price);
      });
      props.handleLoading(false);
    }
  }, [orderID, reload]);

  const rows = order?.listsProduct?.map((e, index) => {
    let total =
      order?.order?.listsProduct[index]?.quantity *
      order?.order?.listsProduct[index]?.price;
    return {
      id: index,
      code: e?.code,
      productName: e?.productName,
      price: order?.order?.listsProduct[index]?.price?.toLocaleString("it-IT"),
      quantity: order?.order?.listsProduct[index] || 1,
      amount: total.toLocaleString("it-IT"),
      action: { orderID: order?.order?._id, productID: e._id, product: e },
    };
  });

  const columns = [
    { field: "code", headerName: "Mã SP", width: 130 },
    { field: "productName", headerName: "Tên SP", width: 200 },
    { field: "price", headerName: "Giá", width: 100 },
    {
      field: "quantity",
      headerName: "SL",
      width: 150,
      renderCell: (action) => {
        const indexCheck = openCheck.findIndex((e) => {
          return e._id == action?.row?.quantity?._id;
        });
        return (
          <>
            <TextField
              id="outlined-basic"
              variant="outlined"
              defaultValue={action?.row?.quantity?.quantity}
              style={{ width: "80%" }}
              onChange={(event) => {
                handleChangeQuantity(event, action?.row?.quantity);
              }}
              type="number"
            />
            {indexCheck != -1 ? (
              <IconButton
                aria-label="delete"
                className="btn-action btn-a-1"
                onClick={() => {
                  handleClickEditQuantity(action?.row?.quantity);
                }}
              >
                <CheckIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
    { field: "amount", headerName: "Tổng tiền", width: 130 },
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
                handleClickEdit(action.row?.action);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-3"
              onClick={() => {
                handleClickDelete(action.row?.action);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleChangeQuantity = (event, data) => {
    let index = editQuantity.findIndex((e) => {
      return e._id == data._id;
    });
    let indexCheck = openCheck.findIndex((e) => {
      return e._id == data._id;
    });
    if (indexCheck == -1) {
      setOpenCheck((openCheck) => [...openCheck, { _id: data._id }]);
    }
    if (index == -1) {
      setEditQuantity((editQuantity) => [
        ...editQuantity,
        { _id: data._id, quantity: event.target.value },
      ]);
    } else {
      let newData = [...editQuantity];
      newData[index].quantity = event.target.value;
      setEditQuantity(newData);
    }
  };

  const handleClickEditQuantity = async (data) => {
    let index = editQuantity.findIndex((e) => {
      return e._id == data._id;
    });

    let dataUpdate = {
      orderID: orderID,
      productID: editQuantity[index]._id,
      quantity: parseInt(editQuantity[index].quantity),
    };
    if (dataUpdate.quantity == "" || dataUpdate.quantity == 0) {
      alert("Xin vui lòng điền số lượng");
    } else {
      props.handleLoading(true);
      let newDataCheck = openCheck.filter((e) => {
        return e._id != data._id;
      });
      setOpenCheck(newDataCheck);
      await updateQuantityOrder(dataUpdate).then((res) => {
        let newData = editQuantity.filter((e) => {
          return e._id != dataUpdate.productID;
        });
        setEditQuantity(newData);
        setReload(!reload);
      });
    }
  };

  console.log("openCheck", openCheck);

  const handleClickDelete = (data) => {
    setDataDelete(data);
    setOpenModal(true);
  };

  const handleCloseConfirm = () => {
    setOpenModal(false);
  };

  const submitDeleteProduct = async () => {
    if (dataDelete) {
      if (order?.listsProduct?.length > 1) {
        props.handleLoading(true);
        await removeProductOrder(dataDelete).then((res) => {
          setDataDelete();
          handleCloseConfirm();
          setReload(!reload);
        });
      } else {
        alert("Danh sách sản phẩm đặt hàng không được trống");
        setDataDelete();
        handleCloseConfirm();
      }
    }
  };

  const handleClickEdit = (data) => {
    setDataViews(data);
    setModalViews(true);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleClickConfirmOrder = async () => {
    if (
      customer.address == "" ||
      customer.phoneNumber == "" ||
      customer.fullName == ""
    ) {
      alert("Thông tin khách hàng không được để trống");
    } else {
      let newData = { ...customer };
      newData.orderID = orderID;
      props.handleLoading(true);
      await confirmOrder(newData).then((res) => {
        history.push(AdminSlug.orderManager);
      });
    }
  };

  const handleCloseViews = () => {
    setDataViews();
    setModalViews(false);
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Chi tiết đơn hàng: </span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<CheckCircleIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClickConfirmOrder}
        >
          Xác nhận đơn
        </Button>
      </div>
      <hr />

      <Grid container spacing={3} className="mt-3">
        <Grid item lg={4}>
          <div className="header-sub-title">
            <span>Thông tin khách hàng:</span>
          </div>
          <Grid container spacing={1}>
            <Grid item lg={12} className="mt-4">
              <TextField
                id="outlined-basic"
                label="Họ và tên"
                variant="outlined"
                style={{ width: "100%" }}
                defaultValue={customerDefault.fullName}
                key={customerDefault.fullName}
                name="fullName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={12} className="mt-3">
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                style={{ width: "100%" }}
                defaultValue={customerDefault.phoneNumber}
                key={customerDefault.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={12} className="mt-3">
              <TextField
                id="outlined-basic"
                label="Địa chỉ giao hàng"
                variant="outlined"
                style={{ width: "100%" }}
                defaultValue={customerDefault.address}
                key={customerDefault.address}
                name="address"
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={12} className="mt-3">
              <div className="header-sub-title">
                <span>Thanh toán:</span>
              </div>
              <div className="mt-4">
                <span style={{ fontSize: "18px" }}>
                  <strong>Tổng tiền:</strong>{" "}
                  <span style={{ color: "red", fontWeight: "500" }}>
                    {totalPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={8}>
          <div className="header-sub-title">
            <span>Thông tin đơn hàng:</span>
          </div>
          <div className="mt-4">
            <TableComponent columns={columns} rows={rows} />
          </div>
        </Grid>
      </Grid>
      <ModalConfirmComponent
        open={openModal}
        title="Xác nhận xóa sản phẩm đặt hàng"
        handleClose={handleCloseConfirm}
        handleDelete={submitDeleteProduct}
      />
      <ModalViewProduct
        data={dataViews}
        open={modalViews}
        handleClose={handleCloseViews}
      />
    </Grid>
  );
}
