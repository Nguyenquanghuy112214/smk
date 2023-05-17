import { createSlice } from '@reduxjs/toolkit';

const CountEx5 = createSlice({
  name: 'show',
  initialState: { count: 0 },

  reducers: {
    setCountEx5: (state, action) => {
      state.count = action.payload;
    },
  },
});
const { reducer, actions } = CountEx5;
export const { setCountEx5 } = actions;
export default reducer;
