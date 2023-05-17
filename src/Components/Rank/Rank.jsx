import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Rank.module.scss';

import Navigate from './Navigate';
import RankItem from './RankItem';
import diamon from '~/assets/image/section/diamon.png';
import HeaderPage from '~/Components/HeaderPage';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import routes from '~/config/routes';
import getDateRangeOfWeek from '~/hooks/useRangeOfWeek';
import useGetFirstAndLastDay from '~/hooks/useGetFirstAndLastDay';
import getWeekNumber from '~/hooks/useGetWeek';
import * as GetRankByDate from '~/services/GetRankByDate';
import Loading from '../animationloading/Animationloading';

const cx = classNames.bind(styles);

function Rank() {
  const myRef = useRef(null);

  const { t } = useTranslation();
  const { auth } = useAuth();
  const month = new Date().getMonth();
  const [listData, setListData] = useState([]);

  const [changeWeek, setChangeWeek] = useState(-1 + 1);
  const [changeMonth, setChangeMonth] = useState(-1 + 1);
  const [activeWeek, setActiveWeek] = useState(true);
  const [rank, setRank] = useState(0);
  const [infoRankUser, ssetInfoRankUser] = useState();
  const { firstDateOfMonth, lastDateOfMonth } = useGetFirstAndLastDay(month + changeMonth);
  const currentWeek = getWeekNumber();
  const { dateStartWeek, dateEndWeek } = getDateRangeOfWeek(+currentWeek, new Date().getFullYear());

  const fetch = async (start, end) => {
    const res = await GetRankByDate.getRankByDate({
      dateStart: start,
      dateEnd: end,
    });
    setRank(res.data.findIndex((x) => x.userId === auth.userID));
    ssetInfoRankUser(res.data.find((x) => x.userId === auth.userID));

    setListData(res.data);
  };
  useEffect(() => {
    if (activeWeek === true) {
      fetch(dateStartWeek, dateEndWeek);
    } else if (activeWeek === false) {
      fetch(firstDateOfMonth, lastDateOfMonth);
    }
  }, [dateStartWeek, dateEndWeek, firstDateOfMonth, lastDateOfMonth, activeWeek]);

  const handleChangeWeekLeft = () => {
    if (activeWeek === true && currentWeek + changeWeek >= 2) {
      setChangeWeek(changeWeek - 1);
    } else if (activeWeek === false && month + changeMonth >= 1) {
      setChangeMonth(changeMonth - 1);
    }
  };
  const handleChangeWeekRight = () => {
    if (activeWeek === true && currentWeek + changeWeek <= 51 && currentWeek + changeWeek <= currentWeek - 1) {
      setChangeWeek(changeWeek + 1);
    } else if (activeWeek === false && month + changeMonth <= 10 && month + changeMonth <= month - 1) {
      setChangeMonth(changeMonth + 1);
    }
  };
  const handleWeek = () => {
    setActiveWeek(true);
  };
  const handleMonth = () => {
    setActiveWeek(false);
  };
  useEffect(() => {
    myRef.current.scroll({ top: 0, behavior: 'smooth' });
  });
  return (
    <div className={cx('wrapper')}>
      <Loading active={listData !== undefined && listData.length === 0} opa={0.6} />
      <Row>
        <Col xl={4} lg={4} md={12} sm={12}>
          <HeaderPage title={t('Charts')} path={routes.homepage} />
          <div className={cx('wrapper')}>
            <Navigate
              currentMonth={month + changeMonth}
              activedate={activeWeek}
              handleWeek={handleWeek}
              handleMonth={handleMonth}
              handleChangeWeekLeft={handleChangeWeekLeft}
              handleChangeWeekRight={handleChangeWeekRight}
              currentWeek={currentWeek + changeWeek}
            />
          </div>
        </Col>
        <Col xl={8} lg={8} md={12} sm={12}>
          <div ref={myRef} className={cx('wapper-ranking')}>
            {listData.map((item, index) => {
              return (
                <RankItem
                  index={index}
                  top1={index === 0 ? true : false}
                  top2={index === 1 ? true : false}
                  top3={index === 2 ? true : false}
                  data={item}
                  key={index}
                  delay={index}
                />
              );
            })}

            <div className={cx('rank-for__me')}>
              <div className={cx('ranking-info__left')}>
                <div className={cx('numerical__order')}>
                  <span className={cx('title-rank')}>{t('Rank')}</span> <span className={cx('number')}>{rank + 1}</span>
                </div>

                <div className={cx('name')}>
                  <img src={infoRankUser !== undefined && infoRankUser.thumbnail} alt="" />
                  <span>{infoRankUser !== undefined && infoRankUser.fullName}</span>
                </div>
              </div>

              <div className={cx('ranking-info__right')}>
                <img src={diamon} alt="" />
                <span>{infoRankUser !== undefined && infoRankUser.score}</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Rank;
