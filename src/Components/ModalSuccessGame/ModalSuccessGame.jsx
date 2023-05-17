import React from 'react';
import { resourceImg } from '~/constant/resourceImg';

import { FaCheck } from 'react-icons/fa';
import { GiSpeaker } from 'react-icons/gi';
import classNames from 'classnames/bind';
import styles from './_ModalSuccessGame.module.scss';
import { resourceAutio } from '~/constant/resourceAudio';
const cx = classNames.bind(styles);

function ModalSuccessGame({ vocabulary, spelling, translate, img, onClick }) {
  const handleSpeak = () => {
    const audio = new Audio(resourceAutio(vocabulary));
    audio.play();
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <span>
          <FaCheck />
        </span>
        Chính xác
      </div>
      <div className={cx('body')}>
        <div className={cx('left')}>
          <div className={cx('d-flex', 'align-items-center')}>
            <span className={cx('vocabulary')}> {vocabulary}</span>
            <span className={cx('spelling')}>{spelling}</span>
            <span onClick={handleSpeak} className={cx('speak')}>
              <GiSpeaker />
            </span>
          </div>

          <div className={cx('translate')}>{translate}</div>
        </div>
        <div className={cx('right')}>
          <img src={resourceImg(img)} alt="" />
        </div>
      </div>
      <div onClick={() => onClick()} className={cx('footer')}>
        <button>CONTINUE</button>
      </div>
    </div>
  );
}

export default ModalSuccessGame;
