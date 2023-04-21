import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  findUserFailure,
  findUserStart,
  findUserSuccess,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  addOrderFailure,
  addOrderStart,
  addOrderSuccess,
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
} from "./orderRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  findProductFailure,
  findProductStart,
  findProductSuccess,
} from "./productRedux";

import {
  getReviewFailure,
  getReviewStart,
  getReviewSuccess,
  addReviewFailure,
  addReviewStart,
  addReviewSuccess,
} from "./reviewRedux";

import {
  getConversationFailure,
  getConversationStart,
  getConversationSuccess,
} from "./conversationRedux";

import {
  addMessageFailure,
  addMessageStart,
  addMessageSuccess,
  getMessageFailure,
  getMessageStart,
  getMessageSuccess,
} from "./messageRedux";

import { toast } from "react-toastify";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response.data.message));
  }
};
// export const register = async (dispatch, user) => {
//   dispatch(registerStart());
//   try {
//     const res = await publicRequest.post("/auth/register", user);
//     console.log(res);
//     dispatch(registerSuccess(res.data));
//   } catch (err) {
//     dispatch(registerFailure(err.response.data.message));
//   }
// };
export const logout = async (dispatch, accessToken, refreshToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post(`http://localhost:5000/api/auth/logout`, {
      token: refreshToken,
    });
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure(err.response.data.message));
  }
};

//--------------------------------Order--------------------------------
export const getOrder = async (id, accessToken, dispatch, axiosJWT) => {
  dispatch(getOrderStart());
  try {
    const res = await axiosJWT.get(
      `http://localhost:5000/api/orders/find/${id}`,
      {
        headers: { token: "Bearer " + accessToken },
      }
    );
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

//ADD order
export const addOrder = async (order, accessToken, dispatch, axiosJWT) => {
  dispatch(addOrderStart());
  try {
    const res = await axiosJWT.post(`http://localhost:5000/api/orders`, order, {
      headers: { token: "Bearer " + accessToken },
    });
    dispatch(addOrderSuccess(res.data));
    toast.success("Order added successfully");
  } catch (err) {
    dispatch(addOrderFailure());
    toast.success("Error , please try again ?");
  }
};

//--------------------------------Product--------------------------------
export const getProducts = async (
  page,
  sort,
  cat,
  filterColor,
  filterSize,
  search,
  dispatch
) => {
  dispatch(getProductStart());
  try {
    const url = `products?page=${page}&sort=${sort.sort},${sort.order}&cat=${
      cat ? cat : ""
    }&color=${filterColor}&size=${filterSize}&search=${search || ""}`;
    const res = await publicRequest(url);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
//-------------------------Find Product--------------------------------
export const findProduct = async (productId, dispatch) => {
  dispatch(findProductStart());
  try {
    const res = await publicRequest(`Products/find/${productId}`);
    dispatch(findProductSuccess(res.data));
  } catch (err) {
    dispatch(findProductFailure());
  }
};

//----------------------------User------------------------------------
export const updateUser = async (id, accessToken, user, dispatch, axiosJWT) => {
  dispatch(updateUserStart());
  try {
    const res = await axiosJWT.put(
      `http://localhost:5000/api/users/${id}`,
      user,
      {
        headers: { token: "Bearer " + accessToken },
      }
    );
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

//-------------------------Reviews---------------------------------------
export const getReviews = async (productId, dispatch) => {
  dispatch(getReviewStart());
  try {
    const res = await publicRequest(`reviews/${productId}`);
    dispatch(getReviewSuccess(res.data));
  } catch (err) {
    dispatch(getReviewFailure());
  }
};

//ADD review
export const addReview = async (
  review,
  userId,
  accessToken,
  dispatch,
  axiosJWT
) => {
  dispatch(addReviewStart());
  try {
    const res = await axiosJWT.post(
      `http://localhost:5000/api/reviews/${userId}`,
      review,
      {
        headers: { token: "Bearer " + accessToken },
      }
    );
    dispatch(addReviewSuccess(res.data));
  } catch (err) {
    dispatch(addReviewFailure(err.response.data.message));
  }
};

//-------------------------Find User--------------------------------
export const findUser = async (userId, dispatch) => {
  dispatch(findUserStart());
  try {
    const res = await publicRequest(`users/find/${userId}`);
    dispatch(findUserSuccess(res.data));
  } catch (err) {
    dispatch(findUserFailure());
  }
};
//--------------------------------Conversations--------------------------------
export const getConversation = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getConversationStart());
  try {
    const res = await axiosJWT.get(`http://localhost:5000/api/conversations`, {
      headers: { token: "Bearer " + accessToken },
    });
    dispatch(getConversationSuccess(res.data));
  } catch (err) {
    dispatch(getConversationFailure());
  }
};

//--------------------------------Messages--------------------------------
export const getMessages = async (id, accessToken, dispatch, axiosJWT) => {
  dispatch(getMessageStart());
  try {
    const res = await axiosJWT.get(`http://localhost:5000/api/messages/${id}`, {
      headers: { token: "Bearer " + accessToken },
    });
    dispatch(getMessageSuccess(res.data));
  } catch (err) {
    dispatch(getMessageFailure());
  }
};

export const addMessage = async (message, accessToken, dispatch, axiosJWT) => {
  dispatch(addMessageStart());
  try {
    const res = await axiosJWT.post(
      `http://localhost:5000/api/messages`,
      message,
      {
        headers: { token: "Bearer " + accessToken },
      }
    );
    dispatch(addMessageSuccess(res.data));
  } catch (err) {
    dispatch(addMessageFailure());
    toast.success("Error , please try again ?");
  }
};
