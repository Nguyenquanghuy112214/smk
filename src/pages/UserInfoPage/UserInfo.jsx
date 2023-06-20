import classNames from 'classnames/bind';
import styles from '~/sass/Components/_UserInfo.module.scss';
import logo from '~/assets/image/logo_bkt.png';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as GetAllProvince from '~/services/GetAllProvince';
import * as GetByProvinceID from '~/services/GetByProvinceID';
import * as GetByDistrictID from '~/services/GetByDistrictID';
import * as UpdateProfile from '~/services/UpdateProfile';
import { useAuth } from '~/hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup';
import { Input } from './Input';
import { SelectInput } from './SelectInput';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function UserInfo() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { auth } = useAuth();
  const optionSex = [
    { value: true, label: t('Male') },
    { value: false, label: t('Female') },
  ];
  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  const [typedate, setTypeDate] = useState('text');

  const [idTotal, setIDTotal] = useState({ city: null, district: null, commune: null });
  const [provinceID, setProvinceID] = useState([]);
  const [province, setProvince] = useState([]);
  const [ward, setWard] = useState([]);

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

  // Change tinh xa phuong
  const handleChange = (name, value) => {
    setIDTotal({
      ...idTotal,
      [name]: value,
    });
  };
  // Submit form
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
            navigate(`/`);
          }, 2000);
        } else if (res.success === false) {
          toast.error(t('Pleasetryagain'), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {}
    };
    fetchAPI();
  };

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        dob: '',
        sex: '',
        phone: '',
        city: '',
        district: '',
        commune: '',
      }}
      validationSchema={Yup.object({
        fullName: Yup.string().required(t('Pleaseenteryourname')),
        dob: Yup.string().required(t('Pleaseenteryourdateofbirth')),
        sex: Yup.string().required(t('Pleaseselectyourgender')),

        city: idTotal.city ? null : Yup.string().required(t('Pleaseselectprovince/city')),
        district: idTotal.district ? null : Yup.string().required(t('Pleaseselectdistrict/district')),
        commune: idTotal.commune ? null : Yup.string().required(t('Pleaseselectcommune/ward')),

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
            <div className={cx('wrapper')}>
              <div className={cx('header')}>
                <div className={cx('wrapper-logo')}>
                  <img className={cx('img-logo')} src={logo} alt="" />
                </div>
                <div className={cx('title')}>{t('Pleasefillin')}</div>
              </div>
              <div className={cx('body')}>
                <div>
                  {errors.fullName && touched.fullName ? (
                    <span className={cx('text-user', 'active')}>{errors.fullName}</span>
                  ) : // <span className={cx('text-user')}>{t('Firstandlastname')}</span>
                  null}
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
                  ) : // <span className={cx('text-user')}>Email</span>
                  null}
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

                <WrapperInput>
                  <div>
                    {errors.phone && touched.phone ? (
                      <span className={cx('text-user', 'active')}>{errors.phone}</span>
                    ) : // <span className={cx('text-user')}>{t('Phonenumber')}</span>
                    null}

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
                  <div>
                    {errors.dob && touched.dob ? (
                      <span className={cx('text-user', 'active')}>{errors.dob}</span>
                    ) : // <span className={cx('text-user')}>{t('Dateofbirth')}</span>
                    null}
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
                </WrapperInput>
                <WrapperInput>
                  <div>
                    {errors.sex && touched.sex ? (
                      <span className={cx('text-user', 'active')}>{errors.sex}</span>
                    ) : // <span className={cx('text-user')}>{t('Sex')}</span>
                    null}

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
                  <div>
                    {errors.city && touched.city ? (
                      <span className={cx('text-user', 'active')}>{errors.city}</span>
                    ) : // <span className={cx('text-user')}>{t('Province/City')}</span>
                    null}
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
                  </div>
                </WrapperInput>
                <WrapperInput>
                  <div>
                    {errors.district && touched.district ? (
                      <span className={cx('text-user', 'active')}>{errors.district}</span>
                    ) : // <span className={cx('text-user')}>{t('District')}</span>
                    null}

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
                    ) : // <span className={cx('text-user')}>{t('Wards')}</span>
                    null}

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
                </WrapperInput>
              </div>
              <div className={cx('wrapper-button')}>
                <button type="submit" className={cx('button-start')}>
                  {t('Letsstart')}
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default UserInfo;

function WrapperInput({ children }) {
  return <div className={cx('input-grid2')}>{children}</div>;
}
