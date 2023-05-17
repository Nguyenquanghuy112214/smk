import { useAuth } from '~/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '~/config';

function Auth({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();

  useEffect(() => {
    if (!auth || !auth.token || !auth.token.length < 0) {
      navigate(config.routes.aboutbkt);
      return;
    }
  }, [auth, location]);

  if (auth) {
    return <div>{children}</div>;
  }
  return <p>Loading....</p>;
}

export default Auth;
