import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import * as GetVideoPopular from '~/services/GetVideoPopular';
import PopularItem from './PopularItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import Paginated from '~/Components/Paginated';


const cx = classNames.bind(styles);
const PopularGrid = ({ title }) => {

 
  const [listData, setListData] = useState([]);
  const [width, setWidth] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetVideoPopular.getVideoPopular();
      setListData([...res]);
    };
    fetch();
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window]);
  const [check, setCheck] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [setlected, setSelected] = useState();
  const itemsPerPage = 8;

  useEffect(() => {
    setCheck(!check);
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(listData.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(listData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, listData]);

  const handlePageClick = (event) => {
    setSelected(event.selected);
    const newOffset = (event.selected * itemsPerPage) % listData.length;
    setItemOffset(newOffset);
  };
  return (
    <div className={cx('grid-popular')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('wrapper-grid__popular')}>
        {currentItems !== undefined && currentItems.length > 0 && (
          <Paginated music currentItems={currentItems} onClick={(event) => handlePageClick(event)} pageCount={pageCount}>
            {listData !== undefined &&
              listData.map((item, index) => {
                return <PopularItem data={item} />;
              })}
          </Paginated>
        )}
      </div>
    </div>
  );
};

export default PopularGrid;
