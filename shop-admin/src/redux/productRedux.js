import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //DELETE
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
      toast.success("Product deleted successfully");
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
      toast.success("Product updated successfully");
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Add
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
      toast.success("Product added successfully");
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      toast.error("Product failed to be added");
    },
    //------------------------------------------------------------------------------------
    //Add Product Detail
    addProductDetailStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductDetailSuccess: (state, action) => {
      state.isFetching = false;

      state.products[
        state.products.findIndex(
          (item) => item._id === action.payload.title.split("-")[0]
        )
      ].productDetail.push(action.payload);
      toast.success("Product Detail added successfully");
    },
    addProductDetailFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      toast.error("Product Detail failed to be added");
    },
    //Delete product detail
    deleteProductDetailStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductDetailSuccess: (state, action) => {
      state.isFetching = false;

      const product =
        state.products[
          state.products.findIndex(
            (item) => item._id === action.payload.productId
          )
        ];

      product.productDetail.splice(
        product.productDetail.findIndex(
          (item) => item._id === action.payload.id
        ),
        1
      );
      toast.success("Product Detail deleted successfully");
    },
    deleteProductDetailFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //UPDATE
    updateProductDetailStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductDetailSuccess: (state, action) => {
      state.isFetching = false;
      const product =
        state.products[
          state.products.findIndex(
            (item) => item._id === action.payload.productId
          )
        ];
      product.productDetail[
        product.productDetail.findIndex(
          (item) => item._id === action.payload.productDetailId
        )
      ] = action.payload.data;

      toast.success("Product updated successfully");
    },
    updateProductDetailFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateProductDetailQuantityStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductDetailQuantitySuccess: (state, action) => {
      state.isFetching = false;
      const product =
        state.products[
          state.products.findIndex(
            (item) => item._id === action.payload.productId
          )
        ];
      product.productDetail[
        product.productDetail.findIndex(
          (item) => item._id === action.payload.productDetailId
        )
      ] = action.payload.data;

      toast.success("Product updated successfully");
    },
    updateProductDetailQuantityFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  addProductDetailStart,
  addProductDetailSuccess,
  addProductDetailFailure,
  deleteProductDetailStart,
  deleteProductDetailSuccess,
  deleteProductDetailFailure,
  updateProductDetailStart,
  updateProductDetailSuccess,
  updateProductDetailFailure,
  updateProductDetailQuantityStart,
  updateProductDetailQuantitySuccess,
  updateProductDetailQuantityFailure,
} = productSlice.actions;

export default productSlice.reducer;
