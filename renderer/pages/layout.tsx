import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const TopWrapper = styled.div`
  width: 100vw;
  height: 93vh;
`;

const BottomWrapper = styled.div`
  width: 100vw;
  height: 7vh;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
`;

const BottomItem = styled.span`
  width: 50%;
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-align: center;
`;

const BottomBorder = styled.span`
  height: 7vh;
  border-left: 1px solid #eee;
`;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<boolean>(false);
  const handleRouter = (route: string) => {
    router.push(`/${route}`);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true);
    } else {
      setUser(false);
    }
  });

  return (
    <>
      <TopWrapper>{children}</TopWrapper>
      {user ? (
        <BottomWrapper>
          <BottomItem
            onClick={() => {
              handleRouter('teams');
            }}
          >
            🏠 Teams
          </BottomItem>
          <BottomBorder />
          <BottomItem
            onClick={() => {
              handleRouter('chat');
            }}
          >
            🗨 Chat
          </BottomItem>
        </BottomWrapper>
      ) : (
        <BottomWrapper>
          <BottomItem
            onClick={() => {
              handleRouter('signin');
            }}
          >
            👨‍💻 Login
          </BottomItem>
          <BottomBorder />
          <BottomItem
            onClick={() => {
              handleRouter('signup');
            }}
          >
            🏠 Sign Up
          </BottomItem>
        </BottomWrapper>
      )}
    </>
  );
}
