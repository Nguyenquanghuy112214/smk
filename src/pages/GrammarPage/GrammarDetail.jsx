/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Grammar.module.scss';
import SupplementaryStudy from '~/Components/SupplementaryStudy';
import item1 from '~/assets/image/Grammar/item1.png';
import LectureList from '~/Components/Grammar/LectureList';
import pdf from '~/assets/image/Grammar/pdf.png';
import * as CreateContentHistory from '~/services/CreateContentHistory';

import * as GetGrammarByTopic from '~/services/GetGrammarByTopic';
import * as GetTopicGrammar from '~/services/GetTopicGrammar';
import * as InitializationGrammar from '~/services/InitializationGrammar';
import { AiOutlineSearch, AiOutlineCloudDownload } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDataGrammarDetailActive } from '~/Redux/DataGrammarDetailActive';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import YouTube from 'react-youtube';
import { useTranslation } from 'react-i18next';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

const GrammarDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const [listData, setListData] = useState([]);
  console.log('listData', listData);
  const [listTopic, setListTopic] = useState([]);

  const { grammarTypeid } = useParams();
  const { index } = useParams();
  const { namegrammar } = useParams();
  const [activeModal, setActiveModal] = useState(false);

  const openModalRunVideo = async (item) => {
    //
    const res = await InitializationGrammar.Initialization(
      { GrammarId: item.grammarId },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );

    setActiveModal(true);
    dispatch(setDataGrammarDetailActive(item));
  };

  const closeModalRunVideo = () => {
    setActiveModal(false);
  };

  const handleClick = (item, i) => {
    navigate(`/grammardetail/${item.nameGrammar}/${item.grammarTypeID}/${i}`);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await GetGrammarByTopic.getGrammarByTopic(grammarTypeid);
      setListData([...res]);
    };
    fetch();
  }, [grammarTypeid]);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetTopicGrammar.getTopicGrammar({
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setListTopic([...res.data]);
    };
    fetch();
  }, []);
  const { t } = useTranslation();
  return (
    <SupplementaryStudy title={t('grammar')} path={routes.grammar}>
      <ModalRunvideo listData={listData} namegrammar={namegrammar} onClick={closeModalRunVideo} active={activeModal} />
      <div className={cx('list-topic')}>
        <div className={cx('wrapper-header')}>
          <div className={cx('title-topic')}>{t('Topic')}</div>
          {/* <div className={cx('search')}>
            <span className={cx('icon-search')}>
              <AiOutlineSearch />
            </span>
            <input type="text" placeholder="Tìm kiếm" />
          </div> */}
        </div>

        <div className={cx('wrapper-topic__detail')}>
          {listTopic.map((item, i) => {
            return (
              <button key={i} onClick={() => handleClick(item, i)} className={+index === +i ? cx('button', 'active') : cx('button')}>
                {item.nameGrammar}
              </button>
            );
          })}
        </div>
      </div>
      <div className={cx('wrapper-lesson')}>
        <div className={cx('title-lesson')}>{t('Listoflectures')}</div>
        <div className={cx('list-lesson')}>
          {listData.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,

                  transition: {
                    duration: 0.3,
                  },
                }}
                onClick={() => openModalRunVideo(item)}
                key={index}
                className={cx('wrapper-lesson__detail')}
              >
                <div className={cx('img-lesson__detail')}>
                  <img src={item.thumbnail} alt="" />
                </div>
                <div className={cx('content-lesson__detail')}>
                  <div className={cx('main-title')}>{item.name}</div>
                  <span className={cx('span')}>
                    {t('Teacher')}: <strong>{item.author}</strong>
                  </span>
                  <span className={cx('span')}>
                    {t('Capacity')}: <strong>{item.length}</strong>
                  </span>
                  <span className={cx('span', 'sub')}>{item.describe}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SupplementaryStudy>
  );
};

export default GrammarDetail;

