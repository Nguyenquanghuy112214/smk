/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import CoureseItem from '~/Components/Video/RunVideo/Course';
import HeaderSearchSingle from '~/Components/Video/HeaderSearchSingle';
import { useNavigate, useParams } from 'react-router-dom';
import * as GetVideoPopular from '~/services/GetVideoPopular';
import * as GetAllTopicVideo from '~/services/GetAllTopicVideo';
import * as UpViewVideo from '~/services/UpVIewVIdeo';
import YouTube from 'react-youtube';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingRobot from '~/Components/LoadingRobot';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

const RunVideo = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();
  const { idvideo } = useParams();
  const { idtopicvideo } = useParams();

  const [listData, setListData] = useState([]);
  const [dataActive, setDataActive] = useState();
  const [titleMain, setTitleMain] = useState();
  const [titleSub, setTitleSub] = useState();

  useEffect(() => {
    const fetch = async () => {
      const [resall] = await Promise.all([GetAllTopicVideo.getGetTopicVideo()]);
      const titlesub = resall.find((x) => x.idcategoryVideo === +idtopicvideo);
      const titlemain = resall.find((x) => x.idcategoryVideo === +titlesub.parentId);

      setTitleMain(titlemain);
      setTitleSub(titlesub);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetVideoPopular.getVideoPopular();

      const dataActive = res.find((x) => x.idvideo === +idvideo);
      const dataNoActive = res.filter((x) => x.idvideo !== +idvideo);

      setListData([...dataNoActive]);
      setDataActive(dataActive);
    };
    fetch();
  }, [idvideo]);

  const handleClick = async (item) => {
    const res = await UpViewVideo.upViewVideo(item.idvideo);

    navigate(`/videorunvideo/${item.idcategoryVideo}/${item.idvideo}`);
  };
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper-run')}>
      <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
      <div className={cx('search-single')}>
        <HeaderSearchSingle />
      </div>
      <div className={cx('content-run')}>
        <div className={cx('content-run__left')}>
          <div className={cx('title-iframevideo')}>
            {`${titleMain !== undefined && titleMain.nameVn} > ${titleSub !== undefined && titleSub.nameVn} > `}
            <strong style={{ color: '#2c9e3e' }}>{dataActive !== undefined && dataActive.name}</strong>
          </div>
          {dataActive !== null && dataActive !== undefined && (
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
              style={{ height: '100%', width: '100%' }}
            >
              {dataActive !== null && dataActive !== undefined && dataActive.link !== null && `${dataActive.link.split('/')[3]}` ? (
                <YouTube
                  className={cx('videoYTB')}
                  videoId={
                    dataActive !== null && dataActive !== undefined && dataActive.link !== null && `${dataActive.link.split('/')[3]}`
                  }
                  opts={opts}
                />
              ) : (
                <LoadingRobot title={t('Pleasetryagainlater')} />
              )}
            </motion.div>
          )}
        </div>

        <div
          ref={ref}
          style={{
            transform: isInView ? 'none' : 'translateX(100px)',
            opacity: isInView ? 1 : 0,
            transition: `all 2s cubic-bezier(0.17, 0.55, 0.55, 1)`,
          }}
          className={cx('content-run__right')}
        >
          <span className={cx('title-course')}>{t('VideoList')}</span>
          {listData.map((item, index) => {
            return <CoureseItem onClick={() => handleClick(item)} key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RunVideo;
