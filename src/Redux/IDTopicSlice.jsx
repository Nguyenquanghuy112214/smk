import { createSlice } from '@reduxjs/toolkit';

const IdTopic = createSlice({
  name: 'show',
  initialState: { isTopic: undefined },

  reducers: {
    setIdTopic: (state, action) => {
      state.isTopic = action.payload;
    },
  },
});
const { reducer, actions } = IdTopic;
export const { setIdTopic } = actions;
export default reducer;
