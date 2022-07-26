import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import "./table.css";
import TablePagination from "@material-ui/core/TablePagination";
export default function TablePagiComponent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const handleChangePage = (event, newPage) => {
    props.handleChangePage(newPage);
    document.getElementsByClassName("MuiDataGrid-window")[0].scrollTop = 0;
  };

  return (
    <Grid className="table-pagi">
      <div style={{ height: "600px", width: "100%" }}>
        <DataGrid
          rows={props?.rows}
          columns={props?.columns}
          disableColumnMenu={true}
        />
        <TablePagination
          component="div"
          count={props?.count}
          page={props?.page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </div>
    </Grid>
  );
}
