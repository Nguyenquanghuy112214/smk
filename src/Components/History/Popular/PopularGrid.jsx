import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import PopularItem, { PopularItemMain } from './PopularItem';
import { useEffect, useState } from 'react';
import * as GetPopularStory from '~/services/GetPopularStory';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Paginated from '~/Components/Paginated';

const cx = classNames.bind(styles);
const PopularGrid = ({ title, listData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [listStoryPopular, SetListStoryPopular] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetPopularStory.getPopularStory();
      SetListStoryPopular([...res]);
    };
    fetch();
  }, []);

  // phan trang
  // const itemOffset = useSelector((state) => state.ItemOffset.itemOffset);
  const [check, setCheck] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [setlected, setSelected] = useState();
  const itemsPerPage = 8;

  useEffect(() => {
    setCheck(!check);
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(listStoryPopular.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(listStoryPopular.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listStoryPopular]);

  const handlePageClick = (event) => {
    setSelected(event.selected);
    const newOffset = (event.selected * itemsPerPage) % listStoryPopular.length;
    setItemOffset(newOffset);
  };

  if (id === undefined) {
    return (
      <div className={cx('grid-popular')}>
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
        <div className={cx('wrapper-list__popular')}>
          {listData.map((item, index) => {
            return <PopularItem data={item} index={index} key={index} />;
          })}
        </div>
      </div>
    );
  }
};

export default PopularGrid;
