import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import News from "../../components/News/News";
import moment from "moment";

const ListsNewsComponent = (props) => {
  const history = useHistory();
  const handleClickNews = (slug) => {
    history.push(`/bai-viet/${slug}`);
  };
  const lists = props?.news?.map((e, index) => {
    return (
      <Grid
        item
        lg={3}
        md={3}
        xs={12}
        onClick={() => {
          handleClickNews(e.slug);
        }}
      >
        <News
          img={e?.thumbnail?.url}
          title={e?.title}
          date={moment(e?.created).format("DD/MM/YYYY")}
        />
      </Grid>
    );
  });
  return (
    <Grid id="lists-news">
      <Grid container spacing={3}>
        {lists}
      </Grid>
    </Grid>
  );
};

export default ListsNewsComponent;
