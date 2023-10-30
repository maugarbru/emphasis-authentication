import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import userDataSlice from './slices/userData';

const logger = createLogger();

const middleware = [
  thunk,
  ...(process.env.NODE_ENV === 'development' ? [logger] : []),
];

const reducers = combineReducers({ userData: userDataSlice });

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['data'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
