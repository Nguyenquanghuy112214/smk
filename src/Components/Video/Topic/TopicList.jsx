import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import video from '~/assets/image/Music_History_Video/video.png';
import config from '~/config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as GetTopicVideoLv0 from '~/services/GetTopicVideoLv0';
import { useDispatch } from 'react-redux';
import { setIndexActiveTopicVideo } from '~/Redux/IndexActiveTopicVideo';
import { useTranslation } from 'react-i18next';
import Loading from '~/Components/animationloading/Animationloading';

const cx = classNames.bind(styles);
const TopicList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [listTopic, setListTopic] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetTopicVideoLv0.getTopicVideoLv0();
      setListTopic([...res]);
    };
    fetch();
  }, []);

  const nextNavigate = (item, index) => {
    dispatch(setIndexActiveTopicVideo(index));
    navigate(`/videocategory/undefined/undefined/${item.idcategoryVideo}`);
  };
  const { t } = useTranslation();

  return (
    <div className={cx('list-topicvideo')}>
      <Loading active={listTopic !== undefined && listTopic.length === 0 ? true : false} opa={0.6} />
      <div className={cx('title-video')}>
        {t('videostore')}
        <img className={cx('img-video')} src={video} alt="" />
      </div>
      <div style={{ cursor: 'unset' }} className={cx('title-topic')}>
        {t('Categories')}
      </div>
      <div className={cx('topicvideo-list')}>
        {listTopic !== undefined &&
          listTopic.map((item, index) => {
            return (
              <div onClick={() => nextNavigate(item, index)} key={index} className={cx('topicvideo-item')}>
                <button className={cx('button-video')}>{item.nameVn}</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TopicList;
