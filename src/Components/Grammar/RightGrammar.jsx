import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Grammar.module.scss';

const cx = classNames.bind(styles);
function RightGrammar({ children }) {
  return <div className={cx('wrapper-right')}>{children}</div>;
}

export default RightGrammar;
