import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { getDayOfWeek, getMonthString, parseJwt } from '@utils/common';
import { useEffect, useState } from 'react';
import { JWT } from '@type/Main';
import { useSelector } from 'react-redux';
import { ReduxState } from '@redux/reducers';

type AppLayoutPropsType = {
  bgColor?: string;
  children: React.ReactNode;
};

export default function AppLayout({ bgColor, children }: AppLayoutPropsType) {
  const [parsedToken, setParsedToken] = useState<JWT | null>(null);
  const { token } = useSelector((state: ReduxState) => state.user);
  const today = new Date();

  useEffect(() => {
    let parsedToken = null;
    if (token) {
      parsedToken = parseJwt(token);
    } else {
      const localToken = localStorage.getItem('token');
      if (localToken) {
        parsedToken = parseJwt(localToken);
      }
    }
    setParsedToken(parsedToken);
  }, [token]);

  return (
    <>
      <AppHeader
        releaseTime={{ year: 2021, month: 12, date: 31 }}
        winningRate={72}
        curRecord={'96 - 36'}
        token={parsedToken}
        currentDateTime={`${getDayOfWeek(today)}, ${getMonthString(today)} ${
          today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        } ${today.getFullYear()}`}
      />
      <main style={{ background: bgColor }}>{children}</main>
      <AppFooter token={parsedToken} />
    </>
  );
}
