import logoHeader from '~/assets/image/logo_bkt.png';
import iconmenu from '~/assets/image/iconmenu.png';
import banner from '~/assets/image/banner.png';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import routes from '~/config/routes';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_BannerUi.module.scss';
const cx = classNames.bind(styles);
const BannerUi = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const openModal = () => {
    setActive(!active);
  };

  const handleNavigate = () => {
    navigate(routes.aboutbkt);
  };

  const ref = useRef(null);

  useEffect(() => {
    const hideProfile = (e) => {
      if (!ref.current.contains(e.target)) {
        setActive(false);
      }
    };
    document.body.addEventListener('click', hideProfile);
    return () => document.body.removeEventListener('click', hideProfile);
  }, []);
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper')}>
      <ModalMenu active={active} />
      <div className={cx('header')}>
        <div className={cx('header-left')}>
          <div className={cx('wrapper-imglogo')}>
            <img className={cx('img-logo')} src={logoHeader} alt="" />
          </div>
        </div>
        <div className={cx('header-right')}>
          <div ref={ref} onClick={openModal} className={cx('wrapper-imgiconmenu')}>
            <img className={cx('iconmenu')} src={iconmenu} alt="" />
            <MenuModal active={active} />
          </div>
        </div>
      </div>
      <div data-aos="zoom-in-right" data-aos-duration="700" className={cx('body')} style={{ backgroundImage: `url(${banner})` }}>
        <div className={cx('body-left')}>
          <div data-aos="zoom-in-right" data-aos-duration="700" data-aos-delay="300" className={cx('main-title')}>
            <div className={cx('main-title__item')}>BKT Smart Kids Language</div>
            <div className={cx('main-title__item')}>{t('Englishlearningsoftware')}</div>
            <div className={cx('main-title__item')}>{t('ForpreschoolchildrenSmartKid')}</div>
          </div>
          <div data-aos="zoom-in-up" data-aos-duration="700" data-aos-delay="500" className={cx('sub-title')}>
            <div className={cx('sub-title__item')}>{t('BKTSmartKidshelpschildrenunleashtheircreativity')} </div>
            <div className={cx('sub-title__item')}>{t('LetslearnandplayEnglishtogether')}</div>
          </div>
          <div className={cx('wrapper-button')}>
            <button onClick={handleNavigate} className={cx('button')}>
              {t('seemore')}
            </button>
          </div>
        </div>

        <div className={cx('body-right')}>
          <div className={cx('wrapper-imgbg')}>{/* <img className={cx('img-bg')} src={banner} alt="" /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default BannerUi;

function ModalMenu({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, visibility: 'hidden' }}
          animate={{ opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
          exit={{ opacity: 0 }}
          className={cx('wrapper-modal')}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuModal({ active }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ x: '8vw', visibility: 'hidden' }}
          animate={{ x: active ? 0 : '8vw', visibility: active ? 'visible' : 'hidden', transition: { delay: 0.2 } }}
          exit={{ opacity: 0 }}
          className={cx('wrapper-menumodal')}
        >
          <div onClick={() => navigate(config.routes.login)} className={cx('button-menu')}>
            {t('Login')}
          </div>
          <div onClick={() => navigate(config.routes.register)} className={cx('button-menu')}>
            {t('Createanewaccount')}
          </div>
          <div className={cx('button-menu')}>{t('Close')}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
