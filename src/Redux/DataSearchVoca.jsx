import { createSlice } from '@reduxjs/toolkit';

const DataSearchVoca = createSlice({
  name: 'show',
  initialState: [],

  reducers: {
    setDataSearchVoca: (state, action) => {
      if (state.length === 0) {
        state = state.push(action.payload);
      } else if (state.length > 0) {
        state.splice(0, 1);
        state = state.push(action.payload);
      }
    },
  },
});
const { reducer, actions } = DataSearchVoca;
export const { setDataSearchVoca } = actions;
export default reducer;
