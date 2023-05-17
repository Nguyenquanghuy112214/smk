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
const cx = classNames.bind(styles);

function Vocabulary() {
  const isActiveModalVocaPage = useSelector((state) => state.ModalVocaPage.isActive);
  console.log('isActiveModalVocaPage', isActiveModalVocaPage);

  const isActiveModalVocaPageExercise = useSelector((state) => state.ActiveModalVocaPageExercise.isActive);
  const data = useSelector((state) => state.DataDetailVoca.data);
  const { t } = useTranslation();
  return (
    <div style={{ minHeight: '100vh' }}>
      <Loading active={isActiveModalVocaPage === undefined ? true : false} opa={0.6} />
      {/* <MenuTlMb onClick /> */}
      {/* Modal voca/exer */}
      <ModalVocaPageExercise idVoca={data} isActive={isActiveModalVocaPage && isActiveModalVocaPageExercise} />
      <ModalVocaPractive idVoca={data} isActive={isActiveModalVocaPage && !isActiveModalVocaPageExercise} />
      <SupplementaryStudy keyword="Học từ vựng" title={t('vocabulary')} path={routes.homepage}>
        <Search />
        <Row className={cx('wrapper-content')}>
          <Col xxl={4} xl={4} lg={5} md={6} sm={4} xs={12}>
            <LeftContent alphabet={isActiveModalVocaPage && !isActiveModalVocaPageExercise}></LeftContent>
          </Col>
          <Col xxl={8} xl={8} lg={7} md={6} sm={8} xs={12}>
            <RightContent></RightContent>
          </Col>
        </Row>
      </SupplementaryStudy>
    </div>
  );
}

export default Vocabulary;
