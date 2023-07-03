import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LoginOutlined, LogoutOutlined, UnorderedListOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

const TopWrapper = styled.div`
  width: 100vw;
  height: 95vh;
`;

const BottomWrapper = styled.div`
  width: 100vw;
  height: 5vh;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
`;

const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  padding: 10px;
`;

const BottomItem = styled.span`
  width: 50%;
  font-size: 18px;
  font-weight: 500;
  color: white;
  text-align: center;
`;

const LoggedInBottomItem = styled.span`
  width: 33.3%;
  font-size: 18px;
  font-weight: 500;
  color: white;
  text-align: center;
`;

const BottomBorder = styled.span`
  height: 5vh;
  border-left: 1px solid #eee;
`;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<boolean>(false);
  const handleRouter = (route: string) => {
    router.push(`/${route}`);
  };

  const onLogOutClick = () => {
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
      <TopWrapper>
        <Header>{auth.currentUser.email.split('@')[0]} 님 . </Header>
        {children}
      </TopWrapper>
      {user ? (
        <BottomWrapper>
          <LoggedInBottomItem
            onClick={() => {
              handleRouter('teams');
            }}
          >
            <UserOutlined /> Teams
          </LoggedInBottomItem>
          <BottomBorder />
          <LoggedInBottomItem
            onClick={() => {
              handleRouter('todo');
            }}
          >
            <UnorderedListOutlined /> Todo
          </LoggedInBottomItem>
          <BottomBorder />
          <LoggedInBottomItem onClick={onLogOutClick}>
            <LogoutOutlined /> Logout
          </LoggedInBottomItem>
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
