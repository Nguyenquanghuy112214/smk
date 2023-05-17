import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { AiFillEye } from 'react-icons/ai';
import * as UpViewStory from '~/services/UpVIewStory';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { useState } from 'react';
import family from '~/assets/image/exercies/family.png';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const PopularItem = ({ data, index }) => {
  const [img, setImg] = useState(undefined);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    await UpViewStory.upViewStory(data.idsong);

    navigate(`/historyrunvideo/${id}/${data.idsong}`);
  };
  const { t } = useTranslation();

  if (!data) return;
  else
    return (
      <div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0, transition: { delay: index * 0.2 } }}
        onClick={handleClick}
        className={cx('wrapper-popular')}
      >
        <img
          onError={() => {
            setImg(family);
          }}
          className={cx('img-popular')}
          src={img === undefined ? `https://resourcesk.bkt.net.vn/ImagesPNG/${data.image}.png` : img}
          alt=""
        />
        <div className={cx('popular-content')}>
          <span className={cx('popular-content__name')}>{data.name}</span>
          <span className={cx('popular-content__author')}>
            {t('Author')}: <strong>{data.author}</strong>
          </span>
          <span className={cx('popular-content__capacity')}>
            {t('Capacity')}: <strong>{data.timeLength}</strong>
          </span>
          <div className={cx('view')}>
            <AiFillEye /> <strong>{`${data.numberOfViews} Lượt xem`}</strong>
          </div>
        </div>
      </div>
    );
};

export default PopularItem;

export function PopularItemMain({ data }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [img, setImg] = useState(undefined);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();
  const handleClick = async () => {
    await UpViewStory.upViewStory(data !== undefined && data.idstory);

    navigate(`/historyrunpopular/${data.idstory}`);
  };

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
          <span className={cx('popular-content__name')}>{data.name}</span>
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
}
