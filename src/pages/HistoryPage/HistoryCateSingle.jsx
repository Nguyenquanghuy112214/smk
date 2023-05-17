import React from 'react';

import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import { AiFillEye } from 'react-icons/ai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);
const HistoryCateSingle = ({ listData, idcate }) => {
  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate(`/historyrun/${idcate}/${item.idstory}`);
  };
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper-history__single')}>
      {listData !== undefined ? (
        listData.map((item, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.2 } }}
              onClick={() => handleClick(item)}
              key={index}
              className={cx('wrapper-itemvideocate__detail')}
            >
              <span className={cx('itemvideocate-title')}>{item.name}</span>
              <div className={cx('itemvideocate__detail')}>
                <img className={cx('img-itemvideocate__detail')} src={item.thumbnail} alt="" />
                <div className={cx('itemvideocate__detail-content')}>
                  <span className={cx('teacher')}>
                    {t('Author')}: <strong>{item.author}</strong>
                  </span>
                  <span className={cx('time')}>
                    {t('Capacity')}: <strong>hello</strong>
                  </span>
                  <div className={cx('itemvideocate__detail-view')}>
                    <span>
                      <AiFillEye />
                    </span>
                    {` ${item.numberOfViews} ${t('Views')}`}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })
      ) : (
        <div>{t('Pleasechooseastory')}</div>
      )}
    </div>
  );
};

export default HistoryCateSingle;
