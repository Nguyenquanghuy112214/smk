import React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AlphaNumberPageSection from '~/Components/AlphaNumberPageSection/AlphaNumberPageSection';
import { staggerContainer, zoomIn } from '~/constant/motion';
import routes from '~/config/routes';
import classNames from 'classnames/bind';
import styles from './_ListNumberPage.module.scss';
import useComponentVisible from '~/hooks/useComponentVisible';
import { useEffect, useCallback } from 'react';
import { listimg } from './listimg';
import * as GetAllNumber from '~/services/GetAllNumber';

import ModalSpeakAlphaNumber from '~/Components/ModalSpeakAlphaNumber/ModalSpeakAlphaNumber';
import Loading from '~/Components/animationloading/Animationloading';

const cx = classNames.bind(styles);
function ListNumberPage() {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [data, setData] = useState([]);
  const [dataActive, setDataActive] = useState();

  console.log('data', data);
  const handleChonse = (item) => {
    setIsComponentVisible(true);
    setDataActive(item);
  };
  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false);
    }
  }, []);
  const array = [0.3, 0.5, 0.1, 0.7, 0.9, 1.7, 1.3, 1.9, 2.1];

  useEffect(() => {
    const fetch = async () => {
      const res = await GetAllNumber.getAllNumber();
      console.log('res', res);

      const respone = res.data.map((item, index) => {
        return { ...item, delay: array[index] };
      });
      setData(respone);
    };
    fetch();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  return (
    <AlphaNumberPageSection title="Học Số Đếm" path={routes.numberstartpage}>
      <Loading opa={0.6} active={data !== undefined && data.length === 0 ? true : false} />

      <ModalSpeakAlphaNumber dataActive={dataActive} active={isComponentVisible} ref={ref} />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        viewport={{ once: false, amount: 0.25 }}
        className={cx('wrapper')}
      >
        {data !== undefined &&
          data.map((item, index) => {
            return (
              <motion.img
                onClick={() => handleChonse(item)}
                variants={zoomIn(item.delay - 0.1, 1, 0)}
                key={index}
                className={cx(`img${index}`, 'img')}
                src={item.thumbnail}
                alt=""
              />
            );
          })}
      </motion.div>
    </AlphaNumberPageSection>
  );
}

export default ListNumberPage;
