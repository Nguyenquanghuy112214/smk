import { createSlice } from '@reduxjs/toolkit';

const toggleMusic = createSlice({
  name: 'show',
  initialState: { isActive: true },

  reducers: {
    setToggleMusic: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = toggleMusic;
export const { setToggleMusic } = actions;
export default reducer;
