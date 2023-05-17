import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import course from '~/assets/image/Music_History_Video/course.png';
import { AiFillEye } from 'react-icons/ai';
import * as UpViewVideo from '~/services/UpVIewVIdeo';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const CoureseItem = ({ data, onClick }) => {
  const [img, setImg] = useState(null);
  const handleClick = () => {
    onClick();
  };
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper-course')} onClick={handleClick}>
      <div className={cx('img-course')}>
        <img onError={() => setImg(course)} src={!img ? data.thumbnail : img} alt="" />
      </div>
      <div className={cx('content-course')}>
        <div className={cx('content-course__name')}>{data.name || data.nameSeriesStories}</div>
        <div className={cx('content-course__body', 'single')}>
          <span className={cx('auth')}>
            {t('Author')}: <strong>Q Huy</strong>
          </span>
          <span className={cx('time')}>
            {t('Capacity')}: <strong>20 {t('minute')}</strong>
          </span>
        </div>
        <div className={cx('content-course__view', 'single')}>
          <span className={cx('icon-view')}>
            <AiFillEye />
          </span>
          {data.numberOfViews} {t('Views')}
        </div>
      </div>
    </div>
  );
};

export default CoureseItem;
