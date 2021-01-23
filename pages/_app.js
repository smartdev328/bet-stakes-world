import 'antd/lib/style/index.css';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/dropdown/style/index.css';
import 'antd/lib/carousel/style/index.css';
import 'antd/lib/rate/style/index.css';
import 'antd/lib/notification/style/index.css';
import 'antd/lib/modal/style/index.css';

import '../styles/globals.css';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
