import classNames from 'classnames/bind';
import styles from '~/sass/Components/_PracticeListening.module.scss';
import HeaderPage from '~/Components/HeaderPage';
import leaning from '~/assets/image/Account/learning.png';
import { AiOutlineCheck, AiOutlineClose, AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import sound from '~/assets/image/PracticeListening/sound.png';
import loa from '~/assets/image/PracticeListening/loa.png';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import icon1 from '~/assets/image/PracticeListening/icon1.png';
import icon2 from '~/assets/image/PracticeListening/icon2.png';
import icon3 from '~/assets/image/PracticeListening/icon3.png';
import { Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import * as GetListenByBookClass from '~/services/GetListenByBookClass';
import { useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import lessonbg from '~/assets/music/lessonbg.mp3';
import { useLayoutEffect } from 'react';
import useRemoveVn from '~/hooks/useRemoveVn';
import * as UserListenCreate from '~/services/UserListenCreate';
import * as GetAllListenLearn from '~/services/GetAllListenLearn';
import * as GetAllListenCompetently from '~/services/GetAllListenCompetently';
import * as GetAllListenMaster from '~/services/GetAllListenMaster';
import * as ProgressSchedule from '~/services/ProgressScheduleListen';
import mp3success from '~/assets/music/success.mp3';
import mp3fail from '~/assets/music/fail.mp3';
import { useTranslation } from 'react-i18next';
import routes from '~/config/routes';
import { useIDBookIDAge } from '~/hooks/useIDBookIDAge';
import Loading from '~/Components/animationloading/Animationloading';

const cx = classNames.bind(styles);

function PracticeListening() {
  const { IDBook, IDAge, IDCourse } = useIDBookIDAge();

  const navigate = useNavigate();
  const { index } = useParams();
  const { auth } = useAuth();
  const [active, setActive] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [activeResult, setActiveResult] = useState(false);
  const [listTopic, setListTopic] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetListenByBookClass.getListenByBookClass(IDAge, IDBook, { headers: { Authorization: `Bearer ${auth.token}` } });
      setListTopic([...res.data]);
    };
    fetch();
  }, []);

  const handleClick = (item) => {
    setActive(true);
    setDataModal(item);
  };
  const closeModal = () => {
    setActive(false);
    setActiveResult(false);
  };

  const openResult = () => {
    setActiveResult(true);
  };

  const selecTopic = (index) => {
    navigate(`/practicelistening/${index}`);
  };
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper')}>
      <Loading active={listTopic !== undefined && listTopic.length === 0 ? true : false} opa={0.6} />

      <HeaderPage title={t('listeningpractice')} path={routes.homepage} />
      {/* modal luyen nghe */}
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
                <AiOutlineClose />
              </span>
              <ModalPracticeListening data={dataModal} />
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
                <AiOutlineClose />
              </span>
              <ModalStudyResult />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cx('wrapper-content')}>
        <div className={cx('wrapper-content__left')}>
          {listTopic.map((item, i) => {
            return <Button onClick={() => selecTopic(i)} active={+index === +i} data={item} index={i} />;
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
              <div className={cx('text-ractice__detail')}>{`Unit ${index}: ${
                listTopic !== undefined &&
                listTopic[index] !== undefined &&
                listTopic[index].nameTopic !== undefined &&
                listTopic[index].nameTopic
              }`}</div>
            </div>
            <div className={cx('body-ractice__detail')}>
              {listTopic !== undefined &&
                listTopic[index] !== undefined &&
                listTopic[index].listen.length > 0 &&
                listTopic[index].listen.map((item) => {
                  return <ButtonDetail data={item} onClick={() => handleClick(item)} />;
                })}
              {listTopic !== undefined && listTopic[index] !== undefined && listTopic[index].listen.length === 0 && (
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', lineHeight: '24px', textAlign: 'center' }}>
                  {t('Dataarebeingupdated')}
                </div>
              )}
              {/* <ButtonDetail />
              <ButtonDetail />
              <ButtonDetail /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeListening;

export function Button({ onClick, active, data, index }) {
  return (
    <div onClick={() => onClick()} className={active ? cx('button-unit', 'active') : cx('button-unit')}>
      <div className={cx('button-unit__img')}>
        <img src={leaning} alt="" />
      </div>

      <span className={cx('button-unit__text')}>{`Unit ${index + 1}: ${
        data !== undefined && data.nameTopic !== undefined && data.nameTopic
      }`}</span>
    </div>
  );
}

export function ButtonDetail({ onClick, data }) {
  const handleClick = () => {
    onClick();
  };
  const { t } = useTranslation();
  return (
    <div onClick={handleClick} className={cx('button-ractice__detail')}>
      <div className={cx('button-ractice__img')}>
        <img src={data !== undefined && data.thumbnail} alt="" />
      </div>
      <div className={cx('button-ractice__text')}>
        <span className={cx('title')}>{data !== undefined && data.name}</span>
        <span className={cx('count')}>
          {t('Numberofconversations')}: <strong> {data !== undefined && data.length}</strong>
        </span>
        <div className={cx('button-footer')}>
          <button>10/100</button>
          <span>
            <AiOutlineCheck />
          </span>
          <strong>1/1</strong>
        </div>
      </div>
    </div>
  );
}

export function ModalPracticeListening({ data }) {
  const { auth } = useAuth();
  const { t } = useTranslation();

  const [success, setSuccess] = useState(undefined);
  const [tottalTime, setTotalTime] = useState('');

  useEffect(() => {
    if (success === true) {
      const audio = new Audio(mp3success);
      audio.playbackRate = 1.4;
      audio.play();
    } else if (success === false) {
      const audio = new Audio(mp3fail);
      audio.playbackRate = 1.4;
      audio.play();
    }
  }, [success]);
  const [play, setPlay] = useState(true);
  const [change, setChange] = useState('');
  const openModalResult = () => {
    // eslint-disable-next-line no-unused-expressions, react-hooks/rules-of-hooks
    setSuccess(useRemoveVn(change.toLowerCase()) === useRemoveVn(data.describe.toLowerCase()));
  };

  const closeModalSuccess = async () => {
    const res = await UserListenCreate.userListenCreate(
      { listenID: data !== undefined && data.listenId },
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );

    setSuccess(undefined);
    setChange('');
  };

  const closeModalFail = () => {
    setSuccess(undefined);
  };

  const handleClick = () => {
    setPlay(!play);
  };

  useEffect(() => {
    const audio = new Audio(data !== undefined && data.resource !== undefined && data.resource);

    if (play) {
      audio.play();
    } else {
      audio.pause();
    }
    audio.addEventListener('ended', () => setPlay(false));

    audio.addEventListener('loadedmetadata', () => setTotalTime(audio.duration.toString().split('.')[0]));
  }, [play]);
  useLayoutEffect(() => {
    if (+tottalTime > 0 && play === true) {
      const timeOut = setTimeout(() => {
        setTotalTime(+tottalTime - 1);
      }, 1000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [tottalTime, play]);

  const handleChange = (e) => {
    setChange(e.target.value);
  };
  return (
    <div className={cx('wrapper-content__modal')}>
      <div className={cx('topic-content')}>{t('Listentothetext')}</div>

      <div className={cx('main-content')}>
        {success !== undefined && success === true && <ModalSuccess onClick={closeModalSuccess} active={success} />}
        {success !== undefined && success === false && <ModalError onClick={closeModalFail} active={!success} />}
        <div className={cx('unit-content')}>{` ${data !== undefined && data.name}`}</div>
        <div className={cx('control-sound')}>
          <span onClick={handleClick} className={cx('icon-play')}>
            {play ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
          </span>
          <div className={cx('wrapper-control')}>
            {/* <div className={cx('img-sound')}>
              <img src={sound} alt="" />
            </div> */}
            {/* <div className={cx('img-sound')} style={{ backgroundImage: `url(${sound})` }}></div> */}
            <section>
              <div className={cx('wave', `${play ? 'wave1' : ''}`)}></div>
            </section>

            <div className={cx('time')}>{`${Math.floor(tottalTime / 60)}: ${tottalTime % 60}`}</div>
          </div>
        </div>
        <div className={cx('wrapper-text')}>
          <input onChange={(e) => handleChange(e)} value={change} type="text" placeholder={t('Enterthewordyouhear')} />
          <img className={cx('img-speaker')} src={loa} alt="" />
        </div>

        <div className={cx('button-check')} onClick={openModalResult}>
          <span className={cx('icon-check__modal')}>
            <AiOutlineCheck />
          </span>
          Kiểm tra
        </div>
      </div>
    </div>
  );
}

export function ModalError({ active, onClick }) {
  const handleClick = () => {
    onClick();
  };
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: active ? 0 : 40, opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('wrapper-modal__error')}
        >
          <div className={cx('modal-header__error')}>
            <span className={cx('modal-header__error__close')}>
              <AiOutlineClose />
            </span>
            Sai rồi !
          </div>
          <div onClick={handleClick} className={cx('modal-footer__error')}>
            <button className={cx('button-replay')}>Làm lại</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ModalSuccess({ active, onClick }) {
  const handleClick = () => {
    onClick();
  };
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: active ? 0 : 40, opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('wrapper-modal__success')}
        >
          <div className={cx('modal-header__success')}>
            <span className={cx('modal-header__success__close')}>
              <AiOutlineCheck />
            </span>
            Đúng rồi !
          </div>
          <div onClick={handleClick} className={cx('modal-footer__success')}>
            <button className={cx('button-replay')}>Hoàn thành</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ModalStudyResult() {
  // import * as GetAllListenLearn from '~/services/GetAllListenLearn'
  // import * as GetAllListenCompetently from '~/services/GetAllListenCompetently'
  // import * as GetAllListenMaster from '~/services/GetAllListenMaster'
  // import * as ProgressSchedule from '~/services/ProgressSchedule'
  const [listenLearn, setListenLearn] = useState();
  const [listenCompetently, setListenCompetently] = useState();
  const [listenMaster, setListenMaster] = useState();
  const [listenProgressSchedule, setListenProgressSchedule] = useState();
  const { auth } = useAuth();
  const { t } = useTranslation();
  useEffect(() => {
    const fetch = async () => {
      const [res, res1, res2, res3] = await Promise.all([
        GetAllListenLearn.getAllListenLearn({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetAllListenCompetently.getAllListenCompetently({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetAllListenMaster.getAllListenMaster({ headers: { Authorization: `Bearer ${auth.token}` } }),
        ProgressSchedule.progressScheduleListen({ headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);
      setListenLearn(res);
      setListenCompetently(res1);
      setListenMaster(res2);
      setListenProgressSchedule(res3);
    };
    fetch();
  }, []);
  const result =
    listenProgressSchedule !== undefined &&
    listenProgressSchedule.data !== undefined &&
    listenProgressSchedule.data.substring(0, listenProgressSchedule.data.length - 1) === 'NaN'
      ? 0
      : listenProgressSchedule !== undefined &&
        listenProgressSchedule.data !== undefined &&
        listenProgressSchedule.data.substring(0, listenProgressSchedule.data.length - 1);
  const noresult = 100 - result;
  const data = {
    labels: [t('Accomplished'), t('Unfinished')],
    datasets: [
      {
        label: 'My First Dataset',
        data: [result, noresult],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className={cx('wrapper-content__modal')}>
      {/* <div className={cx('topic-content')}>KẾT QUẢ HỌC</div> */}
      <div className={cx('list-content__result')}>
        <ContentResult img={icon1} data={listenLearn} />
        <ContentResult img={icon2} data={listenCompetently} />
        <ContentResult img={icon3} data={listenMaster} />
      </div>

      <div className={cx('wrapper-process')}>
        <div className={cx('process-text')}>{listenProgressSchedule !== undefined && listenProgressSchedule.message}</div>
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
