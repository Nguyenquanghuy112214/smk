import React from 'react';

import alpha from '~/assets/image/AlphaPage/alpha.png';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AlphaPageSection from '~/Components/AlphaNumberPageSection/AlphaNumberPageSection';
import { lefttoRight, staggerContainer, zoomIn } from '~/constant/motion';
import routes from '~/config/routes';
import classNames from 'classnames/bind';
import styles from './_ListAlphaPage.module.scss';
import ModalSpeakAlpha from '~/Components/ModalSpeakAlphaNumber/ModalSpeakAlphaNumber';
import useComponentVisible from '~/hooks/useComponentVisible';
import { useEffect } from 'react';
import { useCallback } from 'react';
import * as GetAllAlpha from '~/services/GetAllAlpha';
import Loading from '~/Components/animationloading/Animationloading';
const cx = classNames.bind(styles);
function ListAlphaPage() {
  const [data, setData] = useState([]);
  const [dataActive, setDataActive] = useState();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const handleChonse = (item) => {
    setIsComponentVisible(true);
    setDataActive(item);
  };
  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false);
    }
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const res = await GetAllAlpha.getAllAlpha();
      setData(res.data);
    };
    fetch();
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);
  if (!data) return null;
  return (
    <AlphaPageSection title="Học Bảng Chữ Cái" path={routes.alphastartpage}>
      <Loading opa={0.6} active={data !== undefined && data.length === 0 ? true : false} />
      <ModalSpeakAlpha dataActive={dataActive} active={isComponentVisible} ref={ref} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.25 }}
        className={cx('list-alpha')}
      >
        {data.map((item, index) => (
          <motion.div variants={zoomIn(0, 1, 0.8)} key={index} className={cx('alpha-item')}>
            <img onClick={() => handleChonse(item)} src={item.thumbnail} alt="" />
          </motion.div>
        ))}
      </motion.div>
    </AlphaPageSection>
  );
}

export default ListAlphaPage;
