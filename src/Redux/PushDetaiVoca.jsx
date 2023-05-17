import { createSlice } from '@reduxjs/toolkit';

const dataDetailVoca = createSlice({
  name: 'dataDetailVoca',
  initialState: { data: {} },

  reducers: {
    setDataDetailVoca: (state, action) => {
      state.data = action.payload;
    },
  },
});
const { reducer, actions } = dataDetailVoca;
export const { setDataDetailVoca } = actions;
export default reducer;
