import classNames from 'classnames/bind';
import styles from '~/sass/Components/_RankItem.module.scss';

import avatar from '~/assets/image/avatar.jpg';
import diamon from '~/assets/image/section/diamon.png';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);
function RankItem({ top1, top2, top3, delay, data, index }) {
  const classes = cx('wrapper', { top1, top2, top3 });

  const variable = {
    hidden: {
      opacity: 0,
      scale: 1,
    },
    show: {
      opacity: 1,
      scale: [1.2, 1],

      transition: {
        staggerChildren: 0.8,
        duration: 0.1,
        delay: delay * 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      scale: 1,
      rotate: '0deg',
    },
    show: {
      opacity: 1,
      scale: [1.6, 1, 1.4, 1],
      rotate: '360deg',

      transition: {
        duration: 0.6 * delay,
        // delay: delay * 0.1,
      },
    },
  };
  return (
    <motion.div className={classes} variants={variable} initial={index < 20 ? 'hidden' : ''} animate={index < 20 ? 'show' : ''}>
      <div className={cx('profile')}>
        <span className={cx('ranking')}>{index + 1}</span>
        <motion.img variants={item} src={data !== undefined && data.thumbnail} alt="" />
        <span className={cx('name')}>{data !== undefined && data.fullName}</span>
      </div>
      <div className={cx('point')}>
        <img src={diamon} alt="" />
        <span>{data !== undefined && data.score}</span>
      </div>
    </motion.div>
  );
}

export default RankItem;
