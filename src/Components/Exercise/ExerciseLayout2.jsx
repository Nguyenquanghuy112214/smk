import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import imgspeak from '~/assets/image/exercies/img-speak.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import ModalFail from './ModalFail';
import ModalSuccess from './ModalSuccess';
import ModalScores from './ModalScores';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { setExcercises } from '~/Redux/ExerciesSlice';

const cx = classNames.bind(styles);

function ExerciseLayout2({ children, dataModal, nospeak, title }) {
  const dispatch = useDispatch();

  const listActive = useSelector((state) => state.ListActive);
  const [count, setCount] = useState(0);

  const success = useSelector((state) => state.ModalSuccess.isActive);
  const activeModalScore = useSelector((state) => state.ActiveModalScore.isActive);

  const handleClick = () => {
    if (listActive !== undefined && listActive[0] !== undefined && listActive[0].active3 === true) {
      dispatch(setModalSuccess(true));
    } else if (listActive !== undefined && listActive[0] !== undefined && listActive[0].active3 === false) {
      if (count < 2) {
        setCount(count + 1);
        dispatch(setModalSuccess(false));
      }
    } else if (listActive !== undefined && listActive[0] !== undefined && listActive[0].active4 === true) {
      dispatch(setModalSuccess(true));
    } else if (listActive !== undefined && listActive[0] !== undefined && listActive[0].active4 === false) {
      if (count < 2) {
        setCount(count + 1);
        dispatch(setModalSuccess(false));
      }
    } else if (listActive !== undefined && listActive[0] !== undefined && listActive[0].active6 === true) {
      dispatch(setModalSuccess(true));
    } else if (listActive !== undefined && listActive[0] !== undefined && listActive[0].active6 === false) {
      if (count < 2) {
        setCount(count + 1);
        dispatch(setModalSuccess(false));
      }
    }
  };
  useEffect(() => {
    var audio = new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${dataModal !== undefined && dataModal.dataItem !== undefined && dataModal.dataItem.name}.mp3`
    );
    audio.play();
  }, []);
  const openSpeak = () => {
    var audio = new Audio(
      `https://resourcesk.bkt.net.vn/AudioMP3/${dataModal !== undefined && dataModal.dataItem !== undefined && dataModal.dataItem.name}.mp3`
    );
    audio.play();
  };

  const animation = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: -40,
    },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,

      transition: {
        duration: 0.3,
        // delay: delay * 0.1,
      },
    },
  };
  const { t } = useTranslation();
  return (
    <div className={cx('exercies')}>
      <div className={cx('excercies-header')}>
        <span>{title}</span>
        {!nospeak && (
          <div onClick={openSpeak} className={cx('img-speak')}>
            <img src={imgspeak} alt="" />
          </div>
        )}
      </div>
      <div className={cx('excercies-content__2')}>
        {success === false && <ModalFail count={count} />}
        {success === true && <ModalSuccess count={count} />}
        {activeModalScore === true && <ModalScores />}
        <div className={cx('img-question')}>
          <motion.img
            variants={animation}
            initial="hidden"
            animate="show"
            src={`https://resourcesk.bkt.net.vn/ImagesPNG/${
              dataModal !== undefined && dataModal.dataItem !== undefined && dataModal.dataItem.name
            }.png`}
            alt=""
          />
        </div>
        <div className={cx('exercise-pass2')}>{children}</div>
      </div>
      <div className={cx('check')}>
        <button onClick={handleClick}>{t('Check')}</button>
      </div>
    </div>
  );
}

export default ExerciseLayout2;
