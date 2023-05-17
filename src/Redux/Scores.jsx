import { createSlice } from '@reduxjs/toolkit';

const Scores = createSlice({
  name: 'show',
  initialState: { scores: { score: 0, count: 0, scoreItem: 0 } },

  reducers: {
    setScores: (state, action) => {
      state.scores = action.payload;
    },
  },
});
const { reducer, actions } = Scores;
export const { setScores } = actions;
export default reducer;
