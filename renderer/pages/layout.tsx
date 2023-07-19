import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CommentOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const TopWrapper = styled.div`
  width: 100vw;
  height: 42px;
  display: flex;
  align-items: center;
`;
const SideTabsContainer = styled.div`
  width: 90vw;
  height: 92vh;
  padding: 10px;
  display: flex;
`;

const SideTabsWrapper = styled.div`
  width: 10vw;
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
`;

const SideBarTabsItem = styled.span`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 7px;
  margin-bottom: 20px;
  border-radius: 8px;
  :hover {
    scale: 1.07;
    background-color: #737373;
  }
`;

const Logo = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  padding: 10px 0px 10px 10px;
  margin-top: 7px;
`;

const UserAvatar = styled(Avatar)`
  width: 34px;
  height: 34px;
  background-color: #fde3cf;
  color: #f56a00;
  font-weight: bold;
  margin: 7px 7px 0px 21px;
`;

const UserIcon = styled(UserOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

const LoginIcon = styled(LoginOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

const LogoutIcon = styled(LogoutOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

const ChatIcon = styled(CommentOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

const SignUpIcon = styled(UserAddOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<boolean>(false);

  const handleRouter = (route: string) => {
    router.push(`/${route}`);
  };

  const onLogOutClick = useCallback(() => {
    auth.signOut();
    router.push('/signin');
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(true);
      else setUser(false);
    });
  }, [auth]);

  return (
    <>
      <TopWrapper>
        {user && <UserAvatar>{auth.currentUser.email.slice(0, 2)}</UserAvatar>}
        <Logo>Slack & Zoom</Logo>
      </TopWrapper>
      <SideTabsContainer>
        <SideTabsWrapper>
          {user ? (
            <>
              <SideBarTabsItem onClick={() => handleRouter('teams')}>
                <UserIcon />
                <div>Teams</div>
              </SideBarTabsItem>
              <SideBarTabsItem onClick={() => handleRouter('chat')}>
                <ChatIcon />
                <div>Chat</div>
              </SideBarTabsItem>
              <SideBarTabsItem onClick={onLogOutClick}>
                <LogoutIcon />
                <div>Logout</div>
              </SideBarTabsItem>
            </>
          ) : (
            <>
              <SideBarTabsItem onClick={() => handleRouter('signin')}>
                <LoginIcon />
                <div>Login</div>
              </SideBarTabsItem>
              <SideBarTabsItem onClick={() => handleRouter('signup')}>
                <SignUpIcon />
                <div>Sign Up</div>
              </SideBarTabsItem>
            </>
          )}
        </SideTabsWrapper>
        {children}
      </SideTabsContainer>
    </>
  );
}
