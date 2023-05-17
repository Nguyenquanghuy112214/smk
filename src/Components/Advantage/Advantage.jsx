import React from 'react';

// css
import classNames from 'classnames/bind';
import styles from './_Advantage.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonIntro from '../ButtonIntro/ButtonIntro';
const cx = classNames.bind(styles);
function Advantage() {
  return (
    <div className={cx('advantage')}>
      <Container>
        <div data-aos="zoom-in-up" data-aos-duration="700" className={cx('header')}>
          <h2 className={cx('title')}>Đặc Quyền Khi Sở Hữu Khóa Học Của BKT</h2>
        </div>
        <Row data-aos="fade-up" data-aos-duration="700" data-aos-delay="300">
          <Col lg={6} md={6} className={cx('col-advantage')}>
            <ul>
              <li>
                <div className={cx('icon')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/saleoff.svg" alt="" />
                </div>
                <p>Ưu tiên trong việc được cập nhật học liệu mới</p>
              </li>
              <li>
                <div className={cx('icon')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/gift.svg" alt="" />
                </div>
                <p>Trở Thành Học Viên Thân Thiết Của BKT với nhiều hỗ trợ & quà tặng trong quá trình học tập</p>
              </li>
              <li>
                <div className={cx('icon')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/prioritized.svg" alt="" />
                </div>
                <p>Nắm bắt kiến thức theo dễ dàng</p>
              </li>
            </ul>
          </Col>
          <Col lg={6} md={6} className={cx('col-advantage-bottom')}>
            <div className={cx('img-wrapper')}>
              <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/monkey-abc.png" alt="" />
            </div>
            <div className={cx('btn-box')}>
              <div>
                <ButtonIntro title="Đăng Ký Trọn Bộ" primary />
              </div>

              <ButtonIntro title="Nhận Tư Vấn Miễn Phí" white />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Advantage;
