/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_VocabularyAndExcercies.module.scss';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css';

import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setModalVocaPage } from '~/Redux/OpenModalVocaPage';
import blue_yellow from '~/assets/image/VocaPage/blue-yellow.png';
import green from '~/assets/image/VocaPage/green.png';
import flagen from '~/assets/image/VocaPage/flagen.png';
import kh from '~/assets/image/VocaPage/kh.png';
import flagvn from '~/assets/image/VocaPage/flagvn.png';
import speak from '~/assets/image/VocaPage/speak.png';
import micro from '~/assets/animations/micro.json';
import children from '~/assets/image/VocaPage/children.png';
import iconclose from '~/assets/image/iconclose.png';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';
import * as GetSpeak from '~/services/GetSpeakByID';
import * as GetVocaById from '~/services/GetVocaSingleById';
import * as UpdateVocabularyData from '~/services/UpdateVocabularyData';
import { setModalSpeak } from '~/Redux/ModalSpeakSlice';
import YouTube from 'react-youtube';
import useDebounce from '~/hooks/useDebounce';
import ModalSuccess from './ModalSuccess';
import ModalFail from './ModalFail';
import LoadingRobot from '../LoadingRobot';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { useCourse } from '~/hooks/useCourse';
import * as CreateContentHistory from '~/services/CreateContentHistory';
import { useRecorder } from '~/hooks/useRecorder';

const cx = classNames.bind(styles);

