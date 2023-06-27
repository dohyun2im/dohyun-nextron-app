import React from 'react';
import Store from 'electron-store';
import { Input } from 'antd';

function Home() {
  const store = new Store({ name: 'token' });
  console.log(store.get('token'));
  console.log(process.env.NEXT_PUBLIC_ENV_FIREBASE_APP_KEY);

  const setStore = (e: any) => {
    store.set('token', e.target.value);
  };

  return (
    <React.Fragment>
      <div>
        <Input onChange={setStore} />
      </div>
    </React.Fragment>
  );
}

export default Home;
