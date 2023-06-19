import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { setScores } from '~/Redux/Scores';

import { setActiveModalScore } from '~/Redux/ActiveModalScore';
import successSound from '~/assets/music/success.mp3';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecorder } from '~/hooks/useRecorder';
const cx = classNames.bind(styles);

function ModalSuccess({ count }) {
  const { close } = useRecorder();

  const scores = useSelector((state) => state.Scores.scores);

  const dispatch = useDispatch();
  const success = useSelector((state) => state.ModalSuccess.isActive);
  let scoreItem;
  if (count === 0) {
    scoreItem = 10;
  } else if (count === 1) {
    scoreItem = 6;
  } else if (count === 2) {
    scoreItem = 0;
  }
  useEffect(() => {
    var audio = new Audio(successSound);
    audio.play();
    audio.playbackRate = 3;
  }, []);

  const handleSuccess = () => {
    close();
    dispatch(setActiveModalScore(true));
    dispatch(setScores({ score: +scores.score + scoreItem, count: count, scoreItem: scoreItem }));
  };
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {success !== undefined && success && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: success ? 0 : 40, opacity: success ? 1 : 0, visibility: success ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('wrapper-modal__lotify', 'success')}
        >
          <div className={cx('header-modal__lotify')}>
            <span>
              <BsFillCheckCircleFill />
            </span>
            {t('Right')} !
          </div>
          <div className={cx('footer-modal__lotify')}>
            <button onClick={handleSuccess}>{t('Continue')}</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalSuccess;
