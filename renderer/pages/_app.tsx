import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import AppLayout from './layout';
import { ConfigProvider } from 'antd';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Dohyun - Nextron - App</title>
      </Head>
      <ConfigProvider theme={{ token: { colorPrimary: 'gray' } }}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ConfigProvider>
    </React.Fragment>
  );
}

export default MyApp;
