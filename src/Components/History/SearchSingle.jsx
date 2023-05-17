import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import { AiOutlineSearch } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

import bg_img from '~/assets/image/Music_History_Video/bg_header.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const SearchSingle = ({ active, data, search }) => {
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
          className={cx('wrapper-search__single')}
        >
          {data !== undefined &&
            data !== [] &&
            data.map((item, index) => {
              return (
                <div
                  onClick={() => handleClick(item)}
                  className={index % 2 === 0 ? cx('search-item__single', 'active') : cx('search-item__single')}
                  key={index}
                >
                  <span className={cx('search-namesong__single')}>{item.name}</span>
                  <span className={cx('search-nameauth__single')}>{` - ${t('Author')} :${item.author}`}</span>
                </div>
              );
            })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchSingle;
