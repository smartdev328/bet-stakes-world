import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

type AppLayoutPropsType = {
  bgColor?: string;
  children: React.ReactNode;
};

export default function AppLayout({ bgColor, children }: AppLayoutPropsType) {
  return (
    <>
      <AppHeader
        releaseTime={{ year: 2021, month: 12, date: 31 }}
        winningRate={72}
        curRecord={'96 - 36'}
        currentDateTime={'Saturday, Aug 02 2021'}
      />
      <main style={{ background: bgColor }}>{children}</main>
      <AppFooter />
    </>
  );
}
