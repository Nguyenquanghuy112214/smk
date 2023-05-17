import { createSlice } from '@reduxjs/toolkit';

const ResetEx3 = createSlice({
  name: 'dataDetailVoca',
  initialState: { isReset: undefined },

  reducers: {
    setResetEx3: (state, action) => {
      state.isReset = action.payload;
    },
  },
});
const { reducer, actions } = ResetEx3;
export const { setResetEx3 } = actions;
export default reducer;
