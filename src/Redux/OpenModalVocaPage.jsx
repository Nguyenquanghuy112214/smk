import { createSlice } from '@reduxjs/toolkit';

const ModalVocaPage = createSlice({
  name: 'show',
  initialState: { isActive: false },

  reducers: {
    setModalVocaPage: (state, action) => {
      state.isActive = action.payload;
    },
  },
});
const { reducer, actions } = ModalVocaPage;
export const { setModalVocaPage } = actions;
export default reducer;
