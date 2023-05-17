import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import { useNavigate } from 'react-router-dom';
import * as UpViewVideo from '~/services/UpVIewVIdeo';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { AiFillEye } from 'react-icons/ai';

import family from '~/assets/image/exercies/family.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);
const PopularItem = ({ data }) => {
  const [img, setImg] = useState(undefined);
  const navigate = useNavigate();
  const handleClick = async () => {
    const res = await UpViewVideo.upViewVideo(data !== undefined && data.idvideo);

    navigate(`/videorunvideo/${data.idcategoryVideo}/${data.idvideo}`);
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useTranslation();
  if (!data) return;
  else
    return (
      <div
        ref={ref}
        style={{
          transform: isInView ? 'none' : 'translateY(100px)',
          opacity: isInView ? 1 : 0,
          transition: `all 1s cubic-bezier(0.17, 0.55, 0.55, 1)`,
        }}
        onClick={handleClick}
        className={cx('wrapper-popular')}
      >
        <img
          onError={() => {
            setImg(family);
          }}
          className={cx('img-popular')}
          src={img === undefined ? data.thumbnail : img}
          alt=""
        />
        <div className={cx('popular-content')}>
          <span className={cx('popular-content__name')}>{data.nameVn}</span>
          <div className={cx('content-footer')}>
            <span className={cx('popular-content__author')}>
              {t('Author')}: <strong>{data.author}</strong>
            </span>
            <span className={cx('popular-content__capacity')}>
              {t('Capacity')}: <strong>{data.timeLength}</strong>
            </span>
            <div className={cx('view')}>
              <AiFillEye /> <strong>{`${data.numberOfViews} ${t('Views')}`}</strong>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PopularItem;
