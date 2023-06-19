import axios from 'axios';
import { useState, useEffect } from 'react';

export const useRecorder = () => {
  const [loadingMicro, setLoadingMicro] = useState(null);
  useEffect(() => {
    setLoadingMicro(null);
  }, []);
  let audioChunks = [];
  let recorder;
  const [translate, setTranslate] = useState();
  console.log('sdsds', translate);
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
      setLoadingMicro(true);
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
      .then(() => {
        setLoadingMicro(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const close = () => {
    setTranslate('');
    console.log('sai');
  };
  return { startRec, endRec, translate, close, loadingMicro };
};
