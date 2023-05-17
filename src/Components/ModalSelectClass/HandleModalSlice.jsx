import { createSlice } from '@reduxjs/toolkit';

const ShowModalSelect = createSlice({
  name: 'show',
  initialState: { isActive: false },

  reducers: {
    setModalSelect: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ShowModalSelect;
export const { setModalSelect } = actions;
export default reducer;
