import "./productDetailItem.scss";
import { useState } from "react";
import { updateProductDetail } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ProductItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.pathname.split("/")[3];
  const productDetailId = location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const productDetail = product.productDetail.find(
    (item) => item._id === productDetailId
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const [inputs, setInputs] = useState({});
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
      const newProduct = { ...inputs };
      console.log(newProduct);
      updateProductDetail(
        productDetailId,
        productId,
        newProduct,
        dispatch,
        currentUser
      );
      // navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Update Product Detail: {productDetail?.title}</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form>
                <div className="formInput">
                  <label>Color</label>
                  <input
                    disabled
                    name="color"
                    type="text"
                    defaultValue={productDetail?.color}
                  ></input>
                </div>
                <div className="formInput">
                  <label>Size</label>
                  <input
                    disabled
                    name="size"
                    type="text"
                    defaultValue={productDetail?.size}
                  ></input>
                </div>
                <div className="formInput">
                  <label>Sold</label>
                  <input
                    disabled
                    name="sold"
                    type="text"
                    defaultValue={productDetail?.sold}
                  ></input>
                </div>
                <div className="formInput">
                  <label>Quantity</label>
                  <input
                    name="quantity"
                    type="text"
                    defaultValue={productDetail?.quantity}
                    onChange={handleChange}
                  ></input>
                </div>

                <button className="buttonSubmit" onClick={handleClick}>
                  Update Product
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
