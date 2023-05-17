import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SupplementaryStudy from '~/Components/SupplementaryStudy';
import MenuTlMb from '~/Components/MenuTlMb/MenuTlMb';
import ModalVocaPageExercise from '~/Components/Vocabulary/ModalVocaPageExercise';
import { useSelector } from 'react-redux';
import { LeftMenu, RightMenu } from '~/Components/Exercise/MenuExcercise';
import { motion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';
import * as GetUnitByIdTopic from '~/services/GetInitByIdTopic';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames/bind';
import styles from '~/sass/Components/_VocabularyAndExcercies.module.scss';
import routes from '~/config/routes';
const cx = classNames.bind(styles);

function Vocabulary() {
  const isActiveModalVocaPage = useSelector((state) => state.ModalVocaPage.isActive);
  const idTopic = useSelector((state) => state.IdTopic.isTopic);
  const [listUnit, setListUnit] = useState();

  useLayoutEffect(() => {
    const fetch = async () => {
      const res = await GetUnitByIdTopic.getUnit(idTopic);
      setListUnit(res);
    };
    fetch();
  }, [idTopic]);
  const { t } = useTranslation();
  return (
    <div className={cx('wrapper-total')}>
      {/* <MenuTlMb onClick /> */}

      <ModalVocaPageExercise isActive={isActiveModalVocaPage} />

      <SupplementaryStudy exercises keyword="Bài tập" path={routes.learning} title={t('Exercise')}>
        <Row className={cx('wrapper-content')}>
          <Col xxl={4} xl={4} lg={4} md={6} sm={4} xs={12}>
            <LeftMenu idTopic={idTopic} listUnit={listUnit}></LeftMenu>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={6} sm={8} xs={12}>
            <RightMenu idTopic={idTopic} idFirstUnit={listUnit && listUnit[0]}></RightMenu>
          </Col>
        </Row>
      </SupplementaryStudy>
    </div>
  );
}

export default Vocabulary;
