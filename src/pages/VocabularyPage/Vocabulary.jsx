import classNames from 'classnames/bind';
import styles from '~/sass/Components/_VocabularyAndExcercies.module.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LeftContent, RightContent } from '~/Components/GrammarVocabulary/GrammarVocabulary';

import SupplementaryStudy from '~/Components/SupplementaryStudy';
import ModalVocaPageExercise from '~/Components/Vocabulary/ModalVocaPageExercise';
import { useSelector } from 'react-redux';
import ModalVocaPractive from '~/Components/Vocabulary/ModalVocaPractive';
import Search from '~/Components/GrammarVocabulary/Search';
import { useTranslation } from 'react-i18next';
import routes from '~/config/routes';
import Loading from '~/Components/animationloading/Animationloading';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuTlMb from '~/Components/MenuTlMb/MenuTlMb';
const cx = classNames.bind(styles);

function Vocabulary() {
  const { isvoca } = useParams();
  const [isVocaMain, setIsVocaMain] = useState();
  const isActiveModalVocaPage = useSelector((state) => state.ModalVocaPage.isActive);
  // console.log('isActiveModalVocaPage', isActiveModalVocaPage);
  console.log('isVocaMain', isVocaMain);

  const isActiveModalVocaPageExercise = useSelector((state) => state.ActiveModalVocaPageExercise.isActive);
  const data = useSelector((state) => state.DataDetailVoca.data);
  const { t } = useTranslation();
  const handleClick = () => {
    if (isvoca === 'true') {
      setIsVocaMain(true);
    } else {
      setIsVocaMain(false);
    }
  };
  const handleClick2 = () => {
    setIsVocaMain(null);
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <Loading active={isActiveModalVocaPage === undefined ? true : false} opa={0.6} />
      {/* Modal voca/exer */}
      <ModalVocaPageExercise idVoca={data} isActive={isVocaMain === true} />
      <ModalVocaPractive onClick={handleClick2} idVoca={data} isActive={isVocaMain === false} />
      <SupplementaryStudy keyword="Học từ vựng" title={t('vocabulary')} path={routes.homepage}>
        <Search />
        <Row className={cx('wrapper-content')}>
          <Col xxl={4} xl={4} lg={5} md={6} sm={4} xs={12}>
            <LeftContent alphabet={isActiveModalVocaPage && !isActiveModalVocaPageExercise}></LeftContent>
          </Col>
          <Col xxl={8} xl={8} lg={7} md={6} sm={8} xs={12}>
            <RightContent onClick2={handleClick}></RightContent>
          </Col>
        </Row>
      </SupplementaryStudy>
    </div>
  );
}

export default Vocabulary;
