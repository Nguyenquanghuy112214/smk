import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import TopicItem from './TopicItem';

import { useState, useEffect } from 'react';
import * as GetAllTopicSong from '~/services/GetAllTopicSong';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const TopicList = () => {
  const navigate = useNavigate();
  const [topicSong, setTopicSong] = useState([]);
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window]);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetAllTopicSong.getAllTopicSong();
      setTopicSong([...res]);
    };
    fetch();
  }, []);

  const handleClick = (item) => {
    navigate(`/musictopic/${item.name}/${item.categorySongId}`);
  };
  const { t } = useTranslation();
  return (
    <div className={cx('list-topic')}>
      <div className={cx('title')}>{t('songtheme')}</div>
      <Swiper grabCursor={true} spaceBetween={0} slidesPerView={width <= 1024 ? 4 : 7}>
        {topicSong.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <TopicItem index={index} onClick={() => handleClick(item)} data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TopicList;
