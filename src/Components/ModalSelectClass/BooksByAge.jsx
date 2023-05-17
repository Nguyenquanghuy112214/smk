import classNames from 'classnames/bind';
import styles from '~/sass/Components/_BookByAge.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setModalSelect } from '~/Components/ModalSelectClass/HandleModalSlice';
import * as getTopic from '~/services/GetTopic';
import Button from '~/Components/Button';
import { setBookByAge } from '~/Redux/BookByAgeSlice';
import { setTopic } from '~/Redux/TopicSlice';
import { setVocabyLesson } from '~/Redux/VocaByLessonSlice';
import * as GetVocaByLesson from '~/services/GetVocaByLesson';
import tamcam from '~/assets/image/sachdep/anh1.jpg';
import { setCardClass } from '~/Redux/CardClassSlice';
import { setCourseSlice } from '~/Redux/CourseSlice';
import { AiOutlineFieldTime } from 'react-icons/ai';
import moment from 'moment';
import empty from '~/assets/animations/empty.json';
import * as GetCourseByClass from '~/services/GetCourseByClass';
import * as createCourse from '~/services/CreateCourse';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useCourse } from '~/hooks/useCourse';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';
import LoadingRobot from '../LoadingRobot';
import { useTranslation } from 'react-i18next';
import { useAuth } from '~/hooks/useAuth';
import { useIDBookIDAge } from '~/hooks/useIDBookIDAge';

const cx = classNames.bind(styles);

function BookByAge({ listCourse }) {
  console.log('listCourse2', listCourse);
  const { IDCourse } = useIDBookIDAge();

  const { setCourse } = useCourse();
  const { auth } = useAuth();
  const { setIDBookAge } = useIDBookIDAge();
  const { t } = useTranslation();
  const [img, setImg] = useState([]);

  const dispatch = useDispatch();
  const idClass = useSelector((state) => state.CardClass.isNumber.class);
  const nameClass = useSelector((state) => state.CardClass.isNumber.title);
  const [couresByClass, setCourseByClass] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await GetCourseByClass.getCourseByClass(idClass);
      setCourseByClass([...res]);
    };
    fetch();
  }, [idClass]);

  const handleActive = async (item) => {
    setCourse(item.courseId);

    dispatch(setCardClass({ class: item.idclass, title: nameClass }));
    dispatch(setBookByAge(item.idbook));
    dispatch(setCourseSlice(item.courseId));

    const [GetTopic, GetVocal, CreateCourse] = await Promise.all([
      getTopic.getTopic(item.idbook, item.idclass),
      GetVocaByLesson.getVocaByLesson(item.idclass, item.idbook),
      createCourse.createCourse(
        {
          CourseId: item.courseId,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      ),
    ]);

    if (item.idbook !== undefined && item.idclass !== undefined) {
      console.log('ZOO', item);
      dispatch(setTopic(GetTopic));
      dispatch(setVocabyLesson(GetVocal));
      setIDBookAge(item.idbook, item.idclass, item.courseId);
      dispatch(setModalSelect(false));
    } else {
      console.log('Out');

      alert(t('Pleaseselectyourage'));
    }
  };
  useEffect(() => {
    setImg([]);
  }, [idClass]);
  console.log('idClass', idClass);
  const handleError = (index) => {
    setImg((img) => [...img, index]);
  };

  if (listCourse) {
    return (
      // <div className={cx('wrapper-img')}>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} className="mySwiper">
        {idClass === false &&
          listCourse !== undefined &&
          listCourse.map((item, index) => {
            return (
              <SwiperSlide key={item.courseId}>
                <div className={IDCourse === item.courseId ? cx('img', 'active') : cx('img')}>
                  <img
                    style={{ flexShrink: 0 }}
                    onError={() => handleError(index)}
                    src={img.find((x) => x === index) ? tamcam : item.thumbnail}
                    alt=""
                  />
                  <div className={cx('wrapper-text')}>
                    <div className={cx('course-time')}>
                      <div className={cx('course')}>
                        <span>{item.nameCource}</span>
                      </div>
                    </div>
                    <div className={cx('id-teacher-button-start')}>
                      <div className={cx('time')}>
                        <span>
                          <AiOutlineFieldTime />
                        </span>
                        <span>{moment(item.closedAt || Date()).format('l')}</span>
                      </div>
                      <div className={cx('id-teacher')}>
                        <div className={cx('id')}>{`ID: ${item.description}`}</div>
                        <div className={cx('teacher')}>{t('Author')}: Nguyễn Văn Dũng</div>
                      </div>
                      <div className={cx('button-start')}>
                        <button onClick={() => handleActive(item)} className={cx('title-button')}>
                          {t('Start')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

        {idClass !== undefined &&
          couresByClass !== undefined &&
          couresByClass.map((item, i) => {
            return (
              <SwiperSlide key={item.courseId}>
                <div className={IDCourse === item.courseId ? cx('img', 'active') : cx('img')}>
                  <img
                    style={{ flexShrink: 0 }}
                    onError={() => handleError(i)}
                    src={img.find((x) => +x === +i) ? tamcam : item.thumbnail}
                    alt=""
                  />
                  <div className={cx('wrapper-text')}>
                    <div className={cx('course')}>
                      <span>{item.nameCource}</span>
                    </div>

                    <div className={cx('time')}>
                      <span>
                        <AiOutlineFieldTime />
                      </span>
                      <span>{moment(item.openedAt || Date()).format('l')}</span>
                    </div>
                    <div className={cx('id-teacher')}>
                      <div className={cx('id')}>{`ID: ${item.description}`}</div>
                      <div className={cx('teacher')}>Giáo viên: Nguyễn Văn Dũng</div>
                    </div>

                    <div className={cx('button-start')}>
                      <button onClick={() => handleActive(item)} className={cx('title-button')}>
                        Bắt đầu
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      // </div>
    );
  } else {
    return (
      <Row style={{ height: '200px' }} className="justify-content-center">
        <Col xxl={4} xl={4} lg={4} md={12} sm={12}>
          <LoadingRobot active ssm style={empty} />
        </Col>
      </Row>
    );
  }
}

export default BookByAge;
