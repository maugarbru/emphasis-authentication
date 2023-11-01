import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

import { Datos } from 'src/core/types';

export interface UserDataState {
  data?: Datos | null;
}

const initialState: UserDataState = {
  data: null,
};

export const userDataSlice: Slice<UserDataState> = createSlice({
  name: 'data',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Datos>) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
  },
});

export const { login, logout } = userDataSlice.actions;

export default userDataSlice.reducer;
