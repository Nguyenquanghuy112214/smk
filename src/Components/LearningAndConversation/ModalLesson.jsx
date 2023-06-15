/* eslint-disable jsx-a11y/iframe-has-title */

import { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

import { setModalTopic, setModalMusic } from '~/Redux/CloseModalTopicSlice';
import * as GetVocabularyTopicAndLesson from '~/services/GetVocabularyByTopicAndLesson';
import * as GetSongByTopic from '~/services/GetSongByIdTopic';
import * as UpdateLearningData from '~/services/UpdateLearningData';
import { setLoading } from '~/Redux/LoadingSlice';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import ModalVocabulary from './ModalVocabulary';
import { setModalVoca } from '~/Redux/ModalVocaSlice';
import ButtonMusic from './ButtonMusic';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import iconclose from '~/assets/image/iconclose.png';

import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LearningAndConversationPage.module.scss';
import LoadingRobot from '../LoadingRobot';
import { useTranslation } from 'react-i18next';
import { useAuth } from '~/hooks/useAuth';
import { useCourse } from '~/hooks/useCourse';
import * as CreateContentHistory from '~/services/CreateContentHistory';
const cx = classNames.bind(styles);

const ModalLesson = ({ isActive, dataDetailLesson, titleModalLearning }) => {
  const { course } = useCourse();
  const { t } = useTranslation('translation');
  const { id, nameinit, name, idmusic, type } = useParams();

  const [dataActive, setDataAcitve] = useState();
  const [dataRelate, setDataRelate] = useState([]);
  const isActiveLesson = useSelector((state) => state.TopicModal.isActiveLesson);
  const isActiveMusic = useSelector((state) => state.TopicModal.isActiveMusic);

  const dispatch = useDispatch();
  const modalVoca = useSelector((state) => state.ModalVoca.isActive);
  const isLoading = useSelector((state) => state.Loading.isActive);
  const [vocabulary, setVocabulary] = useState();
  const [vocaDetail, setModalVocaDetail] = useState();
  console.log('vocabulary', vocabulary);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetSongByTopic.getSongByIdTopic(id);
      setDataAcitve(res.find((x) => +x.idsong === +idmusic));
      setDataRelate([...res.filter((x) => +x.idsong !== +idmusic)]);
    };
    fetch();
  }, [id, idmusic]);

  useEffect(() => {
    if (dataDetailLesson !== undefined) {
      const timer = setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading === true]);

  const closeModal = () => {
    dispatch(setModalTopic(false));
    dispatch(setModalMusic(false));
    dispatch(setModalVoca(false));
  };

  useLayoutEffect(() => {
    if (dataDetailLesson !== undefined) {
      const fetch = async () => {
        const res = await GetVocabularyTopicAndLesson.getVocabularyTopicAndLesson(
          dataDetailLesson !== undefined && dataDetailLesson[0].idtopic,
          dataDetailLesson !== undefined && dataDetailLesson[0].idlesson
        );
        setVocabulary(res);
      };
      fetch();
    }
  }, [dataDetailLesson !== undefined && dataDetailLesson[0].idtopic, dataDetailLesson !== undefined && dataDetailLesson[0].idlesson]);

  const openModalVoca = (item) => {
    setModalVocaDetail(item);
    dispatch(setModalVoca(true));
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  const { auth } = useAuth();
  const [duration, setDuaration] = useState(0);
  const [timer, setTimmer] = useState(0);
  const [pause, setPause] = useState(null);

  useEffect(() => {
    if (duration > Math.floor(timer / 1000) && isActiveLesson === true && pause === false) {
      const intervalId = setInterval(() => {
        setTimmer(timer + 1000);
      }, [1000]);
      return () => clearInterval(intervalId);
    } else if (duration === Math.floor(timer / 1000) && duration > 0) {
      const fetch = async () => {
        const [res, res1] = await Promise.all([
          UpdateLearningData.updateLearningData(
            {
              TopicId: id,
              LessonId: nameinit,
            },
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            },
            course
          ),
          CreateContentHistory.createContentHistory(
            {
              ContentHistory: `Chủ đề ${name} - Bài giảng ${nameinit}`,
              Ratings: 'Đã Hoàn Thành',
            },
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          ),
        ]);
      };

      fetch();
    }
  }, [timer, duration, isActiveLesson, pause]);

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
  }, [isActiveLesson]);

  return (
    <motion.div
      className={cx('modal')}
      initial={{ opacity: 0, x: 200, visibility: 'hidden' }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 200, visibility: isActive ? 'visible' : 'hidden' }}
    >
      <div className={cx('wrap-modal')}>
        <div className={cx('header-modal')}>
          <span className={cx('title-modal')}>
            {t('HomeLearn')}
            <strong>{titleModalLearning}</strong>
          </span>
          <div onClick={closeModal} className={cx('icon-close')}>
            <img src={iconclose} alt="" />
          </div>
        </div>
        <div className={cx('content-modal')}>
          {type === 'learn' && (
            <div className={cx('content-modal__left')}>
              <AnimatePresence>
                {dataDetailLesson !== null && dataDetailLesson !== undefined && isActive ? (
                  <motion.div
                    initial={{ scale: 1.1, opacity: 0, visibility: 'hidden' }}
                    animate={{
                      scale: dataDetailLesson !== null && dataDetailLesson !== undefined ? 1 : 1.1,
                      opacity: dataDetailLesson !== null && dataDetailLesson !== undefined ? 1 : 0,
                      visibility: dataDetailLesson !== null && dataDetailLesson !== undefined ? 'visible' : 'hidden',
                      transition: { delay: 0.4, duration: 0.4 },
                    }}
                    exit={{ visibility: 'hidden' }}
                    style={{ height: '100%', width: '100%' }}
                  >
                    {isActive &&
                    dataDetailLesson !== null &&
                    dataDetailLesson !== undefined &&
                    dataDetailLesson[0].link !== null &&
                    `${dataDetailLesson[0].link.split('/')[3]}` ? (
                      <YouTube
                        onEnd={(e) => handleEnd(e)}
                        onPause={handlePause}
                        onPlay={(e) => handleStartPlay(e)}
                        id="ytb"
                        className={cx('videoYTB')}
                        videoId={
                          isActive &&
                          dataDetailLesson !== null &&
                          dataDetailLesson !== undefined &&
                          dataDetailLesson[0].link !== null &&
                          `${dataDetailLesson[0].link.split('/')[3]}`
                        }
                        opts={opts}
                      />
                    ) : (
                      <LoadingRobot title={t('Videoisnotavailable')} />
                    )}
                  </motion.div>
                ) : (
                  <LoadingRobot title={t('Videoisnotavailable')} />
                )}
              </AnimatePresence>
            </div>
          )}
          {type === 'music' && (
            <div className={cx('content-modal__left')}>
              <AnimatePresence>
                {dataDetailLesson !== null && dataDetailLesson !== undefined && isActive ? (
                  <motion.div
                    initial={{ scale: 1.1, opacity: 0, visibility: 'hidden' }}
                    animate={{
                      scale: dataActive !== null && dataActive !== undefined ? 1 : 1.1,
                      opacity: dataActive !== null && dataActive !== undefined ? 1 : 0,
                      visibility: dataActive !== null && dataActive !== undefined ? 'visible' : 'hidden',
                      transition: { delay: 0.4, duration: 0.4 },
                    }}
                    exit={{ visibility: 'hidden' }}
                    style={{ height: '100%', width: '100%' }}
                  >
                    {isActive &&
                    dataActive !== null &&
                    dataActive !== undefined &&
                    dataActive.link !== null &&
                    `${dataActive.link.split('/')[3]}` ? (
                      <YouTube
                        className={cx('videoYTB')}
                        videoId={
                          isActive &&
                          dataActive !== null &&
                          dataActive !== undefined &&
                          dataActive.link !== null &&
                          `${dataActive.link.split('/')[3]}`
                        }
                        opts={opts}
                      />
                    ) : (
                      <LoadingRobot px title={t('Videoisnotavailable')} />
                    )}
                  </motion.div>
                ) : (
                  <LoadingRobot px title={t('Videoisnotavailable')} />
                )}
              </AnimatePresence>
            </div>
          )}

          <div style={{ position: 'relative' }} className={cx('content-modal__right')}>
            <ModalVocabulary isActive={modalVoca} vocaDetail={vocaDetail} />

            {type === 'music' && <h4 className={cx('lesson-modal')}>{t('SongList')}</h4>}
            {isActiveLesson && (
              <>
                <h4 className={cx('vocabulary-modal')}>{t('vocabulary')}</h4>
                <div className={cx('list-vocabulary')}>
                  {vocabulary !== undefined &&
                    vocabulary.map((item) => {
                      return (
                        <div key={item.idvocabulary} className={cx('wrap-newword')}>
                          <button onClick={() => openModalVoca(item)}>{item.name}</button>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
            {isActiveMusic && (
              <div className={cx('wrapper-music')}>
                {dataRelate !== undefined &&
                  dataRelate.map((item, index) => {
                    return <ButtonMusic key={index} index={index} data={item} />;
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModalLesson;
