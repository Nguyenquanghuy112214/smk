import { createSlice } from '@reduxjs/toolkit';

const UCHistory = createSlice({
  name: 'uchistory',
  initialState: JSON.parse(localStorage.getItem('UCHistory')),

  reducers: {
    changeUCHistory: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
const { reducer, actions } = UCHistory;
export const { changeUCHistory } = actions;
export default reducer;
