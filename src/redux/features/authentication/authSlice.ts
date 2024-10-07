import { createSlice } from '@reduxjs/toolkit';

export type TUser = {
  _id? : string;
  name : string;
  email: string;
  role: string;
  image: string;
  coverImg? : string;
  memberShip : null | {
    takenDate : string;
    exp : string;
    package: object;
  };
  followers : string[];
  following : string[];
  iat?: number;
  exp?: number;
  isBlocked? : boolean;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;