import classNames from 'classnames/bind';
import TopicList from '~/Components/Video/Topic/TopicList';
import video from '~/assets/image/Music_History_Video/video.png';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import { useSelector } from 'react-redux';
import HeaderHistory from '~/Components/History/HeaderHistory';
import CoursewareSingle from '~/pages/CoursewarePage/CoursewareSingle';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as GetCourseware from '~/services/GetCourseware';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const Courseware = () => {
  const [listData, setListData] = useState([]);

  const Class = useSelector((state) => state.CardClass.isNumber);
  const idBook = useSelector((state) => state.BookByAge.isBook);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetCourseware.getCourseware(Class.class, idBook);
      setListData([...res]);
    };
    fetch();
  }, []);
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
      <div className={cx('wrapper-header')}>
        <HeaderHistory />
      </div>
      <div className={cx('wrapper-body')}>
        <div className={cx('wrapper-list__topic')}>
          <div className={cx('list-topicvideo')}>
            <div className={cx('title-video')}>
              {t('courseware')}
              <img className={cx('img-video')} src={video} alt="" />
            </div>

            <div className={cx('wrapper-content__listcate', 'no-series')}>
              <CoursewareSingle listData={listData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courseware;
