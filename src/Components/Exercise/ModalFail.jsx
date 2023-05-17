// import React from 'react';
// import classNames from 'classnames/bind';
// import styles from '~/sass/Components/_Excercies.module.scss';
// import { AiFillCloseCircle } from 'react-icons/ai';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import { setModalSuccess } from '~/Redux/ModalSuccess';
// import { setActiveModalScore } from '~/Redux/ActiveModalScore';
// import { setScores } from '~/Redux/Scores';
// import { setResetEx3 } from '~/Redux/ResetEx3';
// import fail from '~/assets/music/fail.mp3';
// import { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';

// const cx = classNames.bind(styles);

// function ModalFail({ count }) {
//   const dispatch = useDispatch();
//   const success = useSelector((state) => state.ModalSuccess.isActive);
//   const scores = useSelector((state) => state.Scores.scores);

//   useEffect(() => {
//     var audio = new Audio(fail);
//     audio.playbackRate = 1.4;
//     audio.play();
//   }, []);
//   let scoreItem;
//   if (count === 1) {
//     scoreItem = 6;
//   } else if (count === 2) {
//     scoreItem = 0;
//   }
//   const handleFail = () => {
//     dispatch(setResetEx3(true));
//     if (count === 1) {
//       dispatch(setScores({ ...scores, count: count, scoreItem: scoreItem }));
//     } else if (count === 2) {
//       dispatch(setActiveModalScore(true));
//       dispatch(setScores({ ...scores, count: count, scoreItem: scoreItem }));
//     }
//     dispatch(setModalSuccess(undefined));
//   };
//   const { t } = useTranslation();
//   return (
//     <AnimatePresence>
//       {success !== undefined && success === false ? (
//         <motion.div
//           initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
//           animate={{ x: !success ? 0 : 40, opacity: !success ? 1 : 0, visibility: !success ? 'visible' : 'hidden' }}
//           exit={{ scale: 0 }}
//           className={cx('wrapper-modal__lotify', 'fail')}
//         >
//           <div className={cx('header-modal__lotify')}>
//             <span className={cx('header-modal__lotify-icon')}>
//               <AiFillCloseCircle />
//             </span>
//             {t('Wrong')} !
//           </div>
//           <div className={cx('footer-modal__lotify')}>
//             <button onClick={handleFail}>{t('Skip')}</button>
//           </div>
//         </motion.div>
//       ) : (
//         <div>sai roi</div>
//       )}
//     </AnimatePresence>
//   );
// }

// export default ModalFail;

import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import { setActiveModalScore } from '~/Redux/ActiveModalScore';
import { setScores } from '~/Redux/Scores';
import { setResetEx3 } from '~/Redux/ResetEx3';
import fail from '~/assets/music/fail.mp3';
import { useEffect } from 'react';
import { setExcercises } from '~/Redux/ExerciesSlice';

const cx = classNames.bind(styles);

function ModalFail({ count }) {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.ModalSuccess.isActive);
  const scores = useSelector((state) => state.Scores.scores);
  const active = useSelector((state) => state.Excercies.isActive);

  useEffect(() => {
    var audio = new Audio(fail);
    audio.playbackRate = 1.4;
    audio.play();
  }, []);
  let scoreItem;
  if (count === 1) {
    scoreItem = 6;
  } else if (count === 2) {
    scoreItem = 0;
  }
  const handleFail = () => {
    dispatch(setResetEx3(true));
    if (count === 1) {
      dispatch(setScores({ ...scores, count: count, scoreItem: scoreItem }));
    } else if (count === 2) {
      dispatch(setActiveModalScore(true));
      dispatch(setScores({ ...scores, count: count, scoreItem: scoreItem }));
      // if (active >= 6) {
      //   dispatch(setExcercises(active + 1));
      // }
    }
    dispatch(setModalSuccess(undefined));
  };
  return (
    <AnimatePresence>
      {success !== undefined && success === false ? (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: !success ? 0 : 40, opacity: !success ? 1 : 0, visibility: !success ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('wrapper-modal__lotify', 'fail')}
        >
          <div className={cx('header-modal__lotify')}>
            <span className={cx('header-modal__lotify-icon')}>
              <AiFillCloseCircle />
            </span>
            Sai rồi !
          </div>
          <div className={cx('footer-modal__lotify')}>
            <button onClick={handleFail}>Bỏ qua</button>
          </div>
        </motion.div>
      ) : (
        <div>sai roi</div>
      )}
    </AnimatePresence>
  );
}

export default ModalFail;
