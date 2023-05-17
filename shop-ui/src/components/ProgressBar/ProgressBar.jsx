import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ percent }) => {
  return (
    <div className="progressBar">
      <div className="progressBarFill" style={{ width: percent + "%" }}></div>
    </div>
  );
};

export default ProgressBar;
