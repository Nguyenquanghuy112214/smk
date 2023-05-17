import { useDispatch, useSelector } from 'react-redux';
import { changeIDBookAge } from '~/Redux/IDBookAgeSlice';
export const useIDBookIDAge = () => {
  const IDBook = useSelector(
    (state) => state.IDBookAge !== undefined && state.IDBookAge !== null && state.IDBookAge !== false && state.IDBookAge.IDBook
  );
  const IDAge = useSelector(
    (state) => state.IDBookAge !== undefined && state.IDBookAge !== null && state.IDBookAge !== false && state.IDBookAge.IDAge
  );
  const IDCourse = useSelector(
    (state) => state.IDBookAge !== undefined && state.IDBookAge !== null && state.IDBookAge !== false && state.IDBookAge.IDCourse
  );

  const dispatch = useDispatch();

  const setIDBookAge = (IDBook, IDAge, IDCourse) => {
    localStorage.setItem('IDBookAge', JSON.stringify({ IDBook, IDAge, IDCourse }));
    const actionChangeAuth = changeIDBookAge({ IDBook, IDAge, IDCourse });
    dispatch(actionChangeAuth);
  };

  return { IDBook, IDAge, IDCourse, setIDBookAge };
};
