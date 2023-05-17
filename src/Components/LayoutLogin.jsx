import classNames from 'classnames/bind';
import styles from '~/sass/Components/_RegisterAndLogin.module.scss';
import logo from '~/assets/image/logo_bkt.png';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function LayoutLogin({ children, sm }) {
  const [col, setCol] = useState(false);
  const [userinfo, setUserInfo] = useState(false);
  const location = useLocation();
  useLayoutEffect(() => {
    if (location.pathname === '/login') {
      setCol(true);
    } else if (location.pathname === '/userinfo') {
      setUserInfo(true);
    }
  }, [location]);
  if (userinfo) {
    return (
      <div className={cx('wrapper')}>
        <div style={{ display: 'flex', justifyContent: ' center' }} className={cx('logo')}>
          <img style={{ width: '240px' }} src={logo} alt="" />
        </div>
        <Row className="justify-content-center">
          <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
            <div style={{ display: 'block', backgroundColor: 'transparent' }} className={cx('wrapper-form')}>
              {children}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo')}>
        <img src={logo} alt="" />
      </div>
      <Row className="justify-content-center">
        <Col xxl={col ? 6 : 6} xl={col ? 6 : 8} lg={col ? 8 : 7} md={col ? 8 : 12} sm={12} xs={7}>
          <div className={cx('wrapper-form', `${sm ? 'smform' : ''}`)}>{children}</div>
        </Col>
      </Row>
    </div>
  );
}

export default LayoutLogin;
