import { createSlice } from '@reduxjs/toolkit';

const IDVoca = createSlice({
  name: 'show',
  initialState: { idVoca: undefined },

  reducers: {
    setIdVoca: (state, action) => {
      state.idVoca = action.payload;
    },
  },
});
const { reducer, actions } = IDVoca;
export const { setIdVoca } = actions;
export default reducer;
