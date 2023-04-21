import "./orderList.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCalls";
import moment from "moment";

const OrderList = () => {
  const [pageSize, setPageSize] = useState(5);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (query.length === 0 || query.length > 2)
      getOrders(query, dispatch, currentUser);
  }, [query, dispatch, currentUser]);

  const handleDelete = (id) => {
    deleteOrder(id, dispatch, currentUser);
  };
  const orderColumns = [
    {
      field: "_id",
      headerName: "Order Id",
      width: 240,
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 180,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 140,
    },
    {
      field: "total",
      headerName: "Total",
      width: 140,
    },
    // {
    //   field: "payment",
    //   headerName: "Payment",
    //   width: 100,
    // },
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithStatus">
            {moment(params.row.createdAt).calendar()}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellWithStatus">
            {params.row.status === "preparing" ? (
              <div className="preparing">Preparing</div>
            ) : params.row.status === "ontheway" ? (
              <div className="ontheway">Ontheway</div>
            ) : params.row.status === "delivered" ? (
              <div className="delivered">Delivered</div>
            ) : (
              <div className="cancel">Cancel</div>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/orders/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
      <div className="listContainer">
        <div className="datatable">
          <div className="datatableTitle">
            Order List
            <input
              className="search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
          </div>
          <DataGrid
            className="datagrid"
            getRowId={(row) => row._id}
            rows={orders}
            columns={orderColumns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rowHeight={60}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
