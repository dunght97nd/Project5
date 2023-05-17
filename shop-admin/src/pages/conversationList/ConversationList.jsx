import "./conversationList.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversation, updateConversation } from "../../redux/apiCalls";
import moment from "moment";

const ConversationList = () => {
  const [pageSize, setPageSize] = useState(5);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const conversations = useSelector(
    (state) => state.conversation.conversations
  );

  useEffect(() => {
    getConversation(dispatch, currentUser);
  }, [dispatch, currentUser]);

  const handleMark = (id) => {
    updateConversation(id, dispatch, currentUser);
  };
  const orderColumns = [
    {
      field: "buyerId",
      headerName: "Buyer",
      width: 400,
    },
    {
      field: "lastMessage",
      headerName: "Last Message",
      width: 400,
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithStatus">
            {moment(params.row.createdAt).fromNow()}
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
              to={`/conversations/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            {((currentUser.isAdmin && !params.row.readBySeller) ||
              (!currentUser.isAdmin && !params.row.readByBuyer)) && (
              <div
                className="deleteButton"
                onClick={() => handleMark(params.row.id)}
              >
                Mark as Read
              </div>
            )}
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
            rows={conversations}
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

export default ConversationList;
