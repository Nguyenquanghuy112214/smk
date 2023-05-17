import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Grammar.module.scss';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function ProgressBar({ xl, tottal, width }) {
  const scores = useSelector((state) => state.Scores);

  return (
    <div className={cx('wrapper-progress')}>
      <div className={cx('text-progress')}></div>
      <div className={cx('progress-bar')}>
        <div style={{ width: `${width}%` }} className={cx('progress-bar__item')}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
