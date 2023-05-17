import { createSlice } from '@reduxjs/toolkit';

const IdDragDrop = createSlice({
  name: 'show',
  initialState: { idDragDrop: undefined, count: undefined, name: undefined },

  reducers: {
    setIDDragDrop: (state, action) => {
      state.idDragDrop = action.payload.idDragDrop;
      state.count = action.payload.count;
      state.name = action.payload.name;
    },
  },
});
const { reducer, actions } = IdDragDrop;
export const { setIDDragDrop } = actions;
export default reducer;
