import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import queryString from "query-string";
import {
  covertDate,
  getContactCustomer,
  deleteContactCustomer,
} from "../../../../api/AdminAPI";
import SelectCategory from "../../../../components/Category Select/CategorySelect.component";
import TableComponent from "../../../../components/Table/Table.component";
import Button from "@material-ui/core/Button";
import AdminSlug from "../../../../resources/AdminSlug";
import ModalConfirmComponent from "../../../../components/Modal/ModalConfirm.component";
import SearchInputComponent from "../../../../components/Search Input/SearchInput.component";
import ModalViewComponent from "../../../../components/Modal/ModalView.component";
export default function ContactManager(props) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [id, setID] = useState("");
  const [contact, setContact] = useState([]);
  const [reload, setReload] = useState(false);
  const [data, setData] = useState();
  const [openView, setOpenView] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getContactCustomer().then((res) => {
      setContact(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const rows = contact.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      name: e.name,
      email: e.email,
      phoneNumber: e.phoneNumber,
      address: e.address,
      date: covertDate(e.createdAt),
      action: e,
    };
  });

  const columns = [
    { field: "stt", headerName: "STT", width: 80 },
    { field: "name", headerName: "Họ tên", width: 170 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "phoneNumber", headerName: "Điện thoại", width: 150 },
    { field: "address", headerName: "Địa chỉ", width: 190 },
    { field: "date", headerName: "Ngày tạo", width: 150 },
    {
      field: "action",
      headerName: "Chức năng",
      width: 140,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickView(action?.row?.action);
              }}
            >
              <VisibilityIcon />
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

  const handleClickView = (data) => {
    setData(data);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setData();
    setOpenView(false);
  };
  const handleClickDelete = (id) => {
    setID(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setID("");
    setOpenConfirm(false);
  };

  const submitDeleteProduct = async () => {
    const data = {
      id: id,
    };
    props.handleLoading(true);
    await deleteContactCustomer(data).then((res) => {
      setOpenConfirm(false);
      setReload(!reload);
    });
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Quản Lý Liên Hệ:</span>
      </div>
      <div>
        <TableComponent columns={columns} rows={rows} />
      </div>
      <ModalConfirmComponent
        open={openConfirm}
        handleClose={handleCloseConfirm}
        title="Xác nhận xóa liên hệ"
        handleDelete={submitDeleteProduct}
      />{" "}
      <ModalViewComponent
        open={openView}
        handleClose={handleCloseView}
        data={data}
      />
    </Grid>
  );
}
