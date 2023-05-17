import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LearningAndConversationPage.module.scss';

import ProgressBar from '~/Components/LearningAndConversation/ProgressBar';
import { motion } from 'framer-motion';
import family from '~/assets/image/exercies/family.png';
import { useState } from 'react';


const cx = classNames.bind(styles);

function Learning({ active, title, onClick, img, conversation, delay }) {
  const[imgDef,setImgDef] = useState()
  const handleClick = () => {
    onClick();
  };

  const item = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        delay: delay * 0.2,
      },
    },
  };
  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      onClick={handleClick}
      className={active ? cx('button-select', 'active') : cx('button-select')}
    >
      <div className={cx('button-select__left')}>
        <img onError={() => setImgDef(family)} src={imgDef ===undefined ? img : imgDef} alt="" />
        <h4 className={cx('title')}>{title}</h4>
      </div>
      {conversation && <ProgressBar />}
    </motion.div>
  );
}

export default Learning;
