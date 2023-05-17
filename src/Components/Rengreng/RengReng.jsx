import classNames from 'classnames/bind';
import styles from '~/sass/Components/_RengReng.module.scss';
import microimg from '~/assets/image/exercies/micro.png';
import { FaMicrophone } from 'react-icons/fa';

import { RiMessengerFill } from 'react-icons/ri';

const cx = classNames.bind(styles);
function RengReng() {
  return (
    <div>
      <button id="speech" className={cx('btn')} />
      <div className={cx('pulse-ring')}></div>
      <span className={cx('')}>
        <FaMicrophone />
      </span>
    </div>
  );
}

export default RengReng;
