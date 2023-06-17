import classNames from 'classnames/bind';
import styles from '~/sass/Components/_RegisterAndLogin.module.scss';
import { Link } from 'react-router-dom';
import config from '../../config';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import * as login from '~/services/Login';
import LayoutLogin from '~/Components/LayoutLogin';
import { useAuth } from '~/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import Loading from '~/Components/animationloading/Animationloading';
import * as UCHistoryByUser from '~/services/UCHistoryByUser';
import * as Profile from '~/services/Profile';

const cx = classNames.bind(styles);

function Login() {
  const [profile, setProfile] = useState();
  const [checktoken, setCheckToken] = useState(false);
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') && ((profile?.email !== undefined && profile?.email.length > 0) || profile?.dob !== null)) {
      navigate(config.routes.homepage);
    }
    if (localStorage.getItem('token') && ((profile?.email !== undefined && profile?.email.length === 0) || profile?.dob === null)) {
      navigate(config.routes.userinfo);
    } else if (!localStorage.getItem('token')) {
      navigate(config.routes.login);
    }
  }, [checktoken, profile]);

  const handleSubmit = (values) => {
    const fetchAPI = async () => {
      setLoading(true);
      try {
        const dn = await login.login(values);
        if (dn.data !== null) {
          const profile = await Profile.profile({ headers: { Authorization: `Bearer ${dn.data?.token}` } });
          console.log('profile', profile);
          setProfile(profile.data);
          setAuth(dn.data);
          setCheckToken(true);
          setLoading(false);
          const fetch = async () => {
            const res = await UCHistoryByUser.uCHistoryByUser(
              {
                TimeStudy: 0,
              },
              { headers: { Authorization: `Bearer ${auth.token}` } }
            );
          };
          fetch();
        } else if (dn.data === null) {
          setLoading(false);
          setError(true);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchAPI();
  };
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ Username: '', Password: '', SavePassword: false }}
      validationSchema={Yup.object({
        Username: Yup.string().required(t('Pleaseenteryourusername')),
        Password: Yup.string().required(t('Pleaseenterapassword')),
      })}
      onSubmit={handleSubmit}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <Form>
            <Loading active={loading} opa={0.6} />
            <LayoutLogin sm>
              <div className={cx('form-register')}>
                <div className={cx('form-left')}></div>
                <div className={cx('form-right')}>
                  <h2 className={cx('title')}>{t('Login')}</h2>
                  <h3 className={cx('sub-title')}>{t('PleaseenteryouLoginandyourPassword')}</h3>
                  <div className={cx('user')}>
                    {errors.Username && touched.Username ? (
                      <span className={cx('text-user', 'active')}>{errors.Username}</span>
                    ) : (
                      <span className={cx('span')}>{t('UserorE-mail')}</span>
                    )}
                    <div className={errors.Username && touched.Username ? cx('wrapper-input', 'active') : cx('wrapper-input')}>
                      <div className={cx('wrapper-imgicon')}>
                        <span className={cx('img-icon')}>
                          <FaRegUser />
                        </span>
                      </div>
                      <Field name="Username" type="text" placeholder={t('UserorE-mail')} onFocus={() => setError(false)} />
                    </div>
                  </div>
                  <div className={cx('password')}>
                    {errors.Password && touched.Password ? (
                      <span className={cx('text-password', 'active')}>{errors.Password}</span>
                    ) : (
                      <span className={cx('span')}>{t('Password')}</span>
                    )}

                    <div className={errors.Username && touched.Username ? cx('wrapper-input', 'active') : cx('wrapper-input')}>
                      <div className={cx('wrapper-imgicon')}>
                        <span className={cx('img-icon')}>
                          <AiOutlineLock />
                        </span>
                      </div>
                      <Field
                        name="Password"
                        onFocus={() => setError(false)}
                        type={'password'}
                        placeholder={t('Password')}
                        className={errors.Password && touched.Password ? cx('password2', 'active') : cx('password2')}
                      />
                    </div>
                  </div>
                  {error === true ? <div className={cx('toltal-error')}>{t('Usernameorpasswordincorrect')}</div> : ''}
                  {/* <div className={cx('save-forgot')}>
                    <div className={cx('save')}>
                      <label className={cx('container')}>
                        <Field
                          name="SavePassword"                   
                          type="checkbox"
                          className={cx('checkbox')}
                        />
                        <span style={{lineHeight:'25px'}}>Keep me signed in</span>
                        <span className={cx('checkmark')}></span>
                      </label>
                    </div>
                    <div className={cx('forgot')}>
                      <i>Forgot password?</i>
                    </div>
                  </div> */}

                  <button type="submit" className={cx('login-main')}>
                    {t('Login')}
                  </button>
                  {/* <FormTotal img={google} white title="Or sign-in width Google" />
                  <FormTotal img={zalo} white title="Or sign-in width Zalo" /> */}
                  <div style={{ textAlign: 'center', marginTop: '20px' }} className={cx('naivgate')}>
                    <span style={{ marginTop: '30px', display: 'block' }}>
                      {t('Notamemberyet')}
                      <span style={{ color: '#5D5A6F' }} className={cx('login-title')}>
                        <Link style={{ color: '#1B17F8', fontWeight: '600' }} to={config.routes.register}>
                          {' '}
                          {t('Register')}
                        </Link>
                      </span>
                      <span> --- </span>
                      <span style={{ color: 'black' }} className={cx('login-title')}>
                        <Link style={{ color: '#1B17F8', fontWeight: '600' }} to={config.routes.privacy}>
                          {' '}
                          {t('Privacy&policy')}
                        </Link>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </LayoutLogin>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Login;
