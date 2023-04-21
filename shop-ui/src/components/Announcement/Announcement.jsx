import { Email, Phone } from "@material-ui/icons";
import React from "react";
import "./Announcement.scss";

const Announcement = () => {
  return (
    <div className="announcement">
      <div className="item">
        <Phone />
        <span>0399565599</span>
      </div>
      <div className="item">
        <Email />
        <span>krik.vn</span>
      </div>
    </div>
  );
};

export default Announcement;
