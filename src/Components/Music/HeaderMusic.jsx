import classNames from 'classnames/bind';
import styles from '~/sass/Components/_WrapperMusic_Story_Video.module.scss';

import { AiOutlineSearch } from 'react-icons/ai';

import bg_img from '~/assets/image/Music_History_Video/bg_header.png';
import Search from './Search';
import { useState, useRef } from 'react';
import useDebounce from '~/hooks/useDebounce';
import { useEffect } from 'react';
import * as SearchSong from '~/services/SearchSong';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
const HeaderMusic = () => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const ref = useRef();
  const handleSearch = () => {
    setActive(true);
  };

  const dataSearch = useDebounce(search, 500);
  useEffect(() => {
    if (search !== undefined && search.length > 0) {
      const fetch = async () => {
        const res = await SearchSong.searchSong(dataSearch);
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
    <div className={cx('header')} style={{ backgroundImage: `url(${bg_img})` }}>
      <div className={cx('search')}>
        <Search search={search} data={searchResult} active={active} />
        <span className={cx('icon-search')}>
          <AiOutlineSearch />
        </span>
        <input
          onChange={(e) => handleChange(e)}
          ref={ref}
          // onBlur={() => setActive(false)}
          onFocus={handleSearch}
          className={cx('input')}
          type="text"
          placeholder={t('Search')}
        />
      </div>
    </div>
  );
};

export default HeaderMusic;
