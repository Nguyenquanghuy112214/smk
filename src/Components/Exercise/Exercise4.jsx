import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import React from 'react';

import { setListActive } from '~/Redux/ListActiveExercise';
import { motion } from 'framer-motion';
import click from '~/assets/music/click.mp3';

import styles from '~/sass/Components/_Excercies.module.scss';

const cx = classNames.bind(styles);

function Exercise4({ dataModal, dataDisturb }) {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    let listData = [];
    listData.push(dataModal.dataItem);
    dataModal.dataTotal.map((x) => {
      if (x.idvocabulary !== dataModal.dataItem.idvocabulary) {
        listData.push(x);
      }
    });
    if (listData.length < 4) {
      listData.push(dataDisturb);
    }
    const random = Math.floor(Math.random() * 10);

    if (0 <= random && random <= 3) {
      const replace1 = listData[0];
      listData[0] = listData[1];
      listData[1] = replace1;
    } else if (3 < random && random <= 6) {
      const replace2 = listData[0];
      listData[0] = listData[2];
      listData[2] = replace2;
    }

    setData(listData);
  }, [dataModal]);

  const selectedAnswer = (item, index) => {
    var audio = new Audio(click);

    audio.play();
    setSelected(index);
    if (
      dataModal !== undefined &&
      dataModal.dataItem !== undefined &&
      dataModal.dataItem.name !== undefined &&
      dataModal.dataItem.name === item.name
    ) {
      dispatch(setListActive({ active4: true }));
    } else if (
      dataModal !== undefined &&
      dataModal.dataItem !== undefined &&
      dataModal.dataItem.name !== undefined &&
      dataModal.dataItem.name !== item.name
    ) {
      dispatch(setListActive({ active4: false }));
    }
  };

  const animation = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: -40,
    },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,

      transition: {
        duration: 0.3,
        // delay: delay * 0.1,
      },
    },
  };

  return (
    <div className={cx('button-ex4')}>
      {data !== undefined &&
        data.map((item, index) => {
          return (
            <motion.button
              variants={animation}
              initial="hidden"
              animate="show"
              onClick={() => selectedAnswer(item, index)}
              key={index}
              className={selected === index ? cx('button-ex4__item', 'active') : cx('button-ex4__item')}
            >
              {item.name !== undefined && item.name}
            </motion.button>
          );
        })}
    </div>
  );
}

export default Exercise4;
