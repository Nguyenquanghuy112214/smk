import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import HeaderMusic from '~/Components/Music/HeaderMusic';
import TopicList from '~/Components/Music/Topic/TopicList';
import PopularGrid from '~/Components/Music/Popular/PopularGrid';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const WrapperMusic_Story_Video = () => {
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
      <div className={cx('wrapper-header')}>
        <HeaderMusic />
      </div>
      <div className={cx('wrapper-body')}>
        <div className={cx('wrapper-list__topic')}>
          <TopicList />
        </div>
        <div className={cx('wrapper-list__popular')}>
          <PopularGrid title={t('Popularsong')} />
        </div>
      </div>
    </div>
  );
};

export default WrapperMusic_Story_Video;
