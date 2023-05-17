import React from 'react';
import mainalpha from '~/assets/image/AlphaPage/mainalpha.png';
import kh from '~/assets/image/AlphaPage/kh.png';
import record from '~/assets/image/AlphaPage/record.png';
import speak from '~/assets/image/AlphaPage/speak.png';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { imgRandom } from '~/pages/BingoGame/ImgRandom';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { zoomIn50 } from '~/constant/motion';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './_ModalSpeakAlphaNumber.module.scss';
import routes from '~/config/routes';
import { useEffect } from 'react';
import { resourceAutio } from '~/constant/resourceAudio';
const cx = classNames.bind(styles);
function ModalSpeakAlphaNumber({ active, color, dataActive }, ref) {
  const navigate = useNavigate();
  console.log('dataActive', dataActive);
  const Random = useMemo(() => {
    return Math.floor(Math.random() * 24);
  }, [dataActive]);
  const handleClick = (type, alpha, idalpha) => {
    if (window.location.pathname === routes.listnumber) {
      navigate(`/detailnumber/${type}/${alpha}/${idalpha}`);
    } else if (window.location.pathname === routes.listalpha) {
      navigate(`/detailalpha/${type}/${alpha}/${idalpha}`);
    } else {
      navigate(`/detailcolor/${type}/${alpha}/${idalpha}`);
    }
  };
  const audio = useMemo(() => {
    return new Audio(dataActive !== undefined && dataActive.audio !== undefined && dataActive.audio);
  }, [dataActive]);
  useEffect(() => {
    const timmer = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }, [500]);
    return () => clearTimeout(timmer);
  }, [audio]);
  const handleSpeak = () => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          ref={ref}
          variants={zoomIn50(0.1, 0.5)}
          initial="hidden"
          whileInView="show"
          exit="exit"
          viewport={{ once: false, amount: 0.25 }}
          className={cx('wrapper', `${color ? 'color' : ''}`)}
        >
          <div className={cx('wrapper-mainalpha')}>
            <img className={cx('img1')} src={mainalpha} alt="" />
            <img className={cx('img2')} src={dataActive.thumbnail} alt="" />
          </div>
          <div className={cx('cloud')}>
            <div className={cx('wrapper-img')}>
              <Tippy placement="bottom" animation="scale" content="Phát âm">
                <img onClick={handleSpeak} src={speak} alt="" />
              </Tippy>

              <Tippy placement="bottom" animation="scale" content="Ghi âm">
                <img onClick={() => handleClick(0, dataActive.name, dataActive.id)} src={record} alt="" />
              </Tippy>
              <Tippy placement="bottom" animation="scale" content="Khẩu hình">
                <img onClick={() => handleClick(1, dataActive.name, dataActive.id)} src={kh} alt="" />
              </Tippy>
            </div>
          </div>
          <div className={cx('nv')}>
            <img src={imgRandom[Random].img} alt="222" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default forwardRef(ModalSpeakAlphaNumber);
