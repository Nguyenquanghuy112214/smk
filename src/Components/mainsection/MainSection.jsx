import React from 'react';
import classNames from 'classnames/bind';
import styles from './_MainSection.module.scss';
import anh1 from '~/assets/imgintro/pngegg.png';
const cx = classNames.bind(styles);
const MainSection = () => {
  return (
    <div className={cx('background')}>
      <div className={cx('container')}>
        <div className={cx('row')}>
          <div data-aos="fade-right" data-aos-duration="700" className={cx('col')}>
            <div className={cx('intro')}>
              <h1>Về BKT Smart Kids</h1>
              <p>
                BKT Smart Kids Cung cấp ứng dụng số 1 về tiếng anh và Giáo Dục sớm cho trẻ em. Mỗi sản phầm của BKT mang đến tính năng mới,
                kho dữ liệu: Chủ đề, từ vựng, bài giảng, câu truyện, bài hát và trò chơi với tính năng tự động cập nhật cho khách hàng.
              </p>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-duration="700" className={cx('col')}>
            <div className={cx('img')}>
              <img
                data-src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/img-intro.png"
                className=" lazyloaded"
                alt="Về Smart Kids"
                src={anh1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
