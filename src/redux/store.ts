import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistReducer,
    persistStore
  } from 'redux-persist'
  import storage from "redux-persist/lib/storage";
import { todoReducer } from './todo/slice'
import { listReducer } from './list/slice';



const persistConfig = {
    key: "root",
    storage,
    whitelist: ['todo', 'list'],
  };
  
  const rootReducer = combineReducers({
    todo: todoReducer,
    list: listReducer,
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);