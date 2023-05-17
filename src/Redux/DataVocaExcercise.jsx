import { createSlice } from '@reduxjs/toolkit';

const dataVocaExcercise = createSlice({
  name: 'dataDetailVoca',
  initialState: [],

  reducers: {
    setDataVocaExcercise: (state, action) => {
      if (state.length === 0) {
        state = state.push(action.payload);
      } else if (state.length > 0) {
        state.splice(0, 1);
        state = state.push(action.payload);
      }
    },
  },
});
const { reducer, actions } = dataVocaExcercise;
export const { setDataVocaExcercise } = actions;
export default reducer;
