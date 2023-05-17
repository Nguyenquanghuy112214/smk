import { createSlice } from '@reduxjs/toolkit';

const Excercises = createSlice({
  name: 'show',
  initialState: { isActive: 1 },

  reducers: {
    setExcercises: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = Excercises;
export const { setExcercises } = actions;
export default reducer;
