import classNames from 'classnames/bind';
import styles from '~/sass/Components/_GrammarVocabulary.module.scss';
import { useDispatch } from 'react-redux';
import { setModalVocaPage } from '~/Redux/OpenModalVocaPage';
import { setDataDetailVoca } from '~/Redux/PushDetaiVoca';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function ButtonVocabulary({
  alphabet,
  activeOnClick,
  activeDefault,
  dataDetailVoca,
  activeSearch,
  indexTopic,
  title,
  index,
  xl,
  xxl,
  marque,
  height,
  onClick,
  onClickSearch,
  delay,
  onClick2,
}) {
  const { type } = useParams();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    onClick();
  };

  const openModalVoca = (dataDetailVoca) => {
    window.scrollTo(0, 0);
    if (!dataDetailVoca) {
      onClickSearch();
    } else if (dataDetailVoca) {
      dispatch(setModalVocaPage(true));
      dispatch(setDataDetailVoca(dataDetailVoca.idvocabulary));
    }
    onClick2();
  };

  const item = {
    hidden: {
      opacity: 0,
      scale: 1,
    },
    show: {
      opacity: 1,
      scale: [1.2, 1],

      transition: {
        duration: 0.1,
        delay: delay * 0.1,
      },
    },
  };

  let isDisable;
  if (indexTopic !== undefined && indexTopic) {
    isDisable = false;
  } else {
    isDisable = true;
  }

  const classes = cx('button', { xl, xxl, height, activeDefault, activeOnClick, activeSearch, indexTopic });
  const classes1 = cx('button', { xl, xxl, height, activeOnClick, activeSearch, indexTopic });

  if (marque && type !== 'main') {
    return (
      <button disabled={isDisable} onClick={(e) => handleClick(e)} className={classes1}>
        {title}
      </button>
    );
  } else if (marque && type === 'main') {
    return (
      <button onClick={(e) => handleClick(e)} className={classes}>
        {title}
      </button>
    );
  } else {
    return (
      <motion.button onClick={() => openModalVoca(dataDetailVoca)} className={classes} variants={item} initial="hidden" animate="show">
        {title}
      </motion.button>
    );
  }
}

export default ButtonVocabulary;
