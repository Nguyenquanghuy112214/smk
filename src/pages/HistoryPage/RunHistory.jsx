/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import CoureseItem from '~/Components/Music/RunVideo/Course';
import HeaderSearchSingle from '~/Components/History/HeaderSearchSingle';
import { useNavigate, useParams } from 'react-router-dom';

import * as GetAllTopicHistory from '~/services/GetAllTopicHistory';
import * as GetHistoryByCate from '~/services/GetHistoryByCate';
import * as UpViewStory from '~/services/UpVIewStory';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import LoadingRobot from '~/Components/LoadingRobot';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

const RunHistory = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const ref1 = useRef();
  const isInView = useInView(ref, { once: true });
  const isInView1 = useInView(ref1, { once: true });
  const { idcate } = useParams();
  const { idhistory } = useParams();
  const [title, setTitle] = useState();

  const [relatedList, setRelatedList] = useState([]);
  const [dataActive, setDataActive] = useState();

  useEffect(() => {
    const fetch = async () => {
      const [allTopic, historyBycate] = await Promise.all([
        GetAllTopicHistory.getAllTopicHistory(),
        GetHistoryByCate.getHistoryByCate(idcate),
      ]);
      const titleMain = allTopic.find((x) => x.idcategoryStory === +idcate);
      const active = historyBycate.find((x) => x.idstory === +idhistory);
      const related = historyBycate.filter((x) => x.idstory !== +idhistory);

      setDataActive(active);
      setRelatedList([...related]);
      setTitle(titleMain.nameVn);
    };
    fetch();
  }, [idcate, idhistory]);

  const handleClick = async (item) => {
    const res = await UpViewStory.upViewStory(item.idstory);

    navigate(`/historyrun/${idcate}/${item.idstory}`);
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
      <div className={cx('content-run', 'content-run-xl')}>
        <div className={cx('content-run__left')}>
          <div className={cx('title-iframevideo')}>
            {`${t('genreofstories')} > `} <strong style={{ color: '#2c9e3e' }}>{title}</strong>
          </div>
          {dataActive !== null && dataActive !== undefined && (
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
              style={{ height: '100%', width: '100%' }}
            >
              {dataActive !== null && dataActive !== undefined && dataActive.link !== null && dataActive.link.split('/')[3] ? (
                <YouTube
                  className="videoYTB"
                  videoId={dataActive !== null && dataActive !== undefined && dataActive.link !== null && dataActive.link.split('/')[3]}
                  opts={opts}
                />
              ) : (
                <LoadingRobot active title="" />
              )}
            </motion.div>
          )}

          <div
            ref={ref1}
            style={{
              transform: isInView1 ? 'none' : 'translateX(-500px)',
              opacity: isInView1 ? 1 : 0,
              transition: `all 2s cubic-bezier(0.17, 0.55, 0.55, 1)`,
            }}
            className={cx('history-active')}
          >
            <div className={cx('history-active__title')}>{dataActive !== undefined && dataActive.name}</div>
            <div className={cx('history-active__content')}>
              <span className={cx('history-active__content__auth')}>
                {t('Author')}: <strong>{dataActive !== undefined && dataActive.author}</strong>
              </span>
              <span className={cx('history-active__content__time')}>
                {t('Capacity')}: <strong>20 {t('minute')}</strong>
              </span>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          className={cx('content-run__right')}
        >
          <span className={cx('title-course')}>{t('Playlists')}</span>
          {relatedList !== undefined &&
            relatedList.map((item, index) => {
              return <CoureseItem onClick={() => handleClick(item)} key={index} data={item} />;
            })}
        </motion.div>
      </div>
      {/* <div className={cx('bottom-run')}>
        <TopicList />
      </div> */}
    </div>
  );
};

export default RunHistory;
