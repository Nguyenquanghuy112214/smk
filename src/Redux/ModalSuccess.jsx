import { createSlice } from '@reduxjs/toolkit';

const ModalSuccess = createSlice({
  name: 'show',
  initialState: { isActive: undefined },

  reducers: {
    setModalSuccess: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ModalSuccess;
export const { setModalSuccess } = actions;
export default reducer;
