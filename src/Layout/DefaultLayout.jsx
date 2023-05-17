import classNames from 'classnames/bind';
import styles from '~/sass/Components/_DefaultLayout.module.scss';

import Header from '~/Layout/components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Auth from '~/Components/Common/auth';
import { useEffect } from 'react';
import * as UCHistoryByUser from '~/services/UCHistoryByUser';
import { useAuth } from '~/hooks/useAuth';
import routes from '~/config/routes';
import publicRoutes from '~/routes/routes';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const music = useSelector((state) => state.musicBackground.music);

  useEffect(() => {
    publicRoutes.map((item, index) => {
      if (!item.isMusic) {
        music.pause();
        music.currentTime = 0;
      }
    });
  }, [window.location.pathname, routes]);
  const { auth } = useAuth();

  const isActiveMenuMb = useSelector((state) => state.MenuMbActive.isActive);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Auth>
      <div className={cx('wrapper-layoutdefault')}>
        <div className={isActiveMenuMb ? cx('wrapper-header', 'active') : cx('wrapper-header')}>{<Header />}</div>
        <Container>
          <Row>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} style={{ overflow: 'hidden', position: 'relative', minHeight: '100vh' }}>
              {children}
            </Col>
          </Row>
        </Container>
      </div>
    </Auth>
  );
}

export default DefaultLayout;
