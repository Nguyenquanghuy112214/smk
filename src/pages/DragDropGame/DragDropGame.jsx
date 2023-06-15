import React, { useEffect, useMemo, useState } from 'react';

import { IoHome } from 'react-icons/io5';
import { Dustbin } from './Dustbin';
import { Box } from './Box';
import classNames from 'classnames/bind';
import styles from './_DragDropGame.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import msfail from '~/assets/music/fail.mp3';
import mssuccess from '~/assets/music/success.mp3';
import * as GetVocaById from '~/services/GetVocaById';
import { setIDDragDrop } from '~/Redux/IdDragDrop';
import { resourceAutio } from '~/constant/resourceAudio';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import Loading from '~/Components/animationloading/Animationloading';
const cx = classNames.bind(styles);

const DragDropGame = () => {
  const navigator = useNavigate();
  const { iddragdrop } = useParams();
  const dispatch = useDispatch();
  const idDragDrop = useSelector((state) => state.IdDragDrop.idDragDrop);
  const nameDragDrop = useSelector((state) => state.IdDragDrop.name);
  const countFail = useSelector((state) => state.IdDragDrop.count);
  const [start, setStart] = useState(0);
  const [point, setPoint] = useState(0);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(undefined);

  const [dataQuestion, setDataQuestion] = useState([]);
  const audioSuccess = useMemo(() => {
    if (dataQuestion && dataQuestion[idDragDrop] && dataQuestion[idDragDrop].name) {
      console.log('dataQuestion[idDragDrop].name)', dataQuestion[idDragDrop].name);
      return new Audio(resourceAutio(dataQuestion[idDragDrop].name));
    }
  }, [idDragDrop]);
  const audioFail = useMemo(() => {
    return new Audio(msfail);
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const res = await GetVocaById.GetVocaById(iddragdrop);
      setData([...res.data.data]);
    };
    fetch();
  }, [iddragdrop]);

  useEffect(() => {
    if (countFail === 0 && audioSuccess !== undefined) {
      audioFail.pause();
      audioFail.currentTime = 0;
      audioSuccess.pause();
      audioSuccess.currentTime = 0;

      audioSuccess.play();
      setSuccess(true);
    } else if (countFail > 0) {
      if (audioSuccess) {
        audioSuccess.pause();
        audioSuccess.currentTime = 0;
      }

      audioFail.pause();
      audioFail.currentTime = 0;

      audioFail.play();
      // audioFail.play();
      // audio.play();

      setSuccess(false);
    }
  }, [countFail, idDragDrop]);

  const [array, setArray] = useState([0, 1, 2]);
  const random = useMemo(() => {
    if (array !== undefined && array.length > 0) return _.sample(array);
  }, [array]);

  useEffect(() => {
    if (count === 3) {
      setTimeout(() => {
        setStart(start + 3);
        const exclude = array.filter((x) => x !== random);
        setArray(exclude);
      }, [800]);
    }
  }, [count]);

  useEffect(() => {
    const array = [];

    if (0 <= random <= 1) {
      const fakeData = data.slice(start, start + 3).map((item, index) => {
        if (index === 0) {
          return { ...item, order: 2 };
        } else if (index === 1) {
          return { ...item, order: 1 };
        } else {
          return { ...item, order: 3 };
        }
      });
      array.push(fakeData);
    } else if (1 <= random <= 2) {
      const fakeData = data.slice(start, start + 3).map((item, index) => {
        if (index === 0) {
          return { ...item, order: 2 };
        } else if (index === 1) {
          return { ...item, order: 3 };
        } else {
          return { ...item, order: 1 };
        }
      });
      array.push(fakeData);
    } else {
      const fakeData = data.slice(start, start + 3).map((item, index) => {
        if (index === 0) {
          return { ...item, order: 3 };
        } else if (index === 1) {
          return { ...item, order: 2 };
        } else {
          return { ...item, order: 1 };
        }
      });
      array.push(fakeData);
    }

    setDataQuestion(array[0]);

    setCount(0);
    setSuccess(undefined);
    dispatch(setIDDragDrop({ idDragDrop: undefined, count: undefined }));
  }, [data, start, random]);

  useEffect(() => {
    if (data !== undefined && data.length > 0) {
      if (+point === data.length) {
        navigator('/startdragdropgame');
      }
    }
  }, [data, point]);

  useEffect(() => {
    if (
      idDragDrop !== undefined &&
      dataQuestion[idDragDrop] !== undefined &&
      dataQuestion[idDragDrop].name !== undefined &&
      dataQuestion[idDragDrop].order !== undefined
    ) {
      dataQuestion.splice(idDragDrop, 1, { name: dataQuestion[idDragDrop].name, active: true, order: dataQuestion[idDragDrop].order });
      setCount(count + 1);
      setPoint(point + 1);
    }
  }, [idDragDrop]);

  const onHome = () => {
    navigator('/');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Loading active={dataQuestion !== undefined && dataQuestion.length === 0 ? true : false} opa={0.6} />

      <div className={cx('topic')}>
        <button className={cx('icon')} onClick={onHome}>
          <IoHome />
        </button>

        <div className={cx('row')}>
          {dataQuestion !== undefined &&
            dataQuestion.map((item, index) => {
              return <Box key={index} index={index} name={item.name} active={item.active} order={item.order} />;
            })}
        </div>

        <div className={cx('row')}>
          {dataQuestion !== undefined &&
            dataQuestion.map((item, index) => {
              return <Dustbin key={index} name={item.name} index={index} active={item.active} order={item.order} />;
            })}
        </div>
        <div className={cx('score')}>
          <div className={cx('score__number')}>
            <span> Score:</span>
            <span>{point * 100}</span>
          </div>
          <div className={cx('score__star')}>
            <div className={cx('score__border')}>
              {success === true && 'Đúng'}
              {success === false && 'Sai'}
              {success === undefined && ''}
            </div>
            <div className={cx('score__image')}>
              <img src="https://resourcesk.bkt.net.vn/plugins/game/GameFlashVocab/star_4.png" alt="" />
            </div>
            <div className={cx('score__border')}></div>
          </div>
          <div className={cx('score__progress')}>
            <span>Progress:</span>
            <span>
              {point} /{data.length}
            </span>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DragDropGame;
