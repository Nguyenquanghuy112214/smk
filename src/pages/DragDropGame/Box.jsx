import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames/bind';
import styles from './_DragDropGame.module.scss';
import { useDispatch } from 'react-redux';
import { setIDDragDrop } from '~/Redux/IdDragDrop';
import { resourceAutio } from '~/constant/resourceAudio';
import { useMemo } from 'react';
const cx = classNames.bind(styles);
export function Box({ name, active, index }) {
  let count = 0;
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: name,
    item: { index },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        dispatch(setIDDragDrop({ idDragDrop: item.index, count: 0, name }));
      } else {
        dispatch(setIDDragDrop({ idDragDrop: undefined, count: count + 1 }));
        count = count + 1;
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const opacity = isDragging || active ? 0 : 1;
  const visibility = active ? 'hidden' : 'visible';

  const audioSuccess = useMemo(() => {
    return new Audio(resourceAutio(name));
  }, [name]);
  const handleClick = () => {
    audioSuccess.pause();
    audioSuccess.currentTime = 0;
    audioSuccess.play();
  };
  return (
    <>
      <div
        style={{
          opacity,
          visibility,
          cursor: 'pointer',
        }}
        ref={drag}
        className={cx('box-img')}
        onClick={handleClick}
      >
        <img src={`https://resourcesk.bkt.net.vn/ImagesPNG/${name}.png`} alt="" />
      </div>
    </>
  );
}
