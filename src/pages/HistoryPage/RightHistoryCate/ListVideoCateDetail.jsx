import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import cateitem from '~/assets/image/Music_History_Video/cateitem.png';
import { AiFillEye } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as GetVideoByCate from '~/services/GetVideoByCate';
import { useNavigate } from 'react-router-dom';
import * as GetStoryBySeries from '~/services/GetStoryBySeries';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);
const ListVideoCateDetail = ({ dataFirst }) => {
  const indexActive = useSelector((state) => state.IndexSeriesStory.index);

  const [listData, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetStoryBySeries.getStoryBySeries(indexActive);

      setData([...res]);
    };
    const fetch2 = async () => {
      // cho nay chua xong
      const res2 = await GetStoryBySeries.getStoryBySeries(dataFirst);
      setData([...res2]);
    };

    if (indexActive === undefined) {
      fetch2();
    } else {
      fetch();
    }
  }, [indexActive, dataFirst]);
  return (
    <div className={cx('wrapper-listvideocate__detail')}>
      <div className={cx('wrapper-listvideocate__detail-title')}>Danh sách truyện phổ biến</div>
      <div className={cx('wrapper-listvideocate__detail-introduce')}>
        {listData.map((item, index) => {
          return <ItemVideoCateDetail data={item} key={index} dataFirst={dataFirst} />;
        })}
      </div>
    </div>
  );
};

export default ListVideoCateDetail;

export function ItemVideoCateDetail({ data, dataFirst }) {
  const indexActive = useSelector((state) => state.IndexSeriesStory.index);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/historyrunseries/${(indexActive !== undefined && indexActive) || (dataFirst !== undefined && dataFirst)}/${
        data !== undefined && data.seriesStoriesId !== undefined && data.seriesStoriesId
      }`
    );
  };
  const { t } = useTranslation();
  return (
    <div onClick={handleClick} className={cx('wrapper-itemvideocate__detail')}>
      <span className={cx('itemvideocate-title')}>{data.nameSeriesStories}</span>
      <div className={cx('itemvideocate__detail')}>
        <img className={cx('img-itemvideocate__detail')} src={cateitem} alt="" />
        <div className={cx('itemvideocate__detail-content', 'nosingle')}>
          <span className={cx('practice')}>
            {t('Episode')}: <strong>{data.indexs}</strong>
          </span>
          <span className={cx('teacher')}>
            {t('Author')}: <strong>{data.author}</strong>
          </span>
          {/* <span className={cx('time')}>
            Dung lượng: <strong>hello</strong>
          </span> */}
          <div className={cx('itemvideocate__detail-view')}>
            <span>
              <AiFillEye />
            </span>
            {` ${data.numberOfViews} ${t('Views')}`}
          </div>
        </div>
      </div>
    </div>
  );
}
