import "./conversationItem.scss";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, getMessage } from "../../redux/apiCalls";
import moment from "moment";

const Conversation = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const message = useSelector((state) => state.message.messages);
  useEffect(() => {
    getMessage(id, dispatch, currentUser);
  }, [id, dispatch, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newMessage = {
        conversationId: id,
        desc: e.target[0].value,
      };
      console.log(newMessage);
      addMessage(newMessage, dispatch, currentUser);
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
            {message.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
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
