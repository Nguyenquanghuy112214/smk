import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const Search = ({ active, data, search }) => {
  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate(`/historyrunsearchmain/${search}/${item.idstory}`);
  };
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ x: 0, opacity: 0, visibility: 'hidden' }}
          animate={{ x: active ? 0 : 40, opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('wrapper-search')}
        >
          {data !== undefined &&
            data !== [] &&
            data.map((item, index) => {
              return (
                <div
                  onClick={() => handleClick(item)}
                  className={index % 2 === 0 ? cx('search-item', 'active') : cx('search-item')}
                  key={index}
                >
                  <span className={cx('search-namesong')}>{item.name}</span>
                  <span className={cx('search-nameauth')}>{` - ${t('Author')} :${item.author}`}</span>
                </div>
              );
            })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Search;
