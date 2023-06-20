import classNames from 'classnames/bind';
import styles from '~/sass/Components/_GrammarVocabulary.module.scss';

import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Search({ handleChange }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  return (
    <div className={active ? cx('search', 'active') : cx('search')}>
      <span>
        <AiOutlineSearch />
      </span>
      <input
        onChange={(e) => handleChange(e)}
        type="text"
        placeholder={t('Search')}
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      />
    </div>
  );
}

export default Search;
