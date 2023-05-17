import React from 'react';

import classNames from 'classnames/bind';
import styles from './_ForSection.module.scss';
import iconcheck from '~/assets/imgintro/iconcheck.png';
const cx = classNames.bind(styles);

const ForSection = () => {
  const data = [
    {
      text: 'BKT Smart Kids dành cho trẻ em từ 18 tháng tuổi – 10 tuổi áp dụng các phương pháp giáo dục sớm, lấy sự phát triển của trẻ làm trung tâm, xây dựng môi trường học thông minh và hiện đại.',
    },
    {
      text: 'BKT Smart Kids giúp trẻ học giỏi tiếng Anh trước khi bước vào cấp 1, thành thạo 4 kĩ năng: nghe, nói, đọc, viết, khơi dậy nguồn đam mê, học mà chơi, chơi mà học, giúp trẻ em thông minh hơn với tiềm năng vốn có.',
    },
    {
      text: 'BKT Smart Kids giáo trình được biên soạn kĩ lưỡng, kết hợp với nhiều phương pháp như Phonics giúp bé có thể luyện, và nhận biết mặt chữ từ khi còn bé bằng Flashcard, phương pháp dạy và học tiếng anh phù hợp với độ tuổi của bé.',
    },
    {
      text: 'BKT Smart Kids giúp các trẻ tiếp cận từ mới thông qua hình ảnh và trương tác với nhiều từ mới, mẫu câu được giới thiệu theo ngữ cảnh một cách tự nhiên, luyện nghe, nói  giúp các bé dễ nhận biết, hình dung và ghi nhớ từ lâu hơn từ đó trẻ phát triển toàn diện về cả tư duy lẫn ngoại ngữ.',
    },
    {
      text: 'Những gia đình chưa có định hướng học tập cho trẻ, BKT sẽ giúp ba mẹ thấu hiểu xác định chính xác để xây dựng nên một lộ trình học tiếng Anh chuẩn cho trẻ dựa vào độ tuổi và sở thích của trẻ từ đó xây dựng nên một môi trường học tập đầy hứng thú và linh hoạt.',
    },
  ];
  return (
    <div className={cx('background')}>
      <div className={cx('container')}>
        <div className={cx('row')}>
          <div data-aos="fade-up" data-aos-duration="700" className={cx('col')}>
            <h2 className={cx('text')}>BKT Smart Dành Cho Ai?</h2>
            <div>
              {data.map((item, index) => (
                <div className={cx('li')} key={index}>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div data-aos="fade-down" data-aos-duration="700" className={cx('col')}>
            <div className={cx('img')}>
              <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/img-mk1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForSection;
