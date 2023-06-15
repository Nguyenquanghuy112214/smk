import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setListActive } from '~/Redux/ListActiveExercise';

import styles from '~/sass/Components/_Excercies.module.scss';
import { motion } from 'framer-motion';
import { resourceAutio } from '~/constant/resourceAudio';

const cx = classNames.bind(styles);

function Exercise3({ dataModal }) {
  const dispatch = useDispatch();
  const listDataFake1 = 'AHCDPCDKJHE';
  const listDataFake2 = 'NBQPSXCDVC';
  const listDataFake3 = 'QKEBKDVCSC';
  const listDataFake4 = 'ZVNGTEEOWR';
  const listDataFake5 = 'EYOTSLFFIOPP';

  const [answerSuccess, setAnswerSuccess] = useState([]);
  const [answerSuccessReal, setAnswerSuccessReal] = useState([]);
  const [listVoca, setListVoca] = useState([]);
  const [count, setCount] = useState(0);

  // Check đúng sai ở đây
  useEffect(() => {
    if (count === answerSuccess.length) {
      const compare = [];
      answerSuccess.forEach((item) => {
        compare.push(item.voca);
      });
      if (answerSuccessReal.join('').toLowerCase() === compare.join('').toLowerCase()) {
        setTimeout(() => {
          if (answerSuccessReal.length > 0) {
            dispatch(setListActive({ active3: true }));
          }
        }, [400]);
      } else {
        setTimeout(() => {
          dispatch(setListActive({ active3: false }));
        }, [400]);
      }
    } else {
      setTimeout(() => {
        dispatch(setListActive({ active3: false }));
      }, [400]);
    }
  }, [count, answerSuccess]);

  useEffect(() => {
    var audio = new Audio(resourceAutio(dataModal !== undefined && dataModal.dataItem !== undefined && dataModal.dataItem.name));
    audio.play();
  }, []);

  // Set list button câu trả lời
  useEffect(() => {
    if (!dataModal || !dataModal.dataItem || !dataModal.dataItem.name) return;
    const dataQuestion = dataModal.dataItem.name.toUpperCase().split('');
    const dataQuestion2 = dataModal.dataItem.name.toUpperCase().split('');

    dataQuestion.forEach((element, index) => {
      dataQuestion[index] = '';
    });

    dataQuestion.forEach((voca, index) => {
      setAnswerSuccess((answerSuccess) => [...answerSuccess, { voca, index }]);
    });

    setAnswerSuccessReal(dataQuestion2);
    const random = Math.floor(Math.random() * 10);
    let listVocaSplit = [];
    if (0 <= random && random <= 2) {
      listVocaSplit = dataQuestion2.concat(listDataFake1.split(''));
    } else if (2 < random && random <= 4) {
      listVocaSplit = dataQuestion2.concat(listDataFake2.split(''));
    } else if (4 < random && random <= 6) {
      listVocaSplit = dataQuestion2.concat(listDataFake3.split(''));
    } else if (6 < random && random <= 8) {
      listVocaSplit = dataQuestion2.concat(listDataFake4.split(''));
    } else if (8 < random && random <= 10) {
      listVocaSplit = dataQuestion2.concat(listDataFake5.split(''));
    }

    //
    if (0 <= random && random <= 2) {
      const repl0 = listVocaSplit[0];
      const repl3 = listVocaSplit[3];

      listVocaSplit[0] = listVocaSplit[7];
      listVocaSplit[7] = repl0;
      listVocaSplit[3] = listVocaSplit[6];
      listVocaSplit[6] = repl3;
    } else if (2 < random && random <= 4) {
      const repl0 = listVocaSplit[0];

      const repl2 = listVocaSplit[2];
      const repl3 = listVocaSplit[3];

      listVocaSplit[0] = listVocaSplit[7];
      listVocaSplit[7] = repl0;
      listVocaSplit[3] = listVocaSplit[6];
      listVocaSplit[6] = repl3;
      listVocaSplit[2] = listVocaSplit[5];
      listVocaSplit[5] = repl2;
    } else if (4 < random && random <= 6) {
      const repl0 = listVocaSplit[0];
      const repl1 = listVocaSplit[1];

      const repl3 = listVocaSplit[3];

      listVocaSplit[0] = listVocaSplit[5];
      listVocaSplit[5] = repl0;
      listVocaSplit[3] = listVocaSplit[7];
      listVocaSplit[7] = repl3;
      listVocaSplit[1] = listVocaSplit[4];
      listVocaSplit[4] = repl1;
    } else if (6 < random && random <= 8) {
      const repl0 = listVocaSplit[0];
      const repl1 = listVocaSplit[1];
      const repl2 = listVocaSplit[2];

      listVocaSplit[0] = listVocaSplit[3];
      listVocaSplit[3] = repl0;
      listVocaSplit[2] = listVocaSplit[7];
      listVocaSplit[7] = repl2;
      listVocaSplit[1] = listVocaSplit[4];
      listVocaSplit[4] = repl1;
    } else if (8 < random && random <= 10) {
      const repl0 = listVocaSplit[0];
      const repl1 = listVocaSplit[1];
      const repl2 = listVocaSplit[2];

      listVocaSplit[0] = listVocaSplit[4];
      listVocaSplit[4] = repl0;
      listVocaSplit[2] = listVocaSplit[7];
      listVocaSplit[7] = repl2;
      listVocaSplit[1] = listVocaSplit[6];
      listVocaSplit[6] = repl1;
    }

    listVocaSplit.forEach((voca, index) => {
      setListVoca((listVoca) => [...listVoca, { voca, index }]);
    });
  }, [dataModal]);

  const handClick = (voca, index) => {
    if (count < answerSuccess.length) {
      const findEmpty = answerSuccess.find((x) => x.voca === '');
      answerSuccess.splice(answerSuccess.indexOf(findEmpty), 1, { voca: voca.voca, index });
      listVoca.splice(index, 1, { voca: voca.voca, index, remove: 100 });
      const audio = new Audio('https://resourcesk.bkt.net.vn/plugins/game/FourPicOneWord/Audio/audio_Click.wav');
      audio.volume = 0.8;
      audio.play();
      setCount(count + 1);
    }
  };
  const resetAnswer = (voca, index) => {
    if (count > 0) {
      if (voca.voca !== '') {
        listVoca.splice(voca.index, 1, { voca: voca.voca, index: voca.index });
        answerSuccess.splice(index, 1, { voca: '', index: voca.index });
        setCount(count - 1);
      }
    }
  };
  const animation = {
    hidden: {
      opacity: 0,
      scale: 1,
      x: 40,
    },
    show: {
      opacity: 1,
      x: 0,

      transition: {
        duration: 0.3,
        // delay: delay * 0.1,
      },
    },
  };

  if (!dataModal) return;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className={cx('button-answer')}>
        {answerSuccess !== undefined &&
          answerSuccess.map((voca, index) => {
            return (
              <button
                onClick={() => resetAnswer(voca, index)}
                key={index}
                className={
                  answerSuccess !== undefined && answerSuccess.length > 0 ? cx('button-answer__item', 'active') : cx('button-answer__item')
                }
              >
                {voca.voca}
              </button>
            );
          })}
      </div>
      <div className={cx('button-question')}>
        {listVoca !== undefined &&
          listVoca.map((voca, index) => {
            if (index < 10 && answerSuccess?.length < 10) {
              return (
                <motion.button
                  style={{
                    opacity: voca.remove === 100 ? 0 : 1,
                    visibility: voca.remove === 100 ? 'hidden' : 'visible',
                  }}
                  // variants={animation}
                  // initial="hidden"
                  // animate="show"
                  // highlighter
                  key={index}
                  onClick={() => handClick(voca, index)}
                  className={cx('button-question__item')}
                >
                  {voca.voca}
                </motion.button>
              );
            } else if (index - 4 < answerSuccess?.length) {
              console.log('th2');
              return (
                <motion.button
                  style={{
                    opacity: voca.remove === 100 ? 0 : 1,
                    visibility: voca.remove === 100 ? 'hidden' : 'visible',
                  }}
                  // variants={animation}
                  // initial="hidden"
                  // animate="show"
                  key={index}
                  onClick={() => handClick(voca, index)}
                  className={cx('button-question__item')}
                >
                  {voca.voca}
                </motion.button>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Exercise3;
