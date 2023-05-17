import { createSlice } from '@reduxjs/toolkit';

const IndexSeriesStory = createSlice({
  name: 'show',
  initialState: { index: undefined },

  reducers: {
    setIndexSeriesStory: (state, action) => {
      state.index = action.payload;
    },
  },
});
const { reducer, actions } = IndexSeriesStory;
export const { setIndexSeriesStory } = actions;
export default reducer;
