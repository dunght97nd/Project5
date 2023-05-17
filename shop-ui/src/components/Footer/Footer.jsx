import React from "react";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <div className="logo">
          <Link to={"/"}>
            <img
              src="https://traffic-edge02.cdn.vncdn.io/cdn-pos/be3159-662/store/20140514_zDIzVUPzsug50Im3jvclQm0H.png"
              alt=""
            />
          </Link>
        </div>
        <p className="desc">
          Công ty TNHH KRIK Việt Nam
          <br /> Địa chỉ: Số 344 Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy,
          Thành phố Hà Nội <br /> Mã số doanh nghiệp: 0108901419 do Sở kế hoạch
          và đầu tư thành phố Hà Nội cấp ngày 17/09/2019 <br /> Điện thoại:
          0399.5655699
          <br /> Email: admin@krik.vn
        </p>
        <div className="socialContainer">
          <div className="socialIcon">
            <Facebook />
          </div>
          <div className="socialIcon">
            <Instagram />
          </div>
          <div className="socialIcon">
            <Twitter />
          </div>
          <div className="socialIcon">
            <Pinterest />
          </div>
        </div>
      </div>
      <div className="center">
        <h3 className="title">Liên kết hữu ích</h3>
        <ul className="list">
          <li className="listItem">Trang chủ</li>
          <li className="listItem">Giỏ hàng</li>
          <li className="listItem">Áo nam</li>
          <li className="listItem">Quẩn nam</li>
          <li className="listItem">Phụ kiện</li>
          <li className="listItem">Album</li>
          <li className="listItem">Tin tức</li>
          <li className="listItem">Login</li>
        </ul>
      </div>
      <div className="right">
        <h3 className="title">Liên hệ</h3>
        <div className="contactItem">
          <Room style={{ marginRight: "10px" }} />
          22A 12/2/5, Đặng Thai Mai, Phường Quảng An, Quận Tây Hồ, Hà Nội
        </div>
        <div className="contactItem">
          <Phone style={{ marginRight: "10px" }} /> +8 888 88 88
        </div>
        <div className="contactItem">
          <MailOutline style={{ marginRight: "10px" }} /> dunght.2307@gmail.com
        </div>
        <img
          className="payment"
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Footer;
