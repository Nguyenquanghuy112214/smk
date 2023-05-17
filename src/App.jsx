/* eslint-disable use-isnan */
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '~/Layout/DefaultLayout';
import LayoutFooter from '~/Layout/LayoutFooter';
import LayoutNoHeader from '~/Layout/LayoutNoHeader';
import LayoutNoFooter from '~/Layout/LayoutNoFooter';
import LayoutHeaderNotext from '~/Layout/LayoutHeaderNotext';
import publicRoutes from '~/routes/routes';
import LayoutIntro from './Layout/LayoutIntro';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Suspense, useEffect } from 'react';
import LayoutGame from './Layout/LayoutGame';
import * as UCHistoryByUser from '~/services/UCHistoryByUser';
import { useAuth } from './hooks/useAuth';
import { useState } from 'react';
import { useUCHistory } from './hooks/useUCHistory';
import { format } from 'date-fns';
import Loading from './Components/animationloading/Animationloading';
AOS.init();

function App() {
  const { setUCHistory, hour, minute } = useUCHistory();
  const { auth } = useAuth();
  const [timmer, setTimer] = useState(format(new Date(), 'hh:mm'));

  useEffect(() => {
    const fetch = async () => {
      const res = await UCHistoryByUser.uCHistoryByUser(
        {
          TimeStudy: hour > 0 ? hour * 60 + minute : minute,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
    };
    fetch();
  }, []);

  useEffect(() => {
    const handleTabClose = () => {
      const hoursOld = +timmer.split(':')[0];
      const minuteOld = +timmer.split(':')[1];
      const hoursLater = +format(new Date(), 'hh:mm').split(':')[0];
      const minuteLater = +format(new Date(), 'hh:mm').split(':')[1];

      if (hoursOld - hoursLater > 0) {
        setUCHistory(12 - hoursOld + hoursLater, 60 - minuteOld + minuteLater);
      } else if (hoursOld === hoursLater) {
        setUCHistory(0, minuteLater - minuteOld);
      } else {
        setUCHistory(hoursLater - hoursOld, 60 - minuteOld + minuteLater);
      }
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout === 'isFooter') {
            Layout = LayoutFooter;
          } else if (route.layout === 'center') {
            Layout = LayoutNoHeader;
          } else if (route.layout === 'noFooter') {
            Layout = LayoutNoFooter;
          } else if (route.layout === 'intro') {
            Layout = LayoutIntro;
          } else if (route.layout === 'headerNotext') {
            Layout = LayoutHeaderNotext;
          } else if (route.layout === 'game') {
            Layout = LayoutGame;
          } else {
            Layout = DefaultLayout;
          }
          const Page = route.element;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Suspense fallback={<Loading />}>
                    <Page />
                  </Suspense>
                </Layout>
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
