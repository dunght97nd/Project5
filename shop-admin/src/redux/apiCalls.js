import { loginFailure, loginStart, loginSuccess } from "./authRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  addProductDetailStart,
  addProductDetailSuccess,
  addProductDetailFailure,
  deleteProductDetailStart,
  deleteProductDetailSuccess,
  deleteProductDetailFailure,
  updateProductDetailFailure,
  updateProductDetailStart,
  updateProductDetailSuccess,
  updateProductDetailQuantityFailure,
  updateProductDetailQuantityStart,
  updateProductDetailQuantitySuccess,
} from "./productRedux";

import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  addUserFailure,
  addUserStart,
  addUserSuccess,
} from "./userRedux";

import {
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
} from "./orderRedux";

import {
  getConversationFailure,
  getConversationStart,
  getConversationSuccess,
  updateConversationFailure,
  updateConversationStart,
  updateConversationSuccess,
} from "./conversationRedux";

import {
  getMessageFailure,
  getMessageStart,
  getMessageSuccess,
  addMessageFailure,
  addMessageStart,
  addMessageSuccess,
} from "./messageRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    const isAdmin = res.data.isAdmin;
    isAdmin ? dispatch(loginSuccess(res.data)) : dispatch(loginFailure());
  } catch (err) {
    dispatch(loginFailure());
  }
};

//......................................
export const getProducts = async (query, dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get(`/products?search=${query}&limit=8888`);
    dispatch(getProductSuccess(res.data.products));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch, currentUser) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest(currentUser.accessToken).delete(
      `/products/${id}`
    );
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch, currentUser) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest(currentUser.accessToken).put(
      `/products/${id}`,
      product
    );
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch, currentUser) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest(currentUser.accessToken).post(
      `/products`,
      product
    );
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
//------------------------------------------------------------------------------------------------
export const addProductDetail = async (id, product, dispatch, currentUser) => {
  dispatch(addProductDetailStart());
  try {
    const res = await userRequest(currentUser.accessToken).post(
      `/productDetails/${id}`,
      product
    );
    dispatch(addProductDetailSuccess(res.data));
  } catch (err) {
    dispatch(addProductDetailFailure());
  }
};

export const deleteProductDetail = async (
  id,
  productId,
  dispatch,
  currentUser
) => {
  dispatch(deleteProductDetailStart());
  try {
    // const res = await userRequest(currentUser.accessToken).delete(`/productDetails/${id}/${productId}`);
    dispatch(deleteProductDetailSuccess({ id, productId }));
  } catch (err) {
    dispatch(deleteProductDetailFailure());
  }
};

export const updateProductDetail = async (
  productDetailId,
  productId,
  product,
  dispatch,
  currentUser
) => {
  dispatch(updateProductDetailStart());
  try {
    const res = await userRequest(currentUser.accessToken).put(
      `/productDetails/${productDetailId}`,
      product
    );
    dispatch(
      updateProductDetailSuccess({ productDetailId, productId, data: res.data })
    );
  } catch (err) {
    dispatch(updateProductDetailFailure());
  }
};

export const updateProductDetailTitle = async (
  productDetailTitle,
  productId,
  product,
  dispatch,
  currentUser
) => {
  dispatch(updateProductDetailQuantityStart());
  try {
    const res = await userRequest(currentUser.accessToken).put(
      `/productDetails/quantity/${productDetailTitle}`,
      product
    );
    dispatch(
      updateProductDetailQuantitySuccess({
        productDetailTitle,
        productId,
        data: res.data,
      })
    );
  } catch (err) {
    dispatch(updateProductDetailQuantityFailure());
  }
};

//----------------------------------------------------------------
export const getUsers = async (query, dispatch, currentUser) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest(currentUser.accessToken).get(
      `/users?search=${query}`
    );
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch, currentUser) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest(currentUser.accessToken).delete(
      `/users/${id}`
    );
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, User, dispatch, currentUser) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest(currentUser.accessToken).put(
      `/users/${id}`,
      User
    );
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const addUser = async (User, dispatch, currentUser) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest(currentUser.accessToken).post(`/users`, User);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

//--------------------------Order-----------------------------
export const getOrders = async (query, dispatch, currentUser) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest(currentUser.accessToken).get(
      `/orders?search=${query}`
    );
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const deleteOrder = async (id, dispatch, currentUser) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest(currentUser.accessToken).delete(
      `/orders/${id}`
    );
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = async (id, order, dispatch, currentUser) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest(currentUser.accessToken).put(
      `/orders/${id}`,
      order
    );
    dispatch(updateOrderSuccess(res.data));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};

//--------------------------Conversation-----------------------------
export const getConversation = async (dispatch, currentUser) => {
  dispatch(getConversationStart());
  try {
    const res = await userRequest(currentUser.accessToken).get(
      `/conversations`
    );
    dispatch(getConversationSuccess(res.data));
  } catch (err) {
    dispatch(getConversationFailure());
  }
};

export const updateConversation = async (id, dispatch, currentUser) => {
  dispatch(updateConversationStart());
  try {
    const res = await userRequest(currentUser.accessToken).put(
      `/conversations/${id}`
    );
    dispatch(updateConversationSuccess(res.data));
  } catch (err) {
    dispatch(updateConversationFailure());
  }
};

//--------------------------Messages-----------------------------
export const getMessage = async (id, dispatch, currentUser) => {
  dispatch(getMessageStart());
  try {
    const res = await userRequest(currentUser.accessToken).get(
      `/messages/${id}`
    );
    dispatch(getMessageSuccess(res.data));
  } catch (err) {
    dispatch(getMessageFailure());
  }
};

export const addMessage = async (message, dispatch, currentUser) => {
  dispatch(addMessageStart());
  try {
    const res = await userRequest(currentUser.accessToken).post(
      `/messages`,
      message
    );
    dispatch(addMessageSuccess(res.data));
  } catch (err) {
    dispatch(addMessageFailure());
  }
};
