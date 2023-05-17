import classNames from 'classnames/bind';
import styles from '~/sass/Components/_GrammarVocabulary.module.scss';

const cx = classNames.bind(styles);

function Alphabet({ title, children, mt40,p60, notitle, grid, gridsm }) {
  const classes = cx('block', {
    mt40,
    p60
  });

  const classes2 = cx('list', {
    gridsm,
    grid,
  });

  return (
    <div className={classes}>
      <div className={notitle ? cx('title', 'notitle') : cx('title')}>{title}</div>
      <div className={classes2}> {children}</div>
    </div>
  );
}

export default Alphabet;
