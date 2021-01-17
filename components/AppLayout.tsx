import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { getDayOfWeek, getMonthString } from '@utils/common';

type AppLayoutPropsType = {
  bgColor?: string;
  children: React.ReactNode;
};

export default function AppLayout({ bgColor, children }: AppLayoutPropsType) {
  const today = new Date();
  return (
    <>
      <AppHeader
        releaseTime={{ year: 2021, month: 12, date: 31 }}
        winningRate={72}
        curRecord={'96 - 36'}
        currentDateTime={`${getDayOfWeek(today)}, ${getMonthString(today)} ${
          today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        } ${today.getFullYear()}`}
      />
      <main style={{ background: bgColor }}>{children}</main>
      <AppFooter />
    </>
  );
}
