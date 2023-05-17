import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Account.module.scss';
import avatar from '~/assets/image/Account/avatar.png';
import pencil from '~/assets/image/Account/pencil.png';
import avatar2 from '~/assets/image/Account/avatar2.png';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { useEffect } from 'react';
import * as Profile from '~/services/Profile';
import { useAuth } from '~/hooks/useAuth';
import { useState } from 'react';
import moment from 'moment';
import * as Logout from '~/services/Logout';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { wrapper, container } from './Motion';
import { t } from 'i18next';

const cx = classNames.bind(styles);

const AccountEditProfile = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState();
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const nexteditprofile = () => {
    navigate(config.routes.accounteditprofile);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await Profile.profile({ headers: { Authorization: `Bearer ${auth.token}` } });
      setProfile(res.data);
    };
    fetch();
  }, []);

  const handleLogout = async () => {
    setActive(true);
  };

  const closeModal = () => {
    setActive(false);
  };

  return (
    <motion.div variants={wrapper} initial="hidden" animate="show" exit="exit" className={cx('wrapper', 'wrapper-edit')}>
      <ModalLogout onClick={closeModal} active={active} />
      <div className={cx('blur')}></div>
      <div className={cx('header')}>
        <div className={cx('header__left')}>
          <img src={avatar} alt="" />

          <div className={cx('header__left-nickname')}>
            <div className={cx('header__left-nickname__main')}>
              <h3 className={cx('nickname')}> BKT Student</h3>
              <span className={cx('id')}>id:9999</span>
            </div>
            <img className={cx('pencil')} src={pencil} alt="" />
          </div>
        </div>
      </div>

      <div className={cx('wrapper-content-account__edit')}>
        <div className={cx('img-account__edit')}>
          <img src={avatar2} alt="" />
        </div>
        <div className={cx('main-content-account__edit')}>
          <div className={cx('main-content-account__edit__name')}>{profile !== undefined && profile.fullName}</div>

          <Input type="email" text="Email" value={(profile !== undefined && profile.email) || t('Noinformation')} />
          <Input type="phone" text={t('Phonenumber')} value={(profile !== undefined && profile.phone) || t('Noinformation')} />
          <Input
            type="text"
            text={t('Dateofbirth')}
            value={(profile !== undefined && profile.dob && moment(profile.dob).format('l')) || t('Noinformation')}
          />
          <Input type="text" text={t('Sex')} value={(profile !== undefined && profile.sex) || t('Noinformation')} />
          <Input type="text" text={t('City')} value={(profile !== undefined && profile.province) || t('Noinformation')} />
          <div className={cx('wrapper-input2')}>
            <Input type="text" text={t('District')} value={(profile !== undefined && profile.district) || t('Noinformation')} />
            <Input type="text" text={t('Commune')} value={(profile !== undefined && profile.ward) || t('Noinformation')} />
          </div>
          <Input type="text" text={t('School')} value="THCS Phương Tú" />
        </div>
      </div>
      <div className={cx('wrapper-button')}>
        <button onClick={nexteditprofile} className={cx('button-update')}>
          {t('Updateinformation')}
        </button>
        <button onClick={handleLogout} className={cx('button-logout')}>
          {t('Logout')}
        </button>
      </div>
    </motion.div>
  );
};

export default AccountEditProfile;

export function Input({ type, text, value }) {
  return (
    <div className={cx('wrapper-input')}>
      <span>{text}</span>
      <input type={type} value={value} />
    </div>
  );
}

export function ModalLogout({ active, onClick }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const handleLogout = async () => {
    const res = await Logout.logout({ headers: { Authorization: `Bearer ${auth.token}` } });
    localStorage.removeItem('IDBookAge');
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <AnimatePresence>
      {active === true && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: active ? 0 : 40, opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('wrapper-modal')}
        >
          <div className={cx('modal-changepass', 'modal-changepass__sm')} onClick={() => onClick()}>
            <span className={cx('icon-close')}>
              <AiOutlineClose />
            </span>
            <div className={cx('changle-pass__title')}>Thông báo</div>
            <div className={cx('wrapper-listinput')}>Bạn có chắc chắc muốn đăng xuất ?</div>

            <div className={cx('button-modal__changepass')}>
              <button
                onClick={handleLogout}
                style={{ background: '#DBF5FF70', color: '#686666', fontWeight: 'bold' }}
                className={cx('button-logout')}
              >
                Đăng xuất
              </button>
              <button onClick={() => onClick()}>Tiếp tục</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
