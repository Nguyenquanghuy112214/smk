import { createSlice } from '@reduxjs/toolkit';

const ActiveModalChangePassword = createSlice({
  name: 'show',
  initialState: { isActive: undefined },

  reducers: {
    setActiveModalChangePassword: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ActiveModalChangePassword;
export const { setActiveModalChangePassword } = actions;
export default reducer;
