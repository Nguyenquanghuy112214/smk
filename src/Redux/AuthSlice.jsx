import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('token')),

  reducers: {
    changeAuth: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
const { reducer, actions } = auth;
export const { changeAuth } = actions;
export default reducer;
