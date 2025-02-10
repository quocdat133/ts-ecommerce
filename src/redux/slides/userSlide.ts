import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  email: string;
  access_token: string;
  refresh_token: string;
  address: string;
  avatar: string;
  role: string;
  id: string;
  isLoading?: boolean;
}

const initialState: UserState = {
  name: "",
  email: "",
  access_token: "",
  refresh_token: "",
  address: "",
  avatar: "",
  role: "",
  id: "",
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name,
        email,
        address,
        avatar,
        role,
        id,
        access_token,
        refresh_token,
      } = action.payload;
      state.name = name;
      state.email = email;
      state.address = address;
      state.avatar = avatar;
      state.role = role;
      state.id = id;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    resetUser: () => initialState,
  },
});

export const { resetUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
