import { createSlice } from '@reduxjs/toolkit';

const ModalTopic = createSlice({
  name: 'show',
  initialState: { isActiveLesson: false, isActiveMusic: false },

  reducers: {
    setModalTopic: (state, action) => {
      state.isActiveLesson = action.payload;
    },
    setModalMusic: (state, action) => {
      state.isActiveMusic = action.payload;
    },
  },
});
const { reducer, actions } = ModalTopic;
export const { setModalTopic, setModalMusic } = actions;
export default reducer;
