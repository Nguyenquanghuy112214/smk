import classNames from 'classnames/bind';
import styles from '~/sass/Components/_ModalSelectClass.module.scss';

import { useSelector } from 'react-redux';

import ListClass from './ListClass';
const cx = classNames.bind(styles);

function ModalSelectClass() {
  const isActive = useSelector((state) => state.ModalSelect.isActive);
  return (
    <div className={isActive ? cx('wrapper', 'active') : cx('wrapper')}>
      <ListClass />
    </div>
  );
}

export default ModalSelectClass;
