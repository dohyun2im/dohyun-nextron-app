import React, { useEffect, useState } from 'react';
import { auth, fireStore } from '../../firebase/firebase';
import { collection, deleteDoc, doc, getDocs, addDoc, query, where } from 'firebase/firestore';
import { CloseIcon, EmailWrapper, SendIcon, TeamsCollapse } from '../../styles';
import { frined } from '../../types';
import AddFriendModal from '../../components/friends/AddFriendModal';
import { useRouter } from 'next/router';

export default function Friends() {
  const [friends, setFriends] = useState<frined[]>([{ id: '0', name: 'No friends' }]);
  const router = useRouter();

  const getFriends = async (): Promise<void> => {
    const username = auth.currentUser.email;

    const friends = await getDocs(
      query(collection(fireStore, 'friends'), where('friends', 'array-contains-any', [username])),
    );
    console.log(friends);
    const filteredF = friends.docs.map((u) =>
      u.data().friends[0] === username
        ? { id: u.id, name: u.data().friends[1] }
        : { id: u.id, name: u.data().friends[0] },
    );
    console.log(filteredF);

    if (filteredF?.length === 0) setFriends([{ id: '0', name: 'No friends' }]);
    else setFriends(filteredF);
  };

  const deleteFriends = async (id: string): Promise<void> => {
    await deleteDoc(doc(fireStore, 'friend', id)).then(() => getFriends());
  };

  const startSendFriend = async (friendName: string): Promise<void> => {
    const username = auth.currentUser.email;
    let hasData = false;

    const friends = await getDocs(query(collection(fireStore, 'dm'), where('user', 'array-contains-any', [username])));

    for (const doc of friends.docs) {
      if (doc.data().user.includes(friendName)) {
        hasData = true;
        break;
      }
    }

    if (hasData) {
      console.log('return');
      router.push('/dm');
      return;
    }

    console.log('Add');
    await addDoc(collection(fireStore, 'dm'), {
      user: [username, friendName],
    }).then(() => {
      router.push('/dm');
    });
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <React.Fragment>
      <TeamsCollapse
        ghost
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: <AddFriendModal getFriends={getFriends} />,
            children: friends.map((f: frined) => (
              <EmailWrapper key={f.id}>
                <span>{f.name}</span>
                {f.id !== '0' && (
                  <span>
                    <SendIcon onClick={() => startSendFriend(f.name)} />
                    <CloseIcon onClick={() => deleteFriends(f.id)} />
                  </span>
                )}
              </EmailWrapper>
            )),
          },
        ]}
      />
    </React.Fragment>
  );
}
