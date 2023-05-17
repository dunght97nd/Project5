import "./userList.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, deleteUser, getUsers } from "../../redux/apiCalls";

const UserList = () => {
  const [pageSize, setPageSize] = useState(5);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (query.length === 0 || query.length > 2)
      getUsers(query, dispatch, currentUser);
  }, [query, dispatch, currentUser]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch, currentUser);
  };
  const userColumns = [
    // { field: "_id", headerName: "ID", width: 240 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    { field: "isAdmin", headerName: "IsAdmin", width: 140 },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row._id}`}
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
            Users List
            <input
              className="search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <Link to="/users/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            getRowId={(row) => row._id}
            rows={users}
            columns={userColumns}
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

export default UserList;
