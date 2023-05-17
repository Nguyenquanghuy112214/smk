import React from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Contact.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import imgmain from '~/assets/image/Contact/imgmain.png';
import icon1 from '~/assets/image/Contact/icon1.png';
import icon2 from '~/assets/image/Contact/icon2.png';
import icon3 from '~/assets/image/Contact/icon3.png';
import { AiOutlineClose } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

const Contact = ({ active, onClick }) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: active ? 0 : 40, opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('modal')}
        >
          <div className={cx('wrapper')}>
            <span onClick={() => onClick()} className={cx('icon-close')}>
              <AiOutlineClose />
            </span>
            <div className={cx('title')}>{t('BKTOnlineSupportCenter')}</div>
            <div className={cx('content-top')}>
              <div className={cx('img')}>
                <img src={imgmain} alt="" />
              </div>
              <div className={cx('question')}>{t('Askusauestion')}</div>
            </div>
            <div className={cx('content-body')}>
              <div className={cx('text-img')}>{t('BKTsupportservice')}</div>
              <div className={cx('button')}>
                <button>{t('Chatnow')}</button>
              </div>
            </div>
            <div className={cx('footer')}>
              <FooterItem img={icon1} textmain={t('CustomerCareCenter')} subtext="19001008" />
              <FooterItem img={icon2} textmain="Email" subtext="dvcskh@bkt.com" />
              <FooterItem img={icon3} textmain={t('Address')} subtext="Khu biệt thự liền kề" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Contact;

export function FooterItem({ img, textmain, subtext }) {
  const { t } = useTranslation();

  return (
    <div className={cx('footer-item')}>
      <div className={cx('img-footer')}>
        <img src={img} alt="" />
      </div>
      <div className={cx('content-footer')}>
        <span>{textmain}</span>
        <p>{subtext}</p>
      </div>
      <div className={cx('contact')}>{t('menu5')}</div>
    </div>
  );
}
