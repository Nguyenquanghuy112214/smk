import { createSlice } from '@reduxjs/toolkit';

const course = createSlice({
  name: 'course',
  initialState: JSON.parse(localStorage.getItem('course')),

  reducers: {
    changeCourse: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
const { reducer, actions } = course;
export const { changeCourse } = actions;
export default reducer;
