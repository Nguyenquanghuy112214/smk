import { createSlice } from '@reduxjs/toolkit';

const ModalVoca = createSlice({
  name: 'modalvoca',
  initialState: { isActive: false },

  reducers: {
    setModalVoca: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ModalVoca;
export const { setModalVoca } = actions;
export default reducer;
