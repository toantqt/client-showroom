import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import queryString from "query-string";
import { getDealer, covertDate, deleteDealer } from "../../../../api/AdminAPI";
import SelectCategory from "../../../../components/Category Select/CategorySelect.component";
import TableComponent from "../../../../components/Table/Table.component";
import Button from "@material-ui/core/Button";
import AdminSlug from "../../../../resources/AdminSlug";
import ModalConfirmComponent from "../../../../components/Modal/ModalConfirm.component";
import SearchInputComponent from "../../../../components/Search Input/SearchInput.component";
import Chip from "@material-ui/core/Chip";
import ModalViewComponent from "../../../../components/Modal/ModalView.component";
export default function DealerManager(props) {
  const history = useHistory();

  const [dealer, setDealer] = useState([]);
  const [id, setID] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [reload, setReload] = useState(false);
  const [company, setCompany] = useState();
  const [openModalView, setOpenModalView] = useState(false);

  useEffect(async () => {
    props.handleLoading(true);
    await getDealer().then((res) => {
      setDealer(res.data);
    });
    props.handleLoading(false);
  }, []);

  const rows = dealer.map((e, index) => {
    return {
      id: index,
      companyName: e.companyName,
      acronym: e.acronym,
      address: e.address,
      date: covertDate(e.created),
      action: e,
    };
  });

  const columns = [
    { field: "companyName", headerName: "Tên NPP", width: 600 },
    { field: "acronym", headerName: "Mã NPP", width: 110 },

    { field: "date", headerName: "Ngày tạo", width: 130 },
    {
      field: "action",
      headerName: "Chức năng",
      width: 150,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="views"
              className="btn-action btn-a-1"
              onClick={() => {
                handleClickViews(action.row?.action);
              }}
            >
              <VisibilityIcon />
            </IconButton>

            <IconButton
              aria-label="edit"
              className="btn-action btn-a-2"
              onClick={() => {
                handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleClickDelete = (id) => {
    setID(id);
    setOpenConfirm(true);
  };

  const handleClickViews = (data) => {
    setCompany(data);
    setOpenModalView(true);
  };

  const handleCloseViews = () => {
    setCompany();
    setOpenModalView(false);
  };

  const handleCloseConfirm = () => {
    setID("");
    setOpenConfirm(false);
  };

  const submitDeleteProduct = async () => {
    const data = {
      dealerID: id,
    };
    props.handleLoading(true);
    await deleteDealer(data).then((res) => {
      setOpenConfirm(false);
      setReload(!reload);
    });
  };

  const handleClickEdit = (id) => {
    history.push({
      pathname: AdminSlug.editDealer,
      search: `?id=${id}`,
    });
  };

  const handleClickAdd = () => {
    history.push(AdminSlug.addDealer);
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Quản Lý Nhà Phân Phối: ({dealer.length}) </span>
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
          Thêm nhà phân phối
        </Button>
      </div>
      {/* <Grid container spacing={1}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} className="mb-3">
          <SearchInputComponent />
        </Grid>
      </Grid> */}

      <div>
        <TableComponent columns={columns} rows={rows} />
      </div>

      <ModalConfirmComponent
        open={openConfirm}
        handleClose={handleCloseConfirm}
        title="Xác nhận xóa đại lý"
        handleDelete={submitDeleteProduct}
      />
      <ModalViewComponent
        open={openModalView}
        data={company}
        handleClose={handleCloseViews}
      />
    </Grid>
  );
}
