import React from 'react';
import imgback from '~/assets/image/AlphaPage/back.png';
import imgstart from '~/assets/image/AlphaPage/start.png';
import bggirl from '~/assets/image/AlphaPage/bggirl.png';
import a from '~/assets/image/AlphaPage/a.png';
import b from '~/assets/image/AlphaPage/b.png';
import c from '~/assets/image/AlphaPage/c.png';

import { motion } from 'framer-motion';
import { dropAlpha, planetVariants, staggerContainer } from '~/constant/motion';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import classNames from 'classnames/bind';
import styles from './_AlphaStartPage.module.scss';
const cx = classNames.bind(styles);
function AlphaStartPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(routes.homepage);
  };
  const handleStart = () => {
    navigate(routes.listalpha);
  };
  return (
    <div className={cx('wrapper')}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={cx('bg-girl')}
      >
        <img className={cx('img-bg')} src={bggirl} alt="" />
        <motion.img variants={planetVariants('left')} className={cx('img-a')} src={a} alt="" />
        <motion.img variants={dropAlpha('left', 1, 0.58)} className={cx('img-b')} src={b} alt="" />
        <motion.img variants={dropAlpha('left', 1.5, 0.65)} className={cx('img-c')} src={c} alt="" />
      </motion.div>
      <div className={cx('img-back')}>
        <img onClick={handleBack} src={imgback} alt="Back" />
      </div>
      <div className={cx('img-start')}>
        <img onClick={handleStart} src={imgstart} alt="Start" />
      </div>
    </div>
  );
}

export default AlphaStartPage;
