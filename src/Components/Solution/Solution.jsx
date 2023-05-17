import React from 'react';

// Css
import classNames from 'classnames/bind';
import styles from './_Solution.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonIntro from '../ButtonIntro/ButtonIntro';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Solution() {
  return (
    <div className={cx('monkey-solution')}>
      <Container>
        <Row>
          <Col data-aos="fade-right" data-aos-duration="700" xxl={5} xl={5} className={cx('col-solution')}>
            <h2>Giải Pháp Giúp Con Phát Triển Toàn Diện Tư Duy Và Ngôn Ngữ</h2>
            <div className={cx('box-btn')}>
              <div>
                <ButtonIntro title="Đăng Ký Trọn Bộ" primary />
              </div>
              <ButtonIntro title="Nhận Tư Vấn" white />
            </div>
          </Col>
          <Col data-aos="fade-left" data-aos-duration="700" xxl={7} xl={7} className={cx('col-solution-bot')}>
            <Item title="Xây dựng chương trình mầm non theo các độ tuổi" />
            <Item title="Luyện nghe hiệu quả " />
            <Item title="Luyện nói trôi chảy  " />
            <Item title="Trò chơi tư duy" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Solution;

export const Item = ({ title }) => {
  return (
    <div className={cx('item')}>
      <article className={cx('solution')}>
        <Link to="/">
          <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/img-sp4.jpg" alt="" />
        </Link>
        <div className={cx('solution__content')}>
          <h3>
            <Link to="/"> {title}</Link>
          </h3>
        </div>
      </article>
    </div>
  );
};
