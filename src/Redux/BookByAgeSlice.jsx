import { createSlice } from '@reduxjs/toolkit';

const BookByAge = createSlice({
  name: 'show',
  initialState: { isBook: undefined },

  reducers: {
    setBookByAge: (state, action) => {
      state.isBook = action.payload;
    },
  },
});
const { reducer, actions } = BookByAge;
export const { setBookByAge } = actions;
export default reducer;
