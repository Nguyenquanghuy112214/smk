import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LayoutNoHeader.module.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Auth from '~/Components/Common/auth';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import * as UCHistoryByUser from '~/services/UCHistoryByUser';
import { useAuth } from '~/hooks/useAuth';
import { useMemo } from 'react';
import routes from '~/config/routes';
import { useSelector } from 'react-redux';
import publicRoutes from '~/routes/routes';

const cx = classNames.bind(styles);

function LayoutNoHeader({ children }) {
  const music = useSelector((state) => state.musicBackground.music);

  useEffect(() => {
    publicRoutes.map((item, index) => {
      if (!item.isMusic) {
        music.pause();
        music.currentTime = 0;
      }
    });
  }, [window.location.pathname, routes]);
  const location = useLocation();
  const { auth } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={cx('wrapper-layoutnoheader')}>
      <Container style={{ maxWidth: '100%' }} className={cx('p-0')}>
        <Row>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LayoutNoHeader;
