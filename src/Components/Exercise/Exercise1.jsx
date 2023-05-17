import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Excercies.module.scss';
import imgspeak from '~/assets/image/exercies/img-speak.png';
import ButtonAnswer from './ButtonAnswer';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalSuccess from './ModalSuccess';
import ModalFail from './ModalFail';
import { setModalSuccess } from '~/Redux/ModalSuccess';
import click from '~/assets/music/click.mp3';

import { setListActive } from '~/Redux/ListActiveExercise';
import { useRef } from 'react';
import ModalScores from './ModalScores';
import { useTranslation } from 'react-i18next';
import { resourceAutio } from '~/constant/resourceAudio';

const cx = classNames.bind(styles);

function Excercise1({ dataModal, dataDisturb }) {
  const ref = useRef();
  const success = useSelector((state) => state.ModalSuccess.isActive);
  const activeModalScore = useSelector((state) => state.ActiveModalScore.isActive);
  const { t } = useTranslation();
  const listActive = useSelector((state) => state.ListActive);
  const [indexSelected, setIndexSelected] = useState();

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let listData = [];
    listData.push(dataModal.dataItem);
    dataModal.dataTotal.map((x, i) => {
      if (x.idvocabulary !== dataModal.dataItem.idvocabulary) {
        if (i < 4) {
          listData.push(x);
        }
      }
    });

    if (listData.length < 4) {
      listData.push(dataDisturb);
    }
    const random = Math.floor(Math.random() * 10);

    if (0 < random && random <= 3) {
      const replace1 = listData[1];
      listData[1] = listData[2];
      listData[2] = replace1;
    } else if (3 < random && random <= 6) {
      const replace0 = listData[0];
      listData[0] = listData[2];
      listData[2] = replace0;
    }

    setData(listData);
  }, [dataModal]);

  const handleClick = () => {
    if (listActive !== undefined && listActive[0] !== undefined && listActive[0].active1 === true) {
      dispatch(setModalSuccess(true));
    } else {
      if (count < 2) {
        setCount(count + 1);
        dispatch(setModalSuccess(false));
      }
    }
  };

  useEffect(() => {
    var audio = new Audio(resourceAutio(dataModal !== undefined && dataModal.dataItem !== undefined && dataModal.dataItem.name));
    audio.play();
  }, []);

  const openSpeak = () => {
    var audio = new Audio(resourceAutio(dataModal !== undefined && dataModal.dataItem !== undefined && dataModal.dataItem.name));

    audio.play();
  };

  const handleSelected = (index, item) => {
    var audio = new Audio(click);
    audio.play();
    setIndexSelected(index);

    if (item !== undefined && dataModal !== undefined && dataModal.dataItem !== undefined && item.name === dataModal.dataItem.name) {
      dispatch(setListActive({ active1: true }));
    } else if (item !== undefined && dataModal !== undefined && dataModal.dataItem !== undefined && item.name !== dataModal.dataItem.name) {
      dispatch(setListActive({ active1: false }));
    }
  };

  if (!dataModal) return;
  return (
    <div className={cx('exercies')}>
      {success === false && <ModalFail count={count} />}
      {success === true && <ModalSuccess count={count} />}
      {activeModalScore === true && <ModalScores />}

      <div className={cx('excercies-header')}>
        <span>
          {t('Select')} <strong>{`"${dataModal.dataItem.name}"`}</strong>
        </span>
        <div ref={ref} onClick={openSpeak} className={cx('img-speak')}>
          <img src={imgspeak} alt="" />
        </div>
      </div>
      <div className={cx('excercies-content')}>
        {data.map((item, index) => {
          return (
            <ButtonAnswer
              onClick={() => handleSelected(index, item)}
              selected={dataModal.dataItem}
              active={indexSelected === index ? true : false}
              data={item}
              key={index}
              delay={index}
            />
          );
        })}
      </div>
      <div className={cx('check')}>
        <button onClick={handleClick}> {t('Check')}</button>
      </div>
    </div>
  );
}

export default Excercise1;
