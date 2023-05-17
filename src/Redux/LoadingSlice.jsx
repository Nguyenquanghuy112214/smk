import { createSlice } from '@reduxjs/toolkit';

const Loading = createSlice({
  name: 'show',
  initialState: { isActive: false },

  reducers: {
    setLoading: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = Loading;
export const { setLoading } = actions;
export default reducer;
