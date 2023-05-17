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

const cx = classNames.bind(styles);

function ModalVocabulary({ isActive, vocaDetail }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClose = () => {
    dispatch(setModalVoca(false));
  };

  const audio = useMemo(() => {
    return new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${vocaDetail !== undefined && vocaDetail.name !== undefined && vocaDetail.name}.mp3`
    );
  }, [vocaDetail]);
  const audiovn = useMemo(() => {
    return new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${vocaDetail !== undefined && vocaDetail.name !== undefined && vocaDetail.name}_vi.mp3`
    );
  }, [vocaDetail]);

  const speakEn = () => {
    setTimeout(() => {
      audiovn.pause();
      audiovn.currentTime = 0;
      audio.play();
    }, 100);
  };

  const speakVn = () => {
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      audiovn.play();
    }, 100);
  };

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
              </div>
              <div className={cx('spelling')}>
                <span className={cx('spelling__left')}>{t('Transliteration')} </span>
                <span className={cx('spelling__right')}> {vocaDetail.pronounce}</span>
              </div>
            </div>
            <div className={cx('img')}>
              <img src={`https://resourcesk.bkt.net.vn/ImagesPNG/${vocaDetail.name}.png` || baby} alt="" />
            </div>
            <div className={cx('content')}>
              <h3>{t('Newword')}</h3>
              <div className={cx('content-body')}>
                <div className={cx('content-body__item')}>
                  <span className={cx('voca-speak')}>{vocaDetail.name}</span>
                  <span className={cx('icon-speak')} onClick={speakEn}>
                    <GiSpeaker />
                  </span>
                </div>
                <div className={cx('content-body__item')}>
                  <span className={cx('voca-speak', 'eng')}>{`"${vocaDetail.vnName}"`}</span>
                  <span className={cx('icon-speak')} onClick={speakVn}>
                    <GiSpeaker />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  );
}

export default ModalVocabulary;
