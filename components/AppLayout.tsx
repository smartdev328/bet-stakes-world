import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

type AppLayoutPropsType = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutPropsType) {
  return (
    <>
      <AppHeader releaseTime={'2021-12-31'} winningRate={72} curRecord={'96 - 36'} />
      <main>{children}</main>
      <AppFooter />
    </>
  );
}
