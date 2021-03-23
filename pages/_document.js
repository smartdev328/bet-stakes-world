import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TAG } from '@utils/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    function renderGTMSnippet() {
      return (
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${GA_TAG}');
          `
          }}
        />
      );
    }

    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" defer />
          <link
            href="https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
            defer
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap"
            rel="stylesheet"
            defer
          />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
          <meta name="keywords" content="Daily, Stakes, Sport" />
          {renderGTMSnippet()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
