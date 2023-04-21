import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserList from "./pages/userList/UserList";
import UserNew from "./pages/userNew/UserNew";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import ProductList from "./pages/productList/ProductList";
import ProductNew from "./pages/productNew/ProductNew";
import ProductItem from "./pages/productItem/ProductItem";
import ProductDetailItem from "./pages/productDetailItem/ProductDetailItem";
import UserItem from "./pages/userItem/UserItem";
import OrderList from "./pages/orderList/OrderList";
import OrderItem from "./pages/orderItem/OrderItem";

import ConversationList from "./pages/conversationList/ConversationList";
import ConversationItem from "./pages/conversationItem/ConversationItem";
import OrderOverview from "./pages/orderOverview/OrderOverview";
import OrderDaily from "./pages/orderDaily/OrderDaily";
import OrderMonthly from "./pages/orderMonthly/OrderMonthly";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const currentUser = useSelector((state) => state.user.currentUser);

  const Layout = () => {
    return (
      <div className={darkMode ? "app dark" : "app"}>
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  const ProtectedRoute = ({ children }) => {
    return currentUser ? <Navigate to="/" /> : children;
  };
  const router = createBrowserRouter([
    currentUser && {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        //Users
        {
          path: "/users",
          element: <UserList />,
        },
        {
          path: "/users/:id",
          element: <UserItem />,
        },
        {
          path: "/users/new",
          element: <UserNew title="Add New User" />,
        },
        //Product
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/products/:id",
          element: <ProductItem />,
        },
        {
          path: "/products/new",
          element: <ProductNew />,
        },
        {
          path: "/productDetails/:id/:productId",
          element: <ProductDetailItem />,
        },
        //Order
        {
          path: "/orders",
          element: <OrderList />,
        },
        {
          path: "/orders/:id",
          element: <OrderItem />,
        },
        {
          path: "/overview",
          element: <OrderOverview />,
        },
        {
          path: "/daily",
          element: <OrderDaily />,
        },
        {
          path: "/monthly",
          element: <OrderMonthly />,
        },
        {
          path: "/conversations",
          element: <ConversationList />,
        },
        {
          path: "/conversations/:id",
          element: <ConversationItem />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
