import React from 'react';
import type { AppProps } from 'next/app';
import { persistor, wrapper } from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Component {...props.pageProps} />
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
