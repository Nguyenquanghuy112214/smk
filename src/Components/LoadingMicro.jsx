import classNames from 'classnames/bind';
import lottie from 'lottie-web';
import { useEffect } from 'react';
import { useRef } from 'react';
import animation from '../assets/animations/data.json';
import { motion } from 'framer-motion';
import styles from '~/sass/Components/_LoadingMicro.module.scss';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);
const LoadingMicro = ({ style, active, onClick }) => {
  const { t } = useTranslation();
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: active ? true : false,
      animationData: style || animation,
    });
  }, [active]);
  const classes = cx('wrapper-error', {});
  return (
    <motion.div style={{ cursor: 'pointer' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={classes}>
      <div onClick={() => onClick()} className={cx('animtion-error')} ref={container}></div>
    </motion.div>
  );
};

export default LoadingMicro;
