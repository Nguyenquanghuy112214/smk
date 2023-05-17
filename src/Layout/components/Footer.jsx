import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Footer.module.scss';

import { Link } from 'react-router-dom';
import config from '~/config';

import rank from '~/assets/image/footer/rank.png';
import mission from '~/assets/image/footer/mission.png';
import process from '~/assets/image/footer/process.png';
import game from '~/assets/image/footer/game.png';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
function Footer() {
  const { t } = useTranslation('translation');

  return (
    <div className={cx('wrapper')}>
      <div className={cx('wrapper-header')}>
        <div className={cx('img')}>
          <Link to={config.routes.rank}>
            <img src={rank} alt="" />
            <p>{t('Rating')}</p>
          </Link>
        </div>
        <div className={cx('img')}>
          <div className={cx('opacity')}></div>
          <img src={mission} alt="" />
          <p>{t('Mission')}</p>
        </div>
        <div className={cx('img')}>
          <Link to={config.routes.starttotltalgame}>
            <img src={game} alt="" />
            <p>{t('Game')}</p>
          </Link>
        </div>

        <div className={cx('img')}>
          <Link to={config.routes.register}>
            <img src={process} alt="" />
            <p>{t('Activated')}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
