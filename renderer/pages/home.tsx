import React from 'react';
import { Result } from 'antd';
import Image from 'next/image';
import { TitleWrapper } from '../styles';

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
