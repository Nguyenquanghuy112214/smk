import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import family from '~/assets/image/exercies/family.png'
import { useState } from 'react';

const cx = classNames.bind(styles);
const TopicItem = ({ onClick, data, index }) => {
  const [img,setImg]= useState()
  const selectedTopic = () => {
    onClick();
  };
  if (!data) return;
  else
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: index * 0.2 } }}
        onClick={selectedTopic}
        className={cx('wrapper-topic')}
      >
        <img onError={() =>setImg(family)} className={cx('img-topic')} src={img ===undefined ? data.thumbnail:img} alt="" />
        <span className={cx('name-topic')}>{data.name}</span>
      </motion.div>
    );
};

export default TopicItem;
