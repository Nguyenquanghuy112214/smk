import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import { AiFillEye } from 'react-icons/ai';
import * as UpViewStory from '~/services/UpVIewStory';
import { useTranslation } from 'react-i18next';
import tamcam from '~/assets/image/sachdep/anh1.jpg';

const cx = classNames.bind(styles);
const CoureseItem = ({ data, onClick, onError }) => {
  const handleClick = async () => {
    const res = await UpViewStory.upViewStory(data !== undefined && data.idstory);

    onClick();
  };
  const handleError = () => {
    onError();
  };
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper-course')} onClick={() => handleClick()}>
      <div className={cx('img-course')}>
        <img onError={() => handleError()} src={data.thumbnail !== null && data.thumbnail !== undefined ? data.thumbnail : tamcam} alt="" />
      </div>
      <div className={cx('content-course')}>
        <div className={cx('content-course__name')}>{data.name || data.nameSeriesStories}</div>
        <div className={cx('content-course__body', 'single')}>
          <span className={cx('auth')}>
            {t('Author')}: <strong>{data !== undefined && data.author}</strong>
          </span>
          <span className={cx('time')}>
            {t('Capacity')}: <strong>{data?.timeLength}</strong>
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
