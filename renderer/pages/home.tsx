import React, { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) router.push('/teams');
      else router.push('/signin');
    });
  }, [auth]);

  return <React.Fragment />;
}
