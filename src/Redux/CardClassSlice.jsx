import { createSlice } from '@reduxjs/toolkit';

const CardClass = createSlice({
  name: 'show',
  initialState: { isNumber: 0 },

  reducers: {
    setCardClass: (state, action) => {
      state.isNumber = action.payload;
    },
  },
});
const { reducer, actions } = CardClass;
export const { setCardClass } = actions;
export default reducer;
