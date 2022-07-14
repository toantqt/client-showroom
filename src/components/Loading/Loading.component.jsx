import React from "react";
import "./loading.css";
import CircularProgress from "@material-ui/core/CircularProgress";
const LoadingComponent = () => {
  return (
    <div className="loading-overlay">
      <CircularProgress />
    </div>
  );
};

export default LoadingComponent;
