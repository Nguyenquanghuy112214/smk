import React from 'react';
import { useState } from 'react';
import { Field } from 'formik';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Account.module.scss';
const cx = classNames.bind(styles);

export function Input({ error, readonly, onBlur, as, onClick, id, type, text, value, placeholder, name }) {
  const [active, setActive] = useState(undefined);
  const handleClick = () => {
    setActive(false);
    onBlur();
  };

  return (
    <div
      onClick={() => onClick()}
      onBlur={() => handleClick()}
      onFocus={() => setActive(true)}
      className={cx('wrapper-input', `${active ? 'activeInput' : ''}`, `${error ? 'errorInput' : ''}`)}
    >
      <Field readOnly={readonly ? true : false} as={as} id={id} type={type} value={value} placeholder={placeholder} name={name} />
    </div>
  );
}
