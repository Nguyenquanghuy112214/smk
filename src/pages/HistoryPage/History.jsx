import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import HeaderHistory from '~/Components/History/HeaderHistory';
import TopicList from '~/Components/History/Topic/TopicList';
import PopularGrid from '~/Components/History/Popular/PopularGrid';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const History = () => {
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
      <div className={cx('wrapper-header')}>
        <HeaderHistory />
      </div>
      <div className={cx('wrapper-body')}>
        <div className={cx('wrapper-list__topic')}>
          <TopicList />
        </div>
        <div className={cx('wrapper-list__popular')}>
          <PopularGrid title={t('Popularstories')} />
        </div>
      </div>
    </div>
  );
};

export default History;
