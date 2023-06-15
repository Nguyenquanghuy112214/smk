import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LearningAndConversationPage.module.scss';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModalTopic } from '~/Redux/CloseModalTopicSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import anh1 from '~/assets/image/section/1.png';
import ModalLesson from './ModalLesson';
import ProgressBar from '~/Components/LearningAndConversation/ProgressBar';
import * as GetLinkByTopicLesson from '~/services/GetLinkByTopicLesson';
import { setLoading } from '~/Redux/LoadingSlice';
import ButtonMusic from './ButtonMusic';
import { Link } from 'react-router-dom';
import config from '~/config';
import { setIdTopic } from '~/Redux/IDTopicSlice';
import { setActiveModalVocaExercise } from '~/Redux/ActiveModalVocaPageExercise';
import { setModalVoca } from '~/Redux/ModalVocaSlice';
import { setIndexTopic } from '~/Redux/IndexTopic';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as GetSongByIdTopic from '~/services/GetSongByIdTopic';
import family from '~/assets/image/exercies/family.png';
import LoadingRobot from '../LoadingRobot';
import { useTranslation } from 'react-i18next';
const cx = classNames.bind(styles);

function NavigateTop({ active, datalesson, datatopic, conversation, indexTopic }) {
  const { t } = useTranslation('translation');

  const navigate = useNavigate();

  const [buttonleft, setButtonLeft] = useState(true);
  const [titleModalLearning, setTitleModalLearning] = useState();
  const { id, idmusic, type, name, nameinit, numberunit } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetSongByIdTopic.getSongByIdTopic(id);
      const data = res.find((x) => +x.idsong === +idmusic);
      if (type === 'music') {
        setTitleModalLearning(` | ${name} | ${nameinit}`);
      } else {
        setTitleModalLearning(` | ${name} | ${t('Lesson1')} ${nameinit}`);
      }
    };
    fetch();
  }, [id, idmusic, nameinit]);
  // handle button right
  const selectButtonLeft = () => {
    navigate(`/learning/${id}/${idmusic}/learn/${name}/undefined`);
    setButtonLeft(true);
    setTitleModalLearning(` | ${name} | ${t('Lesson1')} ${nameinit}`);
  };
  const selectButtonRight = () => {
    navigate(`/learning/${id}/${idmusic}/music/${name}/undefined`);

    setButtonLeft(false);
  };

  return (
    datatopic !== undefined && (
      <div className={cx('header-right')}>
        {conversation ? null : (
          <div className={cx('wrapper-button__right')}>
            <button onClick={selectButtonLeft} className={active !== null && buttonleft ? cx('button', 'active') : cx('button')}>
              {t('Lesson')}
            </button>
            <button onClick={selectButtonRight} className={!buttonleft ? cx('button', 'active') : cx('button')}>
              {t('song')}
            </button>
          </div>
        )}
        <div className={cx('img')}>
          <img src={`https://resourcesk.bkt.net.vn/ImagesPNG/${datatopic.image}.png`} alt="" />
          <h4>{datatopic.name}</h4>
        </div>
        {conversation ? (
          <NavigateConversation></NavigateConversation>
        ) : (
          <NavigateContent
            idtopic={datatopic.idtopic}
            datalesson={datalesson}
            titleModalLearning={titleModalLearning}
            buttonleft={buttonleft}
            indexTopic={indexTopic}
          />
        )}
      </div>
    )
  );
}

export default NavigateTop;

// NavigateContent
export function NavigateContent({ idtopic, buttonleft, datatopic, datalesson, titleModalLearning, indexTopic }) {
  const { id, idmusic, type, name, numberunit } = useParams();

  const { t } = useTranslation('translation');

  // active modal topic
  const [listMusic, setListMucsic] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [detaillesson, setDetailLesson] = useState();
  const [online, setOnlineLectures] = useState(false);

  const isActiveLesson = useSelector((state) => state.TopicModal.isActiveLesson);
  const isActiveMusic = useSelector((state) => state.TopicModal.isActiveMusic);

  const onlineLectures = () => {
    setOnlineLectures(!online);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await GetSongByIdTopic.getSongByIdTopic(id);
      setListMucsic([...res]);
    };
    fetch();
  }, [id]);

  const openListLearning = (idtopic) => {
    navigate(`/exercise/1/0/undefined/undefined/${name}/${numberunit}/${idtopic}`);
    dispatch(setIdTopic(idtopic));
  };

  const openModalLesson = async (item) => {
    navigate(`/learning/${id}/${idmusic}/${type}/${name}/${item.name}`);
    const res = await GetLinkByTopicLesson.getLinkByTopicLesson(idtopic, item.idlesson);
    setDetailLesson(res);
    dispatch(setModalTopic(true));
    dispatch(setLoading(true));
  };

  const openModalVocaPageExercise = () => {
    dispatch(setIndexTopic(indexTopic));
    dispatch(setModalVoca(false));
    navigate(`/vocabulary/exercise/${indexTopic}/null/true`);
    dispatch(setActiveModalVocaExercise(true));
  };

  return (
    <div style={{ height: '100%' }}>
      <ModalLesson
        titleModalLearning={titleModalLearning}
        isActive={isActiveLesson || isActiveMusic}
        dataDetailLesson={detaillesson !== undefined ? detaillesson : undefined}
      ></ModalLesson>
      {buttonleft === true && datalesson !== undefined ? (
        <div className={cx('content', 'mt20')}>
          <ul>
            <li>
              <button onClick={onlineLectures} className={cx('button')}>
                {t('Onlinelectures')}
              </button>
              <motion.ul
                initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                animate={{
                  height: online ? 'auto' : 0,
                  opacity: online ? 1 : 0,
                  overflow: online ? 'auto' : 'hidden',
                }}
                transition={{
                  duration: 0.3,
                }}
                className={cx('online-lectures')}
              >
                {datalesson.map((item) => {
                  return (
                    <li key={item.idlesson}>
                      <button onClick={() => openModalLesson(item)} className={cx('button', 'sm')}>
                        {`${t('Lesson1')} ${item.name}`}
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            </li>
            <li onClick={() => openModalVocaPageExercise()}>
              <button className={cx('button')}>{t('vocabulary')}</button>
            </li>
            <li>
              <button onClick={() => openListLearning(idtopic)} className={cx('button')}>
                {/* <Link to={config.routes.exercise}> Bài tập</Link> */}
                {t('exercise')}
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className={cx('wrapper-music')}>
          {listMusic !== undefined && listMusic.length > 0 ? (
            listMusic.map((item, index) => {
              return <ButtonMusic key={index} index={index} data={item} />;
            })
          ) : (
            <LoadingRobot active title={t('Nosong')} />
          )}
        </div>
      )}
    </div>
  );
}

export function NavigateConversation() {
  return (
    <div className={cx('wrapper-conversation')}>
      <div className={cx('conversation-item')}>
        <img src={anh1} alt="" />
        <div className={cx('conversation-item__content')}>
          <h4>Unit 00: Hello, everyone</h4>
          <span className={cx('count')}>
            <strong>04</strong> câu hội thoại
          </span>
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}
