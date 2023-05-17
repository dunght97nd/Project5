import "./conversation.scss";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { createAxios } from "../../requestMethods";
import { loginSuccess } from "../../redux/userRedux";
import { addMessage, getConversation, getMessages } from "../../redux/apiCalls";

const Conversation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const messages = useSelector((state) => state.message.messages);

  //--------------------------RefreshToken----------------------------------
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  //--------------------------Get Conversation -------------------------------------
  useEffect(() => {
    getMessages(id, currentUser.accessToken, dispatch, axiosJWT);
  }, [id, currentUser.accessToken, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newMessage = {
        conversationId: id,
        desc: e.target[0].value,
      };
      console.log(newMessage);
      addMessage(newMessage, currentUser.accessToken, dispatch, axiosJWT);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="conversationItem">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/conversations">Conversatios</Link>
        </span>
        {
          <div className="conversationItems">
            {messages.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src={
                    "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  }
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        }
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
