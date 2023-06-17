/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import * as getAllVoca from '~/services/GetAllVoca';
import { imgRandom } from './ImgRandom';
import { resourceImg } from '~/constant/resourceImg';
import { useMemo } from 'react';
import { resourceAutio } from '~/constant/resourceAudio';
import _, { random } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';

import { useNavigate, useParams } from 'react-router-dom';
import iconclose from '~/assets/image/iconclose.png';
import iconhome from '~/assets/image/BingoGame/home.png';
import iconspeak from '~/assets/image/BingoGame/speak.png';
import iconhelp from '~/assets/image/BingoGame/help.png';
import star from '~/assets/image/BingoGame/star.png';
import diamon from '~/assets/image/BingoGame/diamon.png';
import repeat from '~/assets/image/BingoGame/repeat.png';
import bgsuccess from '~/assets/image/BingoGame/bgsuccess.png';
import complete from '~/assets/image/BingoGame/complete.png';
import homesuccess from '~/assets/image/BingoGame/homesuccess.png';
import nextsuccess from '~/assets/image/BingoGame/nextsuccess.png';
import starsuccess from '~/assets/image/BingoGame/starsuccess.png';
import starfail from '~/assets/image/BingoGame/starfail.png';
import iconrepeat from '~/assets/image/BingoGame/iconrepeat.png';
import fail from '~/assets/image/BingoGame/fail.png';
import mssuccess from '~/assets/music/success.mp3';
import msfail from '~/assets/music/fail.mp3';
import routes from '~/config/routes';
import classNames from 'classnames/bind';
import styles from './_BingoGame.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setToggleMusic } from '~/Redux/ToggleMusic';
const cx = classNames.bind(styles);
function BingoGame() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const isToggle = useSelector((state) => state.toggleMusic.isActive);
  console.log('isToggle', isToggle);
  const { typeofGame } = useParams();
  const [input, setInput] = useState([]);
  const [start, setStart] = useState(0);
  const [array, setArray] = useState([]);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [dataQuestion, setDataQuestion] = useState([]);
  const [error, setError] = useState([1, 1, 1, 1, 1]);
  const [Error, SetError] = useState(null);
  const [countFail, setCountFail] = useState(0);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [help, setHelp] = useState([1, 1, 1]);
  const [figure, setFigure] = useState(null);

  const ROWS = +typeofGame;

  let cells = [];

  for (let i = 0; i < ROWS; i++) {
    const rows = [];

    for (let j = 1; j <= ROWS; j++) {
      rows.push(i * ROWS + j);

      if (rows.length === +typeofGame) {
        break;
      }
    }

    cells.push(rows);
  }

  function transform(data, type) {
    let newData = [];
    if (type === 'vertical') {
      for (let index = 0; index < ROWS; index++) {
        const rows = [];
        for (const row of cells) {
          rows.push(row[index]);
        }
        newData.push(rows);
      }
    }

    if (type === 'left-diagonal') {
      for (let index = 0; index < ROWS; index++) {
        const rows = [];
        let count = 0;

        for (const row of cells) {
          const value = row[index + count];

          if (!value) break;

          rows.push(value);

          count++;
        }

        if (rows.length === ROWS) {
          newData.push(rows);
        }
      }
    }

    if (type === 'right-diagonal') {
      for (let index = ROWS - 1; index >= 0; index--) {
        const rows = [];
        let count = 0;

        for (const row of cells) {
          const value = row[index - count];

          if (!value) break;

          rows.push(value);

          count++;
        }

        if (rows.length === ROWS) {
          newData.push(rows);
        }
      }
    }

    return newData;
  }
  const [success, setSuccess] = useState(null);
  console.log('success', success);
  const [Check, setCheck] = useState(null);
  function check(data, squares) {
    for (const row of data) {
      let count = 0;

      squares.forEach((id) => {
        row.forEach((i) => {
          if (+id === +i) {
            count++;
          }
        });
      });

      if (count === ROWS) {
        if (Check === null) {
          const timer = setTimeout(() => {
            setCheck(true);
            setDataQuestion([]);
          }, [3000]);
          return () => clearTimeout(timer);
        }
        if (success === true) {
          setCheck(null);
          setSuccess(null);
          setAnswer([]);
          setInput([]);
          if (+typeofGame === 3) {
            setArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
            setStart(start + 9);
          } else if (+typeofGame === 4) {
            setArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
            setStart(start + 16);
          } else {
            setArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
            setStart(start + 25);
          }
        }
        break;
      }
    }
  }

  useEffect(() => {
    if (Check === true) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, [0]);
      return clearTimeout(() => timer);
    }
  }, [Check]);

  function run() {
    const verticalData = transform(cells, 'vertical');
    const leftData = transform(cells, 'left-diagonal');
    const rightData = transform(cells, 'right-diagonal');

    const data = [...cells, ...verticalData, ...leftData, ...rightData];
    check(data, input);
  }

  run();

  const Random = useMemo(() => {
    if (array !== undefined && array.length > 0) return _.sample(array);
  }, [array]);

  const audio = useMemo(() => {
    if (dataQuestion !== undefined && dataQuestion.length > 0) {
      return new Audio(
        resourceAutio(
          dataQuestion !== undefined && dataQuestion[Random] !== undefined && dataQuestion[Random].name && dataQuestion[Random].name
        )
      );
    } else {
      return new Audio(undefined);
    }
  }, [Random, dataQuestion, Check]);
  const audioSuccess = useMemo(() => {
    return new Audio(mssuccess);
  }, []);

  const audioFail = useMemo(() => {
    return new Audio(msfail);
  }, []);
  useEffect(() => {
    if (+typeofGame === 3) {
      setArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    } else if (+typeofGame === 4) {
      setArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    } else if (+typeofGame === 5) {
      setArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
    }
  }, [+typeofGame]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllVoca.getAllVoca();
      setData([...res]);
    };
    fetch();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audio !== undefined && audio !== null) {
        if (Check === true) {
          audio.pause();
          audioSuccess.speed = 1.4;
          audioSuccess.play();
        } else {
          audioFail.pause();
          audioFail.currentTime = 0;
          audioSuccess.pause();
          audioSuccess.currentTime = 0;
          audio.play();
        }
      } else {
      }
    }, [200]);
    return () => clearTimeout(timer);
  }, [audio]);

  useEffect(() => {
    let Error = [];
    for (let i = 0; i <= 4 - countFail; i++) {
      Error.push(i);
    }
    if (countFail === 5) {
      Error = [];
    }
    setError(Error);
  }, [countFail]);

  useEffect(() => {
    const countSlice = start + +typeofGame * +typeofGame;
    const fakeData = data.slice(start, countSlice);
    setDataQuestion(fakeData);
  }, [data, start, typeofGame]);
  useEffect(() => {
    if (Error === true) {
      const countSlice = start + +typeofGame * +typeofGame;
      const fakeData = data.slice(start, countSlice);
      setDataQuestion(fakeData);
    }
  }, [Error]);

  useEffect(() => {
    let Help = [];
    for (let i = 0; i < 3 - count; i++) {
      Help.push(i);
    }
    if (count === 3) {
      Help = [];
    }
    setHelp(Help);
  }, [count]);

  useEffect(() => {
    if (countFail === 5) {
      SetError(false);
    }
  }, [countFail]);

  // Hiện thị nhân vật sau khi click đúng ở đây nhé
  useEffect(() => {
    if (answer !== undefined && answer.length > 0) {
      const timer = setTimeout(() => {
        setFigure(true);
      }, [200]);
      return () => clearTimeout(timer);
    }
  }, [answer]);
  // Thời gian ẩn nhân vật
  useEffect(() => {
    if (figure === true) {
      const timer = setTimeout(() => {
        setFigure(null);
      }, [3000]);
      return () => clearTimeout(timer);
    }
  }, [figure]);

  // Check Click đúng sai ở đây nhé
  const handleClick = (item, index) => {
    if (item.name === dataQuestion[Random].name) {
      dataQuestion.splice(index, 1, {
        idvocabulary: item.idvocabulary,
        img: item.name,
        statusActive: true,
        name: item.name,
        pronounce: item.pronounce,
        description: item.description,
      });
      setAnswer([...answer, index]);
      setInput([...input, index + 1]);
      setScore(score + 100);
      const exclude = array.filter((x) => x !== Random);
      const timer = setTimeout(() => {
        setArray(exclude);
      }, [3500]);
      audioFail.pause();
      audioFail.currentTime = 0;
      return () => clearTimeout(timer);
    } else {
      audioFail.pause();
      audioFail.currentTime = 0;
      audioFail.play();
      setCountFail(countFail + 1);
    }
  };

  const handleRepeat = () => {
    audioFail.pause();
    audioFail.currentTime = 0;
    audio.play();
  };
  const handleNext = () => {
    setSuccess(true);
  };

  const handleHelp = () => {
    if (dataQuestion !== undefined && dataQuestion[Random] !== undefined && count <= 2) {
      dataQuestion.splice(Random, 1, {
        idvocabulary: dataQuestion[Random].idvocabulary,
        name: dataQuestion[Random].name,
        pronounce: dataQuestion[Random].pronounce,
        description: dataQuestion[Random].description,
        help: true,
      });
      audioFail.pause();
      audioFail.currentTime = 0;
      audio.play();
      setCount(count + 1);
    }
  };
  const hanldeClose = () => {
    navigator(routes.startbingogame2);
  };
  const hanldeHome = () => {
    navigator(routes.homepage);
  };
  const handleHome = () => {
    navigator(routes.startbingogame2);
  };
  useEffect(() => {
    if (Error === true) {
      setHelp([1, 1, 1]);
      setCountFail(0);
      SetError(null);
      setCheck(null);
      setSuccess(null);
      setAnswer([]);
      setInput([]);
      // setDataQuestion([]);
      if (+typeofGame === 3) {
        setArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      } else if (+typeofGame === 4) {
        setArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      } else {
        setArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
      }
      setError([1, 1, 1, 1, 1]);
    }
  }, [Error]);
  const handleRepeatError = () => {
    SetError(true);
  };

  const toggleMusic = () => {
    console.log('1');
    dispatch(setToggleMusic(!isToggle));
  };

  return (
    <div className={cx('wrapper')}>
      <ModalSuccess RedirectHome={handleHome} onClick={handleNext} success={success} />
      <ModalFail onClick={handleRepeatError} error={Error} />
      <FigureSuccess figure={figure} Random={Random} data={dataQuestion[Random]} />
      <div className={cx('icon-close')}>
        <img onClick={hanldeClose} src={iconclose} alt="" />
      </div>
      <div className={cx('icon-home')}>
        <img onClick={hanldeHome} src={iconhome} alt="" />
      </div>
      <div className={cx('body')}>
        <div onClick={toggleMusic} className={cx('icon-speak', `${isToggle ? 'active' : ''}`)}>
          <img src={iconspeak} alt="" />
        </div>
        <div className={cx('icon-help')}>
          <img onClick={handleHelp} src={iconhelp} alt="" />
          <div className={cx('count')}>{help.length}</div>
        </div>
        <div className={cx('wrapper-content')}>
          <div className={cx('main-content')}>
            {+typeofGame === 3 && (
              <div data-aos="zoom-in" data-aos-duration="700" className={cx('wrapper-game3x3')}>
                {dataQuestion.map((item, index) => {
                  if (item.statusActive === true) {
                    return (
                      <div key={index} className={cx('img')}>
                        <img src={resourceImg(item.img)} alt="" />
                      </div>
                    );
                  }
                  return (
                    <div onClick={() => handleClick(item, index)} key={index} className={cx('button', `${item.help ? 'help' : ''}`)}>
                      {item.name}
                    </div>
                  );
                })}
              </div>
            )}
            {+typeofGame === 4 && (
              <div data-aos="zoom-in" data-aos-duration="700" className={cx('wrapper-game4x4')}>
                {dataQuestion.map((item, index) => {
                  if (item.statusActive === true) {
                    return (
                      <div key={index} className={cx('img', 'img4')}>
                        <img src={resourceImg(item.img)} alt="" />
                      </div>
                    );
                  }
                  return (
                    <div onClick={() => handleClick(item, index)} key={index} className={cx('button', `${item.help ? 'help' : ''}`)}>
                      {item.name}
                    </div>
                  );
                })}
              </div>
            )}

            {+typeofGame === 5 && (
              <div data-aos="zoom-in" data-aos-duration="700" className={cx('wrapper-game5x5')}>
                {dataQuestion.map((item, index) => {
                  if (item.statusActive === true) {
                    return (
                      <div key={index} className={cx('img', 'img5')}>
                        <img src={resourceImg(item.img)} alt="" />
                      </div>
                    );
                  }
                  return (
                    <div onClick={() => handleClick(item, index)} key={index} className={cx('button', `${item.help ? 'help' : ''}`)}>
                      {item.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className={cx('sub-content')}>
            <div className={cx('error')}>
              {error.map((item, index) => {
                return <img key={index} src={star} alt="" />;
              })}
            </div>
            <div className={cx('score')}>
              <img src={diamon} alt="" />
              {score}
            </div>
            <div className={cx('repeat')}>
              <img onClick={handleRepeat} src={repeat} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BingoGame;

export const ModalSuccess = ({ success, onClick, RedirectHome }) => {
  return (
    <AnimatePresence>
      {success === false && (
        <motion.div
          initial={{ opacity: 0, visibility: 'hidden' }}
          animate={{ opacity: success === false ? 1 : 0, visibility: success === false ? 'visible' : 'hidden' }}
          exit={{ opacity: 0 }}
          className={cx('wrapper-success')}
        >
          <div className={cx('bg-success')}>
            <div className={cx('star')}>
              <img src={starsuccess} alt="" />
              <img src={starsuccess} alt="" />
              <img src={starsuccess} alt="" />
            </div>
            <div className={cx('complete')}>
              <img src={complete} alt="" />
            </div>
            <div className={cx('home-success')}>
              <img onClick={() => RedirectHome()} src={homesuccess} alt="" />
            </div>
            <div className={cx('next-success')}>
              <img onClick={() => onClick()} src={nextsuccess} alt="" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalFail = ({ error, onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routes.startbingogame2);
  };
  return (
    <AnimatePresence>
      {error === false && (
        <motion.div
          initial={{ opacity: 0, visibility: 'hidden' }}
          animate={{ opacity: error === false ? 1 : 0, visibility: error === false ? 'visible' : 'hidden' }}
          exit={{ opacity: 0 }}
          className={cx('wrapper-fail')}
        >
          <div className={cx('bg-fail')}>
            <div className={cx('star')}>
              <img src={starsuccess} alt="" />
              <img src={starfail} alt="" />
              <img src={starfail} alt="" />
            </div>
            <div className={cx('fail')}>
              <img src={fail} alt="" />
            </div>
            <div onClick={handleClick} className={cx('home-fail')}>
              <img src={homesuccess} alt="" />
            </div>
            <div className={cx('repeat-fail')}>
              <img onClick={() => onClick()} src={iconrepeat} alt="" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const FigureSuccess = ({ data, figure, Random }) => {
  if (!data) return null;
  return (
    <AnimatePresence>
      {figure && (
        <motion.div className={cx('wrapper-figure')}>
          <motion.div
            initial={{ opacity: 0, visibility: 'hidden' }}
            animate={{ opacity: figure ? 1 : 0, visibility: figure ? 'visible' : 'hidden', animationDelay: 3 }}
            exit={{ opacity: 0 }}
            className={cx('may')}
          >
            <div className={cx('good')}>Đúng rồi !!</div>
            <div className={cx('translation')}>{`${data.name} : ${data.description}`}</div>
            <div className={cx('spelling')}>{data.pronounce}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, visibility: 'hidden' }}
            animate={{ opacity: figure ? 1 : 0, visibility: figure ? 'visible' : 'hidden' }}
            exit={{ opacity: 0 }}
            className={cx('figure')}
          >
            <img src={imgRandom[Random]?.img} alt="" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