function ModalVocaPageExercise({ idVoca, isActive, onClick }) {
  const { course } = useCourse();
  const { auth } = useAuth();
  const { startRec, endRec, translate, close } = useRecorder();

  const [success, setSuccess] = useState(undefined);
  const dispatch = useDispatch();
  const [activeMicro, setActiveMicro] = useState(false);

  const [dataModal, setDataModal] = useState([]);
  const [vn, setVn] = useState(false);
  const [indexSlider, setIndexSlider] = useState(0);
  const arrray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const indexDebounce = useDebounce(indexSlider, 200);
  useEffect(() => {
    setIndexSlider(0);
  }, [idVoca, isActive]);

  const closeModal = () => {
    console.log('out');
    close();
    setSuccess(undefined);
    // setDataModal([]);
    dispatch(setModalVocaPage(false));
    setIndexSlider(null);
    const swiper = document.querySelector('.test2').swiper;
    arrray.forEach(() => {
      swiper.slidePrev();
      return;
    });
    onClick();
  };

  const text = useDebounce(translate, 800);

  const closeSuccess = () => {
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
      setSuccess(true);
      const fetch = async () => {
        const [res, res1] = await Promise.all([
          UpdateVocabularyData.updateVocabularyData(
            {
              vocabularyID: idVoca,
            },
            { headers: { Authorization: `Bearer ${auth.token}` } },
            course,
            1
          ),
          CreateContentHistory.createContentHistory(
            {
              ContentHistory: `Tư vựng "${
                dataModal !== undefined &&
                dataModal.voca !== undefined &&
                dataModal.voca[0] !== undefined &&
                dataModal.voca[0].name !== undefined &&
                dataModal.voca[0].name.toUpperCase()
              }"`,
              Ratings: 'Đã Hoàn Thành',
            },
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          ),
        ]);
      };
      fetch();
    } else {
      setSuccess(false);
    }
  };

  const audio = useMemo(() => {
    console.log('dataModal', dataModal);
    console.log('indexDebounce', indexDebounce);
    if (
      dataModal !== undefined &&
      dataModal.voca !== undefined &&
      dataModal.voca[0] !== undefined &&
      dataModal.voca[0].name !== undefined &&
      indexDebounce !== undefined
    ) {
      if (vn === true) {
        return new Audio(`https://resourcesk.bkt.net.vn/AudioMP3/${dataModal.voca[0].name}_vi.mp3`);
      } else {
        return new Audio(`https://resourcesk.bkt.net.vn/AudioMP3/${dataModal.voca[0].name}.mp3`);
      }
    } else {
      return new Audio(undefined);
    }
  }, [dataModal, vn]);

  console.log('audio', audio);
  const audio2 = useMemo(() => {
    if (
      dataModal !== undefined &&
      dataModal.listspeak !== undefined &&
      dataModal.listspeak.data !== undefined &&
      dataModal.listspeak.data[indexSlider - 4] !== undefined &&
      dataModal.listspeak.data[indexSlider - 4].soundslow !== undefined &&
      indexDebounce !== undefined
    ) {
      // Xóa for
      if (vn === true) {
        return new Audio(`https://resourcesk.bkt.net.vn/AudioMP3/${dataModal.listspeak.data[indexSlider - 4].soundslow}_vi.mp3`);
      } else {
        return new Audio(`https://resourcesk.bkt.net.vn/AudioMP3/${dataModal.listspeak.data[indexSlider - 4].soundslow}.mp3`);
      }
    } else {
      return new Audio(undefined);
    }
  }, [indexDebounce, vn]);

  useEffect(() => {
    if (isActive && audio !== undefined && audio2 !== undefined) {
      audio2.pause();
      audio2.currentTime = 0;
      audio.pause();
      audio.currentTime = 0;
      if (+indexSlider === 0) {
        audio.play();
      } else if (+indexSlider === 1 || +indexSlider === 2 || +indexSlider === 3) {
        audio.play();
      } else if (
        indexSlider >= 4 &&
        +indexSlider - 4 <
          (dataModal !== undefined &&
            dataModal.listspeak !== undefined &&
            dataModal.listspeak.data !== undefined &&
            +dataModal.listspeak.data.length)
      ) {
        audio2.play();
      }
    }
  }, [audio, audio2]);

  console.log('idVoca', idVoca);

  useEffect(() => {
    const fetch = async () => {
      const [voca, listspeak] = await Promise.all([GetVocaById.getVocaSingle(idVoca), GetSpeak.getSpeak(idVoca)]);
      setDataModal({ listspeak: listspeak, voca: voca });
    };
    fetch();
  }, [idVoca, isActive]);

  const openModalKh = () => {
    dispatch(setModalSpeak(true));
  };

  const changeLenguage = () => {
    setVn(!vn);
  };

  const handleSetIndex = (index) => {
    setIndexSlider(index.activeIndex);
  };

  const handleEnd = () => {
    audio.play();
  };

  const openMicro = () => {
    startRec();
    setActiveMicro(true);
    const timer = setTimeout(() => {
      endRec();
      setActiveMicro(false);
    }, 4000);
    return () => clearTimeout(timer);
  };

  const closeModalSuccess = () => {
    setSuccess(undefined);
    dispatch(setModalVocaPage(false));
    const swiper = document.querySelector('.test2').swiper;
    arrray.forEach(() => {
      swiper.slidePrev();
      return;
    });
  };
  const closeModalFail = () => {
    setSuccess(undefined);
  };

  if (!dataModal || !dataModal.listspeak || !dataModal.voca) return;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{
            opacity: 0,
            //  display: 'none',
            visibility: 'hidden',
            x: 0,
          }}
          animate={{
            opacity: isActive ? 1 : 0,
            x: isActive ? 0 : 50,
            visibility: isActive ? 'visible' : 'hidden',
            // display: isActive ? 'flex' : 'none',
            transition: { duration: 0.3, delay: 0 },
          }}
          className={cx('modal')}
        >
          <div className={cx('wrapper-modal')}>
            {success === true && <ModalSuccess onClick={closeModalSuccess} success={success} />}
            {success === false && <ModalFail onClick={closeModalFail} success={success} />}

            <div className={cx('close-modalvoca')} onClick={closeModal}>
              <img src={iconclose} alt="" />
            </div>

            <ModalSpeak dataModal={dataModal} />
            <div className={cx('modalvoca-content')}>
              <Swiper
                className={cx('test2')}
                modules={[Navigation]}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                initialSlide="0"
                onSlideChange={(index) => handleSetIndex(index)}
              >
                <SwiperSlide>
                  <div className={cx('wrapper-color')}>
                    <img style={{ width: '60%' }} className={cx('main-img', 'sub-img')} src={blue_yellow} alt="" />
                    <img
                      style={{ width: '30%' }}
                      className={cx('main-img', 'sub-img')}
                      src={`https://resourcesk.bkt.net.vn/ImagesPNG/${dataModal.voca[0].name}.png`}
                      alt=""
                    />
                    <div className={cx('kh')}>
                      <img onClick={openModalKh} className={cx('flag')} src={kh} alt="" />
                      <div></div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={cx('wrapper-color')}>
                    <img className={cx('main-img', 'sub-img')} src={blue_yellow} alt="" />
                    <div>
                      <img className={cx('main-img', 'sub-img')} src={green} alt="" />
                      <h3 className={cx('voca-en')}>{vn ? dataModal.voca[0].vnName : dataModal.voca[0].name}</h3>
                    </div>
                    <div className={cx('kh')}>
                      <img onClick={changeLenguage} className={cx('flag')} src={vn ? flagen : flagvn} alt="" />
                      <img onClick={openModalKh} className={cx('flag')} src={kh} alt="" />
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={cx('wrapper-color')}>
                    <img className={cx('main-img')} src={blue_yellow} alt="" />
                    <img className={cx('main-img')} src={`https://resourcesk.bkt.net.vn/ImagesPNG/${dataModal.voca[0].name}.png`} alt="" />
                    <button className={cx('button-voca')}>{vn ? dataModal.voca[0].vnName : dataModal.voca[0].name}</button>
                    <div className={cx('kh')}>
                      <img onClick={changeLenguage} className={cx('flag')} src={vn ? flagen : flagvn} alt="" />
                      <img onClick={openModalKh} className={cx('flag')} src={kh} alt="" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={cx('wrapper-color')}>
                    <img className={cx('main-img')} src={blue_yellow} alt="" />
                    <img className={cx('main-img')} src={`https://resourcesk.bkt.net.vn/ImagesPNG/${dataModal.voca[0].name}.png`} alt="" />
                    <button className={cx('button-voca')}>{vn ? dataModal.voca[0].vnName : dataModal.voca[0].pronounce}</button>
                    <div className={cx('kh')}>
                      <img onClick={changeLenguage} className={cx('flag')} src={vn ? flagen : flagvn} alt="" />
                      <img onClick={openModalKh} className={cx('flag')} src={kh} alt="" />
                    </div>
                  </div>
                </SwiperSlide>

                {dataModal.listspeak.data.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className={cx('wrapper-color')}>
                        <img className={cx('main-img')} src={blue_yellow} alt="" />
                        <img className={cx('main-img')} src={`https://resourcesk.bkt.net.vn/ImagesPNG/${item.images}.png`} alt="" />
                        <button className={cx('button-voca')}>{vn ? item.sampleVn : item.sampleEn}</button>
                        <div className={cx('kh')}>
                          <img onClick={changeLenguage} className={cx('flag')} src={vn ? flagen : flagvn} alt="" />
                          <img onClick={openModalKh} className={cx('flag')} src={kh} alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <SwiperSlide>
                  <div className={cx('wrapper-complete')}>
                    <div className={cx('header-exercise')}>
                      <img className={cx('img-children')} src={children} alt="" />
                      <span>{`Hãy ghi âm từ "${
                        dataModal !== undefined &&
                        dataModal.voca !== undefined &&
                        dataModal.voca[0] !== undefined &&
                        dataModal.voca[0].name !== undefined &&
                        dataModal.voca[0].name
                      }" để cùng luyện từ với SmarKid nhé`}</span>
                    </div>
                    <div className={cx('content-exercise')}>
                      <AnimatePresence>
                        {activeMicro ? (
                          <motion.div
                            initial={{ opacity: 0, visibility: 'hidden' }}
                            animate={{ opacity: activeMicro ? 1 : 0, visibility: activeMicro ? 'visible' : 'hidden' }}
                            exit={{ opacity: 0 }}
                            style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <LoadingRobot style={micro} title="" ex6 active={activeMicro} />
                          </motion.div>
                        ) : (
                          <div style={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LoadingRobot onClick={openMicro} style={micro} title="" ex6 />
                          </div>
                        )}
                      </AnimatePresence>
                      <div className={cx('content-exercise__voca')}>
                        <h3>
                          {dataModal !== undefined &&
                            dataModal.voca !== undefined &&
                            dataModal.voca[0] !== undefined &&
                            dataModal.voca[0].name !== undefined &&
                            dataModal.voca[0].name}
                        </h3>
                        <span className={cx('adj')}>ADJECTIVE</span>
                        <span className={cx('spelling')}>
                          {dataModal !== undefined &&
                            dataModal.voca !== undefined &&
                            dataModal.voca[0] !== undefined &&
                            dataModal.voca[0].pronounce !== undefined &&
                            dataModal.voca[0].pronounce}
                        </span>
                        <img onClick={handleEnd} className={cx('img-speak')} src={speak} alt="" />
                      </div>
                      <div className={cx('text-sub')}>{translate !== undefined && translate.length > 0 ? translate : '...........'}</div>
                    </div>
                    <div className={cx('button-complete')}>
                      <button onClick={closeSuccess}>Hoàn thành</button>
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

export default ModalVocaPageExercise;

export function ModalSpeak({ dataModal }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.ModalSpeak.isActive);
  const closeModal = () => {
    dispatch(setModalSpeak(false));
  };

  const handleClick = () => {
    var audio2 = new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${
        dataModal !== undefined &&
        dataModal.voca !== undefined &&
        dataModal.voca[0] !== undefined &&
        dataModal.voca[0].name !== undefined &&
        dataModal.voca[0].name
      }.mp3`
    );
    audio2.play();
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, visibility: 'hidden', x: 100 }}
          animate={{ opacity: isActive ? 1 : 0, visibility: isActive ? 'visible' : 'hidden', x: isActive ? 0 : 100 }}
          exit={{ scale: 0 }}
          className={cx('wrapper-modalkh')}
        >
          <div className={cx('wrapper-level3', 'wrapper-level3__modal')}>
            <span className={cx('close-modalspeak')} onClick={closeModal}>
              <img src={iconclose} alt="" />
            </span>
            <div className={cx('header')}>
              <h3>{dataModal.voca[0].name}</h3>
              <div className={cx('header-right')}>
                <h4>ADJECTIVE</h4>
                <span>{dataModal.voca[0].pronounce}</span>
                <img onClick={handleClick} className={cx('img-speak')} src={speak} alt="" />
              </div>
            </div>
            <div className={cx('content')}>
              <div className={cx('video')}>
                {dataModal.voca[0].linkMouthPhape.split('/')[3] ? (
                  <YouTube className={cx('videoYTB')} videoId={dataModal.voca[0].linkMouthPhape.split('/')[3]} opts={opts} />
                ) : (
                  <LoadingRobot />
                )}
              </div>
              <div className={cx('content-right')}>
                <div className={cx('translate')}>
                  <div className={cx('translate-item')}>{t('Translate')}</div>
                  <span>{dataModal.voca[0].vnName}</span>
                </div>
                {/* <div className={cx('antonym')}>
                  <h3>Từ trái nghĩa</h3>
                  <span>Người lớn</span>
                </div> */}

                <div style={{ display: 'flex', flexDirection: 'column' }} className={cx('example-sentences')}>
                  <div className={cx('translate-item')}>Câu ví dụ</div>
                  <div className={cx('wrapper-list')}>
                    {dataModal.listspeak.data.map((item, index) => {
                      return (
                        <div key={index} className={cx('list-speak')}>
                          <span style={{ marginLeft: '10px' }}>{item.sampleEn}</span>
                          <span style={{ marginLeft: '14px' }}>{item.sampleVn}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
