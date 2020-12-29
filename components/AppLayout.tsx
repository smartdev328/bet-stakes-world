import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

type AppLayoutPropsType = {
  bgColor?: string;
  children: React.ReactNode;
};

export default function AppLayout({ bgColor, children }: AppLayoutPropsType) {
  return (
    <>
      <AppHeader releaseTime={'2021-12-31'} winningRate={72} curRecord={'96 - 36'} />
      <main style={{ background: bgColor }}>{children}</main>
      <AppFooter />
    </>
  );
}
