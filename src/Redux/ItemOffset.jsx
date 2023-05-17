import { createSlice } from '@reduxjs/toolkit';

const ItemOffset = createSlice({
  name: 'show',
  initialState: { itemOffset: 1 },

  reducers: {
    setItemOffset: (state, action) => {
      state.itemOffset = action.payload;
    },
  },
});
const { reducer, actions } = ItemOffset;
export const { setItemOffset } = actions;
export default reducer;
