import { createSlice } from '@reduxjs/toolkit';

const ModalExcercise = createSlice({
  name: 'show',
  initialState: { isActive: false },

  reducers: {
    setModalExcercise: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ModalExcercise;
export const { setModalExcercise } = actions;
export default reducer;
