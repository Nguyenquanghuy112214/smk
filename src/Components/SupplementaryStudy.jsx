import classNames from 'classnames/bind';
import styles from '~/sass/Components/_VocabularyAndExcercies.module.scss';
import HeaderPage from './HeaderPage';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function SupplementaryStudy({ title, children, selectedGramar, selectedResult, path }) {
  const { t } = useTranslation();
  let location = window.location.pathname;
  const { isvoca } = useParams();

  const [activeLearning, setActiveLearning] = useState(true);
  const handleActive1 = () => {
    setActiveLearning(true);
    selectedGramar();
  };
  const handleActive2 = () => {
    setActiveLearning(false);
    selectedResult();
  };
  return (
    <div className={cx('wrapper')}>
      <HeaderPage title={title} path={path} />
      {location === '/grammar' || isvoca === 'false' || isvoca === true ? (
        <div className={cx('navigate-header')}>
          <button
            onClick={handleActive1}
            className={activeLearning ? cx('navigate-header__learning', 'active') : cx('navigate-header__learning')}
          >
            {t('Studygrammar')}
          </button>

          <button
            onClick={handleActive2}
            className={!activeLearning ? cx('navigate-header__result', 'active') : cx('navigate-header__result')}
          >
            {t('Studyresult')}
          </button>
        </div>
      ) : null}
      <div className={cx('content')}>{children}</div>
    </div>
  );
}

export default SupplementaryStudy;
