import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Auth from '~/Components/Common/auth';
import { useEffect } from 'react';
import HeaderIT from './components/HeaderIT';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LayoutIntro.module.scss';
import FooterIt from './components/FooterIt';
import { useAuth } from '~/hooks/useAuth';
import * as UCHistoryByUser from '~/services/UCHistoryByUser';
import { useSelector } from 'react-redux';
import publicRoutes from '~/routes/routes';

const cx = classNames.bind(styles);

function LayoutIntro({ children }) {
  const music = useSelector((state) => state.musicBackground.music);

  useEffect(() => {
    publicRoutes.map((item, index) => {
      if (!item.isMusic) {
        music.pause();
        music.currentTime = 0;
      }
    });
  }, [window.location.pathname]);
  const { auth } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.pathname]);
  return (
    // <Auth>
    <div className={cx('wrapper-layoutintro')}>
      <HeaderIT />
      <Container fluid className={cx('p-0')}>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
      <FooterIt />
    </div>
    // </Auth>
  );
}

export default LayoutIntro;
