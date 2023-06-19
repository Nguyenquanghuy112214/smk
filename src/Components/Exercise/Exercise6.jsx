import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListActive } from '~/Redux/ListActiveExercise';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingRobot from '../LoadingRobot';
import micro from '~/assets/animations/micro.json';
import { useRecorder } from '~/hooks/useRecorder';
import Loading from '../animationloading/Animationloading';
const cx = classNames.bind(styles);

function Excercise6({ dataModal }) {
  const dispatch = useDispatch();
  const { startRec, endRec, translate, loadingMicro } = useRecorder();
  const [activeMicro, setActiveMicro] = useState(false);

  const openMicro = () => {
    setActiveMicro(true);
    startRec();
    const timer = setTimeout(() => {
      endRec();
      setActiveMicro(false);
    }, 4000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    let name = dataModal !== undefined && dataModal.dataItem !== undefined && dataModal.dataItem.name;
    let tran = translate;
    if (tran !== undefined && tran.toLowerCase().slice(0, -1) === name.toLowerCase()) {
      dispatch(setListActive({ active6: true }));
    } else {
      dispatch(setListActive({ active6: false }));
    }
  }, [translate]);

  return (
    <div className={cx('pronounce')}>
      <Loading active={loadingMicro} opa={0.2} />
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
              <LoadingRobot style={micro} title="" ex6 active={activeMicro} />
            </motion.div>
          ) : (
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LoadingRobot onClick={openMicro} style={micro} title="" ex6 />
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className={cx('answer-micro')}>{translate?.slice(0, -1)}</div>
    </div>
  );
}

export default Excercise6;
