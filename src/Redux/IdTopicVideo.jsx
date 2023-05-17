import { createSlice } from '@reduxjs/toolkit';

const IdTopicVideo = createSlice({
  name: 'show',
  initialState: { isTopic: undefined },

  reducers: {
    setIdTopicVideo: (state, action) => {
      state.isTopic = action.payload;
    },
  },
});
const { reducer, actions } = IdTopicVideo;
export const { setIdTopicVideo } = actions;
export default reducer;
