import { createSlice } from "@reduxjs/toolkit";

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getConversationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getConversationSuccess: (state, action) => {
      state.isFetching = false;
      state.conversations = action.payload;
    },
    getConversationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteconversationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteconversationSuccess: (state, action) => {
      state.isFetching = false;
      state.conversations.splice(
        state.conversations.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteconversationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateConversationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateConversationSuccess: (state, action) => {
      state.isFetching = false;
      state.conversations[
        state.conversations.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.conversation;
    },
    updateConversationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addconversationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addconversationSuccess: (state, action) => {
      state.isFetching = false;
      state.conversations.push(action.payload);
    },
    addconversationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getConversationStart,
  getConversationSuccess,
  getConversationFailure,
  deleteconversationStart,
  deleteconversationSuccess,
  deleteconversationFailure,
  updateConversationStart,
  updateConversationSuccess,
  updateConversationFailure,
  addconversationStart,
  addconversationSuccess,
  addconversationFailure,
} = conversationSlice.actions;

export default conversationSlice.reducer;
