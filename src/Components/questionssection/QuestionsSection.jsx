import React from 'react';

import classNames from 'classnames/bind';
import styles from './_QuestionsSection.module.scss';
const cx = classNames.bind(styles);
const QuestionsSection = () => {
  const data = [
    {
      content: 'Hướng dẫn ba mẹ cách cài đặt ứng dụng !',
    },
    {
      content: 'Giá thành của các khoá học ?',
    },
    {
      content: 'Cách đăng ký khoá học ?',
    },
    {
      content: 'Hướng dẫn tải học liệu trên ứng dụng BKT',
    },
    // {
    //   content: 'Hướng dẫn ba mẹ cài đặt ứng dụng Monkey Junior trên Máy tính/Laptop',
    // },
    // {
    //   content: 'Hướng dẫn tải học liệu trên ứng dụng Monkey Stories',
    // },
  ];
  return (
    <div className={cx('background')}>
      <div className={cx('container')}>
        <div className={cx('box')}>
          <h3 data-aos="zoom-in-up" data-aos-duration="700">
            Câu hỏi thường gặp
          </h3>
          <div data-aos="fade-up" data-aos-duration="700" className={cx('list')}>
            {data.map((item, index) => (
              <div className={cx('item')} key={index}>
                <span>{index + 1}. </span>
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsSection;
