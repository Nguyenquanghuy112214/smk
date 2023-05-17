import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import TopicList from '~/Components/Video/Topic/TopicList';
import PopularList from '~/Components/Video/Popular/PopularList';
import { AiFillEye } from 'react-icons/ai';
import imgct from '~/assets/image/Music_History_Video/imgct.png';
import HeaderVideo from '~/Components/Video/HeaderVideo';
import { useState } from 'react';
import family from '~/assets/image/exercies/family.png';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const WrapperMusic_Story_Video = () => {
  const { t } = useTranslation();
  const search = false;
  const [img, setImg] = useState(undefined);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('blur')} style={{ background: '#fee0de' }}></div>
      <div className={cx('wrapper-header')}>
        <HeaderVideo />
      </div>
      <div className={cx('wrapper-body')}>
        <div className={cx('wrapper-list__topic')}>
          <TopicList />
        </div>
        {!search ? (
          <div>
            <div className={cx('wrapper-list__popular')}>
              <PopularList title={t('PopularVideos')} />
            </div>
          </div>
        ) : (
          <div className={cx('wrapper-list__popular')}>
            <div className={cx('list-popular__video')}>
              <div className={cx('title')}>{t('Listofsearchedvideos')}</div>
              <div className={cx('listsearch__item')}>
                <div className={cx('search-item')}>
                  <span className={cx('search-item__left')}>Cấu trúc thì hiện tại đơn</span>
                  <div className={cx('search-item__right')}>
                    <span className={cx('search-item__right-title')}>Các trường hợp sử dụng thì hiện tại đơn</span>
                    <div className={cx('search-item__right-content')}>
                      <div className={cx('img-search')}>
                        <img
                          onError={() => {
                            setImg(family);
                          }}
                          src={img !== undefined ? family : imgct}
                          alt=""
                        />
                      </div>

                      <div className={cx('wrapper-content__search')}>
                        <span className={cx('teacher')}>
                          {t('Teacher')}: <strong>Q Huy</strong>
                        </span>
                        <span className={cx('time')}>
                          {t('Capacity')}: <strong>20 {t('minute')}</strong>
                        </span>

                        <div className={cx('view-search')}>
                          <span className={cx('iconview-seach')}>
                            <AiFillEye />
                          </span>
                          100 {t('Views')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WrapperMusic_Story_Video;
