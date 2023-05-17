import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Account.module.scss';
import avatar from '~/assets/image/Account/avatar.png';
import avatar2 from '~/assets/image/Account/avatar2.png';
import pencil from '~/assets/image/Account/pencil.png';
import medal from '~/assets/image/Account/medal.png';
import star from '~/assets/image/Account/star.png';
import learn from '~/assets/image/Account/learning.png';
import iconlearning from '~/assets/image/Account/iconlearning.png';
import iconvoca from '~/assets/image/Account/iconvoca.png';
import iconexercise from '~/assets/image/Account/iconexercise.png';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import skill from '~/assets/image/Account/skill.png';
import { UserData } from '~/data/data.js';
import { motion, AnimatePresence } from 'framer-motion';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import * as Profile from '~/services/Profile';
import * as SumScoreUser from '~/services/SumScoreUser';
import * as GetAllProcess from '~/services/GetAllProcess';
import * as GetStudyRoute from '~/services/GetStudyRoute';
import * as CreateStudyRouteByUser from '~/services/CreateStudyRouteByUser';
import { useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';
import moment from 'moment';
import * as NumberOfLessons from '~/services/NumberOfLessons';
import * as NumberOfExercises from '~/services/NumberOfExercises';
import * as NumberOfMusic from '~/services/NumberOfMusic';
import * as NumberOfStory from '~/services/NumberOfStory';
import * as ProcessConversation from '~/services/ProcessConversation';
import * as ProcessGrammar from '~/services/ProcessGrammar';
import * as ProcessPractiveListen from '~/services/ProcessPractiveListen';
import * as ProcessVoca from '~/services/ProcessVoca';
import * as LearningSituation from '~/services/LearningSituation';
import * as Averagestudy from '~/services/Averagestudy';
import * as GetContentHistory from '~/services/GetContentHistory';
import { wrapper, container } from './Motion';
import { useTranslation } from 'react-i18next';
import 'moment/locale/vi';
import Paginated from '~/Components/Paginated';

const cx = classNames.bind(styles);

function Account() {
  moment.locale('vi');
  const [profile, setProfile] = useState();
  const [score, setScore] = useState();
  const [rank, setRank] = useState();
  const [rankNext, setRankNext] = useState();
  const [numls, setNumls] = useState();
  const [numex, setNumex] = useState();
  const [numms, setNumms] = useState();
  const [numst, setNumst] = useState();
  const [procv, setProcv] = useState();
  const [progra, setProgra] = useState();
  const [propra, setPropra] = useState();
  const [provoca, setProvoca] = useState();
  const [history, setHistory] = useState([]);
  const [learningSituation, setLearningSituation] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      const [numls, numex, numms, numst, procv, progra, propra, provoca, learningsituation, history] = await Promise.all([
        NumberOfLessons.numberOfLessons({ headers: { Authorization: `Bearer ${auth.token}` } }),
        NumberOfExercises.numberOfExercises({ headers: { Authorization: `Bearer ${auth.token}` } }),
        NumberOfMusic.numberOfMusic({ headers: { Authorization: `Bearer ${auth.token}` } }),
        NumberOfStory.numberOfStory({ headers: { Authorization: `Bearer ${auth.token}` } }),
        ProcessConversation.processConversation({ headers: { Authorization: `Bearer ${auth.token}` } }),
        ProcessGrammar.processGrammar({ headers: { Authorization: `Bearer ${auth.token}` } }),
        ProcessPractiveListen.processPractiveListen({ headers: { Authorization: `Bearer ${auth.token}` } }),
        ProcessVoca.processVoca({ headers: { Authorization: `Bearer ${auth.token}` } }),
        LearningSituation.learningSituation({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetContentHistory.getContentHistory({ headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);
      console.log('procv', procv);

      setNumls(numls.data);
      setNumex(numex.data);
      setNumms(numms.data);
      setNumst(numst.data);
      setProcv(procv.data);
      setProgra(progra.data);
      setPropra(propra.data);
      setProvoca(provoca.data);
      setHistory(history.data);
      setLearningSituation(learningsituation.data);
    };
    fetch();
  }, []);
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      const [prf, sumscrore, allProcess, studyRoute, res5] = await Promise.all([
        Profile.profile({ headers: { Authorization: `Bearer ${auth.token}` } }),
        SumScoreUser.sumScoreUser({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetAllProcess.getAllProcess(),
        GetStudyRoute.getStudyRoute({ headers: { Authorization: `Bearer ${auth.token}` } }),
        CreateStudyRouteByUser.createStudyRouteByUser({ headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);

      setProfile(prf.data);
      setScore(sumscrore.data);
      // setStudyRoute(studyRoute.data.at(-1));

      setRank(
        allProcess.find(
          (x) => x.studyRouteId === (studyRoute !== undefined && studyRoute.data !== undefined && studyRoute.data.at(-1).studyRouteId)
        )
      );
      setRankNext(
        allProcess.find(
          (x) => x.studyRouteId === (studyRoute !== undefined && studyRoute.data !== undefined && studyRoute.data.at(-1).studyRouteId + 1)
        )
      );
    };
    fetch();
  }, []);

  const [userDate, setUserData] = useState({
    labels: '',
    datasets: [
      {
        label: t('Averagestudytimechart'),
        data: '',
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
      },
    ],
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await Averagestudy.averagestudy({ headers: { Authorization: `Bearer ${auth.token}` } });
      if (res !== undefined && res.data !== undefined) {
        setUserData({
          labels: res.data.map((data) => data.day),
          datasets: [
            {
              label: t('Averagestudytimechart'),
              data: res.data.map((data) => data.time),
              backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
            },
          ],
        });
      }
    };
    fetch();
  }, []);

  const [activeLearning, setActiveLearning] = useState(null);
  const handleSetActive = (index) => {
    if (activeLearning === index) {
      setActiveLearning(null);
    } else {
      setActiveLearning(index);
    }
  };

  // phan trang
  // const itemOffset = useSelector((state) => state.ItemOffset.itemOffset);
  const [check, setCheck] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setCheck(!check);
    const endOffset = itemOffset + 5;

    setCurrentItems(history.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(history.length / 5));
  }, [itemOffset, 5, history]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % history.length;
    setItemOffset(newOffset);
  };

  // useEffect(() => {
  //   if (indexVoca !== indexOffset) {
  //     setItemOffset(0);
  //   }
  // }, [indexVoca]);
  return (
    <AnimatePresence>
      <motion.div variants={wrapper} initial="hidden" animate="show" exit="exit" className={cx('wrapper')}>
        <div className={cx('blur')}></div>
        <div className={cx('header')}>
          {/* header-left */}
          {/* <div className={cx('header__left')}>
            <img src={avatar} alt="" />

            <div className={cx('header__left-nickname')}>
              <div className={cx('header__left-nickname__main')}>
                <h3 className={cx('nickname')}> BKT Student</h3>
                <span className={cx('id')}>id:9999</span>
              </div>
              <img className={cx('pencil')} src={pencil} alt="" />
            </div>
          </div> */}
          {/* header-right */}

          <div className={cx('header__right')}>
            <span className={cx('expiry')}>{t('Expiry')} 22/12/2024</span>
          </div>
        </div>
        <motion.div variants={container} className={cx('content')}>
          <DetailInfo index={0} title="Thông tin cá nhân">
            <ContentDetailProfile profile={profile} score={score} rank={rank} />
          </DetailInfo>
          {/* <DetailInfo index={1} title="Lộ trình">
            <ContentDetailRoute rankNext={rankNext} score={score} rank={rank} />
          </DetailInfo> */}
          <DetailInfo index={1} title="Tình hình học tập">
            {learningSituation !== undefined &&
              learningSituation.map((item, index) => {
                return (
                  <ContentDetailLearning onClick={() => handleSetActive(index)} active={activeLearning === index} key={index} data={item} />
                );
              })}
          </DetailInfo>

          <div className={cx('wrapper-learnskill')}>
            <div>
              <div className={cx('main-title')}>{t('Learningvolume')}</div>
              <div className={cx('learning-list')}>
                <ButtonLearning title="Bài học" data={numls}></ButtonLearning>
                <ButtonLearning title="Bài tập" data={numex}></ButtonLearning>
                <ButtonLearning title="Bài hát" data={numms}></ButtonLearning>
                <ButtonLearning title="Câu truyện" data={numst}></ButtonLearning>
              </div>
            </div>

            <div className={cx('skill-list')}>
              <div>
                <div className={cx('main-title')}>{t('Skillassessment')}</div>
                <div className={cx('list-skill')}>
                  <ButtonSkill title="Từ vựng" data={procv}></ButtonSkill>
                  <ButtonSkill title="Ngữ pháp" data={progra}></ButtonSkill>
                  <ButtonSkill title="Hội thoại" data={propra}></ButtonSkill>
                  <ButtonSkill title="Luyện nghe" data={provoca}></ButtonSkill>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('average-study-time')}>
            <div className={cx('average-study-time__text')}>{t('Averagestudytime')}:</div>
            {/* <div className={cx('average-study-time__time')}>
              60 {t('minute')}/ {t('day')}
            </div>
            <div className={cx('average-study-time__percent')}>Tăng 1% so với tuần trước</div> */}
            <BarChart chartData={userDate} />
          </div>
          <DetailInfo index={1} title="Lịch sử học tập">
            <table className={cx('table')}>
              <tr className={cx('title-header')}>
                <th>STT</th>
                <th>Nội dung</th>
                <th>Thời gian</th>
                <th>Đánh giá</th>
              </tr>
              <Paginated
                sm
                nodiv
                // indexVoca={indexVoca}
                currentItems={currentItems}
                onClick={(event) => handlePageClick(event)}
                pageCount={pageCount}
              >
                {currentItems !== undefined &&
                  currentItems.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <td>{index + 1}</td>
                        <td>{item.contentHistory}</td>
                        <td>{moment(item.createdDate).format('hh:mm:ss A, MMMM Do YYYY')}</td>
                        <td> {item.ratings}</td>
                      </tbody>
                    );
                  })}
              </Paginated>
            </table>
          </DetailInfo>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Account;

