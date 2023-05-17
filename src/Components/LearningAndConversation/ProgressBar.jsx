import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LearningAndConversationPage.module.scss';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function ProgressBar({ xl, tottal }) {
  let widthProgressBar;
  let alignItems;
  let justifyContent;
  let flexDirection;
  let margin;
  if (xl) {
    widthProgressBar = '54%';
    alignItems = 'center';
    justifyContent = 'center';
    flexDirection = 'column';
    margin = '8px 0';
  }

  const scores = useSelector((state) => state.Scores);

  return (
    <div
      style={{ alignItems: alignItems, justifyContent: justifyContent, flexDirection: flexDirection }}
      className={cx('wrapper-progress')}
    >
      <div style={{ margin: margin }} className={cx('text-progress')}>
        <span> {scores.scores.score} /</span>
        <span> {tottal}</span>
      </div>
      <div style={{ width: widthProgressBar }} className={cx('progress-bar')}>
        <div
          style={{ width: scores.scores.score === 0 ? 0 : (tottal / 100) * scores.scores.score }}
          className={cx('progress-bar__item')}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
