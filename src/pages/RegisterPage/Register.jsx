import classNames from 'classnames/bind';
import styles from '~/sass/Components/_RegisterAndLogin.module.scss';

import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import config from '~/config';
import * as register from '~/services/Register';
import LayoutLogin from '~/Components/LayoutLogin';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '~/assets/image/login/logo-book.png';
import swiper1 from '~/assets/image/login/swiper1.png';
import SwiperCore, { Autoplay, Pagination, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Register() {
  const navigate = useNavigate();
  SwiperCore.use([EffectFade, Pagination]);

  const successAlert = async () => {
    await Swal.fire({
      title: 'Đăng ký thành công !',
      icon: 'success',
    });
    await navigate(config.routes.login);
  };

  const errorAlert = async (message) => {
    await Swal.fire({
      title: message,
      icon: 'error',
    });
  };

  const handleSubmit = (values, actions) => {
    const fetchAPI = async () => {
      try {
        const res = await register.register(values);

        if (res.success === true) {
          actions.resetForm({
            values: {
              UserName: '',
              Password: '',
              ComfirmPass: '',
            },
          });
          successAlert();
        } else if (res.success === false) {
          errorAlert(res.message);
          actions.resetForm({
            values: {
              UserName: '',
              Password: '',
              ComfirmPass: '',
            },
          });
        }
      } catch (error) {}
    };

    fetchAPI();
  };
  const { t } = useTranslation();
  SwiperCore.use([EffectFade, Autoplay, Pagination]);
  return (
    <Formik
      initialValues={{ UserName: '', Password: '', ComfirmPass: '', SavePassword: '' }}
      validationSchema={Yup.object({
        SavePassword: Yup.boolean().required(t('Pleaseconfirmthepolicy')).oneOf([true], 'Vui lòng xác nhận chính sách'),
        UserName: Yup.string().required(t('Pleaseenteryourusername')),
        Password: Yup.string().required(t('Pleaseenterapassword')),
        ComfirmPass: Yup.string()
          .required(t('Please confirm password'))
          .oneOf([Yup.ref('Password'), null], t('Passworddoesnotmatch')),
      })}
      onSubmit={handleSubmit}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log('errors', errors);
        return (
          <Form>
            <ToastContainer />
            <LayoutLogin>
              <div className={cx('form-left')}>
                <div className={cx('form-left__content')}>
                  <div className={cx('form-left__content__header')}>
                    <img src={img1} alt="" />
                    <h4> BKT SmartKids</h4>
                  </div>
                  <div className={cx('form-left__content__subheader')}>
                    <span>Welcome to </span>
                    <span>BKT SmartKids Online </span>
                    <span>Learning Platform </span>
                  </div>
                  <div className={cx('form-left__content__swiper')}>
                    <Swiper modules={[EffectFade]} autoplay={{ delay: 2000 }} pagination={true} loop={true} slidesPerView={'auto'}>
                      <SwiperSlide>
                        <img src={swiper1} alt="" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={swiper1} alt="" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={swiper1} alt="" />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>

              <div className={cx('form-right')}>
                <div className={cx('form-left__top')}></div>
                <div className={cx('top-right')}></div>
                <div className={cx('user')}>
                  {errors.UserName && touched.UserName ? (
                    <span className={cx('text-user', 'active')}>{errors.UserName}</span>
                  ) : (
                    <span className={cx('span')}>User or E-mail</span>
                  )}
                  <div className={errors.UserName && touched.UserName ? cx('wrapper-input', 'active') : cx('wrapper-input')}>
                    <div className={cx('wrapper-imgicon')}>
                      <span className={cx('img-icon')}>
                        <FaRegUser />
                      </span>
                    </div>
                    <Field
                      name="UserName"
                      type="text"
                      placeholder="bkt@gmail.com"
                      className={errors.UserName && touched.UserName ? cx('username', 'active') : cx('username')}
                    />
                  </div>
                </div>
                <div className={cx('password')}>
                  {errors.Password && touched.Password ? (
                    <span className={cx('text-password', 'active')}>{errors.Password}</span>
                  ) : (
                    <span className={cx('span')}>{t('Password')}</span>
                  )}
                  <div className={errors.Password && touched.Password ? cx('wrapper-input', 'active') : cx('wrapper-input')}>
                    <div className={cx('wrapper-imgicon')}>
                      <span className={cx('img-icon')}>
                        <AiOutlineLock />
                      </span>
                    </div>
                    <Field
                      name="Password"
                      type="password"
                      placeholder="**********"
                      className={errors.Password && touched.Password ? cx('password2', 'active') : cx('password2')}
                    />
                  </div>
                </div>

                <div className={cx('repassword')}>
                  {errors.ComfirmPass && touched.ComfirmPass ? (
                    <span className={cx('text-repassword', 'active')}>{errors.ComfirmPass}</span>
                  ) : (
                    <span className={cx('span')}>{t('ConfirmPassword')}</span>
                  )}
                  <div className={errors.ComfirmPass && touched.ComfirmPass ? cx('wrapper-input', 'active') : cx('wrapper-input')}>
                    <div className={cx('wrapper-imgicon')}>
                      <span className={cx('img-icon')}>
                        <AiOutlineLock />
                      </span>
                    </div>
                    <Field
                      name="ComfirmPass"
                      type="password"
                      placeholder="**********"
                      className={errors.ComfirmPass && touched.ComfirmPass ? cx('repassword2', 'active') : cx('repassword2')}
                    />
                  </div>
                </div>

                <div className={cx('save-forgot')}>
                  {errors.SavePassword && touched.SavePassword ? (
                    <span className={cx('text-checkbox', 'active')}>{errors.SavePassword}</span>
                  ) : (
                    <span className={cx('span')}></span>
                  )}
                  <div className={cx('save')}>
                    <label className={cx('container')}>
                      <Field name="SavePassword" type="checkbox" className={cx('checkbox2')} />
                      <span style={{ color: '#5D5A6F', lineHeight: '30px' }}>
                        {t('Iagreedtothe')} <strong style={{ color: '#0A033C' }}>{`Privacy & Policy`}</strong>
                      </span>
                      <span className={cx('checkmark', 'checkmark-res')}></span>
                    </label>
                  </div>
                </div>

                <button style={{ color: 'white', background: '#403cf9', border: 'unset' }} type="submit" className={cx('login-main')}>
                  {t('SignUp')}
                </button>

                <div style={{ textAlign: 'center' }} className={cx('naivgate')}>
                  <span>
                    {t('Alreayhaveaccount')}
                    <span style={{ color: '#5D5A6F' }} className={cx('login-title')}>
                      <Link style={{ color: '#1B17F8', fontWeight: '600', marginLeft: '8px' }} to={config.routes.login}>
                        {t('Signin')}
                      </Link>
                    </span>
                  </span>
                </div>
              </div>
            </LayoutLogin>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Register;
