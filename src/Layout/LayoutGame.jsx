import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LayoutNoHeader.module.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { useSelector } from 'react-redux';
import publicRoutes from '~/routes/routes';

const cx = classNames.bind(styles);

function LayoutGame({ children }) {
  const music = useSelector((state) => state.musicBackground.music);
  const isToggle = useSelector((state) => state.toggleMusic.isActive);

  useEffect(() => {
    publicRoutes.map((item, index) => {
      if (item.isMusic === true) {
        music.pause();
        music.currentTime = 0;
        music.play();
        music.loop = true;
        music.volume = 0.22;
      } else if (item.isMusic === false) {
        music.pause();
        music.currentTime = 0;
      } else if (isToggle === false) {
        music.pause();
      }
    });
  }, [isToggle]);

  const location = useLocation();

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

export default LayoutGame;
