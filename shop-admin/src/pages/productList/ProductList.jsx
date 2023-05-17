import "./productList.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

const ProductList = () => {
  const [pageSize, setPageSize] = useState(5);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (query.length === 0 || query.length > 2)
      getProducts(query, dispatch, currentUser);
  }, [query, dispatch, currentUser]);

  const handleDelete = (id, currentUser) => {
    deleteProduct(id, dispatch, currentUser);
  };
  const productColumns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {/* <img className="cellImg" src={params.row.img[0]} alt="" /> */}
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "categories",
      headerName: "Category",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "color",
      headerName: "Color",
      // renderCell: (params) => {
      //   return (
      //     <div className="cellWithColor">
      //       {params.row.color.map((item, index) => (
      //         <div
      //           key={index}
      //           className="color"
      //           style={{
      //             backgroundColor: item,
      //           }}
      //         ></div>
      //       ))}
      //     </div>
      //   );
      // },
      width: 140,
    },
    {
      field: "size",
      headerName: "Size",
      width: 140,
    },
    { field: "featured", headerName: "featured", width: 100 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellWithStatus">
            {params.row.productDetail
              // ?.filter((obj) => obj.color === "black")
              ?.map((obj) => obj.quantity)
              ?.reduce((sum, obj) => sum + obj, 0)}
          </div>
        );
      },
    },
    {
      field: "sold",
      headerName: "Sold",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/products/${params.row._id}`}
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
  return (
    <div className="list">
      <div className="listContainer">
        <div className="datatable">
          <div className="datatableTitle">
            Products List
            <input
              className="search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <Link to="/products/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            getRowId={(row) => row._id}
            rows={products}
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
  );
};

export default ProductList;
