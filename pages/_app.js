import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { wrapper } from '../redux/store';
import { parseJwt } from '@utils/common';
import SportsAPIs from '@apis/sport.apis';
import SubscriptionsAPIs from '@apis/subscriptions.apis';

import 'antd/lib/style/index.css';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/dropdown/style/index.css';
import 'antd/lib/carousel/style/index.css';
import 'antd/lib/rate/style/index.css';
import 'antd/lib/notification/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/spin/style/index.css';
import '../styles/globals.css';

const FULL_ACCESS_ROUTES = [
  '/',
  '/shop',
  '/signup',
  '/cart',
  '/faqs',
  '/contact-us',
  '/yesterdays-plays',
  '/aboutus',
  '/terms',
  '/privacy'
];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [parsedToken, setParsedToken] = useState(null);
  const [sports, setSports] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const { token } = useSelector((state) => state.user);

  const getDefaultProps = async () => {
    if (sports.length === 0) {
      const res1 = await SportsAPIs.getSports();
      const data = await res1.json();
      setSports(data);
    }
    if (parsedToken && subscriptions.length === 0) {
      const res2 = await SubscriptionsAPIs.getSubscriptions(parsedToken.id);
      const data2 = await res2.json();
      setSubscriptions(data2);
    }
  };

  useEffect(() => {
    let parsedToken = null;
    if (token) {
      parsedToken = parseJwt(token);
    } else {
      const localToken = localStorage.getItem('token');
      if (localToken) {
        parsedToken = parseJwt(localToken);
      } else {
        if (FULL_ACCESS_ROUTES.findIndex((route) => route === router.pathname) < 0) {
          router.push('/');
        }
      }
    }
    getDefaultProps();
    setParsedToken(parsedToken);
  }, [token, router]);

  return (
    <Component {...pageProps} token={parsedToken} sports={sports} subscriptions={subscriptions} />
  );
}

export default wrapper.withRedux(MyApp);
