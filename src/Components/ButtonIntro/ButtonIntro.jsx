import React from 'react';

import classNames from 'classnames/bind';
import styles from './_ButtonIntro.module.scss';
const cx = classNames.bind(styles);
function ButtonIntro({ title, primary, white, login, onClick }) {
  const classes = cx('wrapper', {
    primary,
    white,
    login,
  });
  return (
    <div className={classes}>
      <button onClick={() => onClick()}>{title}</button>
    </div>
  );
}

export default ButtonIntro;
