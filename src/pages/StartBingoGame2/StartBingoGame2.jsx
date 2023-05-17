import React from 'react';
import classNames from 'classnames/bind';
import styles from './_StartBingoGame2.module.scss';
import iconclose from '~/assets/image/iconclose.png';
import imgbingo from '~/assets/image/BingoGame/bingo.png';
import img3x3 from '~/assets/image/BingoGame/3x3.png';
import img4x4 from '~/assets/image/BingoGame/4x4.png';
import img5x5 from '~/assets/image/BingoGame/5x5.png';
import iconhome from '~/assets/image/BingoGame/home.png';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
const cx = classNames.bind(styles);
function StartBingoGame2() {
  const navigation = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const listItem = [
    {
      id: 1,
      img: img3x3,
      typeofgame: 3,
    },
    {
      id: 2,
      img: img4x4,
      typeofgame: 4,
    },
    {
      id: 3,
      img: img5x5,
      typeofgame: 5,
    },
  ];

  const NaviteHome = () => {
    navigation(routes.homepage);
  };
  const NaviteStartGame = () => {
    navigation(routes.starttotltalgame);
  };
  const handleClick = (item) => {
    navigation(`/bingogame/${item.typeofgame}`);
  };
  return (
    <div data-aos="fade-out" data-aos-duration="700" className={cx('wrapper')}>
      <div data-aos="zoom-out" data-aos-duration="1000" data-aos-delay="600" className={cx('img-bingo')}>
        <img src={imgbingo} alt="" />
      </div>
      <div onClick={NaviteStartGame} className={cx('icon-close')}>
        <img src={iconclose} alt="" />
      </div>
      <div className={cx('icon-home')}>
        <img onClick={NaviteHome} src={iconhome} alt="" />
      </div>
      <div
        style={{
          transform: isInView ? 'scale(1)' : 'scale(0)',
          opacity: isInView ? 1 : 0,
          transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s `,
        }}
        className={cx('title')}
      >
        SELECT GRID SIZE
      </div>
      <div className={cx('list-item')}>
        {listItem !== undefined &&
          listItem.map((item, index) => {
            return (
              <div ref={ref} className={cx('wrapper-item')}>
                <img
                  onClick={() => handleClick(item)}
                  style={{
                    visibility: isInView ? 'visible' : 'hidden',
                    transform: isInView ? 'none' : 'translateY(-60px)',
                    opacity: isInView ? 1 : 0,
                    transition: `all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1)  1.6s `,
                  }}
                  src={item.img}
                  alt=""
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default StartBingoGame2;
