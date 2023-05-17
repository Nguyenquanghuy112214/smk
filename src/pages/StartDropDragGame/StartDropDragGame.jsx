import React, { useEffect } from 'react';

import { IoHome } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import * as GetAllTopic from '~/services/GetAllTopic';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import left from '~/assets/image/dragdrop/left.png';
import right from '~/assets/image/dragdrop/right.png';
import { AiOutlineSearch } from 'react-icons/ai';
import empty from '~/assets/animations/empty.json';
import iconclose from '~/assets/image/iconclose.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';
import { resourceImg } from '~/constant/resourceImg';
import useDebounce from '~/hooks/useDebounce';
import { Col, Row } from 'react-bootstrap';
import LoadingRobot from '~/Components/LoadingRobot';

import classNames from 'classnames/bind';
import styles from './_StartDropDragGame.module.scss';
import routes from '~/config/routes';
import Loading from '~/Components/animationloading/Animationloading';
const cx = classNames.bind(styles);
function StartDropDragGame() {
  const [activeInput, setActiveInput] = useState(true);
  const [search, setSearch] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const dataSearchDB = useDebounce(search, 400);

  const navigator = useNavigate();
  const [data, setData] = useState([]);
  const onHome = () => {
    navigator('/');
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await GetAllTopic.GetAllTopic();
      setData([...res.data]);
    };
    fetch();
  }, []);

  useEffect(() => {
    setDataSearch(data.filter((item) => item.name.toLowerCase().includes(dataSearchDB.toLowerCase())));
  }, [dataSearchDB]);

  const handleSwiperLeft = () => {
    const swiper = document.querySelector('.swiper-startgame').swiper;
    swiper.slidePrev();
  };

  const handleSwiperRight = () => {
    const swiper = document.querySelector('.swiper-startgame').swiper;

    swiper.slideNext();
  };
  const handleNavigate = (item) => {
    navigator(`/dragdropgame/${item.idtopic}`);
  };
  const handleGetGame = () => {
    navigator(routes.starttotltalgame);
  };
  return (
    <div data-aos="zoom-out" data-aos-duration="700" className={cx('wrapper')}>
      {/* <div className={cx('redirect')}>
        <img src="" alt="" />
      </div> */}
      <Loading active={data !== undefined && data.length === 0 ? true : false} opa={0.6} />
      <div className={cx('icon-close')}>
        <img onClick={handleGetGame} src={iconclose} alt="" />
      </div>
      <div className={cx('background')}>
        <div className={cx('title')}>Select Topic</div>
        <div className={cx('wrapper-input', `${activeInput ? 'input-active' : ''}`)}>
          <span className={cx('icon-search')}>
            <AiOutlineSearch />
          </span>
          <input
            value={search}
            onFocus={() => setActiveInput(true)}
            onBlur={() => setActiveInput(false)}
            onChange={(e) => setSearch(e.target.value)}
            className={cx('input-search')}
            type="text"
            placeholder={'Tìm kiếm...'}
          />
        </div>
        {search !== undefined && search.length > 0 && dataSearch !== undefined && dataSearch.length === 0 ? (
          <Row style={{ height: '200px', marginTop: '60px' }} className="justify-content-center">
            <Col xxl={4} xl={4} lg={4} md={12} sm={12}>
              <LoadingRobot notext active ssm style={empty} />
            </Col>
          </Row>
        ) : (
          //
          <Swiper spaceBetween={15} navigation={true} modules={[Navigation]} slidesPerView={5} className={cx('swiper-startgame')}>
            {dataSearch !== undefined && dataSearch.length > 0
              ? dataSearch.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div onClick={() => handleNavigate(item)} className={cx('wrapper-item')}>
                        <div className={cx('img-item')}>
                          <img src={resourceImg(item.image)} alt="" />
                        </div>
                        <div className={cx('title-sub')}>{item.name}</div>
                      </div>
                    </SwiperSlide>
                  );
                })
              : data !== undefined &&
                data.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div onClick={() => handleNavigate(item)} className={cx('wrapper-item')}>
                        <div className={cx('img-item')}>
                          <img src={resourceImg(item.image)} alt="" />
                        </div>
                        <div className={cx('title-sub')}>{item.name}</div>
                      </div>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        )}

        {search !== undefined && search.length > 0 && dataSearch !== undefined && dataSearch.length === 0 ? null : (
          <div className={cx('wrapper-navigation')}>
            <div onClick={handleSwiperLeft} className={cx('img-icon')}>
              <img src={left} alt="left" />
            </div>
            <div className={cx('img-icon')}>
              <img onClick={handleSwiperRight} src={right} alt="right" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StartDropDragGame;
