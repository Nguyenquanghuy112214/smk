import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import cateitem from '~/assets/image/Music_History_Video/cateitem.png';
import { AiFillEye } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as GetVideoByCate from '~/services/GetVideoByCate';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as GetTopicVideoLv0 from '~/services/GetTopicVideoLv0';
import * as GetTopicVideoLv1 from '~/services/GetTopicVideoLv1';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const ListVideoCateDetail = ({ active }) => {
  const { title } = useParams();
  const { unit } = useParams();
  const { idcate } = useParams();
  const [initTitle, setInitTitle] = useState();
  const [initName, setInitTName] = useState();
  const idcateVideo = useSelector((state) => state.IdTopicVideo.isTopic);
  const [listData, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await GetVideoByCate.getVideoByTopic(idcateVideo);
      setData([...res]);
    };
    fetch();
  }, [idcateVideo]);
  const { t } = useTranslation();
  // khoi tao lan dau khi chua click
  useEffect(() => {
    const fetch = async () => {
      const [res, res1] = await Promise.all([GetTopicVideoLv0.getTopicVideoLv0(), GetTopicVideoLv1.getTopicVideoLv1()]);
      setInitTitle(res.find((x) => +x.idcategoryVideo === +idcate).nameVn);
      setInitTName(res1.find((x) => +x.parentId === +idcate).nameVn);
    };
    fetch();
  }, []);

  if (listData !== undefined && listData.length === 0) {
    return <div className={cx('wrapper-listvideocate__detail', 'nodata')}>{t('incompletedata')}</div>;
  }

  return (
    <div className={cx('wrapper-listvideocate__detail')}>
      <div className={cx('wrapper-listvideocate__detail-title')}>{title === 'undefined' ? initTitle : title}</div>
      <div className={cx('wrapper-listvideocate__detail-introduce')}>
        <img className={cx('img-right')} src={cateitem} alt="" />
        <span className={cx('title-right')}>{unit === 'undefined' ? initName : unit}</span>
        {listData.map((item, index) => {
          return <ItemVideoCateDetail key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

export default ListVideoCateDetail;

export function ItemVideoCateDetail({ data }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/videorunvideo/${data.idcategoryVideo}/${data.idvideo}`);
  };
  if (!data) return;
  else
    return (
      <div onClick={handleClick} className={cx('wrapper-itemvideocate__detail')}>
        <span className={cx('itemvideocate-title')}>{data.nameVn}</span>
        <div className={cx('itemvideocate__detail')}>
          <img className={cx('img-itemvideocate__detail')} src={cateitem} alt="" />
          <div className={cx('itemvideocate__detail-content', 'nosingle')}>
            <span className={cx('teacher')}>
              {t('Teacher')}: <strong>{data.author}</strong>
            </span>
            <span className={cx('time')}>
              {t('Capacity')}: <strong>{data.timeLength}</strong>
            </span>
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
