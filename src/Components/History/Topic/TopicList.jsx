import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import TopicItem from './TopicItem';

import { useState, useEffect } from 'react';
import * as GetAllTopicHistory from '~/services/GetAllTopicHistory';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '~/Components/animationloading/Animationloading';

const cx = classNames.bind(styles);
const TopicList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [topicSong, setTopicSong] = useState([]);
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window]);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetAllTopicHistory.getAllTopicHistory();
      setTopicSong([...res]);
    };
    fetch();
  }, []);

  const handleClick = (item) => {
    navigate(`/historycategory/${item.indexs}/${item.idcategoryStory}/${item.nameVn}/0`);
  };

  return (
    <div className={cx('list-topic')}>
      <Loading active={topicSong !== undefined && topicSong.length === 0 ? true : false} opa={0.6} />

      <div className={cx('title-main')}>{t('StoryWarehouse')}</div>
      <div className={cx('title-topic')}>{t('genreofstories')}</div>
      <Swiper grabCursor={true} spaceBetween={0} slidesPerView={width <= 1024 ? 4 : 7}>
        {topicSong.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <TopicItem onClick={() => handleClick(item)} index={index} data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TopicList;
