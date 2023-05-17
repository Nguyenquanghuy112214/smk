import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_GrammarResult.module.scss';
import { Doughnut } from 'react-chartjs-2';
import icon1 from '~/assets/image/PracticeListening/icon1.png';
import icon2 from '~/assets/image/PracticeListening/icon2.png';
import icon3 from '~/assets/image/PracticeListening/icon3.png';
import * as GetGrammarLearned from '~/services/GetGrammarLearned';
import * as GetProficientGrammar from '~/services/GetProficientGrammar';
import * as GetProcessGrammar from '~/services/GetProcessGrammar';
import * as GetGrammarMaster from '~/services/GetGrammarMaster';
import { useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function GrammarResult() {
  const { auth } = useAuth();
  const [dataLearned, setDataLearnrd] = useState({});
  const [dataProficient, setDataProficient] = useState({});
  const [dataProcess, setDataProcess] = useState({});
  const [dataMaster, setDataMaster] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
    const fetch = async () => {
      const [learned, proficient, process, master] = await Promise.all([
        GetGrammarLearned.getGrammarLearned({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetProficientGrammar.getProficientGrammar({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetProcessGrammar.getProcessGrammar({ headers: { Authorization: `Bearer ${auth.token}` } }),
        GetGrammarMaster.GetGrammarMaster({ headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);
      setDataLearnrd(learned);
      setDataProficient(proficient);
      setDataProcess(process);
      setDataMaster(master);
    };
    fetch();
  }, []);

  const result =
    dataProcess !== undefined && dataProcess.data !== undefined && dataProcess.data.substring(0, dataProcess.data.length - 1) === 'NaN'
      ? 0
      : dataProcess !== undefined && dataProcess.data !== undefined && dataProcess.data.substring(0, dataProcess.data.length - 1);
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
        <ContentResult img={icon2} data={dataProficient} title={t('Numberofproficientgrammar')} />
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

export default GrammarResult;

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
