import { createSlice } from '@reduxjs/toolkit';

const ModalSpeak = createSlice({
  name: 'show',
  initialState: { isActive: false },

  reducers: {
    setModalSpeak: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ModalSpeak;
export const { setModalSpeak } = actions;
export default reducer;
