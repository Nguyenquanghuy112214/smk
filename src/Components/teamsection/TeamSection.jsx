import React from 'react';
import smkapp from '~/assets/image/smkapp.png';
import smkweb from '~/assets/image/smkweb.png';
import smkmb from '~/assets/image/smkmb.jpg';

import styles from './_TeamSection.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const TeamSection = () => {
  const data = [
    {
      img: smkapp,
      name: 'BKT SmartKids PC',
      // position: 'https://smartkids.bkt.net.vn/ ',
      content:
        'Với tên gọi BKT SmartKids là một trên máy tính nhằm phục vụ cho lứa tuổi mầm non được các thầy cô sử dụng trực tiếp trong quá trình giảng dạy các bé. Tương thích với nhiều thiết bị màn hình thông minh nhằm nâng cáo quá trình giảng dạy',
    },
    {
      img: smkweb,
      name: 'BKT SmartKids Web',
      // position: 'https://smartkids.bkt.net.vn/ ',

      content: 'Đầu tư vào con người và thế hệ tương lai là sự đầu tư khôn ngoan nhất.',
    },
    {
      img: smkmb,
      name: 'BKT SmartKids Mobile',

      content:
        'Xây dựng lộ trình học tập hợp lý với từng trẻ nhỏ, dễ dàng học tập mọi lúc mọi nơi và giúp ba mẹ theo dõi quá trình học tiếng anh và dựa vào các kết quả đánh giá có trên ứng dụng.',
    },
    // {
    //   img: "https://monkeymedia.vcdn.com.vn/upload/web/img_default/dang_le_linh_chi_thumb.png",
    //   name: "Đặng Lê Linh Chi",
    //   position: "Chief Experience Officer",
    //   content:
    //     "Mối quan hệ của doanh nghiệp với khách hàng cũng giống quan hệ giữa người với người, cốt lõi vẫn là 'Thành tâm' và 'Trao giá trị'_ST_.",
    // },
  ];
  return (
    <div className={cx('background')}>
      <div className={cx('container')}>
        <div data-aos="zoom-in-up" data-aos-duration="700" className={cx('header')}>
          <h2>Các nền tảng Của BKT</h2>
          {/* <p>BKT tự hào bởi đội ngũ thành viên tâm huyết</p> */}
        </div>
        <div className={cx('row')}>
          {data.map((item, index) => (
            <div
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-duration="700"
              data-aos-delay="100"
              className={cx('col')}
              key={index}
            >
              <div className={cx('img')}>
                <img src={item.img} alt="" />
              </div>
              <div className={cx('info')}>
                <div className={cx('name')}>{item.name}</div>
                <div className={cx('position')}>{item.position}</div>
                <div className={cx('content')}>{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
