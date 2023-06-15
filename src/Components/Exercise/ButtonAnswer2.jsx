import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import styles from '~/sass/Components/_Excercies.module.scss';

const cx = classNames.bind(styles);

function ButtonAnswer({ active, delay, onClick, data, selected }) {
  const item = {
    hidden: {
      opacity: 0,
      scale: 1,
    },
    show: {
      opacity: 1,
      scale: [0.8, 1],

      transition: {
        duration: 0.1,
        delay: delay * 0.1,
      },
    },
  };
  if (!data) return;
  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      className={!active ? cx('wrapper-buttonanswer') : cx('wrapper-buttonanswer', 'active')}
    >
      <div className={cx('buttonanswer__img')}>
        <img onClick={() => onClick()} src={`https://resourcesk.bkt.net.vn/ImagesPNG/${data.name}.png`} alt="" />
        <span className={cx('buttonanswer__voca')}>{data.name}</span>
      </div>
    </motion.div>
  );
}

export default ButtonAnswer;
