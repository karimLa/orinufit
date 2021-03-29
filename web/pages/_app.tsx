import { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';

import '../public/static/css/nprogress.css';
import Page from '@/components/Page';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
