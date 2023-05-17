import React from 'react';
import imgback from '~/assets/image/AlphaPage/back.png';
import imgstart from '~/assets/image/AlphaPage/start.png';
import img1 from '~/assets/image/ColorPage/img1.png';
import img2 from '~/assets/image/ColorPage/img2.png';
import img3 from '~/assets/image/ColorPage/img3.png';
import img4 from '~/assets/image/ColorPage/img4.png';
import img5 from '~/assets/image/ColorPage/img5.png';
import nv from '~/assets/image/ColorPage/nv.png';
import tham from '~/assets/image/ColorPage/tham.png';

import { motion } from 'framer-motion';
import { dropAlpha, moveDetail, planetVariants, staggerContainer } from '~/constant/motion';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import classNames from 'classnames/bind';
import styles from './_ColorStartPage.module.scss';
const cx = classNames.bind(styles);
function ColorStartPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(routes.homepage);
  };
  const handleStart = () => {
    navigate(routes.listcolor);
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
        <img className={cx('img-bg')} src={nv} alt="" />
        <motion.img variants={dropAlpha('left', 1, 0.48)} className={cx('img-a')} src={img1} alt="" />
        <motion.img variants={dropAlpha('left', 1.3, 0.48)} className={cx('img-b')} src={img2} alt="" />
        <motion.img variants={dropAlpha('left', 1.5, 0.45)} className={cx('img-c')} src={img3} alt="" />
        <motion.img variants={dropAlpha('left', 1.4, 0.45)} className={cx('img-d')} src={img4} alt="" />
        <motion.img variants={dropAlpha('left', 0.7, 0.45)} className={cx('img-e')} src={img5} alt="" />
        <motion.img variants={moveDetail()} className={cx('img-f')} src={tham} alt="" />
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

export default ColorStartPage;
