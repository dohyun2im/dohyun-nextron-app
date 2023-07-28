import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  CallIcon,
  ChannelIcon,
  ChildrenWrapper,
  Container,
  LoginIcon,
  Logo,
  LogoutIcon,
  SendIcon,
  SideBarTabsItem,
  SideTabsWrapper,
  SignUpIcon,
  UserAvatar,
  UserIcon,
} from '../styles';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<boolean>(false);

  const handleRouter = (route: string) => {
    router.push(`${route}`);
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
    <Container>
      <SideTabsWrapper>
        {user && <UserAvatar>{auth.currentUser.email.slice(0, 2)}</UserAvatar>}
        <Logo onClick={() => handleRouter('/home')}>SlackZoom</Logo>
        {user ? (
          <>
            <SideBarTabsItem onClick={() => handleRouter('/friends')}>
              <UserIcon />
              <div>Friends</div>
            </SideBarTabsItem>
            <SideBarTabsItem onClick={() => handleRouter('/dm')}>
              <SendIcon />
              <div>DM</div>
            </SideBarTabsItem>
            <SideBarTabsItem onClick={() => handleRouter('/channel')}>
              <ChannelIcon />
              <div>Channel</div>
            </SideBarTabsItem>
            <SideBarTabsItem onClick={() => handleRouter('/call')}>
              <CallIcon />
              <div>Call</div>
            </SideBarTabsItem>
            <SideBarTabsItem onClick={onLogOutClick}>
              <LogoutIcon />
              <div>Logout</div>
            </SideBarTabsItem>
          </>
        ) : (
          <>
            <SideBarTabsItem onClick={() => handleRouter('/signin')}>
              <LoginIcon />
              <div>Login</div>
            </SideBarTabsItem>
            <SideBarTabsItem onClick={() => handleRouter('/signup')}>
              <SignUpIcon />
              <div>Sign Up</div>
            </SideBarTabsItem>
          </>
        )}
      </SideTabsWrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  );
}
