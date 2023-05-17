import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import monkey from '~/assets/image/Music_History_Video/monkey.png';
import { useEffect, useState } from 'react';
import * as GetStoryBySeries from '~/services/GetStoryBySeries';
import { useDispatch, useSelector } from 'react-redux';
import { setIndexSeriesStory } from '~/Redux/IndexSeriesStory';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const ListGramar = ({ listData }) => {
  const indexActive = useSelector((state) => state.IndexSeriesStory.index);

  const dispatch = useDispatch();

  const selectHistory = (item) => {
    dispatch(setIndexSeriesStory(item.idstory));
  };
  return (
    <div className={cx('wrapper-list__cate__left')}>
      <ul className={cx('ul-listcate')}>
        {listData.map((item, index) => {
          return <ItemStory onClick={() => selectHistory(item)} key={index} data={item} />;
        })}
      </ul>
    </div>
  );
};

export default ListGramar;

export function ItemStory({ data, onClick }) {
  const [episodes, setEpisodes] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetStoryBySeries.getStoryBySeries(data !== undefined && data.idstory);
      setEpisodes(res);
    };
    fetch();
  }, [data]);

  const selectHistory = (data) => {
    onClick();
  };
  return (
    <li onClick={() => selectHistory()} className={cx('li-listcate')}>
      <div className={cx('wrapper-history-voca')}>
        <img className={cx('img-history-voca')} src={monkey} alt="" />
        <div className={cx('content-history-voca')}>
          <span className={cx('name-history')}>{data.name}</span>
          <span className={cx('auth-history')}>
            {' '}
            {t('Author')}: <strong>{data.author}</strong>
          </span>
        </div>
        <div className={cx('footer-history-voca')}>{`full ${episodes !== undefined && episodes.length} tập`}</div>
      </div>
    </li>
  );
}
