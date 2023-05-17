import { useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from '~/sass/Components/_IconCloseMenuMb.module.scss';

const cx = classNames.bind(styles);

function IconCloseMenuMb() {
  const [active, setActiveCloseMenu] = useState(false);
  return (
    <div onClick={() => setActiveCloseMenu(!active)} className={cx('show-menu', 'nav__toggler')}>
      <div className={active ? cx('line1', 'active') : cx('line1')}></div>
      <div className={active ? cx('line2', 'active') : cx('line2')}></div>
      <div className={active ? cx('line3', 'active') : cx('line3')}></div>
    </div>
  );
}

export default IconCloseMenuMb;
