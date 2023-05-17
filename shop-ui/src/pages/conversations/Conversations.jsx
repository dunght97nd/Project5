import "./Conversations.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getConversation, updateConversation } from "../../redux/apiCalls";
import { loginSuccess } from "../../redux/userRedux";
import { createAxios } from "../../requestMethods";
import moment from "moment";

import { Link, useNavigate } from "react-router-dom";

const Conversations = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  //--------------------------RefreshToken----------------------------------
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  //--------------------------Get Conversations -------------------------------------
  useEffect(() => {
    getConversation(currentUser.accessToken, dispatch, axiosJWT);
  }, [currentUser.accessToken, dispatch]);

  const conversations = useSelector(
    (state) => state.conversation.conversations
  );

  return (
    <div className="conversations">
      <div className="conversationsContainer">
        <div className="top">
          <h1>Conversations</h1>
        </div>
        <div className="bottom">
          <table>
            <tbody>
              <tr>
                <th>{currentUser.isAdmin ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
              {conversations?.map((item) => (
                <tr
                  key={item._id}
                  className={
                    (((currentUser.isAdmin && !item.readBySeller) ||
                      (!currentUser.isAdmin && !item.readByBuyer)) &&
                      "active") ||
                    ""
                  }
                >
                  <td>{currentUser.isAdmin ? item.buyerId : item.sellerId}</td>
                  <td>{item?.lastMessage?.substring(0, 100)}...</td>
                  <td>{moment(item.updatedAt).fromNow()}</td>
                  <td>
                    <Link to={`/conversations/${item.id}`} className="link">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
