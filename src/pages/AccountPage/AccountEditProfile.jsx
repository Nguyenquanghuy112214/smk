import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Account.module.scss';
import avatar from '~/assets/image/Account/avatar.png';
import pencil from '~/assets/image/Account/pencil.png';
import avatar2 from '~/assets/image/Account/avatar2.png';
import { AiOutlineClose } from 'react-icons/ai';
import { setActiveModalChangePassword } from '~/Redux/ActiveModalChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import * as Profile from '~/services/Profile';
import { useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as UpdateProfile from '~/services/UpdateProfile';
import { useNavigate } from 'react-router-dom';
import * as GetAllProvince from '~/services/GetAllProvince';
import * as GetByProvinceID from '~/services/GetByProvinceID';
import * as GetByDistrictID from '~/services/GetByDistrictID';
import { Input } from './Input';
import { SelectInput } from './SelectInput';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const AccountEdit = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.ActiveModalChangePassword.isActive);
  const { auth } = useAuth();
  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

  const [idTotal, setIDTotal] = useState({ city: null, district: null, commune: null });
  const [profile, setProfile] = useState();
  const [provinceID, setProvinceID] = useState([]);
  const [province, setProvince] = useState([]);
  const [ward, setWard] = useState([]);

  const optionSex = [
    { value: true, label: t('Male') },
    { value: false, label: t('Female') },
  ];
  // Change password
  const changlePassword = () => {
    dispatch(setActiveModalChangePassword(true));
  };

  // Call API tinh
  useEffect(() => {
    const fetch = async () => {
      const res = await GetAllProvince.getAllProvince();
      const res1 =
        (await res) !== undefined &&
        res.map((item) => {
          return { value: item.provinceId, label: item.nameProvince };
        });
      setProvince([...res1]);
    };
    fetch();
  }, []);

  // Call API huyen
  useEffect(() => {
    const fetch = async () => {
      const res = await GetByProvinceID.getByProvinceID(idTotal.city);
      const res1 =
        (await res) !== undefined &&
        res.map((item) => {
          return { value: item.districtId, label: item.namDistrict };
        });
      setProvinceID([...res1]);
    };
    fetch();
  }, [idTotal.city]);

  // Call API xa
  useEffect(() => {
    const fetch = async () => {
      const res = await GetByDistrictID.getByDistrictID(idTotal.district);
      const res1 =
        (await res) !== undefined &&
        res.map((item) => {
          return { value: item.wardId, label: item.nameWard };
        });
      setWard([...res1]);
    };
    fetch();
  }, [idTotal.district]);

  useEffect(() => {
    const fetch = async () => {
      const res = await Profile.profile({ headers: { Authorization: `Bearer ${auth.token}` } });
      setProfile(res.data);
    };

    fetch();
  }, []);

  const handleSubmit = (values) => {
    const fullName = values.fullName.split(' ');
    const fetchAPI = async () => {
      try {
        const res = await UpdateProfile.updateProfile(
          {
            firstName: fullName !== undefined && fullName[0],
            lastName: fullName !== undefined && fullName.slice(1, values.fullName.length - 1).join(''),
            dob: values.dob,
            sex: values.sex,
            email: values.email,
            phone: values.phone,
            districtId: +idTotal.district,
            provinceId: +idTotal.city,
            wardId: +idTotal.commune,
          },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        if (res.success === true) {
          toast.success(t('Editinformationsuccessfully'), {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            navigate(`/accountedit`);
          }, 3000);
        } else if (res.success === false) {
          toast.error(t('Pleasetryagain'), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        toast.error(t('Pleasetryagain'), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    fetchAPI();
  };

  const [typedate, setTypeDate] = useState('text');

  // Change tinh xa phuong
  const handleChange = (name, value) => {
    setIDTotal({
      ...idTotal,
      [name]: value,
    });
  };
  return (
    <Formik
      initialValues={{
        fullName: '',
        dob: '',
        sex: '',
        email: '',
        phone: '',
        city: '',
        district: '',
        commune: '',
      }}
      validationSchema={Yup.object({
        fullName: Yup.string().required(t('Pleaseenteryourname')),
        dob: Yup.string().required('Pleaseenteryourdateofbirth'),
        sex: Yup.string().required('Pleaseselectyourgender'),

        city: idTotal.city ? null : Yup.string().required(t('Pleaseselectprovince/city')),
        district: idTotal.district ? null : Yup.string().required(t('Pleaseselectdistrict/district')),
        commune: idTotal.commune ? null : Yup.string().required('Pleaseselectcommune/ward'),

        email: Yup.string().required(t('Pleaseenteremail')).email(t('Thisisnotanemail')),
        phone: Yup.string()
          .required(t('Pleaseenterthephonenumber'))
          .matches(phoneRegExp, t('Pleaseenterthenumber'))
          .min(10, t('Incompletenumber'))
          .max(12, t('Pleasecheckagain')),
      })}
      onSubmit={handleSubmit}
    >
      {(formikProps) => {
        const { values, touched, errors, setFieldValue, setFieldTouched } = formikProps;

        return (
          <Form>
            <ToastContainer />
            <div className={cx('wrapper', 'wrapper-edit')}>
              <ModalChangePassword active={activeModal} />
              <div className={cx('blur')}></div>
              <div className={cx('header')}>
                <div className={cx('header__left')}>
                  <img src={avatar} alt="" />

                  <div className={cx('header__left-nickname')}>
                    <div className={cx('header__left-nickname__main')}>
                      <h3 className={cx('nickname')}> BKT Student</h3>
                      <span className={cx('id')}>id:9999</span>
                    </div>
                    <img className={cx('pencil')} src={pencil} alt="" />
                  </div>
                </div>
              </div>

              <div className={cx('wrapper-content-account__edit')}>
                <div className={cx('img-account__edit')}>
                  <img src={avatar2} alt="" />
                  <lable
                    for="img"
                    style={{ display: 'block', marginTop: '30px', fontWeight: '600', lineHeight: '24px', textAlign: 'center' }}
                  >
                    {t('Changeavatar')}
                  </lable>
                </div>
                <div className={cx('main-content-account__edit')}>
                  <div className={cx('main-content-account__edit__name')}>{profile !== undefined && profile.fullname}</div>
                  <div className={cx('button-single')}>
                    <div onClick={(e) => changlePassword(e)} className={cx('button-changle')}>
                      {t('Changethepassword')}
                    </div>
                  </div>
                  <div>
                    {errors.fullName && touched.fullName ? (
                      <span className={cx('text-user', 'active')}>{errors.fullName}</span>
                    ) : (
                      <span className={cx('text-user')}> {t('Firstandlastname')}</span>
                    )}
                    <Input
                      error={errors.fullName && touched.fullName}
                      span="Họ và tên"
                      id="fullName"
                      type="text"
                      text="Họ và tên"
                      placeholder={t('Enteryourname')}
                      name="fullName"
                    />
                  </div>
                  <div>
                    {errors.email && touched.email ? (
                      <span className={cx('text-user', 'active')}>{errors.email}</span>
                    ) : (
                      <span className={cx('text-user')}>Email</span>
                    )}
                    <Input
                      span="Email"
                      error={errors.email && touched.email}
                      id="email"
                      type="email"
                      text="Email"
                      placeholder={t('Enteremail')}
                      name="email"
                    />
                  </div>

                  <div>
                    {errors.phone && touched.phone ? (
                      <span className={cx('text-user', 'active')}>{errors.phone}</span>
                    ) : (
                      <span className={cx('text-user')}>{t('Phonenumber')}</span>
                    )}

                    <Input
                      span="Số điện thoại"
                      error={errors.phone && touched.phone}
                      id="phone"
                      type="phone"
                      text="Số điện thoại"
                      placeholder={t('Enteryourphonenumber')}
                      name="phone"
                    />
                  </div>
                  <div className={cx('wrapper-input2')}>
                    <div>
                      {errors.dob && touched.dob ? (
                        <span className={cx('text-user', 'active')}>{errors.dob}</span>
                      ) : (
                        <span className={cx('text-user')}>{t('Dateofbirth')}</span>
                      )}
                      <Input
                        span="Ngày sinh"
                        error={errors.dob && touched.dob}
                        id="dob"
                        onClick={() => setTypeDate('date')}
                        onBlur={() => setTypeDate('text')}
                        type={typedate}
                        text="Ngày sinh"
                        placeholder={t('Chooseyourdateofbirth')}
                        name="dob"
                      />
                    </div>

                    <div>
                      {errors.sex && touched.sex ? (
                        <span className={cx('text-user', 'active')}>{errors.sex}</span>
                      ) : (
                        <span className={cx('text-user')}>{t('Sex')}</span>
                      )}

                      <SelectInput
                        option={optionSex}
                        span="Giới tính"
                        error={errors.sex && touched.sex}
                        id="sex"
                        type="text"
                        text="Giới tính"
                        placeholder={t('Chooseyourgender')}
                        value={values.sex}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        name="sex"
                      />
                    </div>
                  </div>

                  {errors.city && touched.city ? (
                    <span className={cx('text-user', 'active')}>{errors.city}</span>
                  ) : (
                    <span className={cx('text-user')}>{t('Province/City')}</span>
                  )}
                  <SelectInput
                    option={province}
                    span="Tỉnh/ Thành phố"
                    error={errors.city && touched.city}
                    id="sex"
                    type="text"
                    text="Tỉnh/ thành phố"
                    placeholder={t('Selectprovince/city')}
                    value={values.city}
                    onChange={handleChange}
                    onBlur={setFieldTouched}
                    name="city"
                  />

                  <div className={cx('wrapper-input2')}>
                    <div>
                      {' '}
                      {errors.district && touched.district ? (
                        <span className={cx('text-user', 'active')}>{errors.district}</span>
                      ) : (
                        <span className={cx('text-user')}>{t('District')}</span>
                      )}
                      <SelectInput
                        option={provinceID}
                        span="Quận/ Huyện"
                        error={errors.district && touched.district}
                        id="sex"
                        type="text"
                        text="Quận/ Huyện"
                        placeholder={t('Selectdistrict/district')}
                        value={values.district}
                        onChange={handleChange}
                        onBlur={setFieldTouched}
                        name="district"
                        messeage={t('Pleaseselecttheoptionsfirst')}
                      />
                    </div>

                    {/* xa */}
                    <div>
                      {errors.commune && touched.commune ? (
                        <span className={cx('text-user', 'active')}>{errors.commune}</span>
                      ) : (
                        <span className={cx('text-user')}>{t('Wards')}</span>
                      )}

                      <SelectInput
                        option={ward}
                        span="Xã/ Phường"
                        error={errors.commune && touched.commune}
                        id="sex"
                        type="text"
                        text="Xã/ Phường"
                        placeholder={t('Selectcommune/ward')}
                        value={values.commune}
                        onChange={handleChange}
                        onBlur={setFieldTouched}
                        name="commune"
                        messeage={t('Pleaseselecttheoptionsfirst')}
                      />
                    </div>
                    {/*  */}
                  </div>
                  {/* <Input type="text" text="Truờng" placeholder="THCS Phương Tú" /> */}
                </div>
              </div>

              <div className={cx('wrapper-button', 'wrapper-button-profile')}>
                <button type="submit" className={cx('button-update')}>
                  {t('Confirm')}
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountEdit;

export function ModalChangePassword({ active }) {
  const dispatch = useDispatch();
  const closeModalChangePass = () => {
    dispatch(setActiveModalChangePassword(false));
  };
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {active === true && (
        <motion.div
          initial={{ x: 40, opacity: 0, visibility: 'hidden' }}
          animate={{ x: active ? 0 : 40, opacity: active ? 1 : 0, visibility: active ? 'visible' : 'hidden' }}
          exit={{ scale: 0 }}
          className={cx('wrapper-modal')}
        >
          <div className={cx('modal-changepass')}>
            <span onClick={closeModalChangePass} className={cx('icon-close')}>
              <AiOutlineClose />
            </span>
            <div className={cx('changle-pass__title')}>{t('Updatepassword')}</div>
            <div className={cx('wrapper-listinput')}>
              <input type="text" placeholder={t('currentpassword')} />
              <input type="text" placeholder={t('Anewpassword')} />
              <input type="text" placeholder={t('ConfirmPassword')} />
            </div>

            <div className={cx('button-modal__changepass')}>
              <button>{t('Confirm')}</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
