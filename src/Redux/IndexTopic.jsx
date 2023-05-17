import { createSlice } from '@reduxjs/toolkit';

const IndexTopic = createSlice({
  name: 'show',
  initialState: { indexTopic: undefined },

  reducers: {
    setIndexTopic: (state, action) => {
      state.indexTopic = action.payload;
    },
  },
});
const { reducer, actions } = IndexTopic;
export const { setIndexTopic } = actions;
export default reducer;
