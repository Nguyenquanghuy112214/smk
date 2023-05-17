import classNames from 'classnames/bind';
import styles from '~/sass/Components/_CardItem.module.scss';

import { Link } from 'react-router-dom';
import Button from '~/Components/Button';

const cx = classNames.bind(styles);

function CardItem({ img, white, clwhite, primary, to, opacity, title1, title2, maintitle, sm, df, lg, plus, textwhite, justify, onClick }) {
  const classes = cx('wrapper-carditem', {
    white,
    primary,
    textwhite,
    justify,
    opacity,
  });
  const classes2 = cx('title', {
    clwhite,
  });
  const props = { onClick };
  let Comp = 'div';
  if (to) {
    props.to = to;
    Comp = Link;
  }

  return (
    <Comp className={classes} {...props}>
      {opacity && <div className={cx('wrapper-opacity')}></div>}
      <img src={img} alt="" />
      <p className={classes2}>{maintitle}</p>
      <div className={cx('button')}>
        <Button
          to={to ? true : false}
          sm={sm ? true : false}
          df={df ? true : false}
          lg={lg ? true : false}
          plus={plus ? true : false}
          title1={title1}
          title2={title2}
        />
      </div>
    </Comp>
  );
}

export default CardItem;
