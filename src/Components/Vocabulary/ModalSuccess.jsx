import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_VocabularyAndExcercies.module.scss';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useEffect } from 'react';
import successSound from '~/assets/music/success.mp3';

const cx = classNames.bind(styles);

const ModalSuccess = ({ success, onClick, sm }) => {
  useEffect(() => {
    var audio = new Audio(successSound);
    audio.play();
    audio.playbackRate = 3;
  }, []);
  return (
    <AnimatePresence>
      {success !== undefined && success === true && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: success ? 0 : 40, opacity: success ? 1 : 0, visibility: success ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          style={sm ? { left: '2%', width: '96%', bottom: '11%', zIndex: 10 } : ''}
          className={cx('wrapper-modal__lotify', 'success')}
        >
          <div className={cx('header-modal__lotify')}>
            <span>
              <BsFillCheckCircleFill />
            </span>
            Đúng rồi !
          </div>
          <div className={cx('footer-modal__lotify')}>
            <button onClick={() => onClick()}>Tiếp tục</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalSuccess;
