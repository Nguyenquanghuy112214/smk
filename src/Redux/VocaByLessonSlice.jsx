import { createSlice } from '@reduxjs/toolkit';

const VocabyLesson = createSlice({
  name: 'show',
  initialState: [],

  reducers: {
    setVocabyLesson: (state, action) => {
      if (state.length === 0) {
        state = state.push(action.payload);
      } else if (state.length > 0) {
        state.splice(0, 1);
        state = state.push(action.payload);
      }
    },
  },
});
const { reducer, actions } = VocabyLesson;
export const { setVocabyLesson } = actions;
export default reducer;
