import classNames from 'classnames/bind';
import styles from './AnimationLoading.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const cx = classNames.bind(styles);
function Loading({ active, opa }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          initial={{ opacity: opa ? opa : 1 }}
          animate={{
            opacity: active ? (opa ? opa : 1) : 0,
          }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className={cx('modal')}
        >
          <div className={cx('loading')}>
            <div className={cx('lds-spinner')}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </motion.div>
      ) : (
        ''
      )}
    </AnimatePresence>
  );
}

export default Loading;
