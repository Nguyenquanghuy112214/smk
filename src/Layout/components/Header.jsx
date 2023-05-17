import { useState } from 'react';

import { GiArena } from 'react-icons/gi';
import { BiConversation } from 'react-icons/bi';
import { IoMdNotifications } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';

import config from '~/config';
import { Link, NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setMenuMb } from '~/pages/HomePage/HomePageSlice';
import ModalContact from '~/pages/ModalContact/Contact';

import logoHeader from '~/assets/image/logo_bkt.png';

import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Header.module.scss';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import listMenu from '~/constant/listmenu';

const cx = classNames.bind(styles);

function Header() {
  const [activeMdContact, setActiveMdContact] = useState(false);
  const [indexAc, setIndexAc] = useState(0);
  const dispatch = useDispatch();
  const handleCloseMenumb = () => {
    dispatch(setMenuMb(false));
  };
  const { t } = useTranslation('translation');

  const handleClick = (index) => {
    setIndexAc(index);
    if (index === 4) {
      setActiveMdContact(true);
    }
  };

  const closeModalCt = () => {
    setActiveMdContact(false);
  };

  return (
    <div className={cx('wrapper-header')}>
      <ModalContact onClick={closeModalCt} active={activeMdContact} />
      <img className={cx('image-logo')} src={logoHeader} alt="Logo" />
      <span className={cx('icon-close')} onClick={handleCloseMenumb}>
        <AiOutlineClose />
      </span>
      <ul className={cx('wrapper-menu')}>
        {listMenu.map((menu, index) => {
          return (
            <li className={cx('menu-item')} key={index}>
              {menu.opacity === 'opacity' && <div className={cx('wrapper-opacity')}></div>}
              <Link onClick={() => handleClick(index)} to={menu.navlink} className={index === indexAc ? cx('item', 'active') : cx('item')}>
                <img src={menu.icon} className={cx('menu-icon')} />
                <span className={cx('menu-title')}>{t(menu.title)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Header;

export function HeaderNotext() {
  const [indexAc, setIndexAc] = useState(0);
  const dispatch = useDispatch();
  const handleCloseMenumb = () => {
    dispatch(setMenuMb(false));
  };

  const handleClick = (index) => {
    setIndexAc(index);
  };
  return (
    <div className={cx('wrapper-headernotext')}>
      <img className={cx('image-logonotext')} src={logoHeader} alt="Logo" />
      <span className={cx('icon-close')} onClick={handleCloseMenumb}>
        <AiOutlineClose />
      </span>
      <ul className={cx('wrapper-menu')}>
        {listMenu.map((menu, index) => {
          return (
            <li className={cx('menu-item')} key={index}>
              <Link onClick={() => handleClick(index)} to={menu.navlink} className={index === indexAc ? cx('item', 'active') : cx('item')}>
                <img src={menu.icon} className={cx('menu-icon')} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
