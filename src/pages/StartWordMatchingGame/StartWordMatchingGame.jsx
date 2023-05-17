import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './_StartWordMatchingGame.module.scss';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
const cx = classNames.bind(styles);
function StartWordMatchingGame() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routes.wordmatchinggame);
  };
  const Navigaetion = () => {
    navigate(routes.starttotltalgame);
  };

  return (
    <div data-aos="fade-in" className={cx('wrapper')}>
      <div className={cx('list-button')}>
        <div onClick={handleClick} className={cx('button-success')}>
          <img src="https://resourcesk.bkt.net.vn/plugins/game/FourPicOneWord/Images/Button/btnStart.png" alt="" />
        </div>
        <div onClick={Navigaetion} className={cx('button-fail')}>
          <img src="https://resourcesk.bkt.net.vn/plugins/game/FourPicOneWord/Images/Button/btnClose.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default StartWordMatchingGame;
