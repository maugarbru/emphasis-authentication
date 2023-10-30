import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

import { Usuario } from 'src/core/types';

export interface UserDataState {
  user?: Usuario | null;
}

const initialState: UserDataState = {
  user: null,
};

export const userDataSlice: Slice<UserDataState> = createSlice({
  name: 'data',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Usuario>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userDataSlice.actions;

export default userDataSlice.reducer;
