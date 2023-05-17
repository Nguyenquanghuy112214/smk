import classNames from 'classnames/bind';
import styles from '~/sass/Components/_Grammar.module.scss';
import course from '~/assets/image/Music_History_Video/course.png';
import { AiFillEye } from 'react-icons/ai';
import item1 from '~/assets/image/Grammar/item1.png';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as CreateUserGrammar from '~/services/CreateUserGrammar';
import { useAuth } from '~/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const LectureList = ({ data, onClick, namegrammar }) => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const { index } = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    const res = await CreateUserGrammar.createUserGrammar(
      { GrammarId: data !== undefined && data.grammarId },
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );

    navigate(`/grammardetail/${namegrammar}/${data.grammarTypeId}/${index}`);
    onClick();
  };
  return (
    <div className={cx('wrapper-course')} onClick={handleClick}>
      <div className={cx('img-course')}>{<img src={item1} alt="" />}</div>
      <div className={cx('content-course')}>
        <div className={cx('content-course__name')}>{data !== undefined && data.name}</div>
        <div className={cx('content-course__body')}>
          <span className={cx('auth')}>
            {t('Author')}: <strong>{data !== undefined && data.author}</strong>
          </span>
          <span className={cx('time')}>
            {t('Capacity')}: <strong>{data !== undefined && data.length}</strong>
          </span>
        </div>
        <div className={cx('content-course__view')}>{data !== undefined && data.describe}</div>
      </div>
    </div>
  );
};

export default LectureList;
