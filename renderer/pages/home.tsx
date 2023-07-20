import React from 'react';
import { Result } from 'antd';
import styled from '@emotion/styled';
import Image from 'next/image';

const TitleWrapper = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 26px;
`;

export default function Home() {
  return (
    <React.Fragment>
      <Result
        icon={<Image src="/logo.png" alt="dohyun" width={100} height={100} />}
        title={<TitleWrapper>Hello SlackZoom !</TitleWrapper>}
      />
    </React.Fragment>
  );
}
