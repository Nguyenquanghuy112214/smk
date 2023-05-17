import React from 'react';
import classNames from 'classnames/bind';
import styles from './_Feature.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonIntro from '../ButtonIntro/ButtonIntro';
const cx = classNames.bind(styles);
function Feature() {
  return (
    <div className={cx('feature')}>
      <Container>
        <Row className={cx('row-fe')}>
          <Col data-aos="fade-up" data-aos-duration="700" lg={3} md={6} className={cx('col-fe')}>
            <div className={cx('wrapper-item')}>
              <div className={cx('feature-item')}>
                <div className={cx('feature__img')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/device.svg" alt="" />
                </div>
              </div>
              <div className={cx('feature__content')}>
                <span className={cx('title')}>Thiết bị</span>
                <p>Không giới hạn số thiết bị đăng nhập.</p>
              </div>
            </div>
          </Col>
          <Col data-aos="fade-down" data-aos-duration="700" lg={3} md={6} className={cx('col-fe')}>
            <div className={cx('wrapper-item')}>
              <div className={cx('feature-item')}>
                <div className={cx('feature__img')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/group.svg" alt="" />
                </div>
              </div>
              <div className={cx('feature__content')}>
                <span className={cx('title')}>Hồ sơ người học</span>
                <p>Tạo nhiều hồ sơ người học trên một tài khoản, giúp ba mẹ tiết kiệm chi phí.</p>
              </div>
            </div>
          </Col>
          <Col data-aos="fade-up" data-aos-duration="700" lg={3} md={6} className={cx('col-fe')}>
            <div className={cx('wrapper-item')}>
              <div className={cx('feature-item')}>
                <div className={cx('feature__img')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/nointernet.svg" alt="" />
                </div>
              </div>
              <div className={cx('feature__content')}>
                <span className={cx('title')}>Không kết nối internet</span>
                <p>Sử dụng ứng dụng ngay cả khi không kết nối internet.</p>
              </div>
            </div>
          </Col>
          <Col data-aos="fade-down" data-aos-duration="700" lg={3} md={6} className={cx('col-fe')}>
            <div className={cx('wrapper-item')}>
              <div className={cx('feature-item')}>
                <div className={cx('feature__img')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/synchronized.svg" alt="" />
                </div>
              </div>
              <div className={cx('feature__content')}>
                <span className={cx('title')}>Đồng bộ hóa</span>
                <p>Tự động đồng bộ tiến độ học tập trên tất cả các thiết bị.</p>
              </div>
            </div>
          </Col>
          <div className={cx('btn-but')}>
            <ButtonIntro title="Đăng Ký Trọn Bộ" primary />
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Feature;
