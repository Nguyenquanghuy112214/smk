import { createSlice } from '@reduxjs/toolkit';

const PostIndexVoca = createSlice({
  name: 'show',
  initialState: { isNumber: null },

  reducers: {
    setIndexVoca: (state, action) => {
      state.isNumber = action.payload;
    },
  },
});
const { reducer, actions } = PostIndexVoca;
export const { setIndexVoca } = actions;
export default reducer;
