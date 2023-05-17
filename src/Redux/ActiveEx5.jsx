import { createSlice } from '@reduxjs/toolkit';

const ActiveEx5 = createSlice({
  name: 'show',
  initialState: { isActive: undefined },

  reducers: {
    setActiveEx5: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ActiveEx5;
export const { setActiveEx5 } = actions;
export default reducer;
