import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import { AiOutlineSearch } from 'react-icons/ai';

import Search from './Search';
import { useState, useRef, useEffect } from 'react';
import SearchSingle from './SearchSingle';
import useDebounce from '~/hooks/useDebounce';
import * as SearchVideo from '~/services/SearchVideo';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const HeaderSearchSingle = () => {
  const { idvideo } = useParams();
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const ref = useRef();
  const handleSearch = () => {
    setActive(true);
  };
  useEffect(() => {
    setActive(false);
  }, [idvideo]);

  const dataSearch = useDebounce(search, 500);
  useEffect(() => {
    if (search !== undefined && search.length > 0) {
      const fetch = async () => {
        const res = await SearchVideo.searchVideo(dataSearch);
        setSearchResult([...res]);
      };
      fetch();
    } else {
      setSearchResult([]);
    }
  }, [dataSearch]);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const { t } = useTranslation();
  return (
    <div className={cx('search-single__detail')}>
      <div className={cx('search')}>
        <SearchSingle search={search} data={searchResult} active={active} />
        <span className={cx('icon-search')}>
          <AiOutlineSearch />
        </span>
        <input
          onChange={(e) => handleChange(e)}
          onFocus={handleSearch}
          className={cx('input-search')}
          type="text"
          placeholder={t('Search')}
        />
      </div>
    </div>
  );
};

export default HeaderSearchSingle;
