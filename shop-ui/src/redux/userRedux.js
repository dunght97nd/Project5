import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      toast.success("Đăng nhập thành công");
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      toast.error(action.payload);
    },
    //----------------------------------------------------------------
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      toast.success("Đăng ký thành công");
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      toast.error(action.payload);
    },
    //---------------------------------LOGOUT-------------------------------
    logoutStart: (state) => {
      state.isFetching = true;
    },
    logoutSuccess: (state, action) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      toast.success("Đăng xuất thành công");
    },
    logoutFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      toast.error(action.payload);
    },
    //----------------------------------------------------------------
    // logout: (state) => {
    //   state.currentUser = null;
    //   state.isFetching = false;
    //   state.error = false;
    //   toast.success("Đăng xuất thành công");
    // },
    //----------------------------------UPDATE--------------------------------------
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = { ...state.currentUser, ...action.payload };
      toast.success("Cập nhật thông tin thành công");
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //----------------------------------Find--------------------------------
    findUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    findUserSuccess: (state, action) => {
      state.users = action.payload;
    },
    findUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  findUserFailure,
  findUserStart,
  findUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
