import classNames from 'classnames/bind';
import styles from '~/sass/Components/_GrammarVocabulary.module.scss';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Alphabet from './Alphabet';
import ButtonVocabulary from './ButtonVocabulary';
import Search from './Search';
import { setIndexVoca } from '~/Redux/PostIndexVocaSlice';
import * as GetVocaByLesson from '~/services/GetVocaByLesson';
import * as GetAllVoca from '~/services/GetAllVoca';
import { setDataSearchVoca } from '~/Redux/DataSearchVoca';
import Paginated from '../Paginated';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIDBookIDAge } from '~/hooks/useIDBookIDAge';

// import PaginatedVoca from '~/Components/PaginatedVoca';

const cx = classNames.bind(styles);

const data2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W', 'Y'];

export function LeftContent() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { indexvoca } = useParams();
  const { search } = useParams();
  const { IDBook, IDAge, IDCourse } = useIDBookIDAge();

  const Vocabulary = useSelector((state) => state.VocabyLesson);

  const [voca, setVoca] = useState([]);
  const [indexActive, setIndexActive] = useState(null);
  const [isActiveSearch, setIsActiveSearch] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetVocaByLesson.getVocaByLesson(IDAge, IDBook);
      setVoca([...res]);
    };
    fetch();
  }, []);

  let data = [];
  if (Vocabulary !== undefined && Vocabulary.length > 0) {
    data = Vocabulary[0];
  } else if (voca !== undefined) {
    data = voca;
  }

  const handleClick = (index, item, e) => {
    if (type === 'main') {
      navigate(`/vocabulary/main/${index}/null`);
    }
    setIsActiveSearch(null);
    if (indexActive !== index) {
      dispatch(setIndexVoca(index));
    }
    setIndexActive(index);
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await GetAllVoca.getAllVoca();
      const data = setDataSearchVoca([...res.filter((i) => i.name.toLowerCase().charAt(0).includes(search.toLowerCase()))]);
      dispatch(data);
    };
    fetch();
  }, []);
  const handleSearch = async (item, index) => {
    navigate(`/vocabulary/main/undefined/${item}`);
    dispatch(setIndexVoca(null));
    const res = await GetAllVoca.getAllVoca();
    const data = setDataSearchVoca([...res.filter((i) => i.name.toLowerCase().charAt(0).includes(item.toLowerCase()))]);
    dispatch(data);
    setIsActiveSearch(index);
  };
  const { t } = useTranslation();
  return data !== undefined ? (
    <div className={cx('wrapper', 'active')}>
      <div className={cx('content-body')}>
        {type === 'main' ? (
          <Alphabet gridsm title={t('Alphabet')}>
            {data2.map((item, index) => {
              return (
                <ButtonVocabulary
                  activeSearch={search !== null && search === item ? true : false}
                  onClickSearch={() => handleSearch(item, index)}
                  key={index}
                  title={item}
                />
              );
            })}
          </Alphabet>
        ) : null}
        <Alphabet mt20 title={t('Lesson')}>
          {data !== undefined &&
            data.map((item, index) => {
              return (
                <ButtonVocabulary
                  // activeDefault={indexvoca === '0' && isActiveSearch !== null ? true : false}
                  activeOnClick={indexvoca !== '0' && index === indexvoca && isActiveSearch === null ? true : false}
                  onClick={(e) => handleClick(index, item, e)}
                  // height
                  key={index}
                  indexTopic={+indexvoca === +index && isActiveSearch === null}
                  alphabet
                  index={index}
                  xl
                  marque
                  title={item.nameTopic}
                />
              );
            })}
        </Alphabet>
      </div>
    </div>
  ) : null;
}

export function RightContent() {
  const { type } = useParams();
  const { search } = useParams();

  const { indexvoca } = useParams();
  const { IDBook, IDAge, IDCourse } = useIDBookIDAge();

  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window]);

  const Vocabulary = useSelector((state) => state.VocabyLesson);
  const indexVoca = useSelector((state) => state.PostIndexVoca.isNumber);
  const listVocaSearch = useSelector((state) => state.DataSearchVoca);
  const [voca, setVoca] = useState([]);
  const [indexOffset, setIndexOffset] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetVocaByLesson.getVocaByLesson(IDAge, IDBook);
      setVoca([...res]);
    };
    fetch();
    dispatch(setIndexVoca(null));
  }, [Vocabulary]);

  let data = [];
  if (type === 'main') {
    if (Vocabulary[0] !== undefined && Vocabulary[0][0] !== undefined && indexvoca === '0' && search === 'null') {
      data = Vocabulary[0][+indexvoca].voca;
    } else if (voca !== undefined && voca.length > 0 && voca[+indexvoca] !== undefined && indexvoca !== 'undefined' && search === 'null') {
      data = voca[+indexvoca].voca;
    } else if (indexvoca === 'undefined' && listVocaSearch.length > 0) {
      data = listVocaSearch[0];
    }
  } else {
    if (Vocabulary[0] !== undefined && Vocabulary[0][0] !== undefined && indexvoca === '0' && search === 'null') {
      data = Vocabulary[0][+indexvoca].voca;
    } else if (voca !== undefined && voca.length > 0 && voca[+indexvoca] !== undefined && indexvoca !== 'undefined' && search === 'null') {
      data = voca[+indexvoca].voca;
    }
  }

  // phan trang
  // const itemOffset = useSelector((state) => state.ItemOffset.itemOffset);
  const [check, setCheck] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [setlected, setSelected] = useState();
  const itemsPerPage = width <= 1024 ? 10 : 15;

  useEffect(() => {
    setCheck(!check);
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(data.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  useEffect(() => {
    if (indexVoca !== indexOffset) {
      setItemOffset(0);
    }
  }, [indexVoca]);

  const handlePageClick = (event) => {
    setSelected(event.selected);
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return currentItems !== undefined ? (
    <div className={cx('wrapper', 'wrapper-listvoca')}>
      <Alphabet p60 grid notitle>
        <Paginated sm indexVoca={indexVoca} currentItems={currentItems} onClick={(event) => handlePageClick(event)} pageCount={pageCount}>
          {currentItems !== undefined &&
            currentItems.map((item, index) => {
              return <ButtonVocabulary dataDetailVoca={item} delay={index} xxl key={index} title={item.name} />;
            })}
        </Paginated>
      </Alphabet>
    </div>
  ) : null;
}
