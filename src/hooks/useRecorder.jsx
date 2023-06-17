import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export const useRecorder = () => {
  let audioChunks = [];
  let recorder;
  const [translate, setTranslate] = useState();
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const input = audioContext.createMediaStreamSource(stream);

    recorder = new window.Recorder(input);
  });

  const startRec = () => {
    console.log('Recording started...');
    audioChunks = [];
    recorder.record();
  };

  const endRec = () => {
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
        setTranslate(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const close = () => {
    setTranslate();
  };
  return { startRec, endRec, translate, close };
};
