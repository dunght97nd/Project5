import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const newItem = action.payload;

      const item = state.products.find(
        (item) =>
          item._id === newItem._id &&
          item.color === newItem.color &&
          item.size === newItem.size
      );
      if (item) {
        item.maxQuantity + action.payload.quantity >
        item.quantity + action.payload.maxQuantity
          ? (item.quantity += action.payload.quantity)
          : (item.quantity = item.maxQuantity);
      } else {
        state.products.push(newItem);
      }
    },
    removeItem: (state, action) => {
      const newItem = action.payload;
      const itemCart = state.products.find(
        (item) =>
          item._id === newItem._id &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      state.products = state.products.filter((item) => item !== itemCart);
    },
    resetCart: (state) => {
      state.products = [];
    },
    decreaseCart: (state, action) => {
      const newItem = action.payload;
      const itemCart = state.products.find(
        (item) =>
          item._id === newItem._id &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (itemCart.quantity > 1) {
        itemCart.quantity -= 1;
      } else {
        state.products = state.products.filter((item) => item !== itemCart);
      }
    },
    increaseCart: (state, action) => {
      const newItem = action.payload;
      const itemCart = state.products.find(
        (item) =>
          item._id === newItem._id &&
          item.color === newItem.color &&
          item.size === newItem.size
      );
      if (itemCart) {
        action.payload.maxQuantity > itemCart.quantity
          ? (itemCart.quantity += 1)
          : (itemCart.quantity = action.payload.maxQuantity);
      } else {
        state.products.push(newItem);
      }
    },
  },
});

export const { addProduct, removeItem, resetCart, decreaseCart, increaseCart } =
  cartSlice.actions;
export default cartSlice.reducer;
