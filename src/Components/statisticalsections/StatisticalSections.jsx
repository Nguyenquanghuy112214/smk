import React from 'react';

import classNames from 'classnames/bind';
import { FaChevronRight } from 'react-icons/fa';
import styles from './_StatisticalSections.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
const StatisticalSections = () => {
  const data = [
    {
      img: 'https://monkeymedia.vcdn.com.vn/upload/web/img_default/star2.png',
      title: '10+',
      text: 'Năm kinh nghiệm.',
    },
    {
      img: 'https://monkeymedia.vcdn.com.vn/upload/web/img_default/icon-top.svg',
      title: ' 98% ',
      text: 'Giáo Viên hài lòng',
    },
    {
      img: 'https://monkeymedia.vcdn.com.vn/upload/web/img_default/person.svg',
      title: '90K+',
      text: ' Giáo Viên sử dụng',
    },
    {
      img: 'https://monkeymedia.vcdn.com.vn/upload/web/img_default/path.svg',
      title: ' 100+',
      text: 'Nhân sự tận tâm',
    },
  ];
  return (
    <div data-aos="fade-up" data-aos-duration="700" className={cx('background')}>
      <div className={cx('container')}>
        <div className={cx('row')}>
          {data.map((item, index) => (
            <div className={cx('col')} key={index}>
              <div>
                <span>
                  <i style={{ backgroundImage: `url(${item.img})` }}></i> {item.title}
                </span>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/" className={cx('btn')}>
          Những Cột Mốc Tiêu Biểu <FaChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default StatisticalSections;
