import { createSlice } from '@reduxjs/toolkit';

const ListActive = createSlice({
  name: 'show',
  initialState: [],

  reducers: {
    setListActive: (state, action) => {
      if (state.length === 0) {
        state = state.push(action.payload);
      } else if (state.length > 0) {
        state.splice(0, 1);
        state = state.push(action.payload);
      }
    },
    removeListActive: (state, action) => {
      state.splice(0, 1);
    },
  },
});
const { reducer, actions } = ListActive;
export const { setListActive, removeListActive } = actions;
export default reducer;
