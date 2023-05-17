/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import Search from '~/Components/Music/Search';
import RunVideo from '~/';
import CoureseItem from '~/Components/Music/RunVideo/Course';
import { AiOutlineSearch } from 'react-icons/ai';
import HeaderSearchSingle from '~/Components/Music/HeaderSearchSingle';
import TopicList from '~/Components/Music/Topic/TopicList';
import videoifame from '~/assets/image/Music_History_Video/videoiframe.png';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as SearchSong from '~/services/SearchSong';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import LoadingRobot from '~/Components/LoadingRobot';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const RunMusicSearch = () => {
  const navigate = useNavigate();
  const { idsong } = useParams();
  const { search } = useParams();

  const [listData, setListData] = useState([]);
  const [dataActive, setDataActive] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await SearchSong.searchSong(search);
      const dataActive = res.find((x) => x.idsong === +idsong);
      const dataNoActive = res.filter((x) => x.idsong !== +idsong);

      setListData([...dataNoActive]);
      setDataActive(dataActive);
    };
    fetch();
  }, [idsong]);

  const handleClick = (item) => {
    navigate(`/musicrunvideosearch/${search}/${item.idsong}`);
  };
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper-run')}>
      <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
      <div className={cx('search-single')}>
        <HeaderSearchSingle />
      </div>
      <div className={cx('content-run')}>
        <div className={cx('content-run__left')}>
          {dataActive !== null && dataActive !== undefined && (
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
          <span className={cx('title-course')}>{t('CoursePlaylists')}</span>
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
  );
};

export default RunMusicSearch;
