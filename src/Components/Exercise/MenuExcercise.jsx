import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import bg from '~/assets/image/exercies/bg.png';
import WrapModalExcercise from './WrapModalExcercise';
import Execise1 from './Exercise1';
import Execise2 from './Exercise2';
import Execise3 from './Exercise3';
import ExerciesLayout2 from './ExerciseLayout2';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setModalExcercise } from '~/Redux/ModalExcercise';
import Exercise4 from './Exercise4';
import Excercise5 from './Exercise5';
import Excercise6 from './Exercise6';
import Excercise7 from './Exercise7';
import Excercise8 from './Exercise8';
import { useNavigate } from 'react-router-dom';
import { setDataVocaExcercise } from '~/Redux/DataVocaExcercise';
import { motion } from 'framer-motion';

import * as GetVocaByTopicAndLesson from '~/services/GetVocabularyByTopicAndLesson';
import Excercise9 from './Exercise9';
import Excercise10 from './Exercise10';
import DisplayExerciseEnd from './DisplayExerciseEnd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

export function LeftMenu({ idTopic, listUnit }) {
  const { name, numberunit, idtopic } = useParams();

  const navgate = useNavigate();
  const dispatch = useDispatch();

  const [indexLesson, setIndexLesson] = useState(0);

  useEffect(() => {
    dispatch(setDataVocaExcercise(undefined));
  }, []);

  const getVoca = (item, index) => {
    setIndexLesson(index);
    const fetch = async () => {
      const res = await GetVocaByTopicAndLesson.getVocabularyTopicAndLesson(idTopic, item.idlesson);
      dispatch(setDataVocaExcercise(res));
    };
    fetch();
    navgate(`/exercise/${item.idlesson}/0/undefined/undefined/${name}/${numberunit}/${idtopic}`);
  };

  if (!listUnit) return null;
  return (
    <div className={cx('wrapper-left')}>
      <h3 className={cx('unit')}>
        Unit {numberunit}: {name}
      </h3>
      <div className={cx('img')}>
        <img src={bg} alt="" />
      </div>

      <div className={cx('list-unit')}>
        {listUnit.map((item, index) => {
          return (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: 1.02,
                transition: {
                  delay: index * 0.2,
                },
              }}
              onClick={() => getVoca(item, index)}
              key={item.idlesson}
              className={index === indexLesson ? cx('unit-item', 'active') : cx('unit-item')}
            >
              {' '}
              {`Lesson ${item.name}`}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function RightMenu({ idTopic, idFirstUnit }) {
  const navigate = useNavigate();
  const { id, name, numberunit, idtopic } = useParams();

  const dispatch = useDispatch();
  const active = useSelector((state) => state.Excercies.isActive);
  // const active = 6;
  const activemodal = useSelector((state) => state.ModalExcercise.isActive);
  const listVoca = useSelector((state) => state.DataVocaExcercise);

  const [dataDisturb, setDataisturb] = useState();
  const [dataModal, setDataModal] = useState({});
  const [firtListVoca, setFirstListVoca] = useState();

  useEffect(() => {
    const fetch = async () => {
      const [res, res2] = await Promise.all([
        GetVocaByTopicAndLesson.getVocabularyTopicAndLesson(idTopic, idFirstUnit !== undefined && idFirstUnit.idlesson),

        GetVocaByTopicAndLesson.getVocabularyTopicAndLesson(idTopic, id === undefined ? +id - 1 : +id + 1),
      ]);
      setFirstListVoca(res);
      setDataisturb(res2 !== undefined && res2[0] !== undefined && res2[0]);
    };
    fetch();
  }, [idFirstUnit, idTopic, id]);

  let data;
  if (listVoca[0] !== undefined) {
    data = listVoca[0];
  } else {
    data = firtListVoca;
  }
  const openExcercise = async (item) => {
    console.log('item', item);
    navigate(`/exercise/${id}/1/${item.idvocabulary}/${item.name}/${name}/${numberunit}/${idtopic}`);
    dispatch(setModalExcercise(true));
    setDataModal({ dataItem: item, dataTotal: data });
  };
  const { t } = useTranslation();
  if (firtListVoca === undefined && listVoca === undefined) return <div>out</div>;

  return (
    <div className={cx('wrapper-total-right')}>
      <WrapModalExcercise dataModal={dataModal} isActive={activemodal}>
        {active === 1 && <Execise1 dataModal={dataModal} dataDisturb={dataDisturb} />}
        {active === 2 && <Execise2 dataModal={dataModal} dataDisturb={dataDisturb} />}
        {active === 3 && (
          <ExerciesLayout2 title={t('Lookatthe')} dataModal={dataModal} dataDisturb={dataDisturb}>
            <Execise3 dataModal={dataModal} dataDisturb={dataDisturb} />
          </ExerciesLayout2>
        )}
        {active === 4 && (
          <ExerciesLayout2 title={t('Suggestedwords')} nospeak dataModal={dataModal} dataDisturb={dataDisturb}>
            <Exercise4 dataModal={dataModal} dataDisturb={dataDisturb} />
          </ExerciesLayout2>
        )}
        {active === 5 && <Excercise5 dataModal={dataModal} dataDisturb={dataDisturb} />}
        {active === 6 && (
          <ExerciesLayout2 title={t('Pronouncelearned')} dataModal={dataModal} dataDisturb={dataDisturb}>
            <Excercise6 dataModal={dataModal} dataDisturb={dataDisturb} />
          </ExerciesLayout2>
        )}
        {active === 7 && <Excercise7 dataModal={dataModal} dataDisturb={dataDisturb} />}
        {active === 8 && <Excercise8 dataModal={dataModal} dataDisturb={dataDisturb} />}
        {active === 9 && <Excercise9 dataModal={dataModal} dataDisturb={dataDisturb} />}
        {active === 10 && <Excercise10 dataModal={dataModal} dataDisturb={dataDisturb} />}
        {active === 11 && <DisplayExerciseEnd />}
      </WrapModalExcercise>

      <div className={cx('wrapper-right')}>
        <div className={cx('select-voca')}>{t('Vocabularyselection')}</div>

        <div className={cx('list-voca')}>
          {data !== undefined &&
            data.map((item, index) => {
              return (
                <button key={item.idvocabulary} onClick={() => openExcercise(item)} className={cx('voca-item')}>
                  {item.name}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
