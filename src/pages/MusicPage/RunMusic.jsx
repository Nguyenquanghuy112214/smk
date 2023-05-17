/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import CoureseItem from '~/Components/Music/RunVideo/Course';
import HeaderSearchSingle from '~/Components/Music/HeaderSearchSingle';
import TopicList from '~/Components/Music/Topic/TopicList';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as GetSongByCate from '~/services/GetSongByCate';
import YouTube from 'react-youtube';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import LoadingRobot from '~/Components/LoadingRobot';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const RunMusic = () => {
  const { t } = useTranslation();
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();
  const { idtopic } = useParams();
  const { idsong } = useParams();

  const [listData, setListData] = useState([]);
  const [dataActive, setDataActive] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetSongByCate.getSongByCate(idtopic);
      const dataActive = res.find((x) => x.idsong === +idsong);
      const dataNoActive = res.filter((x) => x.idsong !== +idsong);

      setListData([...dataNoActive]);
      setDataActive(dataActive);
    };
    fetch();
  }, [idtopic, idsong]);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (item) => {
    navigate(`/musicrunvideo/${idtopic}/${item.idsong}`);
  };
  return (
    <div className={cx('modal-run')}>
      <div className={cx('wrapper-run')}>
        <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
        <div className={cx('search-single')}>
          <HeaderSearchSingle />
        </div>
        <div className={cx('content-run')}>
          <div className={cx('content-run__left')}>
            {dataActive !== null && dataActive !== undefined ? (
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
                style={{ height: '100%', width: '100%' }}
              >
                {dataActive !== null && dataActive !== undefined && dataActive.link !== null && dataActive.link.split('/')[3] ? (
                  <YouTube
                    className={cx('videoYTB')}
                    videoId={dataActive !== null && dataActive !== undefined && dataActive.link !== null && dataActive.link.split('/')[3]}
                    opts={opts}
                  />
                ) : (
                  <LoadingRobot />
                )}
              </motion.div>
            ) : (
              ''
            )}

            <div
              ref={ref}
              style={{
                transform: isInView ? 'none' : 'translateX(-100px)',
                opacity: isInView ? 1 : 0,
                transition: `all 2s cubic-bezier(0.17, 0.55, 0.55, 1)`,
              }}
              className={cx('namesong-nameauth')}
            >{`${dataActive !== undefined && dataActive.name} | ${dataActive !== undefined && dataActive.author}`}</div>
          </div>
          <div className={cx('content-run__right')}>
            <span className={cx('title-course')}>{t('SongList')}</span>
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: 1 } }}
              className={cx('list-content-run__right')}
            >
              {listData.map((item, index) => {
                return <CoureseItem onClick={() => handleClick(item)} data={item} key={index} />;
              })}
            </motion.div>
          </div>
        </div>
        <div className={cx('bottom-run')}>
          <TopicList />
        </div>
      </div>
    </div>
  );
};

export default RunMusic;
