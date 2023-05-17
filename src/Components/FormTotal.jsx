import classNames from 'classnames/bind';
import styles from '~/sass/Components/_RegisterAndLogin.module.scss';

const cx = classNames.bind(styles);

function FormTotal({ img, title, white, black }) {
  const classes = cx('login-width', { black });

  return (
    <div className={classes}>
      <img src={img} alt="" />
      <Button white={white ? true : false} black={black ? true : false} title={title} />
    </div>
  );
}

export default FormTotal;

export const Button = ({ title, white, black }) => {
  const classes = cx('login', {
    white,
    black,
  });
  return (
    <button style={{ boxShadow: 'none' }} type="submit" className={classes}>
      {title}
    </button>
  );
};