export function ModalRunvideo({ active, onClick, listData, namegrammar }) {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const [duration, setDuaration] = useState(0);
  const [timer, setTimmer] = useState(0);
  const [pause, setPause] = useState(null);
  const handleStartPlay = (e) => {
    setPause(false);

    setDuaration(Math.floor(e.target.playerInfo.duration));
  };
  const handlePause = () => {
    setPause(true);
  };

  const handleEnd = (e) => {
    if (Math.floor(e.target.playerInfo.duration) - Math.floor(timer / 1000) >= 2) {
    }
  };
  useEffect(() => {
    setTimmer(0);
    setPause(null);
  }, [active]);
  useEffect(() => {
    if (duration > Math.floor(timer / 1000) && pause === false) {
      const intervalId = setInterval(() => {
        setTimmer(timer + 1000);
      }, [1000]);
      return () => clearInterval(intervalId);
    } else if (duration === Math.floor(timer / 1000) && duration > 0) {
      const fetch = async () => {
        const res = await CreateContentHistory.createContentHistory(
          {
            ContentHistory: `Bài ngữ pháp "${dataActive !== undefined && dataActive.name.toUpperCase()}"`,
            Ratings: 'Đã Hoàn Thành',
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        console.log('res', res);
      };
      fetch();
    }
  }, [timer, duration, active, pause]);
  const dataActive = useSelector((state) => state.DataGrammarDetailActive.data);

  const [relatedData, setRelateData] = useState([]);

  useEffect(() => {
    const related = listData.filter((x) => x.grammarId !== dataActive.grammarId);
    setRelateData([...related]);
  }, [dataActive]);

  const handleClick = (item) => {
    dispatch(setDataGrammarDetailActive(item));
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
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: active ? 0 : 40, opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('modal')}
        >
          <div className={cx('wrapper-run')}>
            <span onClick={() => onClick()} className={cx('icon-close__modal')}>
              <AiOutlineClose />
            </span>
            <div className={cx('content-run')}>
              <div className={cx('content-run__left')}>
                <div className={cx('title-iframe')}>
                  {t('Home|Grammar')}{' '}
                  <strong>
                    {' '}
                    | {namegrammar} | {dataActive !== undefined && dataActive.name}
                  </strong>{' '}
                </div>

                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
                  style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'center' }}
                >
                  <YouTube
                    onEnd={(e) => handleEnd(e)}
                    onPause={handlePause}
                    onPlay={(e) => handleStartPlay(e)}
                    className={cx('videoYTB')}
                    videoId={
                      dataActive !== null && dataActive !== undefined
                        ? dataActive.resource !== null
                          ? dataActive.resource.split('/')[3]
                          : ''
                        : ''
                    }
                    opts={opts}
                  />
                </motion.div>

                {/* <iframe
                  height="100%"
                  width="96%"
                  src={`https://www.youtube.com/embed/${
                    dataActive !== null && dataActive !== undefined
                      ? dataActive.resource !== null
                        ? dataActive.resource.split('/')[3]
                        : ''
                      : ''
                  }`}
                  frameborder="0"
                  allowfullscreen=""
                  mozallowfullscreen=""
                  msallowfullscreen=""
                  oallowfullscreen=""
                  webkitallowfullscreen=""
                  className={cx('iframe')}
                ></iframe> */}

                <div className={cx('namesong-nameauth')}>{`Thì hiện tại đơn`}</div>
                <div className={cx('manua-document')}>
                  <div className={cx('img-pdf')}>
                    <img src={pdf} alt="" />
                  </div>
                  <div className={cx('text-guide')}>Hướng dẫn tự luyện tập "Thì hiện tại đơn"</div>
                  <span>
                    <AiOutlineCloudDownload />
                  </span>
                </div>
              </div>
              <div className={cx('content-run__right')}>
                <span className={cx('title-course')}>{t('Listoflectures')}</span>
                <div className={cx('list-content-run__right')}>
                  {relatedData.map((item, index) => {
                    return (
                      <LectureList index={index} namegrammar={namegrammar} key={index} onClick={() => handleClick(item)} data={item} />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={cx('bottom-run')}></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
