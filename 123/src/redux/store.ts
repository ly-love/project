import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import chatReducer from "./chatSlice";
import memoryReducer from "./memorySlice";

import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
};

// 要将 settingsReducer 的存储引擎更改为 sessionStorage
const settingsPersistConfig = {
  key: "settings",
  storage: storageSession,  
};

const rootReducer = combineReducers({
  settings: persistReducer(settingsPersistConfig, settingsReducer),
  chat: chatReducer,
  memory: memoryReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({  
  reducer: persistedReducer,  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({   
    serializableCheck: false // 关闭序列化检查  
  })  
});  

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;




// import { configureStore } from "@reduxjs/toolkit";
// import settingsReducer from "./settingsSlice";
// import chatReducer from "./chatSlice";
// import memoryReducer from "./memorySlice";
// export const store = configureStore({
//   reducer: {
//     settings: settingsReducer,
//     chat: chatReducer,
//     memory: memoryReducer,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
