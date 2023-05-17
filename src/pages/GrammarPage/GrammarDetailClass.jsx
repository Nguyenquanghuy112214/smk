/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Grammar.module.scss';
import SupplementaryStudy from '~/Components/SupplementaryStudy';
import { AiOutlineSearch, AiOutlineCloudDownload, AiOutlineClose } from 'react-icons/ai';
import item1 from '~/assets/image/Grammar/item1.png';
import pdf from '~/assets/image/Grammar/pdf.png';

import { motion, AnimatePresence } from 'framer-motion';
import LectureList from '~/Components/Grammar/LectureList';
import { useNavigate, useParams } from 'react-router-dom';
import * as GetGrammarByClassBook from '~/services/GetGrammarByClassBook';
import YouTube from 'react-youtube';
import LoadingRobot from '~/Components/LoadingRobot';
import { useTranslation } from 'react-i18next';
import routes from '~/config/routes';
import { useIDBookIDAge } from '~/hooks/useIDBookIDAge';
import { useAuth } from '~/hooks/useAuth';
import * as CreateContentHistory from '~/services/CreateContentHistory';

const cx = classNames.bind(styles);

const GrammarDetailClass = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { idClass } = useParams();

  const [list, setList] = useState([]);
  const [listViews, setListViews] = useState([]);

  const [activeModal, setActiveModal] = useState(false);
  const openModalRunVideo = (item) => {
    navigate(`/grammardetailclass/${idClass}/${item.grammarId}`);
    setActiveModal(true);
  };
  const { IDBook, IDAge, IDCourse } = useIDBookIDAge();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetGrammarByClassBook.getGrammarByClassBook(IDAge, IDBook);
      setList([...res.data]);
      const totalViews = res.data;

      setListViews([...totalViews.find((x) => +x.idtopic === +idClass).grammarViews]);
    };
    fetch();
  }, [idClass]);
  const closeModalRunVideo = () => {
    setActiveModal(false);
  };

  const handleClick = (item) => {
    navigate(`/grammardetailclass/${item.idtopic}/undefined`);
  };
  return (
    <SupplementaryStudy title={t('grammar')} path={routes.grammar}>
      <ModalRunvideo onClick={closeModalRunVideo} active={activeModal} data={listViews} />
      <div className={cx('list-topic')}>
        <div className={cx('wrapper-header')}>
          <div className={cx('title-topic')}>{t('Class')}</div>
          {/* <div className={cx('search')}>
            <span className={cx('icon-search')}>
              <AiOutlineSearch />
            </span>
            <input type="text" placeholder="Tìm kiếm" />
          </div> */}
        </div>

        <div className={cx('wrapper-topic__detail')}>
          {list !== undefined &&
            list.map((item, index) => {
              return (
                <button
                  onClick={() => handleClick(item)}
                  className={cx('button', `${+item.idtopic === +idClass ? 'active' : ''}`)}
                >{`Unit ${index + 1}: ${item.nameTopic}`}</button>
              );
            })}
        </div>
      </div>
      <div className={cx('wrapper-lesson')}>
        <div className={cx('title-lesson')}>{t('Listoflectures')}</div>
        <div className={cx('list-lesson')}>
          {listViews !== undefined &&
            listViews.map((item, index) => {
              return (
                <div onClick={() => openModalRunVideo(item)} key={index} className={cx('wrapper-lesson__detail')}>
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
                </div>
              );
            })}
          {listViews.length === 0 && <div style={{ fontSize: '2rem' }}>{t('Pleasecomebacklater')}</div>}
        </div>
      </div>
    </SupplementaryStudy>
  );
};

export default GrammarDetailClass;

export function ModalRunvideo({ active, onClick, data }) {
  const { idClass } = useParams();
  const { idgrammar } = useParams();
  const { auth } = useAuth();
  const [dataActive, setDataActive] = useState();
  const [dataRelate, setDataRelate] = useState([]);
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
  useEffect(() => {
    const fetch = async () => {
      if (data !== undefined) {
        setDataActive(data.find((x) => x.grammarId === idgrammar));
        setDataRelate(data.filter((x) => x.grammarId !== idgrammar));
      }
      // setListViews([...totalViews.find((x) => +x.idtopic === +idClass).grammarViews]);
    };
    fetch();
  }, [idClass, idgrammar]);

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
                  {t('Home|Grammar')} <strong> | {dataActive !== undefined && dataActive.name}</strong>{' '}
                </div>
                {dataActive !== null && dataActive !== undefined ? (
                  <YouTube
                    onEnd={(e) => handleEnd(e)}
                    onPause={handlePause}
                    onPlay={(e) => handleStartPlay(e)}
                    style={{ borderRadius: '10px' }}
                    className={cx('videoYTB')}
                    videoId={
                      dataActive !== null &&
                      dataActive !== undefined &&
                      dataActive.resource !== null &&
                      `${dataActive.resource.split('/')[3]}`
                    }
                    opts={opts}
                  />
                ) : (
                  <LoadingRobot />
                )}

                <div className={cx('namesong-nameauth')}>{dataActive !== undefined && dataActive.name}</div>
                <div className={cx('manua-document')}>
                  <div className={cx('img-pdf')}>
                    <img src={pdf} alt="" />
                  </div>
                  <div className={cx('text-guide')}>{`${t('Self-practiceguide')} "${dataActive !== undefined && dataActive.name}"`}</div>
                  <span>
                    <AiOutlineCloudDownload />
                  </span>
                </div>
              </div>
              <div className={cx('content-run__right')}>
                <span className={cx('title-course')}>{t('Listoflectures')}</span>
                <div className={cx('list-content-run__right')}>
                  {dataRelate !== undefined &&
                    dataRelate.map((item, index) => {
                      return <LectureList data={item} />;
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
