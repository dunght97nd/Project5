import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductItem from "./pages/ProductItem";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import ProductSearch from "./pages/ProductSearch";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Announcement from "./components/Announcement/Announcement";
import Newsletter from "./components/Newsletter/Newsletter";
import { useSelector } from "react-redux";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Conversations from "./pages/Conversations";
import Conversation from "./pages/Conversation";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const Layout = () => {
    return (
      <div>
        <Announcement />
        <Navbar />
        <Outlet />
        <Newsletter />
        <Footer />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products/:category",
          element: <ProductList />,
        },
        {
          path: "/product/:id",
          element: <ProductItem />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/search/:search",
          element: <ProductSearch />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/conversations",
          element: <Conversations />,
        },
        {
          path: "/conversations/:id",
          element: <Conversation />,
        },
        {
          path: "/login",
          element: (
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
