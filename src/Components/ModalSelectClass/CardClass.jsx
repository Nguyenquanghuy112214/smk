import classNames from 'classnames/bind';
import styles from '~/sass/Components/_CardClass.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from '~/Components/Section/SectionHeader';
import Button from '~/Components/Button';
import { setCardClass } from '~/Redux/CardClassSlice';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function CardClass({ title, listClass }) {
  const { t } = useTranslation();
  const cardlass = useSelector((state) => state.CardClass.isNumber);
  const dispatch = useDispatch();
  const handleClick = (item) => {
    dispatch(setCardClass({ class: item.idclass, title: item.name }));
  };

  return (
    <div className={cx('wrapper')}>
      <SectionHeader title={title} />
      <div className={cx('list-class')}>
        {listClass !== undefined &&
          listClass.map((item, index) => {
            return (
              <Button
                key={index}
                df={cardlass.class === item.idclass ? true : false}
                onClick={() => handleClick(item)}
                ml
                lg
                title1={`${item.name} ${item.idclass === 1 ? t('monthold') : t('old')}`}
              />
            );
          })}
      </div>
    </div>
  );
}

export default CardClass;
