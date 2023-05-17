import classNames from 'classnames/bind';
import styles from '~/sass/Components/_HomePage.module.scss';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forwardRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { setMenuMb } from '~/pages/HomePage/HomePageSlice';

const cx = classNames.bind(styles);

function MenuTlMb({ open, onClick }, ref) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMenuMb(false));
  }, [location.pathname]);

  const handleClick = () => {
    dispatch(setMenuMb(true));
  };
  return (
    <span onClick={onClick ? handleClick : null} className={cx('IconMenu-Mb')} ref={ref}>
      <GiHamburgerMenu />
    </span>
  );
}

export default forwardRef(MenuTlMb);
