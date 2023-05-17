import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import bgScores from '~/assets/image/exercies/bgScores.png';
import star from '~/assets/image/exercies/star.png';
import nostar from '~/assets/image/exercies/nostar.png';
import { setActiveModalScore } from '~/Redux/ActiveModalScore';
import { setExcercises } from '~/Redux/ExerciesSlice';
import { removeListActive } from '~/Redux/ListActiveExercise';
import { setScores } from '~/Redux/Scores';
import squirrelsuccess from '~/assets/image/exercies/squirrelsuccess.png';
import squirrelfail from '~/assets/image/exercies/squirrelfail.png';
import { setModalExcercise } from '~/Redux/ModalExcercise';
import { setCountEx5 } from '~/Redux/CountEx5';
import { setNextSingleSpeak } from '~/Redux/NextSingleSpeak';
import { setActiveExerciseEnd } from '~/Redux/ActiveExerciseEnd';
import { useTranslation } from 'react-i18next';
import iconclose from '~/assets/image/iconclose.png';

// import {useNavigage}

const cx = classNames.bind(styles);

function ModalScores() {
  const active = useSelector((state) => state.Excercies.isActive);
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.Scores.scores);
  const countEx5 = useSelector((state) => state.CountEx5.count);
  const activeExEnd = useSelector((state) => state.ActiveExerciseEnd.isActive);
  const activeEx5 = useSelector((state) => state.ActiveEx5.isActive);

  const handleSuccess = () => {
    dispatch(setCountEx5(0));
    if (activeEx5 === undefined || activeEx5 === null) {
      dispatch(setActiveModalScore(undefined));
      dispatch(setModalSuccess(undefined));
      const post = () => Promise.all[(dispatch(setExcercises(active + 1)), dispatch(removeListActive()))];
      post();
    } else if (activeEx5 === true || activeEx5 === false) {
      dispatch(setActiveModalScore(undefined));
      dispatch(setModalSuccess(undefined));
      dispatch(setNextSingleSpeak(true));
    } else if (activeExEnd === true) {
    }
    // setTimeout(() => {
    //   post();
    // }, 500);
  };

  const closeModal = () => {
    dispatch(setActiveExerciseEnd(undefined));
    dispatch(setCountEx5(0));
    dispatch(setNextSingleSpeak(undefined));
    dispatch(setModalSuccess(undefined));
    dispatch(setExcercises(1));
    dispatch(setModalExcercise(false));
    dispatch(setScores(0));
    dispatch(setActiveModalScore(undefined));
    dispatch(setScores({ score: 0, count: 0, scoreItem: 0 }));
  };

  let countStar = [];
  if (scores.count === 0) {
    countStar = [1, 1, 1];
  } else if (scores.count === 1) {
    countStar = [1, 1];
  } else if (scores.count === 2) {
    countStar = [1, 1, 1];
  }
  const { t } = useTranslation();
  return (
    <div className={cx('modal-scores')}>
      <span onClick={closeModal} className={cx('modal-scores__header')}>
        <img src={iconclose} alt="" />
      </span>
      <div style={{ backgroundImage: `url(${bgScores})` }} className={cx('wrapper-modal__scores')}>
        <div className={cx('header-modal__scores')}>
          <div className={cx('wrapper-list__star')}>
            {countStar !== undefined &&
              scores.count === 0 &&
              countStar.map((item, index) => {
                return <img className={index === 1 ? cx('star', 'mb') : cx('star')} key={index} src={star} alt="" />;
              })}
            {countStar !== undefined &&
              scores.count === 2 &&
              countStar.map((item, index) => {
                return <img className={index === 1 ? cx('star', 'mb') : cx('star')} key={index} src={nostar} alt="" />;
              })}

            {countStar !== undefined &&
              scores.count === 1 &&
              countStar.map((item, index) => {
                return <img className={index === 1 ? cx('star', 'mb') : cx('star')} key={index} src={star} alt="" />;
              })}
            {scores.count === 1 && <img className={cx('star')} src={nostar} alt="" />}
          </div>
        </div>

        <div className={cx('body-modal__scores')}>
          <span>
            {' '}
            {t('Point')} : <strong> {scores.scoreItem}</strong>
          </span>
        </div>

        <div className={cx('img-squirrelsuccess')}>
          {(scores.count === 0 || scores.count === 1) && <img className={cx('squirrelsuccess')} src={squirrelsuccess} alt="" />}
          {scores.count === 2 && <img className={cx('squirrelsuccess')} src={squirrelfail} alt="" />}
        </div>

        <div className={cx('footer-modal__scores')}>
          <button onClick={handleSuccess}>{t('Continue')}</button>
        </div>
      </div>
    </div>
  );
}

export default ModalScores;
