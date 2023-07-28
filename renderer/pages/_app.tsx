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
    const email = store.get('email') as string;
    const pw = store.get('pw') as string;
    if (email && pw) {
      await signInWithEmailAndPassword(auth, email, pw);
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('알림 권한이 허용되었습니다!');
        } else if (permission === 'denied') {
          console.warn('알림 권한이 거부되었습니다.');
        }
      });
    } else {
      console.error('이 브라우저는 알림을 지원하지 않습니다.');
    }
  }

  useEffect(() => {
    requestNotificationPermission();
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
