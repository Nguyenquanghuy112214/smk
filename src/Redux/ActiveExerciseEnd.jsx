import { createSlice } from '@reduxjs/toolkit';

const ActiveExerciseEnd = createSlice({
  name: 'show',
  initialState: { isActive: undefined },

  reducers: {
    setActiveExerciseEnd: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ActiveExerciseEnd;
export const { setActiveExerciseEnd } = actions;
export default reducer;
