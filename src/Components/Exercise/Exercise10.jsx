import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import { useEffect, useState } from 'react';
import * as GetSpeak from '~/services/GetSpeakByID';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveExerciseEnd } from '~/Redux/ActiveExerciseEnd';
import ModalSuccess from './ModalSuccess';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import ModalScores from './ModalScores';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Excercise10({ dataModal }) {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.ModalSuccess.isActive);
  const activeModalScore = useSelector((state) => state.ActiveModalScore.isActive);
  const [count, setCount] = useState(0);
  const [listAnswer, setListAnswer] = useState([]);
  const [listSelectedEn, setListSelectedEn] = useState([]);
  const [listSelectedVn, setListSelectedVn] = useState([]);
  const [singleSpeakEn, setSingleSpeakEn] = useState([]);
  const [singleSpeakVn, setSingleSpeakVn] = useState([]);
  const [indexSingSpeakEn, setIndexSingSpeakEn] = useState(null);
  const [indexSingSpeakVn, setIndexSingSpeakVn] = useState(null);

  useEffect(() => {
    const list = [];
    const list2 = [];

    const fetch = async () => {
      const res = await GetSpeak.getSpeak(dataModal.dataItem.idvocabulary);
      const respone = res.data.map((item) => {
        return { ...item, active: undefined };
      });

      const check = respone.find((x) => x.active === undefined);
      list.push(check);
      list2.push(check);
      respone.map((x) => {
        if (x.id !== (list !== undefined && list[0] !== undefined && list[0].id)) {
          list.push(x);
          list2.push(x);
        }
      });
      const random1 = Math.floor(Math.random() * 10);
      if (respone && respone.length === 4) {
        if (0 <= random1 && random1 <= 3) {
          const rep0 = list[0];
          const rep1 = list[1];

          list[0] = list[3];
          list[3] = rep0;
          list[1] = list[2];
          list[2] = rep1;
        } else if (3 < random1 && random1 <= 6) {
          const rep0 = list[0];
          const rep3 = list[3];
          list[0] = list[1];
          list[1] = rep0;
          list[3] = list[2];
          list[2] = rep3;
        } else if (6 < random1 && random1 <= 10) {
          const rep0 = list[0];
          const rep2 = list[2];

          list[0] = list[3];
          list[3] = rep0;

          list[2] = list[1];
          list[1] = rep2;
        }
      } else {
        if (0 <= random1 && random1 <= 6) {
          const rep0 = list[0];

          list[0] = list[2];
          list[2] = rep0;
        } else if (6 < random1 && random1 <= 10) {
          const rep1 = list[1];
          list[1] = list[2];
          list[2] = rep1;
        }
      }
      setListSelectedEn(list);
      setListAnswer(respone);

      const random2 = Math.floor(Math.random() * 10);
      if (respone && respone.length === 4) {
        if (0 <= random2 && random2 <= 3) {
          const rep0 = list2[0];
          const rep2 = list2[2];

          list2[0] = list2[3];
          list2[3] = rep0;

          list2[2] = list2[1];
          list2[1] = rep2;
        } else if (3 < random2 && random2 <= 6) {
          const rep0 = list2[0];
          const rep1 = list2[1];

          list2[0] = list2[3];
          list2[3] = rep0;
          list2[1] = list2[2];
          list2[2] = rep1;
        } else if (6 < random2 && random2 <= 10) {
          const rep0 = list2[0];

          list2[0] = list2[1];
          list2[1] = rep0;
        }
      } else {
        if (0 <= random2 && random2 <= 6) {
          const rep1 = list[1];
          list[1] = list[2];
          list[2] = rep1;
        } else if (6 < random2 && random2 <= 10) {
          const rep0 = list[0];

          list[0] = list[1];
          list[1] = rep0;
        }
      }

      setListSelectedVn(list2);
    };
    fetch();
  }, [dataModal.dataItem]);
  const handleClick = () => {
    if (listSelectedEn.length === 0 && listSelectedVn.length === 0) {
    }
  };

  const selectedEn = (item, index) => {
    setCount(count + 1);
    setSingleSpeakEn(item !== undefined && item.id);
    setIndexSingSpeakEn(index);
  };

  const selectedVn = (item, index) => {
    setSingleSpeakVn(item !== undefined && item.id);
    setIndexSingSpeakVn(index);
  };
  useEffect(() => {
    if (indexSingSpeakEn !== null && indexSingSpeakVn !== null && singleSpeakEn !== singleSpeakVn) {
      const timer = setTimeout(() => {
        setIndexSingSpeakVn(null);
        setIndexSingSpeakEn(null);
        setSingleSpeakEn();
        setSingleSpeakVn();
      }, [300]);
      return () => clearTimeout(timer);
    }
  }, [indexSingSpeakEn, indexSingSpeakVn]);

  useEffect(() => {
    if (singleSpeakEn === singleSpeakVn) {
      const timer = setTimeout(() => {
        const listAfterSelectEn = listSelectedEn.filter((x) => x.id !== singleSpeakEn);
        setListSelectedEn(listAfterSelectEn);
        const listAfterSelectVn = listSelectedVn.filter((x) => x.id !== singleSpeakVn);
        setListSelectedVn(listAfterSelectVn);
      }, [700]);
      return () => clearTimeout(timer);
    }
    if (listSelectedEn.length === 0 && listSelectedVn.length === 0 && count > 0) {
      dispatch(setActiveExerciseEnd(true));
      dispatch(setModalSuccess(true));
    }
  }, [singleSpeakEn, singleSpeakVn]);

  useEffect(() => {
    setSingleSpeakEn([]);
    setSingleSpeakVn([]);
    setIndexSingSpeakVn(null);
    setIndexSingSpeakEn(null);
  }, [listAnswer, listSelectedEn, listSelectedVn]);
  const { t } = useTranslation();
  return (
    <div className={cx('exercies')}>
      {success === true && <ModalSuccess count={0} />}
      {activeModalScore === true && <ModalScores />}
      <div className={cx('excercies-header')}>
        <span>{t('Matchthecorresponding')}</span>
      </div>
      <div className={cx('wrapper-listanswer__ls10')}>
        <div className={cx('list-answer__ls10', 'list-answersm')}>
          {listSelectedEn !== undefined &&
            listSelectedEn.map((item, index) => {
              return (
                <button
                  onClick={() => selectedEn(item, index)}
                  key={index}
                  className={indexSingSpeakEn === index ? cx('button-en', 'active') : cx('button-en')}
                >
                  {item !== undefined && item.sampleEn}
                </button>
              );
            })}
        </div>
        <div className={cx('list-answer__ls10', 'list-answersm')}>
          {listSelectedVn !== undefined &&
            listSelectedVn.map((item, index) => {
              return (
                <button
                  onClick={() => selectedVn(item, index)}
                  key={index}
                  className={indexSingSpeakVn === index ? cx('button-vn', 'active') : cx('button-vn')}
                >
                  {item !== undefined && item.sampleVn}
                </button>
              );
            })}
        </div>
      </div>
      <div className={cx('check')}>
        <button onClick={handleClick}> {t('Skip')}</button>
      </div>
    </div>
  );
}

export default Excercise10;
