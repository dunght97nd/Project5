import React, { useRef, useState } from "react";

import { Badge } from "@material-ui/core";
import {
  AccountCircle,
  ArrowForwardIos,
  CloseOutlined,
  MenuOutlined,
  PersonOutlineOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";

import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { resetCart } from "../../redux/cartRedux";
import { logout } from "../../redux/apiCalls";
import { createAxios } from "../../requestMethods";
import { loginSuccess, logoutSuccess } from "../../redux/userRedux";

const Navbar = () => {
  const headerNav = [
    {
      display: "Áo nam",
      path: "/products/shirts",
      children: [
        { display: "Áo sơ mi", path: "/products/shirt" },
        { display: "Áo phông", path: "/products/tshirt" },
        { display: "Áo khoác", path: "/products/coat" },
        { display: "Áo len", path: "/products/sweater" },
        { display: "Áo nỉ", path: "/products/sweatshirt" },
        { display: "Áo polo", path: "/products/polo" },
        { display: "Áo hoodie", path: "/products/hoodie" },
        { display: "Áo blazer", path: "/products/blazer" },
      ],
    },
    {
      display: "Quần nam",
      path: "/products/pants",
      children: [
        { display: "Quần jeans", path: "/products/jeans" },
        { display: "Quần short", path: "/products/short" },
        { display: "Quần âu", path: "/products/trouser" },
        { display: "Quần jogger", path: "/products/jogger" },
        { display: "Quần kaki ", path: "/products/kaki" },
      ],
    },
    {
      display: "Phụ kiện",
      path: "/products/accessory",
      children: [
        { display: "Quần lót", path: "/products/underwear" },
        { display: "Dây lưng", path: "/products/belt" },
        { display: "Balo cặp sách", path: "/products/packpack" },
        { display: "Giày dép", path: "/products/footwear" },
        { display: "Mũ nam ", path: "/products/hats" },
      ],
    },
    {
      display: "Albums",
      path: "/albums",
    },
    {
      display: "Tin tức",
      path: "/news",
    },
  ];

  const menuLeft = useRef(null);
  const menuToggle = () => menuLeft.current.classList.toggle("active");
  // const menuRight = useRef(null);
  // const menuRightToggle = () => menuRight.current.classList.toggle("active");

  //Cart
  const cart = useSelector((state) => state.cart.products);

  const quantity = cart.length;

  //Search
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    query && navigate(`/search/${query}`);
    // setQuery("");
  };

  //User Login
  const user = useSelector((state) => state.user.currentUser);

  // const menuUser = useRef(null);
  // const menuUserToggle = () => menuUser.current.classList.toggle("active");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleLogout = () => {
    logout(dispatch, user.accessToken, user.refreshToken, axiosJWT);
    dispatch(resetCart());
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <MenuOutlined onClick={menuToggle} className="menu" />
          <div className="logo">
            <Link to={"/"}>
              <img
                src="https://traffic-edge02.cdn.vncdn.io/cdn-pos/be3159-662/store/20140514_zDIzVUPzsug50Im3jvclQm0H.png"
                alt=""
              />
            </Link>
          </div>
        </div>

        <div className="center">
          <ul className="nav" ref={menuLeft}>
            <CloseOutlined onClick={menuToggle} className="close" />
            {headerNav.map((item, i) => (
              <li key={i} className="dropdown">
                <div className="dropdownItem">
                  <Link to={item.path} onClick={menuToggle}>
                    {item.display}
                  </Link>
                  {item.children ? (
                    <ArrowForwardIos className="arrowForward" />
                  ) : null}
                </div>
                <ul className="dropdownContent">
                  {item.children?.map((e, i) => (
                    <li key={i} className="dropdownContentItem">
                      <Link to={e.path} onClick={menuToggle}>
                        {e.display}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <form className="searchContainer" onSubmit={handleSearch}>
            <input
              type="text"
              className="searchInput"
              placeholder="Tìm kiếm"
              value={query}
              onChange={handleChange}
            />
            <button type="submit" className="searchProduct" />
          </form>

          <div className="menuItem">
            <Link to="/cart">
              <Badge
                badgeContent={quantity}
                color="primary"
                overlap="rectangular"
              >
                <ShoppingCartOutlined style={{ cursor: "pointer" }} />
              </Badge>
            </Link>
          </div>
          <div className="menuItem">
            {!user ? (
              <Link to="/login">
                <PersonOutlineOutlined style={{ cursor: "pointer" }} />
              </Link>
            ) : (
              <div className="userLogin" onClick={() => setOpen(!open)}>
                <img src={user.image} className="userLoginIcon" alt="" />
                {/* <AccountCircle
                  style={{ marginTop: 2, cursor: "pointer" }}
                  className="userLoginIcon"
                  // onClick={menuUserToggle}
                /> */}

                {/* <div className="userLoginList" ref={menuUser}> */}
                {open && (
                  <div className="userLoginList">
                    <Link
                      to="/profile"
                      className="userLoginItem"
                      // onClick={setOpen(!open)}
                    >
                      Thông tin
                    </Link>
                    <Link
                      to="/orders"
                      className="userLoginItem"
                      // onClick={setOpen(!open)}
                    >
                      Đơn đặt hàng
                    </Link>
                    {/* <Link
                      to="/conversations"
                      className="userLoginItem"
                      // onClick={setOpen(!open)}
                    >
                      Tin nhắn
                    </Link> */}
                    <Link
                      to="/"
                      className="userLoginItem"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
