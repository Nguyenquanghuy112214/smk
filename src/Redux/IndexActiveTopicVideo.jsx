import { createSlice } from '@reduxjs/toolkit';

const IndexActiveTopicVideo = createSlice({
  name: 'show',
  initialState: { indexActive: undefined },

  reducers: {
    setIndexActiveTopicVideo: (state, action) => {
      state.indexActive = action.payload;
    },
  },
});
const { reducer, actions } = IndexActiveTopicVideo;
export const { setIndexActiveTopicVideo } = actions;
export default reducer;
