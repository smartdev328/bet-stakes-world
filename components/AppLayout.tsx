import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { getDayOfWeek, getMonthString } from '@utils/common';
import { JWT } from '@type/Main';
import { UserSubscription } from '@type/Users';

type AppLayoutPropsType = {
  bgColor?: string;
  token: JWT | null;
  children: React.ReactNode;
  subscriptions: UserSubscription[];
};

export default function AppLayout({ bgColor, children, token, subscriptions }: AppLayoutPropsType) {
  const today = new Date();
  return (
    <>
      <AppHeader
        winningRate={72}
        curRecord={'96 - 36'}
        token={token}
        subscriptions={subscriptions}
        currentDateTime={`${getDayOfWeek(today)}, ${getMonthString(today)} ${
          today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        } ${today.getFullYear()}`}
      />
      <main style={{ background: bgColor, overflow: 'hidden' }}>{children}</main>
      <AppFooter token={token} />
    </>
  );
}
