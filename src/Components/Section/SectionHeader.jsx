import classNames from 'classnames/bind';
import styles from '~/sass/Components/_SectionHeader.module.scss';

const cx = classNames.bind(styles);

function SectionHeader(props) {
  return (
    <div className={cx('wrapper-header--section')}>
      <img src={props.img} alt="" />
      <p className={cx('wrapper-header--section__title')}>{props.title}</p>
    </div>
  );
}

export default SectionHeader;
