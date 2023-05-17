import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import fail from '~/assets/music/fail.mp3';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function ModalFail({ success, onClick, sm }) {
  useEffect(() => {
    var audio = new Audio(fail);
    audio.playbackRate = 1.4;
    audio.play();
  }, []);
  return (
    <AnimatePresence>
      {success !== undefined && success === false && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: !success ? 0 : 40, opacity: !success ? 1 : 0, visibility: !success ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          style={sm ? { left: '2%', width: '96%', bottom: '11%', zIndex: 10 } : ''}
          className={cx('wrapper-modal__lotify', 'fail')}
        >
          <div className={cx('header-modal__lotify')}>
            <span className={cx('header-modal__lotify-icon')}>
              <AiFillCloseCircle />
            </span>
            Sai rồi !
          </div>
          <div className={cx('footer-modal__lotify')}>
            <button onClick={() => onClick()}>Bỏ qua</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalFail;
