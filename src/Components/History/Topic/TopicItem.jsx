import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';
import family from '~/assets/image/exercies/family.png';

const cx = classNames.bind(styles);
const TopicItem = ({ onClick, data, index }) => {
  const [img, setImg] = useState(undefined);
  const selectedTopic = () => {
    onClick();
  };
  if (!data) return;
  else
    return (
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0, transition: { delay: index * 0.2 } }}
        onClick={selectedTopic}
        className={cx('wrapper-topic')}
      >
        <img   onError={() => {
            setImg(family);
          }} className={cx('img-topic')} src={img===undefined ? data.thumbnail:img} alt="" />
        <span className={cx('name-topic')}>{data.nameVn}</span>
      </motion.div>
    );
};

export default TopicItem;
