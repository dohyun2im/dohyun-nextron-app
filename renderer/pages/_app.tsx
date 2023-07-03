import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import AppLayout from './layout';
import { ConfigProvider } from 'antd';
import Store from 'electron-store';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  const store = new Store();

  const handleLogin = async() => {
    await signInWithEmailAndPassword(auth, store.get('email') as string, store.get('pw') as string);
  };

  useEffect(() => {
    handleLogin();
  }, []);

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
