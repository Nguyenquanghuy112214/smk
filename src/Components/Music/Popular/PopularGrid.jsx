import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import PopularItem, { PopularItemMain } from './PopularItem';
import { useEffect, useState } from 'react';
import * as GetSongPopular from '~/services/GetSongPopular';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setListSongByIDTopic } from '~/Redux/ListSongByIDTopic';
import Paginated from '~/Components/Paginated';
import { useTranslation } from 'react-i18next';
import Loading from '~/Components/animationloading/Animationloading';

const cx = classNames.bind(styles);
const PopularGrid = ({ title, listData, music }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [listSongPopular, SetListSongPopular] = useState([]);
  const [width, setWidth] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await GetSongPopular.getSongPopular();
      SetListSongPopular([...res]);
    };
    fetch();
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window]);

  // phan trang
  // const itemOffset = useSelector((state) => state.ItemOffset.itemOffset);
  const [check, setCheck] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [setlected, setSelected] = useState();
  const itemsPerPage = width <= 1024 ? 4 : 8;

  useEffect(() => {
    setCheck(!check);
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(listSongPopular.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(listSongPopular.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listSongPopular]);

  const handlePageClick = (event) => {
    setSelected(event.selected);
    const newOffset = (event.selected * itemsPerPage) % listSongPopular.length;
    setItemOffset(newOffset);
  };
  const { t } = useTranslation();

  if (id === undefined) {
    return (
      <div className={cx('grid-popular')}>
        <Loading active={currentItems !== undefined && currentItems.length === 0 ? true : false} opa={0.6} />

        <div className={cx('title')}>{title}</div>
        <div className={cx('wrapper-grid__popular')}>
          {currentItems !== undefined && currentItems.length > 0 && (
            <Paginated music currentItems={currentItems} onClick={(event) => handlePageClick(event)} pageCount={pageCount}>
              {currentItems.map((item, index) => {
                return <PopularItemMain data={item} key={index} />;
              })}
            </Paginated>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={cx('grid-popular')}>
        <div className={cx('title')}>{title}</div>
        {listData.length > 0 ? (
          <div className={cx('wrapper-list__popular')}>
            {listData.map((item, index) => {
              return <PopularItem music index={index} data={item} key={index} />;
            })}
          </div>
        ) : (
          <div style={{ fontWeight: '500', padding: '20px' }}>{t('Nosong')}</div>
        )}
      </div>
    );
  }
};

export default PopularGrid;
