/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_VocabularyAndExcercies.module.scss';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css';

import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

import speak from '~/assets/image/VocaPage/speak.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
import * as GetSpeak from '~/services/GetSpeakByID';
import * as GetVocaById from '~/services/GetVocaSingleById';
import picture from '~/assets/image/VocaPage/picture.png';
import talk from '~/assets/image/VocaPage/talk.png';
import micro from '~/assets/image/VocaPage/micro.png';
import micro2 from '~/assets/animations/micro.json';
import children from '~/assets/image/VocaPage/children.png';
import { useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { setModalVocaPage } from '~/Redux/OpenModalVocaPage';
import ModalSuccess from './ModalSuccess';
import ModalFail from './ModalFail';
import useDebounce from '~/hooks/useDebounce';
import LoadingRobot from '../LoadingRobot';
import { useTranslation } from 'react-i18next';
import * as CreateContentHistory from '~/services/CreateContentHistory';
import { useAuth } from '~/hooks/useAuth';
import iconclose from '~/assets/image/iconclose.png';

const cx = classNames.bind(styles);

function ModalVocaPractive({ idVoca, isActive, onClick }) {
  const { auth } = useAuth();
  const { transcript } = useSpeechRecognition();
  const text = useDebounce(transcript, 800);
  const dispatch = useDispatch();
  const [dataModal, setDataModal] = useState([]);
  const [indexListSpeak, setIndexListSpeak] = useState(undefined);
  const arrray = [1, 1, 1, 1, 1, 1, 1];
  const [success, setSuccess] = useState(undefined);
  console.log('success', success);
  const [click, setClick] = useState(undefined);
  const [slideChange, setSliceChange] = useState(0);
  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  const [activeMicro, setActiveMicro] = useState(false);
  const openMicro = () => {
    SpeechRecognition.startListening();
    setActiveMicro(true);
    setTimeout(() => {
      SpeechRecognition.stopListening();
      setActiveMicro(false);
      setClick(true);
    }, 4000);
  };

  const data = [
    { id: 1, title: 'Hình ảnh', img: picture },
    { id: 2, title: 'Ghi âm', img: micro },
    { id: 3, title: 'Khẩu hình', img: talk },
  ];
  const closeModal = () => {
    onClick();
    setSuccess(undefined);
    const swiper = document.querySelector('.test').swiper;
    arrray.forEach(() => {
      swiper.slidePrev();
      return;
    });
    dispatch(setModalVocaPage(false));
  };

  useLayoutEffect(() => {
    const fetch = async () => {
      const [voca, listspeak] = await Promise.all([GetVocaById.getVocaSingle(idVoca), GetSpeak.getSpeak(idVoca)]);

      setDataModal({ listspeak: listspeak, voca: voca });
    };
    fetch();
  }, [idVoca]);

  const openSpeak1 = () => {
    setIndexListSpeak(undefined);

    var audio = new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${
        dataModal !== undefined &&
        dataModal.voca !== undefined &&
        dataModal.voca[0] !== undefined &&
        dataModal.voca[0].name !== undefined &&
        dataModal.voca[0].name
      }.mp3`
    );
    audio.play();
  };
  const openSpeak2 = () => {
    setIndexListSpeak(undefined);

    var audio = new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${
        dataModal !== undefined &&
        dataModal.voca !== undefined &&
        dataModal.voca[0] !== undefined &&
        dataModal.voca[0].name !== undefined &&
        dataModal.voca[0].name
      }.mp3`
    );
    audio.play();
  };

  const openSpeak3 = (index) => {
    setIndexListSpeak(index);

    var audio = new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${
        dataModal !== undefined &&
        dataModal.listspeak !== undefined &&
        dataModal.listspeak.data !== undefined &&
        dataModal.listspeak.data[index].soundslow !== undefined &&
        dataModal.listspeak.data[index].soundslow
      }.mp3`
    );
    audio.play();
  };
  console.log('activeMicro', activeMicro);
  const openSpeak4 = (index) => {
    setIndexListSpeak(index);

    var audio = new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${
        dataModal !== undefined &&
        dataModal.listspeak !== undefined &&
        dataModal.listspeak.data !== undefined &&
        dataModal.listspeak.data[index].soundslow !== undefined &&
        dataModal.listspeak.data[index].soundslow + '_vi'
      }.mp3`
    );
    audio.play();
  };

  const speak5 = (index) => {
    setIndexListSpeak(index);

    var audio = new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${
        dataModal !== undefined &&
        dataModal.voca !== undefined &&
        dataModal.voca[0] !== undefined &&
        dataModal.voca[0].name !== undefined &&
        dataModal.voca[0].name
      }.mp3`
    );
    audio.play();
  };

  const speakEn = () => {
    var audio = new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${
        dataModal !== undefined &&
        dataModal.voca !== undefined &&
        dataModal.voca[0] !== undefined &&
        dataModal.voca[0].name !== undefined &&
        dataModal.voca[0].name
      }.mp3`
    );
    audio.play();
  };

  console.log('click', click);
  const closeModalSuccess = () => {
    setSuccess(undefined);
    dispatch(setModalVocaPage(false));
    // const swiper = document.querySelector('.test2').swiper;
    // arrray.forEach(() => {
    //   swiper.slidePrev();
    //   return;
    // });
  };
  const closeModalFail = () => {
    setSuccess(undefined);
  };
  const fetch = async (title) => {
    const res = await CreateContentHistory.createContentHistory(
      {
        ContentHistory: `Tư vựng "${
          dataModal !== undefined &&
          dataModal.voca !== undefined &&
          dataModal.voca[0] !== undefined &&
          dataModal.voca[0].name !== undefined &&
          dataModal.voca[0].name.toUpperCase()
        }"`,
        Ratings: title,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    console.log('res', res);
  };

  useEffect(() => {
    if (click === true) {
      let tran = '';
      tran = tran + text;
      if (
        tran.toLowerCase().split(' ').join('') ===
        (dataModal !== undefined &&
          dataModal.voca !== undefined &&
          dataModal.voca[0] !== undefined &&
          dataModal.voca[0].name !== undefined &&
          dataModal.voca[0].name.toLowerCase().slice(0, -1).split(' ').join(''))
      ) {
        setTimeout(() => {
          setSuccess(true);
          fetch('Đã hoàn thành');
        }, 500);
      } else {
        setTimeout(() => {
          setSuccess(false);
          fetch('Chưa hoàn thành');
        }, 500);
      }
    }
    setTimeout(() => {
      setClick(undefined);
    }, 5000);
  }, [text, click]);

  const handleSwiper = async (index) => {
    const swiper = document.querySelector('.test').swiper;

    if (+index > +slideChange) {
      const countSwiper = index - slideChange;
      // swiper.slidePrev();
      for (let i = 1; i <= countSwiper; i++) {
        await swiper.slideNext();
      }
    } else {
      const countSwiper = slideChange - index;
      for (let i = 1; i <= countSwiper; i++) {
        await swiper.slidePrev();
      }
    }
  };
  const { t } = useTranslation();
  // console.log('dataModal', dataModal);
  if (!dataModal || !dataModal.listspeak || !dataModal.voca) return;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 60, visibility: 'hidden' }}
          animate={{ opacity: isActive ? 1 : 0, visibility: isActive ? 'visible' : 'hidden', x: isActive ? 0 : 60 }}
          exit={{ scale: 0 }}
          className={cx('modal')}
        >
          <div className={cx('wrapper-modal')}>
            {success === true && <ModalSuccess onClick={closeModalSuccess} success={success} />}
            {success === false && <ModalFail onClick={closeModalFail} success={success} />}
            <span className={cx('close-modalvoca')} onClick={closeModal}>
              <img src={iconclose} alt="" />
            </span>
            <div className={cx('modalvoca-content')}>
              <Swiper
                className={cx('test')}
                modules={[Navigation]}
                // grabCursor={true}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                initialSlide="0"
                onSlideChange={(swiper) => setSliceChange(swiper.activeIndex)}
              >
                <SwiperSlide>
                  <div className={cx('wrapper-level1')}>
                    <h3 className={cx('title')}>{dataModal.voca[0].name}</h3>
                    <div className={cx('wrapper-level__content')}>
                      <img
                        className={cx('img-main')}
                        src={`https://resourcesk.bkt.net.vn/ImagesPNG/${dataModal.voca[0].name}.png`}
                        alt=""
                      />
                      <div className={cx('detail-voca')}>
                        <div className={cx('detail-voca__content-top')}>
                          <h4>ADJECTIVE</h4>
                          <span>{dataModal.voca[0].pronounce}</span>
                          <img ref={ref} onClick={openSpeak1} className={cx('img-speak')} src={speak} alt="" />
                        </div>
                        <div className={cx('detail-voca__content-center')}>
                          <div className={cx('translate')}>
                            <h3>{t('Translate')}</h3>
                            <span>
                              {dataModal.voca[0].name}{' '}
                              <img ref={ref1} onClick={openSpeak2} className={cx('img-speak')} src={speak} alt="" />
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }} className={cx('example-sentences')}>
                          <h3>Câu ví dụ</h3>
                          <div className={cx('wrapper-list')}>
                            {dataModal.listspeak.data.map((item, index) => {
                              return (
                                <div key={index} className={cx('list-speak')}>
                                  <span style={{ marginLeft: '10px' }}>
                                    {item.sampleEn}{' '}
                                    <img
                                      ref={ref2}
                                      onClick={() => openSpeak3(index)}
                                      className={indexListSpeak === index ? cx('img-speak', 'active') : cx('img-speak')}
                                      src={speak}
                                      alt=""
                                    />
                                  </span>
                                  <span style={{ marginLeft: '20px' }}>
                                    {item.sampleVn}{' '}
                                    <img
                                      ref={ref3}
                                      onClick={() => openSpeak4(index)}
                                      className={indexListSpeak === index ? cx('img-speak', 'active') : cx('img-speak')}
                                      src={speak}
                                      alt=""
                                    />
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx('footer')}>
                      {data.map((item, index) => {
                        return (
                          <span
                            key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSwiper(index)}
                            className={cx(`${index === 0 ? 'active-img' : ''}`)}
                          >
                            <img src={item.img} alt="" />
                            {item.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={cx('wrapper-level2')}>
                    <div className={cx('header')}>
                      <h3 className={cx('title-header')}>{dataModal.voca[0].name}</h3>
                      <div className={cx('content-header')}>
                        <img className={cx('img-children')} src={children} alt="" />
                        <span>{`Hãy ghi âm từ "${dataModal.voca[0].name}" để cùng luyện từ với SmarKid nhé`}</span>
                      </div>
                    </div>

                    <div className={cx('content')}>
                      <div className={cx('content-left')}>
                        {/* <img style={{ cursor: 'pointer' }} className={cx('img-micro2')} src={micro2} alt="" /> */}

                        <div className={cx('pronounce-img')}>
                          <AnimatePresence>
                            {activeMicro ? (
                              <motion.div
                                initial={{ opacity: 0, visibility: 'hidden' }}
                                animate={{ opacity: activeMicro ? 1 : 0, visibility: activeMicro ? 'visible' : 'hidden' }}
                                exit={{ opacity: 0 }}
                                style={{ width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <LoadingRobot style={micro2} title="" ex6 active={activeMicro} />
                              </motion.div>
                            ) : (
                              <div style={{ width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <LoadingRobot onClick={openMicro} style={micro2} title="" ex6 />
                              </div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className={cx('content-left__body')}>
                          <h4>ADJECTIVE</h4>
                          <span>{dataModal.voca[0].pronounce}</span>
                          <img ref={ref4} onClick={speakEn} className={cx('img-speak')} src={speak} alt="" />
                        </div>
                      </div>
                      <div className={cx('content-right')}>
                        <div className={cx('translate')}>
                          <h3>{t('Translate')}</h3>
                          <span>{dataModal.voca[0].vnName}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }} className={cx('example-sentences')}>
                          <h3>Câu ví dụ</h3>
                          <div className={cx('wrapper-list')}>
                            {dataModal.listspeak.data.map((item, index) => {
                              return (
                                <div key={index} className={cx('list-speak')}>
                                  <span style={{ marginLeft: '10px' }}>{item.sampleEn}</span>
                                  <span style={{ marginLeft: '20px' }}>{item.sampleVn}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx('footer')}>
                      {data.map((item, index) => {
                        return (
                          <span
                            key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSwiper(index)}
                            className={cx(`${index === 1 ? 'active-img' : ''}`)}
                          >
                            <img src={item.img} alt="" />
                            {item.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={cx('wrapper-level3')}>
                    <div className={cx('header')}>
                      <h3>{dataModal.voca[0].name}</h3>
                      <div className={cx('header-right')}>
                        <h4>ADJECTIVE</h4>
                        <span>{dataModal.voca[0].pronounce}</span>
                        <img onClick={speak5} ref={ref5} className={cx('img-speak')} src={speak} alt="" />
                      </div>
                    </div>
                    <div className={cx('content')}>
                      <div className={cx('video', 'videosm')}>
                        {dataModal.voca[0].linkMouthPhape.split('/')[3] ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${dataModal.voca[0].linkMouthPhape.split('/')[3]}`}
                            frameborder="0"
                            allowfullscreen=""
                            mozallowfullscreen=""
                            msallowfullscreen=""
                            oallowfullscreen=""
                            webkitallowfullscreen=""
                          ></iframe>
                        ) : (
                          <LoadingRobot />
                        )}
                      </div>
                      <div className={cx('content-right')}>
                        <div className={cx('translate')}>
                          <h3>{t('Translate')}</h3>
                          <span>{dataModal.voca[0].vnName}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }} className={cx('example-sentences')}>
                          <h3>{t('Examplesentences')}</h3>
                          <div className={cx('wrapper-list')}>
                            {dataModal.listspeak.data.map((item, index) => {
                              return (
                                <div key={index} className={cx('list-speak')}>
                                  <span style={{ marginLeft: '10px' }}>{item.sampleEn}</span>
                                  <span style={{ marginLeft: '20px' }}>{item.sampleVn}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={cx('footer')}>
                      {data.map((item, index) => {
                        return (
                          <span
                            key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSwiper(index)}
                            className={cx(`${index === 2 ? 'active-img' : ''}`)}
                          >
                            <img src={item.img} alt="" />
                            {item.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalVocaPractive;

// const WrapperItem = ({children}) => {
//   return <div>
//     {ch}
//   </div>
// }
