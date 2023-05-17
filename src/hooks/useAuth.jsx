import { useDispatch, useSelector } from 'react-redux';
import { changeAuth } from '~/Redux/AuthSlice';
export const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const setAuth = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    const actionChangeAuth = changeAuth(data);
    dispatch(actionChangeAuth);
  };

  return { auth, setAuth };
};
