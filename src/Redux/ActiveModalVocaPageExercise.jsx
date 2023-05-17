import { createSlice } from '@reduxjs/toolkit';

const ActiveModalVocaPageExercise = createSlice({
  name: 'show',
  initialState: { isActive: false },

  reducers: {
    setActiveModalVocaExercise: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ActiveModalVocaPageExercise;
export const { setActiveModalVocaExercise } = actions;
export default reducer;
