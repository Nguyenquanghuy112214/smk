import { createSlice } from '@reduxjs/toolkit';

const NextSingleSpeak = createSlice({
  name: 'show',
  initialState: { isNext: undefined },

  reducers: {
    setNextSingleSpeak: (state, action) => {
      state.isNext = action.payload;
    },
  },
});
const { reducer, actions } = NextSingleSpeak;
export const { setNextSingleSpeak } = actions;
export default reducer;
