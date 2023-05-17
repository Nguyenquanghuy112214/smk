import { createSlice } from '@reduxjs/toolkit';

const ListSongByIDTopic = createSlice({
  name: 'show',
  initialState: [],

  reducers: {
    setListSongByIDTopic: (state, action) => {
      if (state.length === 0) {
        state = state.push(action.payload);
      } else if (state.length > 0) {
        state.splice(0, 1);
        state = state.push(action.payload);
      }
    },
  },
});
const { reducer, actions } = ListSongByIDTopic;
export const { setListSongByIDTopic } = actions;
export default reducer;
