import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getReviewStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.reviews = action.payload;
    },
    getReviewFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD
    addReviewStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addReviewSuccess: (state, action) => {
      state.isFetching = false;
      state.reviews.push(action.payload);
    },
    addReviewFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      toast.error(action.payload);
    },
  },
});

export const {
  getReviewStart,
  getReviewSuccess,
  getReviewFailure,
  addReviewStart,
  addReviewSuccess,
  addReviewFailure,
} = reviewSlice.actions;

export default reviewSlice.reducer;
