import React from 'react';
import Product from '~/Components/Product/Product';
import Solution from '~/Components/Solution/Solution';

// Css
import classNames from 'classnames/bind';
import styles from './_ProductPage.module.scss';
import Advantage from '~/Components/Advantage/Advantage';
import Feature from '~/Components/Feature/Feature';
import Join from '~/Components/Join/Join';
import FeedBack from '~/Components/Feedback/FeedBack';
import AdviSesecion from '~/Components/advisesection/AdviSesecion';
const cx = classNames.bind(styles);
function ProductPage() {
  return (
    <div className={cx('wrapper-product')}>
      <Product />
      <Solution/>
      <Advantage/>
      <Feature/>
      <Join/>
      <FeedBack/>
      <AdviSesecion/>
    </div>
  );
}

export default ProductPage;
