import classNames from 'classnames/bind';
import lottie from 'lottie-web';
import { useEffect } from 'react';
import { useRef } from 'react';
import animation from '../assets/animations/data.json';
import { motion } from 'framer-motion';
import styles from '~/sass/Components/_LearningAndConversationPage.module.scss';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);
const LoadingRobot = ({ title, sm, ssm, style, ex6, ex7, notext, active, onClick, px }) => {
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
  const classes = cx('wrapper-error', {
    sm,
    ssm,
    ex6,
    ex7,
    px,
  });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={classes}>
      {!notext && <div className={cx('text-error')}>{`${ssm ? t('Pleasechooseanotherkeyword') : title}`}</div>}
      <div
        onClick={() => onClick()}
        className={cx('animtion-error', `${sm ? 'animtion-error__sm' : `${ssm ? 'animtion-error__ssm' : ''}`}`)}
        ref={container}
      ></div>
    </motion.div>
  );
};

export default LoadingRobot;
