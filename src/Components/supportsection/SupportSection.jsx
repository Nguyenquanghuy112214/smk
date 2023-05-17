import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./_SupportSection.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const SupportSection = () => {
  const data = [
    {
      link: "/support",
      phone: true,
      img: "https://monkeymedia.vcdn.com.vn/upload/web/img_default/icon-phone.svg",
    },
    {
      link: "/",
      img: "https://vnmedia.monkeyuni.net/upload/web/img_default/icon-mail.svg",
    },
    {
      link: "/",
      img: "https://vnmedia.monkeyuni.net/upload/web/img_default/icon-zalo.svg",
    },
    {
      link: "/",
      img: "https://vnmedia.monkeyuni.net/upload/web/img_default/icon-facebook1.svg",
    },
  ];
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    setPhone(false);

    return () => {
      setPhone(false);
    };
  }, []);

  const onPhone = () => {
    setPhone(true);
  };
  const onPhoneFalse = () => {
    setPhone(false);
  };
  return (
    <div className={cx("background")}>
      <div className={cx("container")}>
        <div className={cx("contact")}>
          <h4>
            Ba mẹ có thêm câu hỏi khác? <br />
            Hãy đặt câu hỏi ngay tại đây.
          </h4>
          <div className={cx("list")}>
            {data.map((item, index) => (
              <Link
                onClick={item.phone == true ? onPhone : ""}
                to={item.link}
                className={cx("link")}
                key={index}
              >
                <img src={item.img} alt="phone" />
              </Link>
            ))}
          </div>
          {phone && (
            <div className={cx("model")}>
              <div className={cx("back")}>
                <div className={cx("box")}>
                  <div className={cx("content")}>
                    <div>
                      <h4>Hotline 1900 6360 52</h4>
                      <p>Từ 7h00 - 22h00 các ngày trong tuần</p>
                      <button onClick={onPhoneFalse}>Đóng</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
