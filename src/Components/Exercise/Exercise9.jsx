import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';

import { useEffect, useState } from 'react';
import * as GetSpeak from '~/services/GetSpeakByID';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveEx5 } from '~/Redux/ActiveEx5';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import ModalFail from './ModalFail';
import ModalSuccess from './ModalSuccess';
import ModalScores from './ModalScores';
import { setNextSingleSpeak } from '~/Redux/NextSingleSpeak';
import { setCountEx5 } from '~/Redux/CountEx5';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Excercise9({ dataModal }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [listAnswer, setListAnswer] = useState([]);

  const [listRandomAnswer, setListRandomAnswer] = useState([]);
  const [countSingleEnd, setCountSingleEnd] = useState(0);
  const [indexActive, setIndexActive] = useState();

  const countEx5 = useSelector((state) => state.CountEx5.count);
  const success = useSelector((state) => state.ModalSuccess.isActive);
  const activeModalScore = useSelector((state) => state.ActiveModalScore.isActive);
  const nextSingleSpeak = useSelector((state) => state.NextSingleSpeak.isNext);

  const [data, setData] = useState([]);
  const [exactly, setExactly] = useState({});
  const [singleSpeak, setSingleSpeak] = useState([]);

  // fetch list answer
  useEffect(() => {
    const fetch = async () => {
      const res = await GetSpeak.getSpeak(dataModal.dataItem.idvocabulary);
      const respone = res.data.map((item) => {
        return { ...item, active: undefined };
      });

      setListAnswer(respone);
      setListRandomAnswer(respone);
    };
    fetch();
  }, [dataModal]);

  // Fn random answer
  useEffect(() => {
    const listAnswerDef = listRandomAnswer;
    const random = Math.floor(Math.random() * 10);
    if (listRandomAnswer.length === 4) {
      if (0 <= random && random <= 3) {
        const rep0 = listAnswerDef[0];
        const rep1 = listAnswerDef[1];

        listAnswerDef[0] = listAnswerDef[3];
        listAnswerDef[3] = rep0;
        listAnswerDef[1] = listAnswerDef[2];
        listAnswerDef[2] = rep1;
      } else if (3 < random && random <= 6) {
        const rep0 = listAnswerDef[0];
        const rep2 = listAnswerDef[2];

        listAnswerDef[0] = listAnswerDef[3];
        listAnswerDef[3] = rep0;

        listAnswerDef[2] = listAnswerDef[1];
        listAnswerDef[1] = rep2;
      } else if (6 < random && random <= 10) {
        const rep0 = listAnswerDef[0];

        listAnswerDef[0] = listAnswerDef[1];
        listAnswerDef[1] = rep0;
      }
    } else {
      if (0 <= random && random <= 6) {
        const rep0 = listAnswerDef[0];

        listAnswerDef[0] = listAnswerDef[2];
        listAnswerDef[2] = rep0;
      } else if (6 < random && random <= 10) {
        const rep0 = listAnswerDef[0];

        listAnswerDef[0] = listAnswerDef[1];
        listAnswerDef[1] = rep0;
      }
    }

    setListRandomAnswer(listAnswerDef);
  }, [listAnswer]);

  useEffect(() => {
    dispatch(setActiveEx5(false));
    const check = listAnswer.find((x) => x !== undefined && x.active === undefined);
    setSingleSpeak(check);
  }, [listAnswer, data]);

  const selected = (item, index) => {
    setIndexActive(index);
    const checkFirstAnswer = listAnswer.find((x) => x !== undefined && x.active === undefined);
    if (item.id === (singleSpeak !== undefined && singleSpeak.id)) {
      setExactly({ exact: true, check: checkFirstAnswer !== undefined && checkFirstAnswer.id });
    } else {
      setExactly({ exact: false, check: checkFirstAnswer !== undefined && checkFirstAnswer.id });
    }
  };

  const handleClick = () => {
    setIndexActive();
    const checkFirstAnswer = listAnswer.find((x) => x !== undefined && x.active === undefined);
    if (Object.values(exactly).length === 0) {
      if (countEx5 < 1) {
        dispatch(setCountEx5(countEx5 + 1));
        setExactly({ exact: false, check: checkFirstAnswer !== undefined && checkFirstAnswer.id });

        dispatch(setModalSuccess(false));
        dispatch(setActiveEx5(true));
      } else if (countEx5 === 1) {
        dispatch(setCountEx5(countEx5 + 1));
        setExactly({ exact: false, check: checkFirstAnswer !== undefined && checkFirstAnswer.id });

        dispatch(setModalSuccess(false));
        dispatch(setActiveEx5(true));
        dispatch(setNextSingleSpeak(undefined));
      }
    } else if (exactly.exact === true && listAnswer.find((x) => x !== undefined && x.active === undefined)) {
      if (listAnswer.length > 1) {
        dispatch(setModalSuccess(true));
        dispatch(setActiveEx5(true));

        setExactly({});
      } else if (listAnswer.length === 1) {
        dispatch(setModalSuccess(true));
        dispatch(setActiveEx5(null));
        setExactly({});
      }
      dispatch(setNextSingleSpeak(undefined));
    } else if (exactly.exact === false && listAnswer.find((x) => x.active === undefined && listAnswer.length > 1)) {
      if (countEx5 < 1) {
        dispatch(setActiveEx5(true));
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setModalSuccess(false));
        setExactly({});
      } else if (countEx5 === 1) {
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setActiveEx5(true));

        // note test
        dispatch(setNextSingleSpeak(undefined));
        //
        dispatch(setModalSuccess(false));
        setExactly({});
      }
    } else if (exactly.exact === false && listAnswer !== undefined && listAnswer.length === 1) {
      if (countEx5 < 1) {
        dispatch(setActiveEx5(null));
        setCountSingleEnd(countSingleEnd + 1);
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setModalSuccess(false));
        setData([]);
        setExactly({});
      }

      if (countSingleEnd === 1) {
        dispatch(setActiveEx5(null));
        setCountSingleEnd(countSingleEnd + 1);
        dispatch(setCountEx5(countEx5 + 1));
        dispatch(setModalSuccess(false));

        // note test
        dispatch(setNextSingleSpeak(undefined));
        setExactly({});
        //
      }
    }
  };

  // test nextsingleSpeak
  useEffect(() => {
    if (nextSingleSpeak === true) {
      if (Object.values(exactly).length === 0) {
        const eliminate = listAnswer.filter((x) => x.id !== singleSpeak.id);
        setListAnswer(eliminate);
      } else {
        const eliminate = listAnswer.filter((x) => x.id !== exactly.check);
        setListAnswer(eliminate);
      }
    }
  }, [nextSingleSpeak]);

  return (
    <div className={cx('exercies')}>
      {success === false && <ModalFail count={countEx5} />}
      {success === true && <ModalSuccess count={countEx5} />}
      {activeModalScore === true && <ModalScores />}
      <div className={cx('excercies-header')}>
        <span>{`Làm sao để nói "${singleSpeak !== undefined && singleSpeak.sampleVn !== undefined && singleSpeak.sampleVn}"`}</span>
      </div>
      <div className={cx('list-answer__vn')}>
        {listRandomAnswer !== undefined &&
          listRandomAnswer.map((item, index) => {
            if (index < 5)
              return (
                <button
                  className={indexActive === index ? cx('button-ex9', 'active') : cx('button-ex9')}
                  onClick={() => selected(item, index)}
                  key={index}
                >
                  {item !== undefined && item.sampleEn}
                </button>
              );
          })}
      </div>
      <div className={cx('check')}>
        <button onClick={handleClick}>{t('Check')}</button>
      </div>
    </div>
  );
}

export default Excercise9;
