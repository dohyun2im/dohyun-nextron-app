import React from 'react';
import Link from 'next/link';
import { BasicCard } from '../components/BasicCard';
import { TitleCard } from '../components/TitleCard';
import { HoverableCard } from '../components/HoverableCard';

function Home() {
  return (
    <React.Fragment>
      <div>
        <TitleCard>Nextron with Emotion</TitleCard>
        <BasicCard>
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </BasicCard>
        <HoverableCard>
          With <code>:hover</code>.
        </HoverableCard>
      </div>
    </React.Fragment>
  );
};

export default Home;
