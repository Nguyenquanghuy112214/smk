import React from 'react';
// react-icon
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';
// css
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_FooterIt.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
const cx = classNames.bind(styles);
function FooterIt() {
  return (
    <div className={cx('wrapper-footer')}>
      <Container className={cx('container-footer')}>
        <Row className={cx('row-footer-top')}>
          <Col xxl={2} xl={2} lg={3} className={cx('col-footer')}>
            <div className={cx('col-left-top')}>
              <h4>Công ty CPĐTTM và công nghệ BKT</h4>
              <div className={cx('wrapper-phone')}>
                <span>
                  <BsFillTelephoneFill />
                </span>
                <span> 0243 752 5253 </span>
              </div>
            </div>
          </Col>
          <Col xxl={10} xl={10} lg={9}>
            <div className={cx('col-right-top')}>
              <p>Trụ sở chính: Liền kề C39 Embassy Garden, Đ. Hoàng Minh Thảo, Khu đô thị Tây Hồ Tây, Bắc Từ Liêm, Hà Nội</p>
              <p>Chi nhánh: Số 15 Ngô Thì Nhậm, Phường Ngọc Trạo, TP Thanh Hóa, Tỉnh Thanh Hóa</p>
              <p>Chi nhánh: 22/35 Thúc Tề, Phường Hòa Khê, Q.Thanh Khê, TP Đà Nẵng</p>
              <p>Chi nhánh: 49 Trần Anh Tông, TP Quy Nhơn, Tỉnh Bình Định</p>
            </div>
          </Col>
        </Row>
        <Row className={cx('col-footer-bot')}>
          <Col xxl={4} xl={4} className={cx('col-bot')}>
            <div className={cx('location-icon')}>
              <MdLocationOn />
            </div>
            <div style={{ height: 'min-content' }} className={cx('location-content')}>
              <span className={cx('span')}>
                Trụ sở chính: Liền kề C39 Embassy Garden, Đ. Hoàng Minh Thảo, Khu đô thị Tây Hồ Tây, Bắc Từ Liêm, Hà Nội
              </span>
            </div>
          </Col>
          <Col xxl={4} xl={4} className={cx('col-bot')}>
            <div className={cx('location-icon')}>
              <FaPhoneAlt />
            </div>
            <div style={{ height: 'min-content' }} className={cx('location-content')}>
              <span className={cx('span')}>Hotline kinh doanh: 086 817 9599</span>
            </div>
          </Col>
          <Col xxl={4} xl={4} className={cx('col-bot')}>
            <div className={cx('location-icon')}>
              <GiEarthAmerica />
            </div>
            <div style={{ height: 'min-content' }} className={cx('location-content')}>
              <span className={cx('span')}>
                Điện thoại: 0243 752 5253
                <br />
                Hotline kỹ thuật 24/7: 033 721 8868
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FooterIt;
