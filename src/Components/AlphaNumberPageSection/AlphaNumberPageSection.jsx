import React from 'react';

import classNames from 'classnames/bind';
import styles from './_AlphaNumberPageSection.module.scss';
import HeaderPage from '~/Components/HeaderPage';
import iconclose from '~/assets/image/AlphaPage/iconclose.png';
import { useNavigate } from 'react-router-dom';

import routes from '~/config/routes';

const cx = classNames.bind(styles);
function AlphaNumberPageSection({ children, title, path, color }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routes.homepage);
  };
  return (
    <div className={cx('wrapper', `${color ? 'color' : ''}`)}>
      <HeaderPage title={title} path={path} />
      <div className={cx('icon-close')}>
        <img onClick={handleClick} src={iconclose} alt="" />
      </div>
      {children}
    </div>
  );
}

export default AlphaNumberPageSection;
