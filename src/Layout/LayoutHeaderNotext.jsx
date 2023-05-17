import { useSelector } from 'react-redux';

import { HeaderNotext } from '~/Layout/components/Header';

import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LayoutFooter.module.scss';
import Auth from '~/Components/Common/auth';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';
import publicRoutes from '~/routes/routes';

const cx = classNames.bind(styles);

function LayoutFooter({ children }) {
  const music = useSelector((state) => state.musicBackground.music);

  useEffect(() => {
    publicRoutes.map((item, index) => {
      if (!item.isMusic) {
        music.pause();
        music.currentTime = 0;
      }
    });
  }, [window.location.pathname]);
  const isActiveMenuMb = useSelector((state) => state.MenuMbActive.isActive);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Auth>
      <div className={cx('wrapper-layoutfooter', 'd-flex')}>
        <div className={isActiveMenuMb ? cx('wrapper-header', 'active') : cx('wrapper-header')}>{<HeaderNotext />}</div>
        <div style={{ width: '100vw' }} className="container-header__notext">
          <div style={{ overflow: 'hidden', position: 'relative', minHeight: '100vh' }}>{children}</div>
        </div>
      </div>
    </Auth>
  );
}

export default LayoutFooter;
