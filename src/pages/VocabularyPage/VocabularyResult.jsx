import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_GrammarResult.module.scss';
import { Doughnut } from 'react-chartjs-2';
import icon1 from '~/assets/image/PracticeListening/icon1.png';
import icon2 from '~/assets/image/PracticeListening/icon2.png';
import icon3 from '~/assets/image/PracticeListening/icon3.png';
import * as GetAllVocaLear from '~/services/GettAllVocaLearn';
import * as GetAllVocaCompetently from '~/services/GetAllVocaCompetently';
import * as GetAllVocaMaster from '~/services/GetAllVocaMaster';
import * as getProgress from '~/services/GetProgressSchedule';

import { useAuth } from '~/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import 'chart.js/auto';
const cx = classNames.bind(styles);

function VocabularyResult() {
  const { auth } = useAuth();
  const [dataLearned, setDataLearnrd] = useState({});
  const [dataProficient, setDataProficient] = useState({});
  const [dataProcess, setDataProcess] = useState({});
  const [dataMaster, setDataMaster] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const fetch = async () => {
      const [learned, process, master, proficient] = await Promise.all([
        GetAllVocaLear.getVocaLearned({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetAllVocaCompetently.getAllVocaCompetently({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetAllVocaMaster.getAllVocaMaster({ headers: { Authorization: `Bearer ${auth.token}` } }),
        getProgress.progressSchedule({ headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);
      console.log('proficient', proficient);
      setDataLearnrd(learned);
      setDataProcess(process);
      setDataMaster(master);
      setDataProficient(proficient);
    };
    fetch();
  }, []);

  const result =
    dataProficient !== undefined &&
    dataProficient.data !== undefined &&
    dataProficient.data.substring(0, dataProficient.data.length - 1) === 'NaN'
      ? 0
      : dataProficient !== undefined &&
        dataProficient.data !== undefined &&
        dataProficient.data.substring(0, dataProficient.data.length - 1);
  const noresult = 100 - result;

  const data = {
    labels: [t('complete'), t('Unfinished')],
    datasets: [
      {
        label: t('Learningprogresschart'),
        data: [result, noresult],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className={cx('wrapper-content__modal', 'grammar-result')}>
      <div className={cx('list-content__result')}>
        <ContentResult img={icon1} data={dataLearned} title={t('Numberoflisteninglessonslearned')} />
        <ContentResult img={icon2} data={dataProcess} title={t('Numberofproficientgrammar')} />
        <ContentResult img={icon3} data={dataMaster} title={t('Masteringgrammar')} />
      </div>

      <div className={cx('wrapper-process')}>
        <div className={cx('process-text')}>{t('Learningprogress')}</div>
        <div className={cx('circle')}>
          <Doughnut data={data}></Doughnut>
        </div>
      </div>
    </div>
  );
}

export default VocabularyResult;

export function ContentResult({ title, data, img }) {
  return (
    <div className={cx('number-of-lessons-learned')}>
      <div className={cx('number-of-lessons-learned__left')}>
        <div className={cx('img-lessons-learned')}>
          <img src={img} alt="" />
        </div>
        <div className={cx('number-of-lessons-learned__left__text')}>{title}</div>
      </div>
      <div className={cx('number-of-lessons-learned__right')}>{data !== undefined && data.data}</div>
    </div>
  );
}
