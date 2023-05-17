import "./productItem.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import {
  addProductDetail,
  deleteProductDetail,
  updateProduct,
} from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const ProductItem = () => {
  const [pageSize, setPageSize] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState();
  const [color, setColor] = useState(product?.color || []);
  const [size, setSize] = useState(product?.size || []);
  const [cate, setCate] = useState(product?.categories || []);
  const [description, setDescription] = useState(product?.desc || "");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
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

      const newProduct = {
        ...inputs,
        img: file ? list : product?.img,
        color: color,
        size: size,
        categories: cate,
        desc: description,
      };
      // console.log(newProduct);
      updateProduct(productId, newProduct, dispatch, currentUser);
      // navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };
  //Get List product details
  const handleDelete = (id) => {
    deleteProductDetail(id, productId, dispatch, currentUser);
  };
  const productColumns = [
    { field: "_id", headerName: "ID", width: 240 },
    {
      field: "color",
      headerName: "Color",
      width: 140,
    },
    {
      field: "size",
      headerName: "Size",
      width: 140,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 140,
    },
    {
      field: "sold",
      headerName: "Sold",
      width: 240,
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/productDetails/${params.row._id}/${productId}`}
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

  //Add product details
  const handleAddProductDetail = async (e) => {
    e.preventDefault();
    try {
      const newProductDetail = {
        title: product._id + "-" + inputs.color + "-" + inputs.size,
        ...inputs,
        quantity: parseInt(inputs.quantity),
      };
      console.log(newProductDetail);
      addProductDetail(productId, newProductDetail, dispatch, currentUser);

      // navigate("/products");
    } catch (err) {
      window.alert("Product has already been added");
      console.log(err);
    }
  };
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Update Product</h1>
          </div>
          <div className="bottom">
            <div className="left">
              {product?.img.map((item, index) => (
                <img src={item} alt="" key={index} />
              ))}
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
                    defaultValue={product?.title}
                    onChange={handleChange}
                  ></input>
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
                    defaultValue={product?.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="formInput">
                  <label>Category</label>
                  <input
                    type="text"
                    onChange={handleCate}
                    defaultValue={product?.categories}
                  />
                </div>
                <div className="formInput">
                  <label>Color</label>
                  <input
                    type="text"
                    onChange={handleColor}
                    defaultValue={product?.color}
                  />
                </div>
                <div className="formInput">
                  <label>Size</label>
                  <input
                    type="text"
                    onChange={handleSize}
                    defaultValue={product?.size}
                  />
                </div>
                <div className="formInput">
                  <label>Featured</label>
                  <select
                    name="featured"
                    onChange={handleChange}
                    defaultValue={product?.featured}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <button className="buttonSubmit" onClick={handleClick}>
                  Update Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="list">
        <div className="listContainer">
          <div className="datatable">
            <div className="datatableTitle">
              Quantity:{" "}
              {product.productDetail
                // ?.filter((obj) => obj.color === "black")
                ?.map((obj) => obj.quantity)
                ?.reduce((sum, obj) => sum + obj, 0)}
            </div>
            <DataGrid
              className="datagrid"
              getRowId={(row) => row._id}
              rows={product.productDetail}
              columns={productColumns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              rowHeight={60}
            />
          </div>
        </div>
      </div>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Add New Product Detail</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form>
                <div className="formInput">
                  <label>Color</label>
                  <select
                    name="color"
                    onChange={handleChange}
                    defaultValue="color"
                  >
                    <option disabled>color</option>
                    {product.color.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formInput">
                  <label>Size</label>
                  <select
                    name="size"
                    onChange={handleChange}
                    defaultValue="size"
                  >
                    <option disabled>size</option>
                    {product.size.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formInput">
                  <label>Quantity</label>
                  <input
                    name="quantity"
                    type="number"
                    placeholder="100"
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="buttonSubmit"
                  onClick={handleAddProductDetail}
                >
                  Add Product Detail
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
