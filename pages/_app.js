import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { wrapper } from '../redux/store';
import { parseJwt } from '@utils/common';
import SportsAPIs from '@apis/sport.apis';
import SubscriptionsAPIs from '@apis/subscriptions.apis';
import { STRIPE_API_KEY } from '@constants/';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

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
import 'antd/lib/tooltip/style/index.css';
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
  '/privacy',
  '/merchandise'
];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [parsedToken, setParsedToken] = useState(null);
  const [sports, setSports] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const { token } = useSelector((state) => state.user);

  const stripePromise = loadStripe(STRIPE_API_KEY);

  const getDefaultProps = async () => {
    let parsedToken = null;
    if (token) {
      parsedToken = parseJwt(token);
    } else {
      const localToken = localStorage.getItem('token');
      if (localToken && localToken !== 'undefined') {
        parsedToken = parseJwt(localToken);
      } else {
        if (FULL_ACCESS_ROUTES.findIndex((route) => route === router.pathname) < 0) {
          router.push('/');
        }
      }
    }
    if (sports.length === 0) {
      const res1 = await SportsAPIs.getSports();
      const data = await res1.json();
      setSports(data);
    }
    if (parsedToken) {
      const res2 = await SubscriptionsAPIs.getSubscriptions(parsedToken.id);
      const data2 = await res2.json();
      setSubscriptions(data2);
    }
    setParsedToken(parsedToken);
  };

  useEffect(() => {
    getDefaultProps();

    const handleRouteChangeComplete = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // If the component is unmounted, unsubscribe from the event
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     gtag.pageview(url);
  //   };
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

  useEffect(() => {
    getDefaultProps();
  }, [token, router]);

  Sentry.init({
    // dsn: 'https://0e9e9b35cbc2485e996e275b36f66bd7@o516904.ingest.sentry.io/5623973',
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0
  });

  return (
    <Elements stripe={stripePromise}>
      <Component {...pageProps} token={parsedToken} sports={sports} subscriptions={subscriptions} />
    </Elements>
  );
}

export default wrapper.withRedux(MyApp);