export function DetailInfo({ children, title, index }) {
  const navigate = useNavigate();
  const NextEditAccount = () => {
    if (index === 0) {
      navigate(config.routes.accountedit);
    }
  };
  return (
    <div className={cx('wrapper-detailinfo')}>
      <div className={cx('wrapper-detailinfo__header')}>
        <div className={cx('detailinfo-header__title')}>{title}</div>
        <img onClick={() => NextEditAccount()} src={pencil} alt="" />
      </div>
      <div className={cx('wrapper-detailinfo__content')}>
        <div className={cx('wrapper-detailinfo__content__main')}>{children}</div>
      </div>
    </div>
  );
}

export function ButtonLearning({ title, data }) {
  const { t } = useTranslation();
  return (
    <div>
      <div className={cx('wrapper-learning__item')}>
        <div className={cx('information-learning')}>
          <span className={cx('information-count')}>{data !== undefined && data.quantity}</span>
          <span className={cx('information-title')}>{title}</span>
        </div>
        <div className={cx('wrapper-percent')}>
          <span>
            <AiOutlineCheckCircle />
          </span>
          <span className={cx('percent')}>{data !== undefined && data.percent}</span>
        </div>
      </div>
      <div className={cx('accomplished')}>{t('Numberoflessonslearned')}</div>
    </div>
  );
}

