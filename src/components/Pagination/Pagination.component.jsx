import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

export default function PaginationComponent(props) {
  return (
    <div className="pagi">
      <Pagination
        count={props?.count}
        color="primary"
        onChange={props?.handleChange}
      />
    </div>
  );
}
