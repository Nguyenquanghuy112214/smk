import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import lh from '~/assets/imgintro/lienhe.png';
import classNames from 'classnames/bind';
import styles from './_AdviSesecion.module.scss';
const cx = classNames.bind(styles);

const AdviSesecion = () => {
  const [model, setModel] = useState(false);
  useEffect(() => {
    setModel(false);

    return () => {
      setModel(false);
    };
  }, []);

  const onModel = (e) => {
    e.preventDefault();
    setModel(true);
  };
  const onClose = (e) => {
    e.preventDefault();
    setModel(false);
  };
  const [age, setAge] = React.useState('');
  const [name, setName] = React.useState('');
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className={cx('background')}>
      <div data-aos-duration="700" className={cx('container')}>
        <div className={cx('row')}>
          <div data-aos="fade-right" className={cx('content')}>
            <p>
              Trẻ em cần được trao cơ hội để có thể học tập và phát triển tốt hơn. Giúp con khai phá tiềm năng tư duy và ngôn ngữ ngay hôm
              nay.
            </p>
            <form>
              <div className={cx('form-group')}>
                <label>
                  Nhập tên ba (mẹ) để được BKT Smart Kids tư vấn lộ trình học cho bé
                  <input type="text" name="" placeholder="Nhập tên ba/mẹ"></input>
                </label>
              </div>
              <button className={cx('btn')} onClick={onModel}>
                Nhận Tư Vấn Miễn Phí
              </button>
            </form>
          </div>
          <div data-aos="fade-left" data-aos-duration="700" className={cx('img-lv')}>
            <img src={lh} alt="" />
          </div>
        </div>
      </div>

      {model && (
        <div className={cx('model')}>
          <div className={cx('modal-dialog')}>
            <button className={cx('close')} onClick={onClose}></button>
            <div className={cx('img')}>
              <img src="https://monkeymedia.vcdn.com.vn/upload/web/img_default/monkey.png" alt="" />
            </div>
            <div className={cx('contentx')}>
              <p>Giúp con khai phá tiềm năng tư duy &amp; ngôn ngữ ngay hôm nay! Đăng ký để được Monkey tư vấn lộ trình học</p>
            </div>
            <form>
              <div className={cx('form-group')}>
                <input type="text" name="" value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ tên" />
              </div>
              <div className={cx('form-group')}>
                <input type="tel" name="" placeholder="Số điện thoại" />
              </div>
              <div className={cx('form-group')}>
                <input type="email" name="" placeholder="Email" />
              </div>
              <div className={cx('form-group')}>
                <Select defaultValue={22} value={age} sx={{ m: 1, minWidth: 432 }}>
                  <MenuItem value={10}>Twenty</MenuItem>
                  <MenuItem value={21}>Twenty one</MenuItem>
                  <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
              </div>
              <div className={cx('form-group1')}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <TimePicker value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} />} />
                </LocalizationProvider>
              </div>
              <button className={cx('submit', 'btn')} onClick={onModel}>
                Nhận Tư Vấn Miễn Phí
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdviSesecion;
