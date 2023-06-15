import classNames from 'classnames/bind';
import HeaderVideo from '~/Components/Video/HeaderVideo';
import video from '~/assets/image/Music_History_Video/video.png';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import ListGramar from './LeftVideoCate/ListGramar';
import ListVideoCateDetail from './RightVideoCate/ListVideoCateDetail';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const VideoCategory = () => {
  const { t } = useTranslation;
  const { title } = useParams;
  const { unit } = useParams;
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
      <div className={cx('wrapper-header')}>
        <HeaderVideo />
      </div>
      <div className={cx('wrapper-body')}>
        <div className={cx('wrapper-list__topic')}>
          <div className={cx('list-topicvideo')}>
            <div className={cx('title-video')}>
              {/* {t('videostore')} */}
              Kho Video
              <img className={cx('img-video')} src={video} alt="" />
            </div>

            <div className={cx('title-topic')}>{/* {t('Categories')} */}Chuyên mục</div>
            <div className={cx('wrapper-content__listcate')}>
              <ListGramar onClick={handleClick} />
              <ListVideoCateDetail active={active} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCategory;