export function ButtonSkill({ title, data }) {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper-skill__item')}>
      <div className={cx('information-skill')}>
        <img src={skill} alt="" />
        <span className={cx('skill__percent')}>{data}</span>
      </div>
      <span className={cx('wrapinformation-skill__title')}>{title}</span>
    </div>
  );
}

export function ContentDetailProfile({ profile, score, rank }) {
  return (
    <div className={cx('wrapper-profile-total')}>
      <img className={cx('img2')} src={avatar2} alt="" />

      <div className={cx('wrapper-profile')}>
        <h3>{profile !== undefined && profile.fullName}</h3>

        <div className={cx('detail-information')}>
          <div className={cx('class-date-number')}>
            <span className={cx('detail-info__item')}>
              Lớp <strong>Chồi 1 2021/2022</strong>
            </span>
            <span className={cx('detail-info__item')}>
              Ngày sinh <strong>{profile !== undefined && profile.dob && moment(profile.dob).format('l')}</strong>
            </span>
            <span className={cx('detail-info__item')}>
              Liên hệ <strong>{profile !== undefined && profile.phone}</strong>
            </span>
          </div>
          <div className={cx('wrapper-rank')}>
            <div className={cx('img-rank')}>
              <img className={cx('img1')} src={medal} alt="" />
            </div>
            <div className={cx('content-rank')}>
              <div className={cx('title-rank')}>{rank !== undefined && rank.name !== undefined && rank.name}</div>
              <div className={cx('count-rank')}>
                <span>{score}</span>
                <img className={cx('img')} src={star} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentDetailRoute({ rank, score, rankNext }) {
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper-route')}>
      <div className={cx('img-nameroute')}>
        <img className={cx('img-medal')} src={medal} alt="" />
        <div className={cx('name-route')}>
          <h3>{rank !== undefined && rank.name}</h3>
          <div className={cx('scores-route')}>
            <span className={cx('scores')}>{score}</span>
            <img src={star} alt="" />
          </div>
        </div>
      </div>
      <div className={cx('rank')}>
        <span className={cx('rank-title')}>{t('Nextrank')}</span>
        <div className={cx('count-star')}>
          <span className={cx('count')}>{rankNext !== undefined && rankNext.score}</span>
          <div className={cx('star')}>
            <span>{rankNext !== undefined && rankNext.name}</span>
            <img src={star} alt="" />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export function ContentDetailLearning({ data, active, onClick }) {
  // console.log('data', data);
  const { t } = useTranslation();
  return (
    <>
      <div onClick={() => onClick()} className={cx('wrapper-learning')}>
        <img className={cx('img-learning')} src={learn} alt="" />
        <div className={cx('wrapper-learning__content')}>
          <h3> {data.nameCource}</h3>
          <div className={cx('block-complete')}>
            <span>Hoàn thành: {data.completedPercent}</span>
            {/* <span>
              {t('Point')}: 25 <img className={cx('img-star')} src={star} alt="" />
            </span> */}
          </div>
          <div className={cx('wrapper-progress')}>
            <div className={cx('progress-bar')}>
              <div style={{ width: `${data.completedPercent}` }} className={cx('progress-bar__item')}></div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
        animate={{
          height: active === true ? 'auto' : 0,
          opacity: active === true ? 1 : 0,
          padding: active === true ? '30px 40px' : 0,
          // overflow: active === true ? 'visible' : 'hidden',
        }}
        transition={{
          duration: 0.3,
        }}
        className={cx('wrapper-total-learingitem')}
      >
        <ContentDetailLearningItem img={iconlearning} title="Bài học" quantity={data.numLessonStudy} />
        <ContentDetailLearningItem img={iconexercise} title="Bài tập" quantity={data.numExerciseStudy} />
        <ContentDetailLearningItem img={iconvoca} title="Từ vựng" quantity={data.numVocaStudy} />
        <div className={cx('back-learning')}>{`Quay về khóa học ${'>>'}`}</div>
      </motion.div>
    </>
  );
}

export function ContentDetailLearningItem({ img, title, quantity }) {
  return (
    <div className={cx('wrapper-learingitem')}>
      <div className={cx('header-learningitem')}>
        <img src={img} alt="Từ vựng" />
      </div>
      <div className={cx('number-learned')}>{quantity}</div>
      <div className={cx('footer-learningitem')}>{title}</div>
    </div>
  );
}

export function BarChart({ chartData }) {
  return <Bar data={chartData} />;
}
