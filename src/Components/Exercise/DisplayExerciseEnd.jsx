import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import bgScores from '~/assets/image/exercies/bgScores.png';
import medal from '~/assets/image/exercies/medal.png';
import laurelwreath from '~/assets/image/exercies/laurelwreath.png';
import process from '~/assets/image/exercies/process.png';
import exerciseend from '~/assets/image/exercies/exerciseend.png';

import { useDispatch, useSelector } from 'react-redux';
import { setModalExcercise } from '~/Redux/ModalExcercise';
import { setActiveExerciseEnd } from '~/Redux/ActiveExerciseEnd';
import { setCountEx5 } from '~/Redux/CountEx5';
import { setNextSingleSpeak } from '~/Redux/NextSingleSpeak';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import { setExcercises } from '~/Redux/ExerciesSlice';
import { setScores } from '~/Redux/Scores';
import { setActiveModalScore } from '~/Redux/ActiveModalScore';
import { useTranslation } from 'react-i18next';
import * as UpdateExerciseData from '~/services/UpdateExerciseData';
import { useParams } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { useCourse } from '~/hooks/useCourse';
import * as CreateScore from '~/services/CreateScore';
import * as CreateContentHistory from '~/services/CreateContentHistory';

const cx = classNames.bind(styles);

const DisplayExerciseEnd = () => {
  const { course } = useCourse();
  const { auth } = useAuth();
  const { idvoca, namevoca } = useParams();
  console.log('namevoca', namevoca);
  const { t } = useTranslation();
  const scores = useSelector((state) => state.Scores);
  const scoresTotal = useSelector((state) => state.scoreExercise.score);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setModalExcercise(false));
    dispatch(setModalExcercise(false));
    dispatch(setActiveExerciseEnd(undefined));
    dispatch(setActiveModalScore(undefined));
    dispatch(setNextSingleSpeak(undefined));
    dispatch(setModalSuccess(undefined));
    dispatch(setExcercises(1));
    dispatch(setCountEx5(0));
    dispatch(setScores(0));
    dispatch(setScores({ score: 0, count: 0, scoreItem: 0 }));
    const fetch = async () => {
      const [res] = await Promise.all([
        UpdateExerciseData.updateExerciseData(
          {
            vocabularyID: idvoca,
          },
          { headers: { Authorization: `Bearer ${auth.token}` } },
          course,
          2
        ),
      ]);
    };

    if ((scoresTotal / 100) * scores.scores.score >= 80) {
      fetch();
    } else {
    }
    const fetch2 = async () => {
      const [res, res1] = await Promise.all([
        CreateScore.createScore(
          { UserId: auth.userID, Score: scores.scores.score },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        ),
        CreateContentHistory.createContentHistory(
          {
            ContentHistory: `Bài tập với từ vựng "${namevoca.toUpperCase()}"`,
            Ratings: `${scores.scores.score} Điểm`,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        ),
      ]);
    };
    fetch2();
  };
  return (
    <div className={cx('modal-scores')}>
      <div style={{ backgroundImage: `url(${bgScores})` }} className={cx('wrapper-modal__scores-end')}>
        <span className={cx('title')}>{t('Completethelesson')}</span>

        <div className={cx('body-modal__scores')}>
          <div className={cx('wrapper-mainexend')}>
            <button className={cx('evaluate')}>{t('Perfect')} !</button>
            <div className={cx('body-modal__scores__left')}>
              <span>
                {t('Point')} : <strong> {scores.scores.score}</strong>
              </span>
            </div>
            <div className={cx('body-modal__scores__right')}>
              <div className={cx('list-img')}>
                <img className={cx('img-item__exend')} src={process} alt="" />
                <img className={cx('img-item__exend')} src={laurelwreath} alt="" />
                <img className={cx('img-item__exend')} src={medal} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={cx('img-main__exend')}>
          <img src={exerciseend} alt="" />
        </div>

        <div className={cx('footer-modal__scores')}>
          <button onClick={handleClick}>{t('Continue')}</button>
        </div>
      </div>
    </div>
  );
};

export default DisplayExerciseEnd;
