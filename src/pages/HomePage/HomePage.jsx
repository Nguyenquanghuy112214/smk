/* eslint-disable no-extend-native */
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_HomePage.module.scss';

import sudying from '~/assets/image/section/studying.png';
import anh2 from '~/assets/image/section/2.png';
import anh3 from '~/assets/image/section/3.png';
import vocabulary from '~/assets/image/section/vocabulary.png';
import talking from '~/assets/image/section/talking.png';
import learning from '~/assets/image/section/learning.png';
import listen from '~/assets/image/section/listen.png';
import student from '~/assets/image/section/student.png';

import CardItem from '~/Components/CardItem';
import ModalSeclectClass from '~/Components/ModalSelectClass/ModalSelectClass';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { useInView } from 'framer-motion';

import avatar from '~/assets/image/Account/avatar.png';

import Button from '~/Components/Button';

import SectionHeader from '~/Components/Section/SectionHeader';
import SectionContent from '~/Components/Section/SectionContent';
import { setModalSelect } from '~/Components/ModalSelectClass/HandleModalSlice';
import pencil from '~/assets/image/section/pencil.png';
import lightning from '~/assets/image/section/lightning.png';

import config from '~/config';
import * as getTopic from '~/services/GetTopic';
import * as GetVocaByLesson from '~/services/GetVocaByLesson';
import * as CreateStudyRouteByUser from '~/services/CreateStudyRouteByUser';
import { setTopic } from '~/Redux/TopicSlice';
import { setVocabyLesson } from '~/Redux/VocaByLessonSlice';
import { setCardClass } from '~/Redux/CardClassSlice';
import { setBookByAge } from '~/Redux/BookByAgeSlice';
import { useAuth } from '~/hooks/useAuth';
import { setIndexVoca } from '~/Redux/PostIndexVocaSlice';
import { setActiveModalVocaExercise } from '~/Redux/ActiveModalVocaPageExercise';
import { setModalVoca } from '~/Redux/ModalVocaSlice';
import { setIndexTopic } from '~/Redux/IndexTopic';
import * as CreateScore from '~/services/CreateScore';
import { useIDBookIDAge } from '~/hooks/useIDBookIDAge';

