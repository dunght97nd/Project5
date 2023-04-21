import React from "react";
import { Send } from "@material-ui/icons";

import "./Newsletter.scss";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h1 className="title">Newsletter</h1>
      <div className="desc">ĐĂNG KÝ NHẬN THÔNG TIN MỚI</div>
      <div className="inputContainer">
        <input placeholder="Nhập email của bạn tại đây ..." />
        <button>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
