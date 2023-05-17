import React from 'react';
import smkapp from '~/assets/image/smkapp.png';
import smkweb from '~/assets/image/smkweb.png';
import smkmb from '~/assets/image/smkmb.jpg';
// Ytb
import YouTube from 'react-youtube';
// Import motion
import { motion, AnimatePresence } from 'framer-motion';

// Reacticon
import { Container } from 'react-bootstrap';

import ButtonIntro from '../ButtonIntro/ButtonIntro';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './_Product.module.scss';
const cx = classNames.bind(styles);
function Product() {
  const [activeVideo, setActiveVideo] = useState(false);
  const handleVideo = () => {
    setActiveVideo(!activeVideo);
  };
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div>
      <Container fluid className={cx('wrapper-product')}>
        <Container>
          <div className={cx('product')}>
            <h1 data-aos="zoom-in-up" data-aos-duration="700" className={cx('title')}>
              Bộ ứng dựng học tập của BKT
            </h1>
            <ul data-aos="fade-up" data-aos-duration="700" className={cx('product__list')}>
              <li>
                <div className={cx('product__img')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/monkey-j1.svg" alt="" />
                </div>
                <div className={cx('product__content')}>
                  <h4>BKT English For SmartKids </h4>
                  <p>Học tiếng anh theo Chương Trình Giáo Dục phổ Thông mới cho Trẻ Mầm Non.</p>
                </div>
              </li>
              <li>
                <div className={cx('product__img')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/monkey-j1.svg" alt="" />
                </div>
                <div className={cx('product__content')}>
                  <h4>BKT Smart English TH </h4>
                  <p>Học tiếng anh theo Chương Trình Giáo Dục phổ Thông mới cho học sinh tiểu học.</p>
                </div>
              </li>
              <li>
                <div className={cx('product__img')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/monkey-j1.svg" alt="" />
                </div>
                <div className={cx('product__content')}>
                  <h4>BKT Smart English THCS </h4>
                  <p>Học tiếng anh theo Chương Trình Giáo Dục phổ Thông mới cho học sinh THCS.</p>
                </div>
              </li>
              <li>
                <div className={cx('product__img')}>
                  <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/monkey-j1.svg" alt="" />
                </div>
                <div className={cx('product__content')}>
                  <h4>BKT Smart English THPT</h4>
                  <p> Học tiếng anh theo Chương Trình Giáo Dục phổ Thông mới cho học sinh THPT.</p>
                </div>
              </li>
            </ul>
            <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="300" className={cx('box-btn')}>
              <div>
                <ButtonIntro title="Đăng Ký Trọn Bộ" primary />
              </div>
              <ButtonIntro title="Nhận Tư Vấn" white />
            </div>
            {/* video */}
            <div data-aos="fade-up" data-aos-duration="700" className={cx('video')}>
              <AnimatePresence>
                {!activeVideo && (
                  <div
                    initial={{ opacity: 1, x: 0, visibility: 'visible' }}
                    animate={{ opacity: !activeVideo ? 1 : 0, x: activeVideo ? 120 : 0, visibility: !activeVideo ? 'visible' : 'hidden' }}
                    onClick={handleVideo}
                  >
                    <div className={cx('video__thumb')}>
                      <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/img-thumb-video.jpg" alt="" />
                    </div>
                    <div className={cx('video__play')}>
                      <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/play.svg" alt="" />
                    </div>
                  </div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                <div
                  initial={{ y: -50, opacity: 0, visibility: 'hidden' }}
                  animate={{ opacity: activeVideo ? 1 : 0, y: activeVideo ? 0 : -50, visibility: activeVideo ? 'visible' : 'hidden' }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className={cx('video-ytb')}
                >
                  {activeVideo && <YouTube className={cx('iframe')} videoId="Bq4zy3vq8Ko" opts={opts} />}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default Product;
