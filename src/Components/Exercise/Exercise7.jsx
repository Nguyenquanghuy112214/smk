import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import micro from '~/assets/animations/micro.json';

import { useEffect, useState } from 'react';
import { setListActive } from '~/Redux/ListActiveExercise';
import { useDispatch, useSelector } from 'react-redux';
import ModalFail from './ModalFail';
import ModalSuccess from './ModalSuccess';
import ModalScores from './ModalScores';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingRobot from '../LoadingRobot';
import { useTranslation } from 'react-i18next';
import { useRecorder } from '~/hooks/useRecorder';

const cx = classNames.bind(styles);

function Excercise7({ dataModal }) {
  const { t } = useTranslation();
  const { startRec, endRec, translate } = useRecorder();

  const success = useSelector((state) => state.ModalSuccess.isActive);
  const activeModalScore = useSelector((state) => state.ActiveModalScore.isActive);
  const listActive = useSelector((state) => state.ListActive);
  const [activeMicro, setActiveMicro] = useState(false);

  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const openMicro = () => {
    startRec();
    setActiveMicro(true);
    setTimeout(() => {
      endRec();
      setActiveMicro(false);
    }, 3000);
  };

  useEffect(() => {
    let name = dataModal !== undefined && dataModal.dataItem !== undefined && dataModal.dataItem.name;
    let tran = translate;
    if (tran !== undefined && tran.toLowerCase().slice(0, -1) === name.toLowerCase()) {
      dispatch(setListActive({ active7: true }));
    } else {
      dispatch(setListActive({ active7: false }));
    }
  }, [translate]);

  const handleClick = () => {
    if (listActive !== undefined && listActive[0] !== undefined && listActive[0].active7 === true) {
      dispatch(setModalSuccess(true));
    } else {
      if (count < 2) {
        setCount(count + 1);
        dispatch(setModalSuccess(false));
      }
    }
  };

  return (
    <div className={cx('exercies')}>
      {success === false && <ModalFail count={count} />}
      {success === true && <ModalSuccess count={count} />}
      {activeModalScore === true && <ModalScores />}

      <div className={cx('excercies-header')}>
        <span>{t('Pronouncelearnedvocabulary')}</span>
      </div>
      <div className={cx('pronounce')}>
        <h3>{dataModal !== undefined && dataModal.dataItem !== undefined && dataModal.dataItem.name}</h3>
        <div className={cx('pronounce-img')}>
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
