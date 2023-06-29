import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { CommentOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';

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
  font-size: 20px;
  font-weight: 500;
  color: white;
  text-align: center;
`;

const LoginBottomItem = styled.span`
  width: 33.3%;
  font-size: 20px;
  font-weight: 500;
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

  const onLogOutClick = () => {
    console.log('logout');
    auth.signOut();
    router.push('/signin');
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, [auth]);

  return (
    <>
      <TopWrapper>{children}</TopWrapper>
      {user ? (
        <BottomWrapper>
          <LoginBottomItem
            onClick={() => {
              handleRouter('teams');
            }}
          >
            <HomeOutlined /> Teams
          </LoginBottomItem>
          <BottomBorder />
          <LoginBottomItem
            onClick={() => {
              handleRouter('chat');
            }}
          >
            <CommentOutlined /> Chat
          </LoginBottomItem>
          <BottomBorder />
          <LoginBottomItem onClick={onLogOutClick}>
            <LogoutOutlined /> Logout
          </LoginBottomItem>
        </BottomWrapper>
      ) : (
        <BottomWrapper>
          <BottomItem
            onClick={() => {
              handleRouter('signin');
            }}
          >
            <LoginOutlined /> Login
          </BottomItem>
          <BottomBorder />
          <BottomItem
            onClick={() => {
              handleRouter('signup');
            }}
          >
            <UserAddOutlined /> Sign Up
          </BottomItem>
        </BottomWrapper>
      )}
    </>
  );
}
