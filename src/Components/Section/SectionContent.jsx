import classNames from 'classnames/bind';
import styles from '~/sass/Components/_SectionContent.module.scss';

const cx = classNames.bind(styles);

function SectionContent({ children }) {
  return <div className={cx('wrapper-content--section')}>{children}</div>;
}

export default SectionContent;
