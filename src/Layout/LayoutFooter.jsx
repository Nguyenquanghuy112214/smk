import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from '~/Layout/components/Header';
import Footer from '~/Layout/components/Footer';

import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LayoutFooter.module.scss';
import Auth from '~/Components/Common/auth';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import * as UCHistoryByUser from '~/services/UCHistoryByUser';
import { useAuth } from '~/hooks/useAuth';
import { useMemo } from 'react';
import routes from '~/config/routes';
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
  }, [window.location.pathname, routes]);
  const isActiveMenuMb = useSelector((state) => state.MenuMbActive.isActive);
  const location = useLocation();
  const { auth } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Auth>
      <div className={cx('wrapper-layoutfooter', 'd-flex')}>
        <div className={isActiveMenuMb ? cx('wrapper-header', 'active') : cx('wrapper-header')}>{<Header />}</div>
        <Container>
          <Row>
            <Col xxl={11} xl={11} lg={11} md={11} sm={10} xs={10} style={{ overflow: 'hidden', position: 'relative', minHeight: '100vh' }}>
              {children}
            </Col>
            <Col xxl={1} xl={1} lg={1} md={1} sm={2} xs={2}>
              {<Footer />}
            </Col>
          </Row>
        </Container>
      </div>
    </Auth>
  );
}

export default LayoutFooter;
