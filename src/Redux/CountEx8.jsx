import { createSlice } from '@reduxjs/toolkit';

const CountEx8 = createSlice({
  name: 'show',
  initialState: { count: 0 },

  reducers: {
    setCountEx8: (state, action) => {
      state.count = action.payload;
    },
  },
});
const { reducer, actions } = CountEx8;
export const { setCountEx8 } = actions;
export default reducer;
