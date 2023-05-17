import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //DELETE
    deleteOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.splice(
        state.orders.findIndex((item) => item._id === action.payload),
        1
      );
      toast.success("Order deleted successfully");
    },
    deleteOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders[
        state.orders.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
      toast.success("Order updated successfully");
    },
    updateOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Add
    addOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.push(action.payload);
      toast.success("Order added successfully");
    },
    addOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      toast.error("Order failed to be added");
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
