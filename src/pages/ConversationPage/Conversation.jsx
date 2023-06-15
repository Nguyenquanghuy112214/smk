import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Conversation.module.scss';
import HeaderPage from '~/Components/HeaderPage';
import leaning from '~/assets/image/Account/learning.png';
import { AiOutlineCheck, AiOutlineClose, AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import sound from '~/assets/image/PracticeListening/sound.png';
import loa from '~/assets/image/PracticeListening/loa.png';
import avatar from '~/assets/image/Account/avatar2.png';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import icon1 from '~/assets/image/PracticeListening/icon1.png';
import icon2 from '~/assets/image/PracticeListening/icon2.png';
import icon3 from '~/assets/image/PracticeListening/icon3.png';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useAuth } from '~/hooks/useAuth';
import { useSelector } from 'react-redux';

import * as GetConversationByBookClass from '~/services/GetConversationByBookClass';
import * as GetByIdConverCategory from '~/services/GetByIdConverCategory';
import * as CreateUserConversation from '~/services/CreateUserConversation';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as GetAllConverMasterConver from '~/services/GetAllConverMasterConver';
import * as GetAllConverLearnConver from '~/services/GetAllConverLearnConver';
import * as ConversationalSkills from '~/services/ConversationalSkillsConver';
import * as ProgessScheduleConver from '~/services/ProgessScheduleConver';
import { useTranslation } from 'react-i18next';
import routes from '~/config/routes';
import { useIDBookIDAge } from '~/hooks/useIDBookIDAge';
import Loading from '~/Components/animationloading/Animationloading';
import iconclose from '~/assets/image/iconclose.png';
import * as CreateContentHistory from '~/services/CreateContentHistory';

const cx = classNames.bind(styles);

