import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LearningAndConversationPage.module.scss';
import { AiFillEye } from 'react-icons/ai';
import anh1 from '~/assets/image/section/1.png';
import ModalLesson from './ModalLesson';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalMusic } from '~/Redux/CloseModalTopicSlice';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import family from '~/assets/image/exercies/family.png';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function ButtonMusic({ data, index }) {
  const [img, setImg] = useState(undefined);
  const { t } = useTranslation();
  const { id } = useParams();
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openModalMusic = () => {
    navigate(`/learning/${id}/${data !== undefined && data.idsong}/music/${name}/${data !== undefined && data.name}`);
    dispatch(setModalMusic(true));
  };

  const item = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        delay: index * 0.2,
      },
    },
  };
  return (
    <motion.div variants={item} initial="hidden" animate="show" style={{ width: '80%' }}>
      {/* <ModalLesson isActive={isActiveModalActive} /> */}

      <div className={cx('button-music')} onClick={openModalMusic}>
        <div className={cx('button-music__item')}>
          <img
            onError={() => {
              setImg(family);
            }}
            src={img !== undefined ? family : `https://resourcesk.bkt.net.vn/ImagesPNG/${data !== undefined && data.image}.png`}
            alt=""
          />
          <div className={cx('button-music__item__content')}>
            <h4>{`Unit ${index + 1}: ${data !== undefined && data.name}`}</h4>
            <span className={cx('auth')}>
              {t('Author')}: <strong>{data !== undefined && data.author}</strong>
            </span>
            <span className={cx('timer')}>
              {t('Capacity')} : <strong>20 {t('minute')}</strong>
            </span>
          </div>
        </div>
        <span className={cx('views')}>
          <span className={cx('eyes')}>
            <AiFillEye />
          </span>
          {data !== undefined && data.numberOfViews}
        </span>
      </div>
    </motion.div>
  );
}

export default ButtonMusic;
