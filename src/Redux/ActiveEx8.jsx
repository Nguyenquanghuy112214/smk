import { createSlice } from '@reduxjs/toolkit';

const ActiveEx8 = createSlice({
  name: 'show',
  initialState: { isActive: undefined },

  reducers: {
    setActiveEx8: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ActiveEx8;
export const { setActiveEx8 } = actions;
export default reducer;
