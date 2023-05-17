import { createSlice } from '@reduxjs/toolkit';

const CourseSlice = createSlice({
  name: 'show',
  initialState: { isId: '' },

  reducers: {
    setCourseSlice: (state, action) => {
      state.isId = action.payload;
    },
  },
});
const { reducer, actions } = CourseSlice;
export const { setCourseSlice } = actions;
export default reducer;
