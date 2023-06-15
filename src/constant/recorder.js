import axios from 'axios';

let audioChunks = [];
let recorder;
export let translate = '';
navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const input = audioContext.createMediaStreamSource(stream);

  recorder = new window.Recorder(input);
});

export const startRec = () => {
  console.log('Recording started...');
  audioChunks = [];
  recorder.record();
};

export const endRec = () => {
  console.log('Recording stopped.');
  recorder.stop();
  recorder.exportWAV((blob) => {
    sendData(blob);
  });
};

function sendData(data) {
  var form = new FormData();
  form.append('audio_binary', data, 'data.wav');
  axios
    .post('http://192.168.1.100:5000/recog', form)
    .then((response) => {
      translate = response?.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
console.log('translate', translate);
