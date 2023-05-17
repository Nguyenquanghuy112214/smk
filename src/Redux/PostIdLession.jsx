import { createSlice } from '@reduxjs/toolkit';

const PostIdLesson = createSlice({
  name: 'show',
  initialState: { idActive: undefined },

  reducers: {
    setIdLesson: (state, action) => {
      state.idActive = action.payload;
    },
  },
});
const { reducer, actions } = PostIdLesson;
export const { setIdLesson } = actions;
export default reducer;
