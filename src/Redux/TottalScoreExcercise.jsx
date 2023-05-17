import { createSlice } from '@reduxjs/toolkit';

const scoreExercise = createSlice({
  name: 'show',
  initialState: { score: 0 },

  reducers: {
    setScoreExercise: (state, action) => {
      state.score = action.payload;
    },
  },
});
const { reducer, actions } = scoreExercise;
export const { setScoreExercise } = actions;
export default reducer;
