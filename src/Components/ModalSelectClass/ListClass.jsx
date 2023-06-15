import classNames from 'classnames/bind';
import styles from '~/sass/Components/_ListClass.module.scss';

import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

import BooksByAge from './BooksByAge';
import { setModalSelect } from '~/Components/ModalSelectClass/HandleModalSlice';
import * as GetAllCourse from '~/services/GetAllCourse';
import * as GetAllBook from '~/services/GetAllBook';
import * as GetAllClass from '~/services/GetAllClass';

import CardClass from './CardClass';
import { setCardClass } from '~/Redux/CardClassSlice';
import { AiOutlineSearch } from 'react-icons/ai';
import useDebounce from '~/hooks/useDebounce';
import { useTranslation } from 'react-i18next';
import Loading from '../animationloading/Animationloading';
import iconclose from '~/assets/image/iconclose.png';

const cx = classNames.bind(styles);

function ListClass() {
  const ref = useRef();
  const ref1 = useRef();
  const [search, setSearch] = useState('');
  const [activeInput, setActiveInput] = useState(true);
  const [listCourse, setListCourse] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  // const [listbook, setListBook] = useState([]);
  const [listclass, setListClass] = useState([]);
  const dispatch = useDispatch();
  const idClass = useSelector((state) => state.CardClass.isNumber.class);
  const dataSearchDB = useDebounce(search, 400);
  // Call api getClass
  useEffect(() => {
    const fetchApi = async () => {
      const [res, res1] = await Promise.all([GetAllCourse.getAllCourse(), GetAllClass.getAllClass()]);
      setListCourse([...res]);
      setListClass([...res1]);
    };
    fetchApi();
  }, []);

  // Call api getBook
  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const res = await GetAllBook.getAllBook();
  //     setListBook([...res]);
  //   };
  //   fetchApi();
  // }, []);

  // handle CloseModal
  useEffect(() => {
    const hideMenuMb = (e) => {
      if (ref.current.contains(e.target) && ref1.current.contains(e.target)) {
        setSearch('');
        dispatch(setModalSelect(false));
      }
    };
    document.body.addEventListener('click', hideMenuMb);
    return () => document.body.removeEventListener('click', hideMenuMb);
  }, []);

  useEffect(() => {
    setDataSearch(listCourse.filter((item) => item.nameCource.toLowerCase().includes(dataSearchDB.toLowerCase())));
    dispatch(setCardClass({ class: undefined, title: undefined }));
  }, [dataSearchDB]);

  let data = [];
  if (search !== '' && dataSearch.length === 0) {
    console.log('th1');
    data = [];
  } else if (search !== '' && dataSearch.length > 0) {
    console.log('th2');

    data = dataSearch;
  } else {
    console.log('th3');

    data = listCourse;
  }
  console.log('data', data);
  console.log('dataSearch', dataSearch);
  const { t } = useTranslation();
  return (
    <div ref={ref} className={cx('wrapper')}>
      <Loading
        opa={0.6}
        active={listCourse !== undefined && listCourse.length === 0 && listclass !== undefined && listclass.length === 0 ? true : false}
      />

      <div onClick={() => setSearch('')} className={cx('icon-close')} ref={ref1}>
        <img src={iconclose} alt="" />
      </div>
      <div style={{ fontSize: '3.2rem', fontWeight: 'bold', color: '#377B02', textAlign: 'center', margin: '40px 0' }}>
        {t('Courseselection')}
      </div>
      <CardClass listClass={listclass !== undefined ? listclass : ''} title="Lựa chọn độ tuổi" />
      <div style={{ fontWeight: 'bold', marginLeft: '30px', fontSize: '2.4rem', marginBottom: '20px' }}>{t('Courseselection')}</div>
      <div className={cx('wrapper-input-toltal')}>
        <div className={cx('wrapper-input', `${activeInput ? 'input-active' : ''}`)}>
          <span className={cx('icon-search')}>
            <AiOutlineSearch />
          </span>
          <input
            value={search}
            onFocus={() => setActiveInput(true)}
            onBlur={() => setActiveInput(false)}
            onChange={(e) => setSearch(e.target.value)}
            className={cx('input-search')}
            type="text"
            placeholder={t('Courssearch')}
          />
        </div>
      </div>

      <BooksByAge listCourse={data !== undefined && data.length > 0 ? data : null} />
    </div>
  );
}

export default ListClass;
