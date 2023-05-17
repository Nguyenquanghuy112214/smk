import React from 'react';

import classNames from 'classnames/bind';
import styles from './_FeedBack.module.scss';
import { Container, Pagination } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Navigation } from 'swiper';
import ButtonIntro from '../ButtonIntro/ButtonIntro';
const cx = classNames.bind(styles);
function FeedBack() {
  return (
    <div className={cx('feedback')}>
      <Container>
        <Swiper
          autoplay={{ delay: 5000 }}
          navigation={true}
          pagination={true}
          loop={true}
          grabCursor={true}
          speed={900}
          modules={[EffectCreative, Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className={cx('wrapper-feedback')}>
              <div className={cx('feedback__img')}>
                <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/old_safari/phu_huynh_05.png" alt="" />
              </div>
              <div className={cx('right-feedback')}>
                <div className={cx('feedback__content')}>
                  <div className={cx('content')}>
                    <p>
                      Bé nhà mình được gần 2 tuổi nhưng bị chậm nói, từ đơn giản như ba, mẹ bé cũng không nói được. Mình cho con học tiếng
                      Anh với giải pháp Smart Kids trọn bộ, được 1 tháng thì bé bắt đầu chịu nói. 2 năm đều đặn học Smart Kids, Smart Kids
                      mỗi ngày, giờ bé có thể nói lưu loát cả tiếng Anh và tiếng Việt.
                    </p>
                  </div>
                  <div className={cx('customer')}>
                    <label className={cx('name')}>Chị Phương</label>
                    <p>Mẹ bé Đức Toàn</p>
                  </div>
                </div>
                <div className={cx('btn-but')}>
                  <div>
                    <ButtonIntro primary title="Đăng Ký Trọn Bộ" />
                  </div>
                  <ButtonIntro white title="Nhận Tư Vấn" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx('wrapper-feedback')}>
              <div className={cx('feedback__img')}>
                <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/old_safari/phu_huynh_05.png" alt="" />
              </div>
              <div className={cx('right-feedback')}>
                <div className={cx('feedback__content')}>
                  <div className={cx('content')}>
                    <p>
                      Bé nhà mình được gần 2 tuổi nhưng bị chậm nói, từ đơn giản như ba, mẹ bé cũng không nói được. Mình cho con học tiếng
                      Anh với giải pháp Smart Kids trọn bộ, được 1 tháng thì bé bắt đầu chịu nói. 2 năm đều đặn học Smart Kids, Smart Kids
                      mỗi ngày, giờ bé có thể nói lưu loát cả tiếng Anh và tiếng Việt.
                    </p>
                  </div>
                  <div className={cx('customer')}>
                    <label className={cx('name')}>Chị Phương</label>
                    <p>Mẹ bé Đức Toàn</p>
                  </div>
                </div>
                <div className={cx('btn-but')}>
                  <div>
                    <ButtonIntro primary title="Đăng Ký Trọn Bộ" />
                  </div>
                  <ButtonIntro white title="Nhận Tư Vấn" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx('wrapper-feedback')}>
              <div className={cx('feedback__img')}>
                <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/old_safari/phu_huynh_05.png" alt="" />
              </div>
              <div className={cx('right-feedback')}>
                <div className={cx('feedback__content')}>
                  <div className={cx('content')}>
                    <p>
                      Bé nhà mình được gần 2 tuổi nhưng bị chậm nói, từ đơn giản như ba, mẹ bé cũng không nói được. Mình cho con học tiếng
                      Anh với giải pháp Smart Kids trọn bộ, được 1 tháng thì bé bắt đầu chịu nói. 2 năm đều đặn học Smart Kids, Smart Kids
                      mỗi ngày, giờ bé có thể nói lưu loát cả tiếng Anh và tiếng Việt.
                    </p>
                  </div>
                  <div className={cx('customer')}>
                    <label className={cx('name')}>Chị Phương</label>
                    <p>Mẹ bé Đức Toàn</p>
                  </div>
                </div>
                <div className={cx('btn-but')}>
                  <div>
                    <ButtonIntro primary title="Đăng Ký Trọn Bộ" />
                  </div>
                  <ButtonIntro white title="Nhận Tư Vấn" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx('wrapper-feedback')}>
              <div className={cx('feedback__img')}>
                <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/old_safari/phu_huynh_05.png" alt="" />
              </div>
              <div className={cx('right-feedback')}>
                <div className={cx('feedback__content')}>
                  <div className={cx('content')}>
                    <p>
                      Bé nhà mình được gần 2 tuổi nhưng bị chậm nói, từ đơn giản như ba, mẹ bé cũng không nói được. Mình cho con học tiếng
                      Anh với giải pháp Smart Kids trọn bộ, được 1 tháng thì bé bắt đầu chịu nói. 2 năm đều đặn học Smart Kids, Smart Kids
                      mỗi ngày, giờ bé có thể nói lưu loát cả tiếng Anh và tiếng Việt.
                    </p>
                  </div>
                  <div className={cx('customer')}>
                    <label className={cx('name')}>Chị Phương</label>
                    <p>Mẹ bé Đức Toàn</p>
                  </div>
                </div>
                <div className={cx('btn-but')}>
                  <div>
                    <ButtonIntro primary title="Đăng Ký Trọn Bộ" />
                  </div>
                  <ButtonIntro white title="Nhận Tư Vấn" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
}

export default FeedBack;
