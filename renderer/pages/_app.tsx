import React from 'react';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <React.Fragment>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
