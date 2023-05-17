import { motion } from 'framer-motion';
import classNames from 'classnames/bind';
import styles from './_ModalDetailAlphaNumberSection.module.scss';
import { textContainer, textVariant2 } from '~/constant/motion';
const cx = classNames.bind(styles);

export const TypingText = ({ title }) => (
  <motion.p variants={textContainer} className={cx('title-helper')}>
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);
