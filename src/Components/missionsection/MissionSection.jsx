import React from 'react';

import classNames from 'classnames/bind';
import styles from './_MissionSection.module.scss';
import anh1 from '~/assets/imgintro/about.png';
const cx = classNames.bind(styles);

const MissionSection = () => {
  const data = [
    {
      text: 'Với các tính năng tương tác của phần mềm linh hoạt, dễ dàng thao tác và sử dụng cho tất cả các lứa tuổi. Nâng cao hứng thú, động lực của người dùng thông qua nhiều bài giảng thú vị và thiết thực, được chia làm các chủ đề cụ thể, xây dựng qua nhiều hình thức học tập khác nhau.',
    },
    {
      text: 'Người dùng sẽ cảm thấy dễ dàng, tự tin hơn khi sử dụng phần mềm: Thiết kế gần gũi với nhận thức của người dùng, tiếp cận nhanh với mọi tính năng của phần mềm.',
    },
    {
      text: 'Thay vì loay hoay cho việc nghiên cứu, tìm kiếm tài liệu học tập – giảng dạy. Phần mềm là lựa chọn tuyệt vời giúp bạn tiết kiệm rất nhiều thời gian; sử dụng triệt để các tính năng của phần mềm.',
    },
  ];
  return (
    <div data-aos="fade-up" data-aos-duration="700" className={cx('background')}>
      <div className={cx('container')}>
        <div data-aos="zoom-in-up" data-aos-duration="700" className={cx('header')}>
          <h2>Sứ Mệnh Của BKT Smart Kids</h2>
        </div>
        <div className={cx('container')}>
          <div className={cx('row')}>
            <div className={cx('col')}>
              <div className={cx('img')}>
                {/* <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/monkey2.png" alt="" /> */}
                <img src={anh1} alt="" />
              </div>
              <div className={cx('content')}>
                Với các tính năng tương tác của phần mềm linh hoạt, áp dụng cho tất cả các lứa tuổi, Nâng cao hứng thú, động lực của người
                dùng thông qua các công cụ đa chức năng và các chủ đề phong phú, đơn giản hóa thao tác sử dụng.
              </div>
            </div>
            <div className={cx('col')}>
              <div className={cx('reason')}>
                <span>Tại BKT Smart Kids, chúng tôi tin rằng:</span>
                {data.map((item, index) => (
                  <div className={cx('item')} key={index}>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
