import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

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
  const handleRouter = (route: string) => {
    router.push(`/${route}`);
  };

  return (
    <>
      <TopWrapper>{children}</TopWrapper>
      {false ? (
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
