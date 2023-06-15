import React from 'react';

import nv from '~/assets/image/AlphaPage/nv.png';
import speak2 from '~/assets/image/AlphaPage/speak2.png';
import kh from '~/assets/image/AlphaPage/kh.png';
import record from '~/assets/image/AlphaPage/record.png';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { TypingText } from './TypingText';
import { motion } from 'framer-motion';
import classNames from 'classnames/bind';
import styles from './_ModalDetailAlphaNumberSection.module.scss';
import { moveDetail, planetVariants, staggerContainer } from '~/constant/motion';
import * as GetAllAlpha from '~/services/GetAllAlpha';
import * as GetAllNumber from '~/services/GetAllNumber';
import * as GetAllColor from '~/services/GetAllColor';

import { useParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
const cx = classNames.bind(styles);
function ModalDetailAlphaNumberSection({ children, onCickLeft, onCickRight }) {
  const { type, alpha, color, number, idalpha, idcolor, idnumber } = useParams();
  const handleClickLeft = () => {
    console.log('1');
    onCickLeft();
  };
  const handleClickRight = () => {
    console.log('2');

    onCickRight();
  };
  const [data, setData] = useState();
  console.log('data', data);
  useEffect(() => {
    const fetch = async () => {
      const res = await GetAllAlpha.getAllAlpha();
      const respone = res.data.find((x) => x.id === idalpha);
      setData(respone);
    };
    const fetch2 = async () => {
      const res = await GetAllColor.getAllColor();
      const respone = res.data.find((x) => x.id === idcolor);
      setData(respone);
    };
    const fetch3 = async () => {
      const res = await GetAllNumber.getAllNumber();
      const respone = res.data.find((x) => x.id === idnumber);
      setData(respone);
    };
    if (idalpha) {
      fetch();
    } else if (idcolor) {
      fetch2();
    } else {
      fetch3();
    }
  }, [idalpha, idcolor, idnumber]);
  const audio = useMemo(() => {
    return new Audio(data !== undefined && data.audio !== undefined && data.audio);
  }, [idalpha, idcolor, idnumber, data]);
  useEffect(() => {
    const timer = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }, [600]);
    return () => clearTimeout(timer);
  }, [audio]);
  const handleSpeak = () => {
    console.log('audio', audio);
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };
  if (!data) return null;
  return (
    <motion.div
      // variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={cx('wrapper')}
    >
      <div className={cx('helper')}>
        <img src={nv} alt="" />
        <TypingText
          title={`Hãy ghi âm ${idalpha ? 'chữ' : idcolor ? 'màu' : idnumber ? 'Số' : ''} '${
            alpha || color || number
          }' để cùng luyện từ với SmartKid nhé`}
        />
      </div>
      <div className={cx('content')}>
        <motion.div
          // variants={moveDetail('left')}
          className={cx('content-left')}
        >
          {children}
        </motion.div>
        <motion.div variants={moveDetail()} className={cx('content-right')}>
          <div className={cx('main-content')}>
            <span className={cx('alpha')}>{data.name}</span>
            <span className={cx('spelling')}>{data.pronounce}</span>
            <img style={{ cursor: 'pointer' }} onClick={handleSpeak} src={speak2} alt="" />
          </div>
          <div className={cx('wrapper-example')}>
            <div className={cx('example')}>Câu ví dụ</div>
            <div className={cx('list-example')}>
              {data !== undefined &&
                data.detailAlphabetViewModel !== undefined &&
                data.detailAlphabetViewModel.map((item, index) => {
                  return (
                    <>
                      <div className={cx('vn')}>{item.sampleVn}</div>
                      <div className={cx('en')}>"{item.sampleEn}"</div>
                    </>
                  );
                })}
            </div>
          </div>
        </motion.div>
      </div>
      <div className={cx('list-navigate')}>
        <div className={cx('ga')}>
          <Tippy placement="top" animation="scale" content="Ghi âm">
            <img onClick={handleClickLeft} src={record} alt="" />
          </Tippy>
        </div>
        <div className={cx('ga')}>
          <Tippy placement="top" animation="scale" content="Khẩu hình">
            <img onClick={handleClickRight} src={kh} alt="" />
          </Tippy>
        </div>
      </div>
    </motion.div>
  );
}

export default ModalDetailAlphaNumberSection;
