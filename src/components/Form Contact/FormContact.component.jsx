import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import "./form.css";
export default function FormContactComponent() {
  return (
    <Grid id="form-contact">
      <div className="infor-title mt-5 mb-4">
        <span>Để lại thông tin để chúng tôi có thể liên hệ sớm nhất</span>
      </div>
      <div className="wrap-form">
        <Grid container spacing={2}>
          <Grid item lg={4} md={4}>
            <TextField
              id="outlined-search"
              label="Họ tên"
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item lg={4} md={4}>
            <TextField
              id="outlined-search"
              label="Điện thoại"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item lg={4} md={4}>
            <TextField
              id="outlined-search"
              label="Email"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item lg={12} md={12}>
            <TextField
              id="outlined-search"
              label="Địa chỉ"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item lg={12} md={12}>
            <TextField
              id="outlined-search"
              label="Tiêu đề"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item lg={12} md={12}>
            <TextField
              id="outlined-multiline-static"
              label="Nội dung"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}
