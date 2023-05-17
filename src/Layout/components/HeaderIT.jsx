import React from 'react';

// Route
import routes from '~/config/routes';
// React-icon
import { AiOutlineSearch } from 'react-icons/ai';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// Css
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_HeaderIt.module.scss';
import ButtonIntro from '~/Components/ButtonIntro/ButtonIntro';
import logo from '~/assets/image/logo_bkt.png';
import { useState } from 'react';
const cx = classNames.bind(styles);

function HeaderIT() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const handleClick = (index) => {
    setActive(index);
  };
  const menu = [
    {
      id: 0,
      title: 'Về BKT',
      link: routes.aboutbkt,
    },
    // {
    //   id: 1,
    //   title: 'Sản Phẩm',
    //   link: routes.productbkt,
    // },
    {
      id: 1,
      title: 'Hỗ trợ',
      link: routes.helpbkt,
    },
  ];

  const handleLogin = () => {
    navigate(routes.login);
  };
  return (
    <div className={cx('wrapper')}>
      <Container className={cx('container-header')}>
        <Row className={cx('row-header')}>
          <Col xxl={2} xl={2} lg={2} className={cx('col-left')}>
            <figure>
              <img style={{ cursor: 'pointer' }} onClick={() => navigate(routes.aboutbkt)} src={logo} alt="" />
            </figure>
          </Col>
          <Col xxl={10} xl={10} lg={10} className={cx('col-right')}>
            <ul className={cx('list-menu')}>
              {menu !== undefined &&
                menu.map((item, index) => {
                  return (
                    <li key={index} className={cx('menu', `${window.location.pathname === item.link ? 'active' : ''}`)}>
                      <Link onClick={() => handleClick(index)} to={item.link}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <div className={cx('wrapper-sub')}>
              <div className={cx('search-btn')}>
                <input type="text" />
                <span>
                  <AiOutlineSearch />
                </span>
              </div>
              <div className={cx('price-btn')}>
                <button>Bảng giá</button>
              </div>
              <ButtonIntro onClick={handleLogin} title="Đăng nhập" login />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeaderIT;
