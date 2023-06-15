import classNames from 'classnames/bind';
import styles from './_StartToltalGame.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import iconclose from '~/assets/image/iconclose.png';
import itemimg from '~/assets/image/SelectGame/item.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';
import routes from '~/config/routes';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function StartToltalGame() {
  const navigate = useNavigate();

  const data = [
    { name: 'BINGO WORD', path: routes.startbingogame },
    { name: 'FOUR PIC ONE WORD', path: routes.startwordmatchinggame },
    { name: 'FLASH VOCA', path: routes.startdragdropgame },
  ];
  const handleNavigate = (item) => {
    navigate(item.path);
  };
  const NaviteHome = () => {
    navigate(routes.homepage);
  };
  return (
    <div className={cx('wrapper')}>
      <div onClick={NaviteHome} className={cx('icon-close')}>
        <img src={iconclose} alt="" />
      </div>
      <div data-aos="zoom-in" data-aos-duration="900" className={cx('body')}>
        <div className={cx('title')}>Select Game</div>
        <div className={cx('list-item', 'swiper-list-item')}>
          <Swiper spaceBetween={80} navigation={true} modules={[Navigation]} slidesPerView={4} className={cx('swiper-select')}>
            {data !== undefined &&
              data.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className={cx('wrapper-item')}>
                      <div className={cx('img')}>
                        <img src={itemimg} alt="" />
                      </div>
                      <div onClick={() => handleNavigate(item)} className={cx('name-game')}>
                        {item.name}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default StartToltalGame;
