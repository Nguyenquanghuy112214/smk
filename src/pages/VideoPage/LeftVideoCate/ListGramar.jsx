import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';
import listcate from '~/assets/image/Music_History_Video/listcate.png';
import { motion } from 'framer-motion';

import cateitem from '~/assets/image/Music_History_Video/cateitem.png';
import { useState } from 'react';
import * as GetTopicVideoLv0 from '~/services/GetTopicVideoLv0';
import * as GetTopicVideoLv1 from '~/services/GetTopicVideoLv1';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIndexActiveTopicVideo } from '~/Redux/IndexActiveTopicVideo';
import { setIdTopicVideo } from '~/Redux/IdTopicVideo';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const ListGramar = ({ onClick }) => {
  const navigate = useNavigate();
  const { idcate } = useParams();
  const [grammarActive, setGrammarActive] = useState(undefined);
  const [listTopic, setListTopic] = useState([]);
  const [listTopicLv1, setListTopicLv1] = useState([]);

  const [indexLv1, setIndexLv1] = useState();

  const dispatch = useDispatch();
  const indexActive = useSelector((state) => state.IndexActiveTopicVideo.indexActive);

  useEffect(() => {
    const fetch = async () => {
      const [res, res1] = await Promise.all([GetTopicVideoLv0.getTopicVideoLv0(), GetTopicVideoLv1.getTopicVideoLv1()]);
      setListTopic([...res]);
      setListTopicLv1([...res1]);
      dispatch(setIdTopicVideo(res1.find((x) => +x.parentId === +idcate).idcategoryVideo));
      setIndexLv1(res1.find((x) => +x.parentId === +idcate));
    };
    fetch();
  }, []);

  const openGarammar = async (index) => {
    if (grammarActive === index) {
      setGrammarActive(undefined);
      dispatch(setIndexActiveTopicVideo(undefined));
    } else {
      setGrammarActive(index);
      dispatch(setIndexActiveTopicVideo(index));
    }
  };

  // post idvideo để lấy list ngữ pháp theo idcateVideo
  const changeListData = (item, index, topic) => {
    onClick();
    navigate(`/videocategory/${topic.nameVn}/${item.nameVn}/${item.parentId}`);
    dispatch(setIdTopicVideo(item.idcategoryVideo));
    setIndexLv1(item);
  };

  return (
    <div className={cx('wrapper-list__cate__left')}>
      <ul className={cx('ul-listcate')}>
        {listTopic !== undefined &&
          listTopic.map((topic, index) => {
            return (
              <li className={cx('li-listcate')}>
                <div
                  onClick={() => openGarammar(index)}
                  className={indexActive === index ? cx('img-cate__item', 'active') : cx('img-cate__item')}
                >
                  <img className={cx('img-cate')} src={topic.thumbnail} alt="" />
                  {topic.nameVn}
                </div>
                <motion.ul
                  initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                  animate={{
                    height: indexActive === index ? 'auto' : 0,
                    opacity: indexActive === index ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  {listTopicLv1.map((item1, index) => {
                    if (item1.parentId === topic.idcategoryVideo)
                      return (
                        <li onClick={() => changeListData(item1, index, topic)} key={index} className={cx('li-item')}>
                          <div
                            className={
                              indexLv1 !== undefined && +indexLv1.idcategoryVideo === +item1.idcategoryVideo
                                ? cx('item-grammar', 'active')
                                : cx('item-grammar')
                            }
                          >
                            <img className={cx('img-item__grammar')} src={cateitem} alt="" />
                            {item1.nameVn}
                          </div>
                        </li>
                      );
                  })}
                </motion.ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ListGramar;
