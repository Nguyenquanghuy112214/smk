import React from 'react';
import imgback from '~/assets/image/AlphaPage/back.png';
import imgstart from '~/assets/image/AlphaPage/start.png';
import book from '~/assets/image/NumberPage/book.png';
import bgnumber from '~/assets/image/NumberPage/bgnumber.png';
import { motion } from 'framer-motion';
import { dropAlpha, dropAlpha2, planetVariants, staggerContainer, zoomIn, zoomandRotate } from '~/constant/motion';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import classNames from 'classnames/bind';
import styles from './_NumberStartPage.module.scss';
const cx = classNames.bind(styles);
function NumberStartPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(routes.homepage);
  };
  const handleStart = () => {
    navigate(routes.listnumber);
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
        <motion.img variants={zoomIn(0.2, 0.5)} className={cx('img-bg')} src={book} alt="" />
        <motion.img variants={dropAlpha2('left', 1, 0.48)} className={cx('img-a')} src={bgnumber} alt="" />
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

export default NumberStartPage;
