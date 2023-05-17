import React from 'react';

import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import { FaCloudDownloadAlt } from 'react-icons/fa';

import moment from 'moment/moment';
import LoadingRobot from '~/Components/LoadingRobot';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const CoursewareSingle = ({ listData }) => {
  const handleClick = (item) => {
    window.open(item.link, '_ newtab');
  };
  const { t } = useTranslation();
  return (
    <>
      <div className={cx('wrapper-history__single')}>
        {listData !== undefined &&
          listData.length > 0 &&
          listData.map((item, index) => {
            return (
              <div onClick={() => handleClick(item)} key={index} className={cx('wrapper-itemvideocate__detail')}>
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
                    <span className={cx('date')}>
                      {t('Updateday')}: <strong>{moment(item.createDate).format('L')}</strong>
                    </span>
                    <div className={cx('itemvideocate__detail-view-download')}>
                      <span>
                        <FaCloudDownloadAlt />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {listData !== undefined && listData.length === 0 && <LoadingRobot title={t('Pleasetryagainlater')} sm />}
    </>
  );
};

export default CoursewareSingle;
