import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import micro from '~/assets/animations/micro.json';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import * as GetSpeak from '~/services/GetSpeakByID';

import { setExcercises } from '~/Redux/ExerciesSlice';
import { removeListActive } from '~/Redux/ListActiveExercise';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import { setActiveEx5 } from '~/Redux/ActiveEx5';
import { setNextSingleSpeak } from '~/Redux/NextSingleSpeak';
import { setCountEx5 } from '~/Redux/CountEx5';
import ModalFail from './ModalFail';
import ModalSuccess from './ModalSuccess';
import ModalScores from './ModalScores';
import RengReng from '../Rengreng/RengReng';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingRobot from '../LoadingRobot';
import { useTranslation } from 'react-i18next';
import { useRecorder } from '~/hooks/useRecorder';

const cx = classNames.bind(styles);

function Excercise7({ dataModal }) {
  const { t } = useTranslation();
  const { startRec, endRec, translate } = useRecorder();

  const dispatch = useDispatch();
  const [listAnswer, setListAnswer] = useState([]);
  const active = useSelector((state) => state.Excercies.isActive);
  const countEx5 = useSelector((state) => state.CountEx5.count);
  const success = useSelector((state) => state.ModalSuccess.isActive);
  const activeModalScore = useSelector((state) => state.ActiveModalScore.isActive);
  const nextSingleSpeak = useSelector((state) => state.NextSingleSpeak.isNext);
  const [activeMicro, setActiveMicro] = useState(false);

  const [data, setData] = useState([]);
  const [exactly, setExactly] = useState({});
  const [singleSpeak, setSingleSpeak] = useState([]);
  const [countSingleEnd, setCountSingleEnd] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetSpeak.getSpeak(dataModal.dataItem.idvocabulary);
      const respone = res.data.map((item) => {
        return { ...item, active: undefined };
      });
      setListAnswer(respone);
    };
    fetch();
  }, [dataModal]);

  useEffect(() => {
    dispatch(setActiveEx5(false));
    let firstAnswer = '';
    let tran = '';
    tran = tran + translate;

    const checkFirstAnswer = listAnswer.find((x) => x.active === undefined);
    setSingleSpeak(checkFirstAnswer);
    let checkAnswer = checkFirstAnswer !== undefined && checkFirstAnswer.sampleEn;
    firstAnswer = firstAnswer + checkAnswer;

    if (firstAnswer.toLowerCase().split(' ').join('') === tran.toLowerCase().slice(0, -1).split(' ').join('')) {
      setExactly({ exact: true, check: checkFirstAnswer !== undefined && checkFirstAnswer.id });
    } else {
      setExactly({ exact: false, check: checkFirstAnswer !== undefined && checkFirstAnswer.id });
    }
  }, [listAnswer, data, translate]);

  // Fn kiểm tra nếu đúng hết thì next sang bài tập tiếp theo
  useLayoutEffect(() => {
    if (exactly.exact === true && listAnswer !== undefined && listAnswer.length === 0) {
      dispatch(setActiveEx5(undefined));
      const post = () => Promise.all[(dispatch(setExcercises(active + 1)), dispatch(removeListActive()))];
      post();
    } else if (exactly.exact === false && countSingleEnd === 2) {
      dispatch(setActiveEx5(undefined));
      const post = () => Promise.all[(dispatch(setExcercises(active + 1)), dispatch(removeListActive()))];
      post();
    }
  }, [listAnswer]);

  const handleClick = () => {
    if (exactly.exact === true && listAnswer.find((x) => x.active === undefined)) {
      if (listAnswer.length > 1) {
        dispatch(setModalSuccess(true));
        dispatch(setActiveEx5(true));
      } else if (listAnswer.length === 1) {
        dispatch(setModalSuccess(true));
        dispatch(setActiveEx5(null));
      }
      // note test
      dispatch(setNextSingleSpeak(undefined));
    } else if (exactly.exact === false && listAnswer.find((x) => x.active === undefined && listAnswer.length > 1)) {
      if (countEx5 < 1) {
        dispatch(setActiveEx5(true));
        dispatch(setCountEx5(countEx5 + 1));
        setData([]);
        dispatch(setModalSuccess(false));
      } else if (countEx5 === 1) {
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setActiveEx5(true));

        // note test
        dispatch(setNextSingleSpeak(undefined));
        //

        dispatch(setModalSuccess(false));
      }

      setData([]);
    } else if (exactly.exact === false && listAnswer !== undefined && listAnswer.length === 1) {
      if (countEx5 < 1) {
        dispatch(setActiveEx5(null));
        setCountSingleEnd(countSingleEnd + 1);
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setModalSuccess(false));
        setData([]);
      } else if (countSingleEnd === 1) {
        dispatch(setActiveEx5(null));
        setCountSingleEnd(countSingleEnd + 1);
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setModalSuccess(false));

        // note test
        dispatch(setNextSingleSpeak(undefined));
        //
      }
    }
  };

  // test nextsingleSpeak
  useEffect(() => {
    if (nextSingleSpeak === true) {
      const eliminate = listAnswer.filter((x) => x.id !== exactly.check);
      setListAnswer(eliminate);
      setData([]);
    }
  }, [nextSingleSpeak]);

  const openMicro = () => {
    startRec();
    setActiveMicro(true);
    setTimeout(() => {
      endRec();
      setActiveMicro(false);
    }, 3000);
  };
  return (
    <div className={cx('exercies')}>
      {success === false && <ModalFail count={countEx5} />}
      {success === true && <ModalSuccess count={countEx5} />}
      {activeModalScore === true && <ModalScores />}
      <div className={cx('excercies-header')}>
        <span>{t('Pronouncelearnedvocabulary')}</span>
      </div>
      <div className={cx('pronounce')}>
        <h3 style={{ margin: '10px 0' }}>{singleSpeak !== undefined && singleSpeak.sampleEn !== undefined && singleSpeak.sampleEn}</h3>
        <span>{`"${singleSpeak !== undefined && singleSpeak.sampleVn !== undefined && singleSpeak.sampleVn}"`}</span>
        <div onClick={openMicro} className={cx('pronounce-img')}>
          <AnimatePresence>
            {activeMicro ? (
              <motion.div
                initial={{ opacity: 0, visibility: 'hidden' }}
                animate={{ opacity: activeMicro ? 1 : 0, visibility: activeMicro ? 'visible' : 'hidden' }}
                exit={{ opacity: 0 }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <LoadingRobot style={micro} title="" ex7 active={activeMicro} />
              </motion.div>
            ) : (
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LoadingRobot onClick={openMicro} style={micro} title="" ex7 />
              </div>
            )}
          </AnimatePresence>
        </div>
        <div className={cx('answer-micro')}>{translate}</div>
      </div>
      <div className={cx('check')}>
        <button onClick={handleClick}>{t('Check')}</button>
      </div>
    </div>
  );
}

export default Excercise7;
