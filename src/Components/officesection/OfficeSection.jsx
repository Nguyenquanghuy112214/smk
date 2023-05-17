import React from 'react';

import classNames from 'classnames/bind';
import styles from './_OfficeSection.module.scss';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';
const cx = classNames.bind(styles);

const OfficeSection = () => {
  const data = [
    {
      img: 'https://monkeymedia.vcdn.com.vn/upload/web/img_default/van-phong-ha-noi.jpg',
      title: 'Hanoi, Vietnam',
      adress: 'Liền kề C39 Embassy Garden, Đ. Hoàng Minh Thảo, Khu đô thị Tây Hồ Tây, Bắc Từ Liêm, Hà Nội ',
      phone: ' Hotline: 0243 752 5253 ',
      email: 'gpsdbkt@gmail.com ',
      website: 'www.bkt.net.vn',
    },
  ];
  return (
    <div className={cx('background')}>
      <div className={cx('container')}>
        <div data-aos="zoom-in-up" data-aos-duration="700" className={cx('header')}>
          <h2>Văn Phòng Của BKT</h2>
        </div>
        <div className={cx('list')}>
          {data.map((item, index) => (
            <div data-aos="fade-up" data-aos-duration="700" className={cx('office')} key={index}>
              <div className={cx('office_img')}>
                <img alt="" src={item.img} />
              </div>
              <div className={cx('office_content')}>
                <div className={cx('title')}>{item.title}</div>
                <div className={cx('address')}>
                  <i></i>
                  <p>{item.adress}</p>
                </div>
                {item.phone && (
                  <Link to="tel+:0243 752 5253" className={cx('phone')}>
                    <i></i>
                    <p>{item.phone}</p>
                  </Link>
                )}
                {item.email && (
                  <Link to="email: gpsdbkt@gmail.com" className={cx('email')}>
                    <FaEnvelope />
                    <p>{item.email}</p>
                  </Link>
                )}
                {item.website && (
                  <Link to="email: gpsdbkt@gmail.com" className={cx('email')}>
                    <GiEarthAmerica />
                    <p>{item.website}</p>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficeSection;
