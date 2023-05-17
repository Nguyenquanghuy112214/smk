import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Grammar.module.scss';
import SupplementaryStudy from '~/Components/SupplementaryStudy';
import topic1 from '~/assets/image/Grammar/topic1.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '~/Components/Grammar/ProgressBar';
import GrammarResult from './GrammarResult';
import * as GetTopicGrammar from '~/services/GetTopicGrammar';
import { useEffect } from 'react';
import * as GetTopic from '~/services/GetTopic';
import * as GetGrammarByClassBook from '~/services/GetGrammarByClassBook';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '~/hooks/useAuth';
import family from '~/assets/image/exercies/family.png';
import { useTranslation } from 'react-i18next';
import routes from '~/config/routes';
import { useIDBookIDAge } from '~/hooks/useIDBookIDAge';
import Loading from '~/Components/animationloading/Animationloading';

const cx = classNames.bind(styles);

function Grammar() {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [width, setWidth] = useState();

  const nextPageTopic = (item, index) => {
    navigate(`/grammardetail/${item.nameGrammar}/${item.grammarTypeID}/${index}`);
  };
  const [activeGrammar, setActiveGrammar] = useState(true);
  const [listTopic, setListTopic] = useState([]);
  const handleSlectedGrammar = () => {
    setActiveGrammar(true);
  };
  const handleSlectedResult = () => {
    setActiveGrammar(false);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window]);

  useEffect(() => {
    const fetch = async () => {
      const res = await GetTopicGrammar.getTopicGrammar({
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setListTopic([...res.data]);
    };
    fetch();
  }, []);
  const { t } = useTranslation();
  return (
    <SupplementaryStudy selectedGramar={handleSlectedGrammar} selectedResult={handleSlectedResult} title="Ngữ pháp" path={routes.homepage}>
      <Loading active={listTopic !== undefined && listTopic.length === 0 ? true : false} opa={0.6} />
      {activeGrammar ? (
        <div>
          <div className={cx('list-topic')}>
            <div className={cx('title-topic')}>Chủ đề</div>
            <Swiper grabCursor={true} spaceBetween={30} slidesPerView={width <= 1024 ? 2 : 3}>
              {listTopic !== undefined &&
                listTopic.map((item, index) => {
                  return (
                    <SwiperSlide key={item.grammarTypeID}>
                      <Topic index={index} onClick={() => nextPageTopic(item, index)} data={item} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
          <div className={cx('list-topic')}>
            <div className={cx('title-topic')}>{t('Class')}</div>
            <GridItem />
          </div>
        </div>
      ) : (
        <GrammarResult />
      )}
    </SupplementaryStudy>
  );
}

export default Grammar;

export function Topic({ index, onClick, data }) {
  const [img, setImg] = useState(undefined);
  const { t } = useTranslation();
  if (!data) return;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: index * 0.2 } }}
      onClick={() => onClick()}
      className={cx('wrapper-topic')}
    >
      <div className={cx('img-topic')}>
        <img onError={() => setImg(family)} src={img === undefined ? data.thumbnail : img} alt="" />
      </div>
      <div className={cx('content-topic')}>
        <div className={cx('title-content__topic')}>{data.nameGrammar}</div>
        <span className={cx('done')}>{t('complete')}</span>
        <div className={cx('percent')}>
          {+data.quantity.split('/')[0] !== 0 || +data.quantity.split('/')[1] !== 0
            ? ` ${((100 * data.quantity.split('/')[0]) / data.quantity.split('/')[1]).toFixed(2)}/100 (${data.percent})`
            : `0/100 (0%)`}
        </div>
        <ProgressBar
          width={
            +data.quantity.split('/')[0] !== 0 || +data.quantity.split('/')[1] !== 0
              ? (100 * data.quantity.split('/')[0]) / data.quantity.split('/')[1]
              : 0
          }
        />
      </div>
    </motion.div>
  );
}

export function GridItem() {
  const [list, setList] = useState([]);
  const [img, setImg] = useState(undefined);
  const { IDBook, IDAge, IDCourse } = useIDBookIDAge();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetGrammarByClassBook.getGrammarByClassBook(IDAge, IDBook);

      setList([...res.data]);
    };
    fetch();
  }, []);
  // GetGrammarByClassBook
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? 'none' : 'translateY(100px)',
        opacity: isInView ? 1 : 0,
        transition: `all 1s cubic-bezier(0.17, 0.55, 0.55, 1)`,
      }}
      className={cx('list-grid')}
    >
      {list.map((item, index) => {
        return (
          <div onClick={() => navigate(`/grammardetailclass/${item.idtopic}/undefined`)} key={index} className={cx('item-grid')}>
            <div className={cx('item-grid__img')}>
              <img onError={() => setImg(family)} src={img === undefined ? topic1 : img} alt="" />
            </div>
            <div className={cx('unit')}>{`Unit ${index + 1}: ${item.nameTopic}`}</div>
          </div>
        );
      })}
    </div>
  );
}
