import { createSlice } from '@reduxjs/toolkit';

const ShowMenuMb = createSlice({
  name: 'show',
  initialState: { isActive: false },

  reducers: {
    setMenuMb: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ShowMenuMb;
export const { setMenuMb } = actions;
export default reducer;
