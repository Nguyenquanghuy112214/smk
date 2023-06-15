import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import ProgressBar from '~/Components/LearningAndConversation/ProgressBar';
import imgHelp from '~/assets/image/exercies/help.png';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setExcercises } from '~/Redux/ExerciesSlice';
import { setModalExcercise } from '~/Redux/ModalExcercise';
import { removeListActive, setListActive } from '~/Redux/ListActiveExercise';
import * as GetSpeak from '~/services/GetSpeakByID';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import { setScores } from '~/Redux/Scores';
import { setActiveModalScore } from '~/Redux/ActiveModalScore';
import { setResetEx3 } from '~/Redux/ResetEx3';
import { setActiveEx5 } from '~/Redux/ActiveEx5';
import { setNextSingleSpeak } from '~/Redux/NextSingleSpeak';
import { setCountEx5 } from '~/Redux/CountEx5';
import { setActiveExerciseEnd } from '~/Redux/ActiveExerciseEnd';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import iconclose from '~/assets/image/iconclose.png';
import { setScoreExercise } from '~/Redux/TottalScoreExcercise';

const cx = classNames.bind(styles);

function WrapModalExcercies({ children, isActive, dataModal, onClick }) {
  const navigate = useNavigate();
  const { id, name, numberunit, idtopic } = useParams();
  const dispatch = useDispatch();

  const [help, setHelp] = useState();
  const [listAnswer, setListAnswer] = useState([]);

  const handleHelp = () => {
    setHelp(true);
  };

  const handleClose = () => {
    setHelp(false);
  };

  const closeModal = () => {
    navigate(`/exercise/${id}/1/undefined/undefined/${name}/${numberunit}/${idtopic}`);

    dispatch(setActiveExerciseEnd(undefined));
    dispatch(setCountEx5(0));
    dispatch(setNextSingleSpeak(undefined));
    dispatch(setActiveEx5(undefined));
    dispatch(setResetEx3(undefined));
    dispatch(setModalSuccess(undefined));
    dispatch(setExcercises(1));
    dispatch(setModalExcercise(false));
    dispatch(setScores(0));
    dispatch(setActiveModalScore(undefined));
    dispatch(setScores({ score: 0, count: 0, scoreItem: 0 }));
  };

  let tottal;
  tottal = 5 * 10 + (listAnswer !== undefined && listAnswer.length * 4 * 10);
  useEffect(() => {}, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetSpeak.getSpeak(dataModal.dataItem.idvocabulary);
      const response = res.data.map((item) => {
        return { ...item, active: undefined };
      });
      setListAnswer(response);
    };
    fetch();
  }, [dataModal]);

  useEffect(() => {
    dispatch(setScoreExercise(tottal));
  }, [tottal]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: isActive ? 0 : 40, opacity: isActive ? 1 : 0, visibility: isActive ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('modal-overlay')}
        >
          <ModalHelp onClick={handleClose} isActive={help}></ModalHelp>
          <div className={cx('wrapper-modal')}>
            <div onClick={closeModal} className={cx('close-modal')}>
              <img src={iconclose} alt="" />
            </div>
            <div className={cx('content')}>
              <div className={cx('header')}>
                <ProgressBar tottal={tottal} xl />
                <div onClick={handleHelp} className={cx('img-help')}>
                  <img src={imgHelp} alt="" />
                </div>
              </div>
              <div className={cx('excercies-total')}>{children}</div>
            </div>
            {/* <div className={cx('check')}>
              <button onClick={handleClick}>Kiểm tra</button>
            </div> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WrapModalExcercies;

export function ModalHelp({ isActive, onClick }) {
  const { t } = useTranslation();
  const closeModal = () => {
    onClick();
  };
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ scale: 0, visibility: 'hidden' }}
          animate={{ scale: isActive ? 1 : 0, visibility: isActive ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('modal-helper__overlay')}
        >
          <div className={cx('wrapper-helper')}>
            <h4>{t('Quicknavigationc')}</h4>
            <div className={cx('helper-body')}>
              <h4>{t('Tapthecard')}</h4>
              <span>{t('Checkifit')}</span>
            </div>
            <div className={cx('button-helper')}>
              <button onClick={closeModal}>OK</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
