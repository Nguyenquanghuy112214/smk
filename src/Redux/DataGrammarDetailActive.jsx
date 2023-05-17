import { createSlice } from '@reduxjs/toolkit';

const DataGrammarDetailActive = createSlice({
  name: 'show',
  initialState: { data: {} },

  reducers: {
    setDataGrammarDetailActive: (state, action) => {
      state.data = action.payload;
    },
  },
});
const { reducer, actions } = DataGrammarDetailActive;
export const { setDataGrammarDetailActive } = actions;
export default reducer;