function Conversation() {
  const navigate = useNavigate();
  const { idtopic } = useParams();
  const { IDBook, IDAge, IDCourse } = useIDBookIDAge();

  const { auth } = useAuth();

  const [listCate, setListCate] = useState([]);
  const [listDetail, setListDetail] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);

  const [active, setActive] = useState(false);
  const [activeResult, setActiveResult] = useState(false);
  const { t } = useTranslation();
  const selectTopic = (item, index) => {
    setListDetail([...listCate[index].conversation]);

    navigate(`/conversation/${index}/0`);
  };

  const handleClick = async (item) => {
    const [res] = await Promise.all([GetByIdConverCategory.getByIdConverCategory(item.idconversationCategori)]);
    const dataNoactive = res.data.map((item) => {
      return { ...item, active: undefined };
    });
    setDataDetail(dataNoactive);

    setActive(true);
  };
  const closeModal = () => {
    setActive(false);
    setActiveResult(false);
  };

  const successModal = async () => {
    const [res, res1] = await Promise.all([
      CreateUserConversation.createUserConversation(
        { IdconversationCategori: dataDetail !== undefined && dataDetail[0] !== undefined && dataDetail[0].idconversationCategori },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      ),
      CreateContentHistory.createContentHistory(
        {
          ContentHistory: `Cuộc hội thoại "${
            listCate !== undefined &&
            listCate[idtopic] &&
            listCate[idtopic].nameTopic !== undefined &&
            listCate[idtopic].nameTopic.toUpperCase()
          }"`,
          Ratings: 'Đã Hoàn Thành',
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      ),
    ]);
    console.log('res1', res1);

    setActive(false);
    setActiveResult(false);
  };

  const openResult = () => {
    setActiveResult(true);
  };

  useEffect(() => {
    if (listCate !== undefined && listCate[idtopic] !== undefined && listCate[idtopic].conversation !== undefined)
      setListDetail([...listCate[idtopic].conversation]);
  }, [idtopic, listCate]);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetConversationByBookClass.getConversationByBookClass(IDAge, IDBook, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setListCate([...res.data]);
    };
    fetch();
  }, [+IDAge, +IDBook]);
  return (
    <div className={cx('wrapper')}>
      <HeaderPage title={t('conversation')} path={routes.homepage} />
      <Loading active={listCate !== undefined && listCate.length === 0 ? true : false} opa={0.6} />
      {/* modal hoi thoai*/}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
            animate={{ x: active ? 0 : 40, opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
            exit={{ scale: 0 }}
            className={cx('wrapper-modal')}
          >
            <div className={cx('wrapper-modal__practicelistening')}>
              <span className={cx('icon-close')} onClick={closeModal}>
                <img src={iconclose} alt="" />
              </span>
              <ModalPracticeListening onClick={successModal} listCate={listCate} idtopic={idtopic} data={dataDetail} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* modal ket qua hoc tap */}

      <AnimatePresence>
        {activeResult && (
          <motion.div
            initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
            animate={{ x: activeResult ? 0 : 40, opacity: activeResult ? 1 : 0, visibility: activeResult ? 'visible' : 'hidden' }}
            exit={{ scale: 0 }}
            className={cx('wrapper-modal')}
          >
            <div className={cx('wrapper-modal__practicelistening')}>
              <span className={cx('icon-close')} onClick={closeModal}>
                <img src={iconclose} alt="" />
              </span>
              {/* Modal ket qua */}
              <ModalStudyResult />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cx('wrapper-content')}>
        <div className={cx('wrapper-content__left')}>
          {listCate !== undefined &&
            listCate.map((item, index) => {
              return <Button onClick={() => selectTopic(item, index)} data={item} key={item.idTopic} active={+index === +idtopic} />;
            })}
        </div>
        <div className={cx('wrapper-content__right')}>
          <button onClick={openResult} className={cx('navigate-button__result', 'single')}>
            {t('Studyresult')}
          </button>

          <div className={cx('navigate-button')}>
            <button className={cx('navigate-button__list', 'active')}>{t('Conversationlist')}</button>
          </div>
          <div className={cx('wrapper-ractice__detail')}>
            <div className={cx('header-ractice__detail')}>
              <div className={cx('img-ractice__detail')}>
                <img src={leaning} alt="" />
              </div>
              <div className={cx('text-ractice__detail')}>
                {listCate !== undefined && listCate[idtopic] && listCate[idtopic].nameTopic !== undefined && listCate[idtopic].nameTopic}
              </div>
            </div>
            <div className={cx('body-ractice__detail')}>
              {listDetail !== undefined &&
                listDetail.map((item, index) => {
                  return <ButtonDetail key={index} index={index} data={item} onClick={() => handleClick(item)} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;

export function Button({ active, data, onClick }) {
  return (
    <div onClick={() => onClick()} className={active ? cx('button-unit', 'active') : cx('button-unit')}>
      <div className={cx('button-unit__img')}>
        <img src={leaning} alt="" />
      </div>

      <span className={cx('button-unit__text')}>{data !== undefined && data.nameTopic}</span>
    </div>
  );
}

export function ButtonDetail({ index, onClick, data }) {
  const { t } = useTranslation();
  const handleClick = () => {
    onClick();
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, transition: { delay: index * 0.2 } }}
      onClick={handleClick}
      className={cx('button-ractice__detail')}
    >
      <div className={cx('button-ractice__img')}>
        <img src={data !== undefined && data.thumbnail} alt="" />
      </div>
      <div className={cx('button-ractice__text')}>
        <span className={cx('title')}>{data !== undefined && data.name}</span>
        <span className={cx('count')}>
          {t('Numberoflines')}: <strong>{data !== undefined && data.numConversations}</strong>
        </span>
        <div className={cx('button-footer')}>
          <button>10/100</button>
          <span>
            <AiOutlineCheck />
          </span>
          <strong>1/1</strong>
        </div>
      </div>
    </motion.div>
  );
}

export function ModalPracticeListening({ onClick, data, listCate, idtopic }) {
  const { t } = useTranslation();
  const [dataNoActive, setDataNoActive] = useState([]);
  const [dataActive, setDataActive] = useState();

  useEffect(() => {
    setDataNoActive([...data]);
  }, []);

  useEffect(() => {
    let dataActive2 = dataNoActive.find((x) => x.active === undefined);
    setDataActive(dataActive2);
  }, [dataNoActive]);

  const handleNext = () => {
    const listRemaining = dataNoActive.filter((x) => +x.idconversationContent !== +dataActive.idconversationContent);
    setDataNoActive([...listRemaining]);
  };
  useEffect(() => {
    if (dataActive !== undefined) {
      var audio = new Audio(dataActive !== undefined && dataActive.audioEn);
      setTimeout(() => {
        audio.play();
      }, 1000);
      audio.addEventListener('ended', handleNext);
    }
  }, [dataActive]);

  return (
    <div className={cx('wrapper-content__modal')}>
      <div className={cx('topic-content')}>{t('Repeatthedialogue')}</div>
      <div className={cx('main-content')}>
        <div className={cx('unit-content')}>
          {listCate !== undefined && listCate[idtopic] && listCate[idtopic].nameTopic !== undefined && listCate[idtopic].nameTopic}
        </div>
        {data.map((item, index) => {
          return (
            <ButtonConversationLeft
              dataActive={dataActive !== undefined && +dataActive.idconversationContent === +item.idconversationContent}
              data={item}
              key={index}
              right={index % 2 === 0 ? true : false}
            />
          );
        })}
      </div>
      {dataActive === undefined ? (
        <div className={cx('done', 'donedone')}>
          <button onClick={() => onClick()}>{t('Complete')}</button>
        </div>
      ) : (
        <div className={cx('done')}>
          <button>{t('Complete')}</button>
        </div>
      )}
    </div>
  );
}

export function ModalStudyResult() {
  const { t } = useTranslation();
  const { IDBook, IDAge, IDCourse } = useIDBookIDAge();

  const { auth } = useAuth();
  const [master, setMaster] = useState();
  const [leader, setLeader] = useState();
  const [skills, setSkills] = useState();
  const [progress, setProgress] = useState();
  useEffect(() => {
    const fetch = async () => {
      const [res, res1, res2, res3] = await Promise.all([
        GetAllConverMasterConver.getAllConverMasterConver({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetAllConverLearnConver.getAllConverLearnConver({ headers: { Authorization: `Bearer ${auth.token}` } }),
        ConversationalSkills.conversationalSkillsConver({ headers: { Authorization: `Bearer ${auth.token}` } }),
        ProgessScheduleConver.progessScheduleConver({ headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);
      setMaster(res);
      setLeader(res1);
      setSkills(res2);
      setProgress(res3);
    };
    fetch();
  }, [IDBook, IDAge]);
  const result =
    progress !== undefined && progress.data !== undefined && progress.data.substring(0, progress.data.length - 1) === 'NaN'
      ? 0
      : progress !== undefined && progress.data !== undefined && progress.data.substring(0, progress.data.length - 1);
  const noresult = 100 - result;
  const data = {
    labels: [t('Accomplished'), t('Unfinished')],
    datasets: [
      {
        label: 'My First Dataset',
        data: [result, noresult],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className={cx('wrapper-content__modal')}>
      {/* <div className={cx('topic-content')}>KẾT QUẢ HỌC</div> */}
      <div className={cx('list-content__result')}>
        <ContentResult img={icon1} data={master} />
        <ContentResult img={icon2} data={leader} />
        <ContentResult img={icon3} data={skills} />
      </div>

      <div className={cx('wrapper-process')}>
        <div className={cx('process-text')}>{progress !== undefined && progress.message}</div>
        <div className={cx('circle')}>
          <Doughnut data={data}></Doughnut>
        </div>
      </div>
    </div>
  );
}

export function ContentResult({ data, img }) {
  return (
    <div className={cx('number-of-lessons-learned')}>
      <div className={cx('number-of-lessons-learned__left')}>
        <div className={cx('img-lessons-learned')}>
          <img src={img} alt="" />
        </div>
        <div className={cx('number-of-lessons-learned__left__text')}>{data !== undefined && data.message}</div>
      </div>
      <div className={cx('number-of-lessons-learned__right')}>{data !== undefined && data.data}</div>
    </div>
  );
}

export function ButtonConversationLeft({ dataActive, right, data }) {
  const [singleConver, setSingleConver] = useState(undefined);
  const openConversation = () => {
    var audio = new Audio(data !== undefined && data.audioEn);
    audio.play();
    setSingleConver(true);
    audio.addEventListener('ended', () => setSingleConver(false));
  };

  const classes = cx('wrapper-button__conversation', {
    right,
    dataActive,
  });
  return (
    <div className={classes}>
      <div className={cx('img-button__conversation')}>
        <img src={avatar} alt="" />
      </div>
      <div className={singleConver ? cx('content-button__conversation', 'active') : cx('content-button__conversation')}>
        <img onClick={openConversation} className={cx('content-button__conversation__img')} src={loa} alt="" />
        {data !== undefined && data.text}
      </div>
    </div>
  );
}
