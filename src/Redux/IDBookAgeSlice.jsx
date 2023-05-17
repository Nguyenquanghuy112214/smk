import { createSlice } from '@reduxjs/toolkit';

const IDBookAge = createSlice({
  name: 'idbookage',
  initialState: JSON.parse(localStorage.getItem('IDBookAge')),

  reducers: {
    changeIDBookAge: (state, action) => {
      console.log('action', action);
      state = action.payload;
      return state;
    },
  },
});
const { reducer, actions } = IDBookAge;
export const { changeIDBookAge } = actions;
export default reducer;
