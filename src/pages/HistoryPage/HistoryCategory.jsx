import classNames from 'classnames/bind';
import TopicList from '~/Components/Video/Topic/TopicList';
import video from '~/assets/image/Music_History_Video/video.png';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import ListGramar from './LeftHistoryCate/ListGramar';
import ListVideoCateDetail from './RightHistoryCate/ListVideoCateDetail';
import { useSelector } from 'react-redux';
import HeaderHistory from '~/Components/History/HeaderHistory';
import HistoryCateSingle from './HistoryCateSingle';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as GetHistoryByCate from '~/services/GetHistoryByCate';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const HistoryCategory = () => {
  const [listData, setListData] = useState([]);
  const [dataFirst, setDataFirst] = useState();

  const { series } = useParams();
  const { id } = useParams();
  const { title } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetHistoryByCate.getHistoryByCate(id);
      setListData([...res]);
      setDataFirst(res[0].idstory);
    };
    fetch();
  }, [series]);
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
              {t('StoryWarehouse')}
              <img className={cx('img-video')} src={video} alt="" />
            </div>

            {series === 'true' ? (
              <div>
                <div className={cx('title-topic')}>{t('GenreMulti-seriesstory')}</div>
                <div className={cx('wrapper-content__listcate')}>
                  <ListGramar listData={listData} />
                  <ListVideoCateDetail dataFirst={dataFirst} />
                </div>
              </div>
            ) : (
              <div>
                <div className={cx('title-topic')}>{`${t('genreofstories')} > ${title}`}</div>
                <div className={cx('wrapper-content__listcate', 'no-series')}>
                  <HistoryCateSingle idcate={id} listData={listData} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCategory;
