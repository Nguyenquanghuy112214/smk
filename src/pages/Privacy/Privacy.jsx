import React from 'react';
import classNames from 'classnames/bind';

import styles from '~/sass/Components/_Privacy.module.scss';
const cx = classNames.bind(styles);

const Privacy = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('main-heaeder')}>Privacy Policy</div>
        {/* <div className={cx('sub-heaeder')}>
          <span className={cx('text1')}>CHÍNH SÁCH BẢO MẬT THÔNG TIN CÁ NHÂN</span>
          <span className={cx('text2')}>{`[ BKT SMARTKID FOR ENGLISH ]`}</span>
        </div> */}
      </div>
      <div className={cx('wrapper-content')}>
        <Item />
        <div className={cx('content')}>
          <div className={cx('title-sub')}>
            <div className={cx('title-sub__item')}>
              <strong>
                BKT has developed this Privacy Policy to help customers understand the principles when accessing, using, and processing
                personal data that they have provided us at the website and in the process of registration and product use.
              </strong>
            </div>
          </div>
        </div>

        <div className={cx('content')}>
          <div className={cx('title-main')}>1. Introduction</div>
          <div className={cx('title-sub')}>
            <div className={cx('title-sub__item')}>
              <strong> BKT TECHNOLOGY AND TRADING INVESTMENT JOINT STOCK COMPANY </strong> is the provider and owner of an educational
              application for children: BKT Smart Kids Language (after this referred to as “we”). We acknowledge the importance of personal
              data that customers have trusted and provided us and believe that we have the responsibility to manage, protect and handle
              customers’ personal information appropriately. We developed this Privacy Policy to help customers understand the principles
              when accessing, using, and processing personal data that customers have provided us on the website and during registration and
              product use. By providing us with your personal information, customers agree that their personal information will be collected
              and used as outlined in this Policy. If customers do not agree to this Policy, please do not provide us with any personal
              information and use the rights outlined in section 6 of this Policy. We encourage customers to regularly review this Privacy
              Policy for the latest updates to ensure that customers acknowledge and exercise their rights to manage their personal
              information.
            </div>
          </div>
        </div>

        <div className={cx('content')}>
          <div className={cx('title-main')}>2. What personal data is collected?</div>
          <div className={cx('title-sub')}>
            <div className={cx('title-sub__item')}>
              The personal data provided on the website and when using the applications that we may collect includes, but is not limited to:
            </div>

            <div className={cx('title-sub__item')}>- Full name</div>
            <div className={cx('title-sub__item')}>- Email</div>
            <div className={cx('title-sub__item')}>- Phone number</div>
            <div className={cx('title-sub__item')}>- Address</div>
            <div className={cx('title-sub__item')}>- Personal Facebook information (if any)</div>
            <div className={cx('title-sub__item')}>
              Customers are responsible for the accuracy and truthfulness of the information we provide. In addition, customers are
              responsible for promptly notifying us of any unauthorized use, abuse, or breach of security to take appropriate measures.
              Customers who subscribe to a course will be added to our list to receive newsletters, special offers, or occasional offers.
            </div>
          </div>
        </div>

        <div className={cx('content')}>
          <div className={cx('title-main')}>3. When is personal data collected?</div>
          <div className={cx('title-sub')}>
            <div className={cx('title-sub__item')}>We will/may collect personal data about our customers when they:</div>

            <div className={cx('title-sub__item')}>
              - Log in for a free trial lesson or use in-app purchases using one of their pieces of information such as phone number, Gmail,
              or Facebook;
            </div>
            <div className={cx('title-sub__item')}>- Register to receive a consultant on the company's products;</div>
            <div className={cx('title-sub__item')}>- Purchase and pay for the company's products.</div>
          </div>
        </div>

        <div className={cx('content')}>
          <div className={cx('title-main')}>4. Purpose and scope of information use</div>
          <div className={cx('title-sub')}>
            <div className={cx('title-sub__item')}>
              We may collect, use, provide and/or process your personal data for one or more of the following purposes:
            </div>
            <div className={cx('title-sub__item')}>
              - To contact to confirm when customers sign up to use the service to ensure their rights;
            </div>
            <div className={cx('title-sub__item')}>
              - To create a user Account to log into our programs (to try out or to use purchased content);
            </div>
            <div className={cx('title-sub__item')}>- To manage the login and use of our program on different devices;</div>
            <div className={cx('title-sub__item')}>
              - To manage and synchronize the learning progress on each application by user Account;
            </div>
            <div className={cx('title-sub__item')}>
              - To provide free telephone consultation to customers about services related to language learning programs for kids which
              apply early education methods;
            </div>
            <div className={cx('title-sub__item')}>- To answer customer inquiries;</div>
            <div className={cx('title-sub__item')}>- To send notices about information exchange activities between customers and us;</div>
            <div className={cx('title-sub__item')}>- To conduct customer surveys;</div>
            <div className={cx('title-sub__item')}>- To carry out promotional activities related to the courses;</div>
            <div className={cx('title-sub__item')}>
              - To prevent activities that destroy customer information or activities that impersonate customers;
            </div>
            <div className={cx('title-sub__item')}>- To contact and work with customers in some special cases;</div>
            <div className={cx('title-sub__item')}>
              - In case of legal requirements: we have the responsibility to cooperate in providing customers' personal information upon
              request from judicial authorities, including Procuracy, court, investigation police agency, which is related to certain legal
              violations of customers. In addition, no one has the right to infringe on customers' personal information.
            </div>
          </div>
        </div>

        <div className={cx('content')}>
          <div className={cx('title-main')}>5. How long is information stored?</div>

          <div className={cx('title-sub')}>
            <div className={cx('title-sub__item')}>
              We will store our customers’ personal data until we receive a request for cancellation or deletion. Otherwise, in all cases,
              customers’ personal information is stored confidentially on our server. We will retain and use your information as needed to
              comply with our legal obligations, resolve disputes, and enforce our agreements.
            </div>
          </div>
        </div>

        <div className={cx('content')}>
          <div className={cx('title-main')}>6. Means and tools for users to access and edit their personal data </div>

          <div className={cx('title-sub')}>
            <div className={cx('title-sub__item')}>
              Customers have the right to request cancellation or deletion of their personal information by putting forth a request to the
              website administrator.
            </div>

            <div className={cx('title-sub__item')}>
              Customers have the right to submit complaints about the disclosure of personal information to third parties to the website's
              Board of Management. When receiving this feedback, we will confirm the information, assume the responsibility to answer the
              reason, and inform the customer how to secure their information.
            </div>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('title-main')}>7. Commitment to the confidentiality of customer's personal information</div>
          <div className={cx('title-sub')}>
            <div className={cx('title-sub__item')}>
              - We are committed to completely securing the customers’ personal information that we have collected according to the personal
              information protection policy we have issued. The collection and use of each customer’s information are done only with the
              consent of that customer unless otherwise required by law.
            </div>

            <div className={cx('title-sub__item')}>
              - Do not use, transfer, provide or disclose customers’ personal information to any third party without the consent of the
              customers unless otherwise required by competent authorities for investigation, trial, etc.
            </div>
            <div className={cx('title-sub__item')}>
              - If we participate in mergers or acquisitions for a part or all of the assets, the customers will be notified via email or
              our official website about any changes of ownership or use of customer's personal information, as well as any customers’
              rights relating to customers’ personal information, to any third party with customers’ consent.
            </div>
            <div className={cx('title-sub__item')}>
              - If a server restoring customer’s information is attacked by a hacker, subsequently leading to the loss of the customer’s
              personal data, we will be responsible for reporting the case to the investigating authorities for timely management and
              notification to the customer.
            </div>
            <div className={cx('title-sub__item')}>
              - Secure all customers’ online transaction information, including invoice information, accounting documents digitized in our
              secure level 1 data center.
            </div>
            <div className={cx('title-sub__item')}>
              - The website board of management requires that when subscribing/purchasing as customers, individuals must fully provide
              relevant personal information, including full name, address, email, and phone number, and be responsible for the legality of
              the above information. We are not responsible for and will only handle all complaints related to the customers' interests if
              all the personal information provided by customers of initial registration is correct or accurate.
            </div>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('title-main')}>
            8. How to access, update or delete the information customers have provided to BKT Smart Kids
          </div>
          <div className={cx('title-sub')}>
            <div className={cx('title-sub__item')}>
              If customers do not want BKT to have the right to use their information or wish to exercise the privacy rights committed
              between BKT and customers, please contact us by sending an Email to the address X with the below content: Email subject:
              Request to delete account - full name, Email address, and learner ID on the app.
            </div>

            <div className={cx('title-sub__item')}>
              BKT Smart Kids will respond to your request within the time specified in the commitment. When submitting this request, you may
              be required to suspend BKT applications and services until the appeal is resolved.
            </div>
            <div className={cx('title-sub__item')}>
              If you want to update, modify or delete the personal information that BKT has collected or have any questions regarding this
              Privacy Policy, contact us via email.
            </div>
            <div className={cx('title-sub__item')}>
              Please get in touch with us at the address above if you have any questions or complaints about our privacy practices.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

function Item({ titlemain, titlesub }) {
  return (
    <div className={cx('content')}>
      <div className={cx('title-main')}>{titlemain}</div>
      <div className={cx('title-sub')}>{titlesub}</div>
    </div>
  );
}
