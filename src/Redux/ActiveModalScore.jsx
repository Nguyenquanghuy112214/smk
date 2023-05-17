import { createSlice } from '@reduxjs/toolkit';

const ActiveModalScore = createSlice({
  name: 'show',
  initialState: { isActive: undefined },

  reducers: {
    setActiveModalScore: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ActiveModalScore;
export const { setActiveModalScore } = actions;
export default reducer;
