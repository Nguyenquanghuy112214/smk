import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Button.module.scss';

import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);
function Button(
  {
    title1,
    title2,
    leftradius,
    rightradius,
    rank,
    date,
    navlink,
    activedate,
    to,
    href,
    primary,
    sm,
    lg,
    df,
    xl,
    plus,
    ml,
    leftIcon,
    rightIcon,
    noefect,
    onClick,
    handleChangeWeekLeft,
    handleChangeWeekRight,
    ...passProps
  },
  ref
) {
  const classes = cx('wrapper-button', {
    primary,
    noefect,
    df,
    plus,
    date,
    sm,
    lg,
    xl,
    ml,
    rank,
    activedate,
    leftradius,
    rightradius,
  });
  const props = {
    ...passProps,
    onClick,
  };
  let Comp = 'button';
  if (to) {
    props.to = to;
    Comp = Link;
  }

  return (
    <Comp className={classes} ref={ref} {...props}>
      {leftIcon && (
        <span onClick={handleChangeWeekLeft} className={cx('icon')}>
          {leftIcon}
        </span>
      )}

      <p className={cx('text1')}>{title1}</p>

      {rightIcon && (
        <span onClick={handleChangeWeekRight} className={cx('icon')}>
          {rightIcon}
        </span>
      )}

      <p className={cx('text2')}>{title2}</p>
    </Comp>
  );
}

export default forwardRef(Button);
