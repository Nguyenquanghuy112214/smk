import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import ItemQuestion from './ItemQuestion';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import classNames from 'classnames/bind';
import styles from './_AllQuestionSection.module.scss';
const cx = classNames.bind(styles);

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 333,
  marginRight: theme.spacing(1),
  fontWeight: 400,
  color: '#000',
  fontSize: 22,
  '&:hover': {
    color: '#fff',
    fontWeight: 600,
    backgroundColor: '#2c9e3e',
    borderRadius: 5,
  },
  '&.Mui-selected': {
    color: '#2c9e3e',
    opacity: 1,
    '&:hover': {
      color: '#fff',
      fontWeight: 600,
      backgroundColor: '#2c9e3e',
    },
  },
}));

const AllQuestionSection = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const data = [
    {
      name: 'Trước mua',
      item: [
        {
          title: 'Chính sách bán hàng',
          item: [
            {
              link: '/',
              content: ' Mua ứng dụng học tập Smart Kids được những ưu đãi gì?',
            },
            {
              link: '/',
              content: '  Sau bao lâu thì ba mẹ nhận được gói học đã đăng ký mua?',
            },
          ],
        },
        {
          title: 'Các hình thức thanh toán',
          item: [
            {
              link: '/',
              content: '  Có những hình thức thanh toán nào khi mua ứng dụng học tập của Smart Kids?',
            },
            {
              link: '/',
              content: 'Làm thế nào để chuyển đổi hình thức thanh toán khi mua ứng dụng Smart Kids?',
            },
          ],
        },
      ],
    },
    {
      name: 'Đang mua',
      item: [
        {
          title: ' Các vấn đề về thanh toán',
          item: [
            {
              link: '/',
              content: ' Mua ứng dụng học tập Smart Kids được những ưu đãi gì?',
            },
            {
              link: '/',
              content: '  Sau bao lâu thì ba mẹ nhận được gói học đã đăng ký mua?',
            },
          ],
        },
        {
          title: ' Chuyển đổi hoàn hủy',
          item: [
            {
              link: '/',
              content: '  Giao tài khoản đăng nhập và hướng dẫn sử dụng về tận nhà có mất phí vận chuyển không?',
            },
            {
              link: '/',
              content: ' Những trường hợp nào ba mẹ được hoàn lại phí của gói học?',
            },
          ],
        },
      ],
    },
    {
      name: 'Sau mua',
      item: [
        {
          title: 'Hướng dẫn học',
          item: [
            {
              link: '/',
              content: 'Hướng dẫn học Smart Kids',
            },
            {
              link: '/',
              content: 'Hướng dẫn học?',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className={cx('background')}>
      <div className={cx('container')}>
        <div className={cx('box')}>
          <div className={cx('col')}>
            <div data-aos="zoom-in-up" data-aos-duration="700" className={cx('title')}>
              <span>Tất cả câu hỏi</span>
            </div>
            <TabContext data-aos="fade-up" data-aos-duration="700" value={value}>
              <Box data-aos="fade-up" data-aos-duration="700" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                  {data.map((item, index) => (
                    <AntTab label={item.name} value={index + 1} key={index + 1} />
                  ))}
                </TabList>
              </Box>
              {data.map((item, index) => (
                <TabPanel value={index + 1}>
                  <div data-aos="fade-up" data-aos-duration="700" className={cx('item')}>
                    <ItemQuestion data={item.item} />
                  </div>
                </TabPanel>
              ))}
            </TabContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllQuestionSection;
