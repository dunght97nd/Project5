import "./userItem.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { updateUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UserItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === userId)
  );

  const currentUser = useSelector((state) => state.user.currentUser);

  const [inputs, setInputs] = useState({
    // username: user.username,
    // password: user.password,
    // email: user.email,
    // phone: user.phone,
    // address: user.address,
    // isAdmin: user.isAdmin,
  });
  const [file, setFile] = useState();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list =
        file &&
        (await Promise.all(
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
        ));

      const newUser = {
        ...inputs,
        image: file ? list[0] : user?.image,
      };
      console.log(newUser);
      updateUser(userId, newUser, dispatch, currentUser);
      // navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Update User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={user?.image} alt="" />

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
                  defaultValue={user?.username}
                  name="username"
                  type="text"
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  disabled={userId !== currentUser._id ? "disabled" : ""}
                  defaultValue={user?.password}
                  name="password"
                  type="text"
                  placeholder="Your password"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  defaultValue={user?.email}
                  name="email"
                  type="text"
                  placeholder="abc@gmail.com"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  defaultValue={user?.phone}
                  name="phone"
                  type="text"
                  placeholder="0399565599"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  defaultValue={user?.address}
                  name="address"
                  type="text"
                  placeholder="Your address"
                  onChange={handleChange}
                />
              </div>

              <div className="formInput">
                <label>Is Admin</label>
                <select
                  defaultValue={user?.isAdmin}
                  name="isAdmin"
                  onChange={handleChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <button className="buttonSubmit" onClick={handleClick}>
                Update User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
