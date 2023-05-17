import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import course from '~/assets/image/Music_History_Video/course.png';
import { AiFillEye } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const CoureseItem = ({ data, onClick }) => {
  const handleClick = () => {
    onClick();
  };
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper-course')} onClick={handleClick}>
      <div className={cx('img-course')}>
        <img src={data.thumbnail} alt="" />
      </div>
      <div className={cx('content-course')}>
        <div className={cx('content-course__name')}>{data.name}</div>
        <div className={cx('content-course__view')}>
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
