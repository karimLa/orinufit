import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';

import '../public/static/css/nprogress.css';
import Page from '@/components/Page';
import { useApollo } from '@/lib/apolloClient';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

export default MyApp;
