import "./Profile.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { Link } from "react-router-dom";
import { InsertPhoto } from "@material-ui/icons";
import { updateUser } from "../../redux/apiCalls";
import { loginSuccess } from "../../redux/userRedux";
import { createAxios } from "../../requestMethods";
import FormInput from "../../components/FormInput/FormInput";

const Profile = () => {
  //   const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
    phone: currentUser?.phone,
    address: currentUser?.address,
  });
  const input = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      disabled: "disabled",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email!",
      label: "Email",
      disabled: "disabled",
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      errorMessage: "It should be a valid phone!",
      label: "Phone",
      pattern: "^[0-9]{9,10}$",
      required: true,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "It should be a valid address!",
      label: "Address",
      pattern: "^[a-zA-Z0-9 .,#;:'-]{1,40}$",
      required: true,
    },
  ];
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  //--------------------------RefreshToken----------------------------------
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);

  //--------------------------Update User-------------------------------------
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
        image: file ? list[0] : currentUser?.image,
      };
      // console.log(newUser);
      updateUser(
        currentUser._id,
        currentUser.accessToken,
        newUser,
        dispatch,
        axiosJWT
      );
      // navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="top">
          <h1>Thông tin của bạn</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={currentUser?.image} alt="" />

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
            <form onSubmit={handleClick}>
              <div className="formImage">
                <label htmlFor="file">
                  Image:<InsertPhoto></InsertPhoto>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {input.map((item) => (
                <FormInput
                  key={item.id}
                  {...item}
                  value={inputs[item.name]}
                  onChange={handleChange}
                />
              ))}
              <div className="button">
                <Link to="/" className="buttonCancel">
                  Cancel
                </Link>
                <button className="buttonSubmit">Change</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
