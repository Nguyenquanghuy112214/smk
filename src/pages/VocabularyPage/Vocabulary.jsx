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
import { useNavigate, useParams } from 'react-router-dom';
import MenuTlMb from '~/Components/MenuTlMb/MenuTlMb';
import VocabularyResult from './VocabularyResult';
import useDebounce from '~/hooks/useDebounce';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function Vocabulary() {
  const [isVocaMain, setIsVocaMain] = useState();
  const isActiveModalVocaPage = useSelector((state) => state.ModalVocaPage.isActive);
  const { indexvoca, isvoca, type } = useParams();
  console.log('indexvoca', indexvoca);
  const navigate = useNavigate();
  const isActiveModalVocaPageExercise = useSelector((state) => state.ActiveModalVocaPageExercise.isActive);
  const data = useSelector((state) => state.DataDetailVoca.data);
  const [activeGrammar, setActiveGrammar] = useState(true);
  const [search, setSearch] = useState('');
  const searchDb = useDebounce(search, 200);
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

  const handleSlectedGrammar = () => {
    setActiveGrammar(true);
  };
  const handleSlectedResult = () => {
    setActiveGrammar(false);
    if (type === 'exercise') navigate(`/vocabulary/exercise/${indexvoca}/null/${isvoca}`);
    else {
      navigate(`/vocabulary/main/0/null/${isvoca}`);
    }
  };
  const changeSearch = (value) => {
    setSearch(value.target.value);
  };
  useEffect(() => {
    setSearch('');
  }, [activeGrammar]);
  return (
    <div style={{ minHeight: '100vh' }}>
      <Loading active={isActiveModalVocaPage === undefined ? true : false} opa={0.6} />
      {/* Modal voca/exer */}
      <ModalVocaPageExercise onClick={handleClick2} idVoca={data} isActive={isVocaMain === true} />
      <ModalVocaPractive onClick={handleClick2} idVoca={data} isActive={isVocaMain === false} />
      <SupplementaryStudy
        selectedGramar={handleSlectedGrammar}
        selectedResult={handleSlectedResult}
        keyword="Học từ vựng"
        title={t('vocabulary')}
        path={isvoca === 'true' ? -1 : routes.homepage}
      >
        {activeGrammar ? (
          <div>
            <Search handleChange={(value) => changeSearch(value)} />
            <Row className={cx('wrapper-content')}>
              <Col xxl={4} xl={4} lg={5} md={6} sm={4} xs={12}>
                <LeftContent
                  activeGrammar={activeGrammar}
                  searchDb={searchDb}
                  alphabet={isActiveModalVocaPage && !isActiveModalVocaPageExercise}
                ></LeftContent>
              </Col>
              <Col xxl={8} xl={8} lg={7} md={6} sm={8} xs={12}>
                <RightContent searchDb={searchDb} onClick2={handleClick}></RightContent>
              </Col>
            </Row>
          </div>
        ) : (
          <VocabularyResult />
        )}
      </SupplementaryStudy>
    </div>
  );
}

export default Vocabulary;
