/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { resourceImg } from '~/constant/resourceImg';
import * as GetDataVoca from '~/services/GetDataVoca';
import { Container } from 'react-bootstrap';
import { resourceAutio } from '~/constant/resourceAudio';
import classNames from 'classnames/bind';
import styles from './_WordMatchingGame.module.scss';
import ModalSuccessGame from '~/Components/ModalSuccessGame/ModalSuccessGame';
import { motion, AnimatePresence } from 'framer-motion';
import { imgWordMatchingGame } from '~/assets/image/wordmatchinggame/index';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleMusic } from '~/Redux/ToggleMusic';
import { IoHome } from 'react-icons/io5';

const cx = classNames.bind(styles);

function WordMatchingGame() {
  const navigator = useNavigate();
  const isToggle = useSelector((state) => state.toggleMusic.isActive);
  const dispatch = useDispatch();

  const { home, mute_btn, unmute_btn, info_btn } = imgWordMatchingGame;
  // Fake data random
  const animation = {
    hidden: {
      opacity: 0,
      scale: 1,
      y: 40,
      x: '-50%',
    },
    show: {
      opacity: 1,
      y: 0,
      x: '-50%',

      transition: {
        duration: 0.3,
      },
    },
  };
  const listDataFake1 = 'AHCDPCDKJHE';
  const listDataFake2 = 'NBQPSXCDVC';
  const listDataFake3 = 'QKEBKDVCSC';
  const listDataFake4 = 'ZVNGTEEOWR';
  const listDataFake5 = 'EYOTSLFFIOPP';
  const [active, setActive] = useState(null);
  const [state, setState] = useState(null);
  const [listIndexSuccess, setListIndexSuccess] = useState([]);
  const [indexVoca, setIndexVoca] = useState();
  const [dataVoca, setDataVoca] = useState([]);
  const [answerSuccess, setAnswerSuccess] = useState([]);
  const [answerSuccessReal, setAnswerSuccessReal] = useState([]);
  const [listVoca, setListVoca] = useState([]);
  const [count, setCount] = useState(0);
  const randomFirt = Math.floor(Math.random() * 100);
  const randomBack = Math.floor(Math.random() * dataVoca.length);
  const [activehelp, setActiveHelp] = useState(false);
  useEffect(() => {
    setIndexVoca(randomFirt);
  }, []);

  // Check đúng sai ở đây
  useEffect(() => {
    if (count === answerSuccess.length) {
      const compare = [];
      answerSuccess.forEach((item) => {
        compare.push(item.voca);
      });
      if (answerSuccessReal.join('').toLowerCase() === compare.join('').toLowerCase()) {
        setTimeout(() => {
          const audio = new Audio(resourceAutio(answerSuccessReal.join('').toLowerCase()));
          audio.volume = 1;
          audio.play();
          if (answerSuccessReal.length > 0) {
            setListIndexSuccess((listIndexSuccess) => [...listIndexSuccess, indexVoca]);
            setActive(true);
            setAnswerSuccess([]);
            setListVoca([]);
          }
        }, [400]);
      } else {
        if (count > 0) {
          setState(false);
          setTimeout(() => {
            const audio = new Audio('https://resourcesk.bkt.net.vn/plugins/game/FourPicOneWord/Audio/audio_Incorrect.wav');
            audio.volume = 1;
            audio.play();
            setActive(false);
          }, [400]);
        }
      }
    } else {
      setState(true);
    }
  }, [count, indexVoca]);

  const handleSuccess = () => {
    if (listIndexSuccess.find((x) => x === indexVoca)) {
      const randomAgain = Math.floor(Math.random() * dataVoca.length);
      setIndexVoca(randomAgain);
    } else {
      setIndexVoca(randomBack);
    }
    setCount(0);
    setActive(null);
  };

  // reset trạng thái chữ thành màu trắng khi next bài
  useEffect(() => {
    setState(null);
  }, [indexVoca]);
  // Get data

  useEffect(() => {
    const fetch = async () => {
      const voca = await GetDataVoca.GetDataVoca();
      setDataVoca(voca.data);
    };
    fetch();
  }, []);

  // Set list button câu trả lời
  useEffect(() => {
    if (!dataVoca || !dataVoca[indexVoca] || !dataVoca[indexVoca].name) return;
    const dataQuestion = dataVoca[indexVoca].name.toUpperCase().split('');
    const dataQuestion2 = dataVoca[indexVoca].name.toUpperCase().split('');

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
  }, [dataVoca, indexVoca]);

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
  const handleNaviteHome = () => {
    navigator(routes.starttotltalgame);
  };
  const handleToggleMusic = () => {
    dispatch(setToggleMusic(!isToggle));
  };

  const onHome = () => {
    navigator('/');
  };

  const handleHelp = () => {
    setActiveHelp(true);
  };
  const handleHiddent = () => {
    setActiveHelp(false);
  };
  if (!dataVoca || !dataVoca[indexVoca] || !dataVoca[indexVoca].cpitSpeak) return <div className={cx('wrapper')}></div>;
  // else {
  return (
    <div className={cx('wrapper')}>
      <ModalHelp activehelp={activehelp} hiddentHelp={handleHiddent} />
      <button className={cx('icon')} onClick={onHome}>
        <IoHome />
      </button>
      {/* <Loading active={dataVoca === null || dataVoca === undefined} /> */}
      <div className={cx('list-navigate')}>
        <img src={home} alt="" onClick={handleNaviteHome} />
        <img src={isToggle ? unmute_btn : mute_btn} alt="" onClick={handleToggleMusic} />
        <img onClick={handleHelp} src={info_btn} alt="" />
      </div>
      <Container>
        <div className={cx('list-img')}>
          {dataVoca[indexVoca].cpitSpeak.map((voca, index) => {
            if (index < 4)
              return (
                <div data-aos="zoom-in" data-aos-duration="700" className={cx('wrapper-img')}>
                  <img src={resourceImg(voca.images)} alt="" />
                </div>
              );
          })}
        </div>

        <div data-aos="fade-up" data-aos-duration="800" className={cx('wrapper-answer')}>
          {answerSuccess.map((voca, index) => {
            return (
              <div
                data-aos="zoom-in"
                data-aos-duration="700"
                data-aos-delay={index * 50}
                onClick={() => resetAnswer(voca, index)}
                key={index}
                className={cx('img-button')}
                style={{
                  color: state === false ? 'red' : state === true ? 'white' : '',
                  background: `url(https://resourcesk.bkt.net.vn/plugins/game/FourPicOneWord/Images/Button/btnSelected3.png) no-repeat center`,
                }}
              >
                {voca.voca}
              </div>
            );
          })}
        </div>
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" className={cx('wrapper2')}>
          <div className={cx('wrapper-question')}>
            {listVoca.map((voca, index) => {
              if (index < 6) {
                return (
                  <div
                    onClick={() => handClick(voca, index)}
                    key={index}
                    className={cx('img-question')}
                    style={{
                      opacity: voca.remove === 100 ? 0 : 1,
                      visibility: voca.remove === 100 ? 'hidden' : 'visible',
                      background: `url(https://resourcesk.bkt.net.vn/plugins/game/FourPicOneWord/Images/Button/btnSelected3.png) no-repeat center`,
                    }}
                  >
                    {voca.voca}
                  </div>
                );
              }
            })}
          </div>
          <div className={cx('wrapper-question')}>
            {listVoca.map((voca, index) => {
              if (index >= 6 && index < 12) {
                return (
                  <div
                    onClick={() => handClick(voca, index)}
                    key={index}
                    className={cx('img-question')}
                    style={{
                      opacity: voca.remove === 100 ? 0 : 1,
                      visibility: voca.remove === 100 ? 'hidden' : 'visible',
                      background: `url(https://resourcesk.bkt.net.vn/plugins/game/FourPicOneWord/Images/Button/btnSelected3.png) no-repeat center`,
                    }}
                  >
                    {voca.voca}
                  </div>
                );
              }
            })}
          </div>
        </div>

        <AnimatePresence>
          {active === true && (
            <motion.div variants={animation} initial="hidden" animate="show" className={cx('modal')}>
              <ModalSuccessGame
                onClick={handleSuccess}
                vocabulary={dataVoca[indexVoca].name}
                spelling={dataVoca[indexVoca].pronounce}
                translate={dataVoca[indexVoca].vnName}
                img={dataVoca[indexVoca].name}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
// }

export default WordMatchingGame;

export const ModalHelp = ({ activehelp, hiddentHelp }) => {
  const { close, bg_i } = imgWordMatchingGame;
  const animation = {
    hidden: {
      opacity: 0,
      // scale: 0,
    },
    show: {
      opacity: 1,
      // scale: 1,

      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <AnimatePresence>
      {activehelp && (
        <motion.div variants={animation} initial="hidden" animate="show" className={cx('modal-total')}>
          <div className={cx('modal')}>
            <div className={cx('bg')}>
              <img src={bg_i} alt="" />
              <div className={cx('wrapper-content')}>
                <div className={cx('title1')}>Hướng dẫn</div>
                <div className={cx('title2')}>
                  4 bức tranh ẩn chứa ẩn nghĩa của một từ, bạn có đoán được từ đó là gì không ?
                  <br />
                  Chọn từng chữ để giải nghĩa từ của bạn .
                </div>
              </div>
            </div>
            <div onClick={() => hiddentHelp()} className={cx('icon-close')}>
              <img src={close} alt="" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
