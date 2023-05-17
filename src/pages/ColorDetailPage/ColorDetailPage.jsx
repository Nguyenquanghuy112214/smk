import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './_ColorDetailPage.module.scss';
import AlphaPageSection from '~/Components/AlphaNumberPageSection/AlphaNumberPageSection';
import { useParams } from 'react-router-dom';
import routes from '~/config/routes';
import alpha2 from '~/assets/image/AlphaPage/alpha.png';
import YouTube from 'react-youtube';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

import { AnimatePresence, motion } from 'framer-motion';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import micro from '~/assets/animations/micro.json';

import ModalDetailAlphaSection from '~/Components/ModalDetailAlphaNumberSection/ModalDetailAlphaNumberSection';
import LoadingRobot from '~/Components/LoadingRobot';
import { useState } from 'react';
import * as GetAllColor from '~/services/GetAllColor';
import Loading from '~/Components/animationloading/Animationloading';
import LoadingMicro from '~/Components/LoadingMicro';
import useDebounce from '~/hooks/useDebounce';
import ModalSuccess from '~/Components/Vocabulary/ModalSuccess';
import ModalFail from '~/Components/Vocabulary/ModalFail';
import * as CreateContentHistory from '~/services/CreateContentHistory';
import { useAuth } from '~/hooks/useAuth';

const cx = classNames.bind(styles);

function ColorDetailPage() {
  const { color, idcolor } = useParams();
  const [click, setClick] = useState(undefined);
  const { auth } = useAuth();
  const [success, setSuccess] = useState(undefined);

  const [activeMicro, setActiveMicro] = useState(false);
  const [data, setData] = useState();
  const { transcript } = useSpeechRecognition();
  const text = useDebounce(transcript, 800);
  const openMicro = () => {
    SpeechRecognition.startListening();
    setActiveMicro(true);
    setTimeout(() => {
      SpeechRecognition.stopListening();
      setActiveMicro(false);
      setClick(true);
    }, 4000);
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await GetAllColor.getAllColor();
      const respone = res.data.find((x) => x.id === idcolor);
      setData(respone);
    };
    fetch();
  }, [idcolor]);

  const opts = {
    height: '100%',
    width: '100%',
  };
  const handleClickLeft = () => {
    console.log('slidePrev');
    const swiper = document.querySelector('.test').swiper;
    swiper.slidePrev();
  };
  const handleClickRight = () => {
    console.log('slideNext');

    const swiper = document.querySelector('.test').swiper;
    swiper.slideNext();
  };
  const closeModalSuccess = () => {
    setSuccess(undefined);
  };
  const closeModalFail = () => {
    setSuccess(undefined);
  };
  const fetch2 = async (title) => {
    const res = await CreateContentHistory.createContentHistory(
      {
        ContentHistory: `Màu sắc "${data !== undefined && data.name !== undefined && data.name.toUpperCase()}"`,
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
      if (tran.toLowerCase().split(' ').join('') === (data !== undefined && data.name !== undefined && data.name.toLowerCase())) {
        setTimeout(() => {
          setSuccess(true);
          fetch2('Đã hoàn thành');
        }, 500);
      } else {
        setTimeout(() => {
          setSuccess(false);
          fetch2('Chưa hoàn thành');
        }, 500);
      }
    }
    setTimeout(() => {
      setClick(undefined);
    }, 5000);
  }, [click, text]);
  if (!data) return null;
  return (
    <AlphaPageSection title={`Học Bảng Màu > ${color}`} path={routes.listcolor}>
      <Loading opa={0.6} active={!data} />

      <Swiper className={cx('test')} navigation={true} modules={[Navigation]} grabCursor={true} spaceBetween={0} slidesPerView={1}>
        <SwiperSlide>
          {success === true && <ModalSuccess sm onClick={closeModalSuccess} success={success} />}
          {success === false && <ModalFail sm onClick={closeModalFail} success={success} />}
          <ModalDetailAlphaSection onCickLeft={handleClickLeft} onCickRight={handleClickRight}>
            <div className={cx('wrapper-img')}>
              <div className={cx('img-alpha')}>
                <img src={data !== undefined && data.thumbnail !== undefined && data.thumbnail} alt="" />
              </div>
              <div className={cx('animation')}>
                <AnimatePresence>
                  {activeMicro ? (
                    <motion.div
                      initial={{ opacity: 0, visibility: 'hidden' }}
                      animate={{ opacity: activeMicro ? 1 : 0, visibility: activeMicro ? 'visible' : 'hidden' }}
                      exit={{ opacity: 0 }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <LoadingMicro style={micro} active={activeMicro} />
                    </motion.div>
                  ) : (
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <LoadingMicro onClick={openMicro} style={micro} />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ModalDetailAlphaSection>
        </SwiperSlide>

        {/* 2 */}
        <SwiperSlide>
          <ModalDetailAlphaSection onCickLeft={handleClickLeft} onCickRight={handleClickRight}>
            <div className={cx('wrapper-img')}>
              <YouTube
                style={{ borderRadius: '10px' }}
                className={cx('videoYTB')}
                videoId={data.linkMouthPhape.split('/')[3]}
                opts={opts}
              />
            </div>
          </ModalDetailAlphaSection>
        </SwiperSlide>
      </Swiper>
    </AlphaPageSection>
  );
}

export default ColorDetailPage;
