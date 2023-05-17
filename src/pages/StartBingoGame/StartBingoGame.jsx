import React from 'react';
import classNames from 'classnames/bind';
import styles from './_StartBingoGame.module.scss';
import iconclose from '~/assets/image/iconclose.png';
import iconstart from '~/assets/image/BingoGame/start.png';
import imgbingo from '~/assets/image/BingoGame/bingo.png';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
const cx = classNames.bind(styles);
function StartBingoGame() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(routes.startbingogame2);
  };
  const NaviteStartGame = () => {
    navigate(routes.starttotltalgame);
  };
  return (
    <div data-aos="zoom-out" data-aos-duration="700" className={cx('wrapper')}>
      <div data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500" className={cx('img-bingo')}>
        <img src={imgbingo} alt="" />
      </div>
      <div className={cx('icon-close')}>
        <img onClick={NaviteStartGame} src={iconclose} alt="" />
      </div>
      <div data-aos="fade-left" data-aos-duration="300" data-aos-delay="700" className={cx('btn-start')}>
        <img onClick={handleClick} src={iconstart} alt="" />
      </div>
    </div>
  );
}

export default StartBingoGame;
