import { createSlice } from '@reduxjs/toolkit';

const musicBackground = createSlice({
  name: 'show',
  initialState: { music: new Audio('https://resourcesk.bkt.net.vn/plugins/game/FourPicOneWord/Audio/audio_SoundTrack.mp3') },

  reducers: {},
});
const { reducer, actions } = musicBackground;
export default reducer;
