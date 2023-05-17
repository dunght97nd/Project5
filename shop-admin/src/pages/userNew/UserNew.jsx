import "./userNew.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { addUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

const UserNew = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(file).map(async (item) => {
          const data = new FormData();
          data.append("file", item);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dmolme5ne/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newUser = {
        ...inputs,
        image: list[0],
      };
      console.log(newUser);
      addUser(newUser, dispatch, currentUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="userNew">
      <div className="newContainer">
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>User Name</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  name="password"
                  type="text"
                  placeholder="Your password"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="abc@gmail.com"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  name="phone"
                  type="text"
                  placeholder="0399565599"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder="Your address"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Is Admin</label>
                <select name="isAdmin" onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <button className="buttonSubmit" onClick={handleClick}>
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNew;
