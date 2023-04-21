import "./productNew.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const ProductNew = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [cate, setCate] = useState([]);

  const [description, setDescription] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };
  const handleCate = (e) => {
    setCate(e.target.value.split(","));
  };
  //Filebase
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const fileName = new Date().getTime() + file.name;
  //   const storage = getStorage(app);
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   // Register three observers:
  //   // 1. 'state_changed' observer, called any time the state changes
  //   // 2. Error observer, called on failure
  //   // 3. Completion observer, called on successful completion
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // Observe state change events such as progress, pause, and resume
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //         default:
  //       }
  //     },
  //     (error) => {
  //       // Handle unsuccessful uploads
  //     },
  //     () => {
  //       // Handle successful uploads on complete
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         // console.log("Download URL: " + downloadURL);
  //         const product = {
  //           ...inputs,
  //           img: downloadURL,
  //           color: color,
  //           size: size,
  //           desc: description,
  //         };

  //         // addProduct(product, dispatch);
  //       });
  //     }
  //   );
  // };

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

      const newProduct = {
        ...inputs,
        img: list,
        color: color,
        size: size,
        categories: cate,
        desc: description,
      };
      // console.log(newProduct);
      addProduct(newProduct, dispatch, currentUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Add new product</h1>
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
                  multiple
                  id="file"
                  onChange={(e) => setFile(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Title</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Apple Airpods"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  placeholder="100"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="jeans,skirts"
                  onChange={handleCate}
                />
              </div>
              <div className="formInput">
                <label>Size</label>
                <input
                  type="text"
                  placeholder="S,L,M,XL || 28,29,30"
                  onChange={handleSize}
                />
              </div>
              <div className="formInput">
                <label>Color</label>
                <input
                  type="text"
                  placeholder="white,black,blue"
                  onChange={handleColor}
                />
              </div>
              <div className="formInput">
                <label>Featured</label>
                <select name="featured" onChange={handleChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <button className="buttonSubmit" onClick={handleClick}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
