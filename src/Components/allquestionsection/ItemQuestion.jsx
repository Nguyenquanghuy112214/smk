import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import classNames from 'classnames/bind';
import styles from './_AllQuestionSection.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  minWidth: 250,
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  padding: 28,
  fontWeight: 400,
  color: '#4e4c50',
  fontSize: 18,
  alignItems: 'flex-start',
  textTransform: 'none',
  borderTop: '1px solid #e9e9e9',
  '&:hover': {
    color: '#2c9e3e',
    fontWeight: 500,
  },
  '&.Mui-selected': {
    color: '#2c9e3e',
    opacity: 1,
  },
  '&.Mui-disabled': {
    color: '#4e4c50',
    opacity: 1,
    borderTop: 'none',
    fontWeight: 800,
    fontSize: 22,
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props) {
  const [value, setValue] = React.useState(1);
  const { data } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
      }}
    >
      <Tabs sx={{ backgroundColor: '#f9f9f9', borderRadius: 8 }} orientation="vertical" value={value} onChange={handleChange}>
        <AntTab disabled label="Danh mục hỗ trợ" {...a11yProps(0)} />
        {data.map((item, index) => (
          <AntTab
            label={`● 
              ${item.title}
            `}
            key={index}
          />
        ))}
      </Tabs>
      {data.map((item, index) => (
        <TabPanel value={value} index={index + 1}>
          <div className={cx('item-box')}>
            <div className={cx('item-title')}>{item.title}</div>
            <div className={cx('item-list')}>
              {item.item.map((item, index) => (
                <div className={cx('item-item')}>
                  <Link to="/">
                    <strong>{index + 1}. </strong>
                    {item.content}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      ))}
    </Box>
  );
}
