import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Process.module.scss';
import * as GetAllProcess from '~/services/GetAllProcess';
import * as SumScoreUser from '~/services/SumScoreUser';
import * as GetStudyRoute from '~/services/GetStudyRoute';
import * as CreateStudyRouteByUser from '~/services/CreateStudyRouteByUser';
import { useAuth } from '~/hooks/useAuth';
import { useEffect } from 'react';
import ruong1 from '~/assets/image/Process/ruong1.png';
import ruong2 from '~/assets/image/Process/ruong2.png';
import ruong3 from '~/assets/image/Process/ruong3.png';
import avatar from '~/assets/image/Account/avatar.png';
import huychuong from '~/assets/image/Process/huychuong.png';
import star from '~/assets/image/Process/star.png';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const Process = () => {
  const [listProcess, setListProcess] = useState([]);
  const [score, setScore] = useState(0);
  console.log('score', score);
  const [dataPoint, setDatapoint] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
    const fetch = async () => {
      const [res, res2, res3, res4] = await Promise.all([
        GetAllProcess.getAllProcess(),
        SumScoreUser.sumScoreUser({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetStudyRoute.getStudyRoute({ headers: { Authorization: `Bearer ${auth.token}` } }),
        CreateStudyRouteByUser.createStudyRouteByUser({ headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);
      setListProcess([...res]);
      setScore(res2.data);
      setDatapoint([...res3.data]);
    };
    fetch();
  }, []);
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('blur')}></div>
      <div className={cx('header')}>
        <div className={cx('img-header')}>
          <img src={avatar} alt="" />
        </div>
        <div className={cx('title-main')}>
          {t('hello')}, <span>Nguyễn Quang Huy</span>
        </div>
      </div>

      <div className={cx('body')}>
        <div className={cx('line', 'line1')}>
          {+score <= 1000 ? (
            <div style={{ width: `${(+score / 1000) * 100}%`, height: '100%', backgroundColor: '#106218' }}></div>
          ) : (
            <div style={{ width: '0%', height: '100%', backgroundColor: '#106218' }}></div>
          )}
          {listProcess.map((item, index) => {
            if (index < 3)
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0, transform: '-50' }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: item.studyRouteId * 0.3,
                    },
                  }}
                  key={index}
                  className={
                    dataPoint.find((x) => x.studyRouteId === item.studyRouteId)
                      ? cx(`point${item.studyRouteId}`, 'point', 'active')
                      : cx(`point${item.studyRouteId}`, 'point')
                  }
                >
                  <ContentTop
                    widthImg={(+item.studyRouteId / +item.studyRouteId + +item.studyRouteId / 20) * 70}
                    center={item.studyRouteId === 1}
                    title={item.name}
                    img={item.thumbnailFalse}
                  />
                  <ContentBottom score={item.score} center={item.studyRouteId === 1} />
                </motion.div>
              );
          })}
        </div>
        <div className={cx('line', 'line2')}>
          {+score <= 2500 && +score >= 1500 ? (
            <div style={{ width: `${(+score / 1000) * 100}%`, height: '100%', backgroundColor: '#106218' }}></div>
          ) : (
            <div style={{ width: '0%', height: '100%', backgroundColor: '#106218' }}></div>
          )}
          {[...listProcess].reverse().map((item, index) => {
            if (item.studyRouteId >= 4 && item.studyRouteId <= 6)
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0, transform: '-50' }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: item.studyRouteId * 0.3,
                    },
                  }}
                  key={index}
                  className={
                    dataPoint.find((x) => +x.studyRouteId === +item.studyRouteId)
                      ? cx(`point${item.studyRouteId}`, 'point', 'active')
                      : cx(`point${item.studyRouteId}`, 'point')
                  }
                >
                  <ContentTop
                    widthImg={(+item.studyRouteId / +item.studyRouteId + +item.studyRouteId / 20) * 70}
                    rotate={item.studyRouteId === 4}
                    center
                    title={item.name}
                    img={item.thumbnailFalse}
                  />
                  <ContentBottom score={item.score} left={item.studyRouteId === 6} center />
                </motion.div>
              );
          })}
          <div className={cx('line3')}>
            {+score < 1500 && +score > 1000 ? (
              <div style={{ width: `${(+score / 500) * 100}%`, height: '100%', backgroundColor: '#106218' }}></div>
            ) : (
              <div style={{ width: `0%`, height: '100%', backgroundColor: '#106218' }}></div>
            )}
          </div>
          <div className={cx('line5')}>
            {+score < 3000 && +score > 2500 ? (
              <div style={{ width: `${(+score / 500) * 100}%`, height: '100%', backgroundColor: '#106218' }}></div>
            ) : (
              <div style={{ width: `0%`, height: '100%', backgroundColor: '#106218' }}></div>
            )}
          </div>
        </div>
        <div className={cx('line', 'line4')}>
          {+score <= 4000 && +score >= 3000 ? (
            <div style={{ width: `${(+score / 1000) * 100}%`, height: '100%', backgroundColor: '#106218' }}></div>
          ) : (
            <div style={{ width: `0%`, height: '100%', backgroundColor: '#106218' }}></div>
          )}

          {listProcess.map((item, index) => {
            if (index >= 6 && index < 9)
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0, transform: '-50' }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: item.studyRouteId * 0.3,
                    },
                  }}
                  key={index}
                  className={
                    dataPoint.find((x) => +x.studyRouteId === +item.studyRouteId)
                      ? cx(`point${item.studyRouteId}`, 'point', 'active')
                      : cx(`point${item.studyRouteId}`, 'point')
                  }
                >
                  <ContentTop
                    widthImg={(+item.studyRouteId / +item.studyRouteId + +item.studyRouteId / 20) * 70}
                    center
                    title={item.name}
                    img={item.thumbnailFalse}
                  />
                  <ContentBottom score={item.score} center />
                </motion.div>
              );
          })}
        </div>
      </div>
      <div className={cx('footer')}>
        <img className={cx('img-gift__chest', 'chest1')} src={ruong1} alt="" />
        <img className={cx('img-gift__chest', 'chest2')} src={ruong2} alt="" />
        <img className={cx('img-gift__chest', 'chest3')} src={ruong3} alt="" />
      </div>
    </div>
  );
};

export default Process;

export function ContentTop({ rotate, topmax, right, center, title, img, left, widthImg }) {
  const classes = cx('content-top', { rotate, topmax, right, center, left });
  return (
    <div className={classes}>
      <span>{title}</span>

      <div style={{ width: `${widthImg}px` }} className={cx('medal')}>
        <img src={huychuong} alt="" />
      </div>
    </div>
  );
}

export function ContentBottom({ rotate, center, left, score }) {
  const classes = cx('content-bottom', { rotate, center, left });
  return (
    <div className={classes}>
      <span>{score}</span>
      <div className={cx('img-star')}>
        <img src={star} alt="" />
      </div>
    </div>
  );
}
