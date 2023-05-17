import classNames from 'classnames/bind';
import styles from '~/sass/Components/_LearningAndConversationPage.module.scss';
import HeaderPage from '~/Components/HeaderPage';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuTlMb from '~/Components/MenuTlMb/MenuTlMb';
import ButtonLearning from '~/Components/LearningAndConversation/ButtonLearning';
import NavigateTop, { NavigateContent } from '~/Components/LearningAndConversation/NavigateTop';
import * as GetTopic from '~/services/GetTopic';
import { setTopic } from '~/Redux/TopicSlice';
import { useNavigate } from 'react-router-dom';
import * as GetLesson from '~/services/GetLesson';
import { useTranslation } from 'react-i18next';
import routes from '~/config/routes';
import { useIDBookIDAge } from '~/hooks/useIDBookIDAge';
import Loading from '~/Components/animationloading/Animationloading';

const cx = classNames.bind(styles);

function Learning() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [indexTopic, setIndexTopic] = useState();
  const [datatopic, setDataTopic] = useState();
  const [datalesson, setDataLesson] = useState();
  const [topic, setTopic] = useState();
  const listTopic = useSelector((state) => state.Topic);
  const { t } = useTranslation('translation');

  // handle button left
  const handleClick = async (item, index) => {
    navigate(`/learning/${item.idtopic}/undefined/learn/${item.name}/undefined`);
    setIndexTopic(index);
    setActive(index);
    const res = await GetLesson.getLesson(item.idtopic);

    setDataTopic(item);
    setDataLesson(res);
  };
  const { IDBook, IDAge, IDCourse } = useIDBookIDAge();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetTopic.getTopic(IDBook, IDAge);
      setTopic(res);
    };
    fetch();
  }, []);

  let data = [];
  if (topic !== undefined) {
    data = topic;
  } else if (listTopic[0] !== undefined) {
    data = listTopic[0];
  }
  return (
    <div className={cx('wrapper-total')}>
      <Loading active={data !== undefined && data.length === 0 ? true : false} opa={0.6} />
      <div className={cx('d-flex')}>
        <div className={active !== null ? cx('wrapper-left', 'active') : cx('wrapper-left')}>
          {/* <MenuTlMb onClick /> */}
          <div className={cx('wrapper')}>
            <HeaderPage title={t('study')} path={routes.homepage} />
            <div className={cx('wrapper-button')}>
              {data !== undefined &&
                data.map((item, index) => {
                  return (
                    <ButtonLearning
                      delay={index}
                      active={active === index ? true : false}
                      key={index}
                      onClick={() => handleClick(item, index)}
                      title={item.name}
                      img={`https://resourcesk.bkt.net.vn/ImagesPNG/${item.image}.png`}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className={active !== null ? cx('wrapper-right', 'active') : cx('wrapper-right')}>
          <NavigateTop indexTopic={indexTopic} datatopic={datatopic} datalesson={datalesson} active={active}></NavigateTop>
        </div>
      </div>
    </div>
  );
}

export default Learning;
