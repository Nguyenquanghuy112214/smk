import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import HeaderMusic from '~/Components/Music/HeaderMusic';
import TopicList from '~/Components/Music/Topic/TopicList';
import PopularGrid from '~/Components/Music/Popular/PopularGrid';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as GetSongByCate from '~/services/GetSongByCate';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const WrapperMusic_Story_Video = () => {
  const { id } = useParams();
  const { name } = useParams();

  const [listData, setListData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await GetSongByCate.getSongByCate(id);
      setListData([...res]);
    };
    fetch();
  }, [id]);
  const { t } = useTranslation();
  if (!listData) return;
  else
    return (
      <div className={cx('wrapper')}>
        <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
        <div className={cx('wrapper-header')}>
          <HeaderMusic />
        </div>
        <div className={cx('wrapper-body')}>
          <div className={cx('wrapper-list__popular')}>
            <PopularGrid listData={listData} title={`${t('Topic')}: ${name}`} />
          </div>
        </div>
      </div>
    );
};

export default WrapperMusic_Story_Video;
