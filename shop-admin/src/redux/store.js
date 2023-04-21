import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import authReducer from "./authRedux";
import productReducer from "./productRedux";
import orderReducer from "./orderRedux";
import conversationReducer from "./conversationRedux";
import messageReducer from "./messageRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: authReducer,
  users: userReducer,
  product: productReducer,
  order: orderReducer,
  conversation: conversationReducer,
  message: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
