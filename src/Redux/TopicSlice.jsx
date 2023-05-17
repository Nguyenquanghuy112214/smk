import { createSlice } from '@reduxjs/toolkit';

const Topic = createSlice({
  name: 'show',
  initialState: [],

  reducers: {
    setTopic: (state, action) => {
      if (state.length === 0) {
        state = state.push(action.payload);
      } else if (state.length > 0) {
        state.splice(0, 1);
        state = state.push(action.payload);
      }
    },
  },
});
const { reducer, actions } = Topic;
export const { setTopic } = actions;
export default reducer;
