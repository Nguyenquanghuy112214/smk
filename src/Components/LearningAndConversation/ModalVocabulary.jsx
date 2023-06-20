import classNames from 'classnames/bind';
import styles from '~/sass/Components/_ModalVocabulary.module.scss';
import baby from '~/assets/image/sachdep/baybe.jpg';
import { AiOutlineClose } from 'react-icons/ai';
import { GiSpeaker } from 'react-icons/gi';
import { setModalVoca } from '~/Redux/ModalVocaSlice';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import iconclose from '~/assets/image/iconclose.png';
import * as GetSpeak from '~/services/GetSpeakByID';

import { useEffect } from 'react';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ModalVocabulary({ isActive, vocaDetail }) {
  const [data, setData] = useState([]);
  const [indexVN, setIndexVN] = useState(null);
  const [indexEN, setIndexEN] = useState(null);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClose = () => {
    setIndexVN(null);
    setIndexEN(null);
    dispatch(setModalVoca(false));
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await GetSpeak.getSpeak(vocaDetail?.idvocabulary);
      setData(res.data);
    };
    fetch();
  }, [vocaDetail]);

  const audio = useMemo(() => {
    return new Audio(`https://resourcesk.bkt.net.vn/AudioMP3/${data[indexEN] !== undefined && data[indexEN]?.soundslow}.mp3`);
  }, [data, indexEN]);
  const audiovn = useMemo(() => {
    return new Audio(`https://resourcesk.bkt.net.vn/AudioMP3/${data[indexVN] !== undefined && data[indexVN]?.soundslow}_vi.mp3`);
  }, [data, indexVN]);
  const audio1 = useMemo(() => {
    return new Audio(`https://resourcesk.bkt.net.vn/AudioMP3/${vocaDetail?.name}.mp3`);
  }, [data, indexEN]);
  const audiovn2 = useMemo(() => {
    return new Audio(`https://resourcesk.bkt.net.vn/AudioMP3/${vocaDetail?.name}_vi.mp3`);
  }, [data, indexVN]);

  const speakEn = (index) => {
    setIndexEN(index);
    setIndexVN(null);
    setCount(count + 1);
  };

  const speakVn = (index) => {
    setIndexVN(index);
    setIndexEN(null);
    setCount(count + 1);
  };

  const handle2 = () => {
    audio1.play();
  };
  const handle1 = () => {
    audiovn2.play();
  };

  useEffect(() => {
    if (indexEN !== null) {
      audiovn.pause();
      audiovn.currentTime = 0;
      audio.play();
    }
  }, [audio, count]);

  useEffect(() => {
    if (indexVN !== null) {
      audio.pause();
      audio.currentTime = 0;
      audiovn.play();
    }
  }, [audio, count]);

  return (
    vocaDetail !== undefined && (
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, visibility: 'hidden', x: 100 }}
            animate={{
              opacity: isActive ? '1' : '0',
              x: isActive ? 0 : 100,
              visibility: isActive ? 'visible' : 'hidden',
            }}
            exit={{ scale: 0, transition: { duration: 0.1 } }}
            className={cx('wrapper')}
          >
            <div onClick={handleClose} className={cx('icon')}>
              <img src={iconclose} alt="" />
            </div>
            <div className={cx('header')}>
              <div className={cx('voca')}>
                <span className={cx('name-eng')}>{vocaDetail.name} :</span>
                <span className={cx('name-vn')}> {vocaDetail.vnName}</span>
                <span className={cx('icon-speak')} onClick={handle1}>
                  <GiSpeaker />
                </span>
              </div>
              <div className={cx('spelling')}>
                <span className={cx('spelling__left')}>{t('Transliteration')} </span>
                <span className={cx('spelling__right')}> {vocaDetail.pronounce}</span>
                <span className={cx('icon-speak')} onClick={handle2}>
                  <GiSpeaker />
                </span>
              </div>
            </div>
            <div className={cx('img')}>
              <img src={`https://resourcesk.bkt.net.vn/ImagesPNG/${vocaDetail.name}.png` || baby} alt="" />
            </div>
            <div className={cx('content')}>
              <h3>{t('Newword')}</h3>
              <div className={cx('content-body-total')}>
                {data?.map((item, index) => (
                  <div key={index} className={cx('content-body')}>
                    <div className={cx('content-body__item')}>
                      <span className={cx('voca-speak')}>{item?.sampleEn}</span>
                      <span className={cx('icon-speak')} onClick={() => speakEn(index)}>
                        <GiSpeaker />
                      </span>
                    </div>
                    <div className={cx('content-body__item')}>
                      <span className={cx('voca-speak', 'eng')}>{`"${item?.sampleVn}"`}</span>
                      <span className={cx('icon-speak')} onClick={() => speakVn(index)}>
                        <GiSpeaker />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  );
}

export default ModalVocabulary;
