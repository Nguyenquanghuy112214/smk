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
import styles from './_ModalSpeakColor.module.scss';
import routes from '~/config/routes';
const cx = classNames.bind(styles);
function ModalSpeakColor({ active }, ref) {
  const navigate = useNavigate();
  const Random = useMemo(() => {
    return Math.floor(Math.random() * 24);
  }, []);
  const handleClick = (type, alpha) => {
    if (window.location.pathname === routes.listnumber) {
      navigate(`/detailnumber/${type}/${alpha}`);
    } else {
      navigate(`/detailalpha/${type}/${alpha}`);
    }
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
          className={cx('wrapper')}
        >
          <div className={cx('wrapper-mainalpha')}>
            <img src={mainalpha} alt="" />
          </div>
          <div className={cx('cloud')}>
            <div className={cx('wrapper-img')}>
              <Tippy placement="bottom" animation="scale" content="Phát âm">
                <img src={speak} alt="" />
              </Tippy>

              <Tippy placement="bottom" animation="scale" content="Ghi âm">
                <img onClick={() => handleClick(0, 'D')} src={record} alt="" />
              </Tippy>
              <Tippy placement="bottom" animation="scale" content="Khẩu hình">
                <img onClick={() => handleClick(1, 'H')} src={kh} alt="" />
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

export default forwardRef(ModalSpeakColor);
