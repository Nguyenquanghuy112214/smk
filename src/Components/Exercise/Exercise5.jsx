import classNames from 'classnames/bind';
import ButtonAnswer from './ButtonAnswer';
import * as GetSpeak from '~/services/GetSpeakByID';
import imgspeak from '~/assets/image/exercies/img-speak.png';
import styles from '~/sass/Components/_Excercies.module.scss';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import click from '~/assets/music/click.mp3';
import ModalFail from './ModalFail';
import ModalSuccess from './ModalSuccess';
import ModalScores from './ModalScores';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import { setActiveEx5 } from '~/Redux/ActiveEx5';
import { setCountEx5 } from '~/Redux/CountEx5';
import { setNextSingleSpeak } from '~/Redux/NextSingleSpeak';
import { setExcercises } from '~/Redux/ExerciesSlice';
import { removeListActive } from '~/Redux/ListActiveExercise';
import { motion } from 'framer-motion';
import { BiRefresh } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { resourceAutio } from '~/constant/resourceAudio';

const cx = classNames.bind(styles);

function Excercise5({ dataModal, dataDisturb }) {
  const listDataFake1 = 'What Name Your Hi Say Hello';
  const listDataFake2 = 'Where From You Are Children School';
  const listDataFake3 = 'Where From You Are Thank You';
  const listDataFake4 = 'Are From Ok You Class In';
  const listDataFake5 = 'Do School Go To Smite Car';
  const dispatch = useDispatch();
  // Check số lần sai
  const countEx5 = useSelector((state) => state.CountEx5.count);
  // ktra đúng hết thì next bài tiếp
  const active = useSelector((state) => state.Excercies.isActive);
  const [answerSuccess, setAnswerSuccess] = useState([]);
  const [count, setCount] = useState(0);
  // ktra đúng thì next sang câu tiếp theo cùng dạng bài tập
  const activeEx5 = useSelector((state) => state.ActiveEx5.isActive);
  const success = useSelector((state) => state.ModalSuccess.isActive);
  const nextSingleSpeak = useSelector((state) => state.NextSingleSpeak.isNext);
  const activeModalScore = useSelector((state) => state.ActiveModalScore.isActive);
  const { t } = useTranslation();
  const [countSingleEnd, setCountSingleEnd] = useState(0);
  const [singleSpeak, setSingleSpeak] = useState([]);
  const [listAnswer, setListAnswer] = useState([]);
  const [firstQues, setFirstQues] = useState();
  const [listVoca, setListVoca] = useState([]);
  const [exactly, setExactly] = useState({});

  // fetch list câu
  useEffect(() => {
    const fetch = async () => {
      const res = await GetSpeak.getSpeak(dataModal.dataItem.idvocabulary);
      const respone = res.data.map((item) => {
        return { ...item, active: undefined };
      });

      setListAnswer(respone);
    };
    fetch();
  }, [dataModal]);

  useEffect(() => {
    let firstQuestion = listAnswer.find((x) => x.active === undefined);
    setFirstQues(firstQuestion);
  }, [listAnswer]);

  useEffect(() => {
    if (!singleSpeak || !singleSpeak.sampleEn) return;
    const dataQuestion = singleSpeak.sampleEn.split(' ');
    const dataQuestion2 = singleSpeak.sampleEn.split(' ');
    dataQuestion.forEach((element, index) => {
      dataQuestion[index] = '';
    });

    dataQuestion.forEach((voca, index) => {
      setAnswerSuccess((answerSuccess) => [...answerSuccess, { voca, index }]);
    });

    // setAnswerSuccessReal(dataQuestion2);
    const random = Math.floor(Math.random() * 10);
    let listVocaSplit = [];
    if (0 <= random && random <= 2) {
      listVocaSplit = dataQuestion2.concat(listDataFake1.split(' '));
    } else if (2 < random && random <= 4) {
      listVocaSplit = dataQuestion2.concat(listDataFake2.split(' '));
    } else if (4 < random && random <= 6) {
      listVocaSplit = dataQuestion2.concat(listDataFake3.split(' '));
    } else if (6 < random && random <= 8) {
      listVocaSplit = dataQuestion2.concat(listDataFake4.split(' '));
    } else if (8 < random && random <= 10) {
      listVocaSplit = dataQuestion2.concat(listDataFake5.split(' '));
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
      setListVoca((listVoca) => [...listVoca, { voca: voca.toUpperCase(), index }]);
    });
    //
  }, [firstQues, singleSpeak, dataModal, countEx5]);

  // Fn check xem đáp án đúng chưa để next sang câu tiếp
  useEffect(() => {
    if (count === answerSuccess.length) {
      dispatch(setActiveEx5(false));
      const compare = [];
      answerSuccess.forEach((item) => {
        compare.push(item.voca);
      });

      let stringAnswer = '';
      const checkFirstAnswer = listAnswer.find((x) => x.active === undefined);
      setSingleSpeak(checkFirstAnswer);
      let checkAnswer = checkFirstAnswer !== undefined && checkFirstAnswer.sampleEn;

      stringAnswer = stringAnswer + checkAnswer;

      if (stringAnswer.split(' ').join(' ').toLowerCase() === compare.join(' ').toLowerCase()) {
        setExactly({ exact: true, checkID: checkFirstAnswer !== undefined && checkFirstAnswer.id });
      } else {
        setExactly({ exact: false, checkID: checkFirstAnswer !== undefined && checkFirstAnswer.id });
      }
    }
  }, [firstQues, listAnswer, dataModal, answerSuccess, count]);

  // Fn kiểm tra nếu đúng hết thì next sang bài tập tiếp theo
  useLayoutEffect(() => {
    if (
      (exactly.exact === true && listAnswer !== undefined && listAnswer.length === 0) ||
      (exactly.exact === false && countSingleEnd === 2)
    ) {
      dispatch(setActiveEx5(undefined));
      const post = () => Promise.all[(dispatch(setExcercises(active + 1)), dispatch(removeListActive()))];
      post();
    }
  }, [listAnswer]);

  // Click kiểm tra đúng sai
  const handleClick = () => {
    if (exactly.exact === true && listAnswer.find((x) => x.active === undefined)) {
      if (listAnswer.length > 1) {
        dispatch(setModalSuccess(true));
        dispatch(setActiveEx5(true));
      } else if (listAnswer.length === 1) {
        dispatch(setModalSuccess(true));
        dispatch(setActiveEx5(null));
      }
      // note test
      dispatch(setNextSingleSpeak(undefined));
    } else if (exactly.exact === false && listAnswer.find((x) => x.active === undefined && listAnswer.length > 1)) {
      if (countEx5 < 1) {
        dispatch(setActiveEx5(true));
        dispatch(setCountEx5(countEx5 + 1));
        setAnswerSuccess([]);
        dispatch(setModalSuccess(false));
      } else if (countEx5 === 1) {
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setActiveEx5(true));

        // note test
        dispatch(setNextSingleSpeak(undefined));
        //

        dispatch(setModalSuccess(false));
      }
      setAnswerSuccess([]);
    } else if (exactly.exact === false && listAnswer !== undefined && listAnswer.length === 1) {
      if (countEx5 < 1) {
        dispatch(setActiveEx5(null));
        setCountSingleEnd(countSingleEnd + 1);
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setModalSuccess(false));
        setAnswerSuccess([]);
      }

      if (countSingleEnd === 1) {
        dispatch(setActiveEx5(null));
        setCountSingleEnd(countSingleEnd + 1);
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setModalSuccess(false));

        // note test
        dispatch(setNextSingleSpeak(undefined));
        //
      }
    }
    setListVoca([]);

    setCount(0);
  };

  // Loại bỏ câu vừa làm đúng ra khỏi list câu hỏi
  useEffect(() => {
    if (nextSingleSpeak === true) {
      const eliminate = listAnswer.filter((x) => x.id !== exactly.checkID);
      setListAnswer(eliminate);
      setAnswerSuccess([]);
      setListVoca([]);
    }
  }, [nextSingleSpeak]);

  // Nhập câu trả lời
  const handClick = (voca, index) => {
    if (count < answerSuccess.length) {
      const audio = new Audio(click);
      audio.play();
      setCount(count + 1);

      const findEmpty = answerSuccess.find((x) => x.voca === '');
      answerSuccess.splice(answerSuccess.indexOf(findEmpty), 1, { voca: voca.voca, index });
      listVoca.splice(index, 1, { voca: voca.voca, index, remove: 100 });
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
  const audio = useMemo(() => {
    if (singleSpeak === undefined || singleSpeak.soundslow === undefined || singleSpeak.soundslow === null) {
      return undefined;
    } else {
      return new Audio(resourceAutio(singleSpeak !== undefined && singleSpeak.soundslow !== undefined && singleSpeak.soundslow));
    }
  }, [singleSpeak]);

  useLayoutEffect(() => {
    setTimeout(() => {
      audio.play();
    }, 300);
  }, [audio]);

  const openSpeak = () => {
    var audio = new Audio(resourceAutio(singleSpeak !== undefined && singleSpeak.soundslow !== undefined && singleSpeak.soundslow));
    audio.play();
  };

  const animation = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    show: {
      opacity: 1,
      scale: [1.2, 1],

      transition: {
        duration: 0.9,
        staggerDirection: 2,
      },
    },
  };

  return (
    <div className={cx('exercies')}>
      {success === false && <ModalFail count={countEx5} />}
      {success === true && <ModalSuccess count={countEx5} />}
      {activeModalScore === true && <ModalScores />}

      <div className={cx('excercies-header')}>
        <span>{t('Completethesentences')}</span>
        <div className={cx('img-speak')}>
          <img onClick={openSpeak} src={imgspeak} alt="" />
        </div>
      </div>
      <div className={cx('excercies-content-line')}>
        <div className={cx('answer-line')}>
          {answerSuccess !== undefined &&
            answerSuccess.map((item, index) => {
              return (
                <button onClick={() => resetAnswer(item, index)} key={index} className={cx('button-answer-line')}>
                  {item.voca}
                </button>
              );
            })}
        </div>
        <div className={cx('button-list')}>
          {listVoca.map((item, index) => {
            if (index < 8) {
              return (
                <motion.button
                  style={{
                    opacity: item.remove === 100 ? 0 : 1,
                    visibility: item.remove === 100 ? 'hidden' : 'visible',
                  }}
                  variants={animation}
                  initial="hidden"
                  animate="show"
                  id="button"
                  onClick={() => handClick(item, index)}
                  key={index}
                  className={cx('button-line')}
                >
                  {item.voca}
                </motion.button>
              );
            }
          })}
        </div>
        <div className={cx('check')}>
          <button onClick={handleClick}>{t('Check')}</button>
        </div>
      </div>
    </div>
  );
}

export default Excercise5;