const cx = classNames.bind(styles);
function HomePage() {
  const { auth } = useAuth();

  const { t } = useTranslation('translation');

  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
  const ref = useRef();
  const ref2 = useRef();

  const isInView = useInView(ref2, { once: true });
  const { IDBook, IDAge } = useIDBookIDAge();

  const [ismodal, setIsModal] = useState(false);
  const Class = useSelector((state) => state.CardClass.isNumber);
  const idClass = useSelector((state) => state.CardClass.isNumber.class);
  const [width, setWidth] = useState();

  const dispatch = useDispatch();

  const openModalSelect = () => {
    dispatch(setModalSelect(true));
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window]);
  useEffect(() => {
    const fetch = async () => {
      const [res, res2] = await Promise.all([
        CreateStudyRouteByUser.createStudyRouteByUser({ headers: { Authorization: `Bearer ${auth.token}` } }),
        CreateScore.createScore({ UserId: auth.userID }, { headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);
    };
    if (auth.token) {
      fetch();
    }
  }, []);

  useEffect(() => {
    dispatch(setIndexVoca(null));
    dispatch(setIndexTopic(undefined));

    let title;

    if (IDAge === 1) {
      title = '18-36';
    } else if (IDAge === 2) {
      title = '3-4';
    } else if (IDAge === 3) {
      title = '4-5';
    } else if (IDAge === 4) {
      title = '5-6';
    }
    if (IDBook === undefined || IDAge === undefined) {
      const timer = setTimeout(() => {
        dispatch(setModalSelect(true));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (IDBook !== undefined && IDAge !== undefined) {
      const fetch = async () => {
        const [GetTopic, GetVocal] = await Promise.all([getTopic.getTopic(IDBook, IDAge), GetVocaByLesson.getVocaByLesson(IDAge, IDBook)]);

        dispatch(setCardClass({ class: IDAge, title: title }));
        dispatch(setBookByAge(IDBook));
        dispatch(setTopic(GetTopic));
        dispatch(setVocabyLesson(GetVocal));
      };
      fetch();
    }
  }, [IDAge]);

  useEffect(() => {
    if (IDBook === false) {
      dispatch(setModalSelect(true));
    }
  }, [IDBook]);

  const handleLearning = () => {
    if (IDBook === false || Class.class === undefined) {
      dispatch(setModalSelect(true));
    }
    return;
  };

  const navigate = () => {
    dispatch(setModalVoca(false));
    dispatch(setActiveModalVocaExercise(false));
    if (IDBook === false || Class.class === undefined) {
      dispatch(setModalSelect(true));
    }
    return;
  };
  return (
    Class !== undefined && (
      <div ref={ref}>
        <ModalSeclectClass isActive={ismodal} />
        {/* <MenuTlMb onClick /> */}

        <div
          ref={ref2}
          className={cx('wrapper-content')}
          style={{
            transform: isInView ? 'scale(1)' : 'scale(1.1)',
            opacity: isInView ? 1 : 0,
            transition: `all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1)`,
          }}
        >
          <div className={cx('header-homepage')}>
            <div className={cx('header-homepage__left')}>
              <img src={avatar} alt="" />
              <div className={cx('header-homepage__left__nickname')}>
                <p className={cx('text-1')}>{t('hello')} </p>

                <p className={cx('text-2')}>{auth !== undefined && auth.fullName}</p>
              </div>
            </div>
            <div className={cx('wrapper-navigate')}>
              <select onChange={changeLanguage}>
                <option value="vie">Vietnamese</option>
                <option value="eng">English</option>
              </select>
              <Button
                onClick={openModalSelect}
                lg
                title1={`${Class.title !== undefined ? Class.title : 'Chọn'} ${
                  Class.title !== undefined && Class.title.length >= 5 ? t('monthold') : t('old')
                }`}
              />
            </div>
          </div>

          <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
          {/* Hoc bo tro */}
          <div className={cx('wrapper-section')}>
            <SectionHeader img={pencil} title={t('maincourse')} />
            <Swiper
              grabCursor={true}
              spaceBetween={10}
              slidesPerView={width <= 1024 ? 3 : 4}
              navigation={true}
              modules={[Navigation]}
              className="swiper-home"
            >
              <SwiperSlide>
                <CardItem
                  onClick={handleLearning}
                  to={IDBook !== false && IDAge !== false ? config.routes.learning : config.routes.homepage}
                  white
                  img={sudying}
                  sm
                  df
                  title1="free"
                  maintitle={t('study')}
                />
              </SwiperSlide>
              {/* <SwiperSlide>
                <CardItem opacity white img={anh2} sm df title1="Free" maintitle={t('exercise')} />
              </SwiperSlide> */}
              <SwiperSlide>
                <CardItem to={config.routes.music} white img={anh3} sm plus title1="Plus" title2="+" maintitle={t('song')} />
              </SwiperSlide>
              <SwiperSlide>
                <CardItem to={config.routes.history} white img={anh3} sm df title1="Free" maintitle={t('story')} />
              </SwiperSlide>
              <SwiperSlide>
                <CardItem to={config.routes.video} white img={anh3} sm df title1="Free" maintitle={t('videostore')} />
              </SwiperSlide>
              {/* <SwiperSlide>
                <CardItem to={config.routes.courseware} white img={anh3} sm df title1="Free" maintitle={t('courseware')} />
              </SwiperSlide> */}
            </Swiper>
          </div>

          {/* Hoc chinh khoa va lo luyen thi */}
          <div className={cx('wapper-section--body')}>
            <div className={cx('wrapper-section')}>
              <SectionHeader img={lightning} title={t('complementarylearning')} />
              <SectionContent>
                <CardItem
                  onClick={navigate}
                  clwhite
                  to={IDBook !== false && IDAge !== false ? `/vocabulary/main/0/null/false` : config.routes.homepage}
                  justify
                  textwhite
                  primary
                  img={vocabulary}
                  sm
                  plus
                  title1="Plus"
                  title2="+"
                  maintitle={t('vocabulary')}
                />
                <CardItem
                  onClick={navigate}
                  to={IDBook !== false && IDAge !== false ? `conversation/0/0` : config.routes.homepage}
                  clwhite
                  justify
                  textwhite
                  primary
                  img={talking}
                  sm
                  plus
                  title1="Plus"
                  title2="+"
                  maintitle={t('conversation')}
                />
                <CardItem
                  onClick={navigate}
                  clwhite
                  to={IDBook !== false && IDAge !== false ? config.routes.grammar : config.routes.homepage}
                  justify
                  textwhite
                  primary
                  img={learning}
                  sm
                  plus
                  title1="Plus"
                  title2="+"
                  maintitle={t('grammar')}
                />
                <CardItem
                  onClick={navigate}
                  to={IDBook !== false && IDAge !== false ? `/practicelistening/0` : config.routes.homepage}
                  clwhite
                  justify
                  textwhite
                  primary
                  img={listen}
                  sm
                  plus
                  title1="Plus"
                  title2="+"
                  maintitle={t('listeningpractice')}
                />
              </SectionContent>
            </div>
            <div className={cx('wrapper-section')}>
              <SectionHeader img={student} title={t('Practice')} />
              <SectionContent>
                <CardItem opacity white img={anh2} sm df title1="Free" maintitle={t('exercise')} />
                <CardItem to={config.routes.courseware} white img={anh3} sm df title1="Free" maintitle={t('courseware')} />
                <CardItem to={config.routes.alphastartpage} white img={anh3} sm df title1="Free" maintitle={t('Alphabet2')} />
                <CardItem to={config.routes.numberstartpage} white img={anh3} sm df title1="Free" maintitle={t('Tablenumber')} />
                <CardItem to={config.routes.colorstartpage} white img={anh3} sm df title1="Free" maintitle={t('Colorboard')} />
              </SectionContent>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default HomePage;
