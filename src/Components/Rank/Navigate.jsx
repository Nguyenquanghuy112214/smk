import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Navigate.module.scss';
import { useState } from 'react';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Button from '~/Components/Button';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Navigate({ handleChangeWeekLeft, handleChangeWeekRight, currentWeek, currentMonth, handleWeek, handleMonth, activedate }) {
  const handleChangeLeft = () => {
    handleChangeWeekLeft();
  };
  const handleChangeRight = () => {
    handleChangeWeekRight();
  };
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper')}>
      {/* <div className={cx('list-location')}>
        <Button rank leftradius title1="Toàn quốc" />
        <Button rank title1="Hà Nội" />
        <Button rank rightradius title1="Trường tôi" />
      </div> */}
      <div className={cx('date')}>
        <span onClick={handleWeek}>
          <Button date activedate={activedate} leftradius title1={t('Week')} />
        </span>
        <span onClick={handleMonth}>
          <Button activedate={!activedate} date rightradius title1={t('Month')} />
        </span>
      </div>
      <div className={cx('d-flex align-items-center justify-content-center')}>
        <Button
          handleChangeWeekLeft={handleChangeLeft}
          handleChangeWeekRight={handleChangeRight}
          xl
          title1={activedate ? `Tuần ${currentWeek}` : `Tháng ${currentMonth + 1}`}
          leftIcon={<AiOutlineLeft />}
          rightIcon={<AiOutlineRight />}
        />
      </div>
    </div>
  );
}

export default Navigate;
