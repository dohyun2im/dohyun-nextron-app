import React, { useEffect, useState } from 'react';
import { auth, fireStore } from '../../firebase/firebase';
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { EmailWrapper, ExportIcon, DmWrapper, SendIcon, TeamsCollapse } from '../../styles';
import { Input } from 'antd';

export default function Dm() {
  const [dmRoom, setDmRoom] = useState<any>();
  const [active, setActive] = useState<string[]>(['1']);
  const [header, setHeader] = useState<string>('Direct Message');
  const [input, setInput] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');

  const getDmRoom = async (): Promise<void> => {
    const username = auth.currentUser.email;
    await getDocs(query(collection(fireStore, 'dm'), where('user', 'array-contains-any', [username]))).then(
      (result) => {
        setDmRoom(result.docs);
      },
    );
  };

  const deleteDmRoom = async (e: any, id: string): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();
    await deleteDoc(doc(fireStore, 'dm', id)).then(() => getDmRoom());
  };

  const collapseOnchange = (key: string[]): void => {
    setActive(key);
  };

  const handleEmailClick = (id: string, email: string): void => {
    if (header !== `${email} 님과 대화`) {
      setHeader(`${email} 님과 대화`);
      setRoomId(id);
      setActive([]);
    } else {
      setHeader('Direct Message');
      setActive(['1']);
    }
  };

  const handleSubmitMessage = async (): Promise<void> => {
    await updateDoc(doc(fireStore, 'dm', roomId), {
      msgs: arrayUnion({ from: auth.currentUser.email, msg: input }),
    }).then(() => {
      setInput('');
      getDmRoom();
    });
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    getDmRoom();
  }, []);

  return (
    <DmWrapper>
      <TeamsCollapse
        ghost
        activeKey={active}
        onChange={collapseOnchange}
        items={[
          {
            key: '1',
            label: header,
            children:
              dmRoom &&
              dmRoom.map((d: any) => {
                const email = d.data().user.filter((d) => d !== auth.currentUser.email)[0];
                return (
                  <EmailWrapper key={d.id} onClick={() => handleEmailClick(d.id, email)}>
                    <span>{email}</span>
                    <ExportIcon onClick={(e) => deleteDmRoom(e, d.id)} />
                  </EmailWrapper>
                );
              }),
          },
        ]}
      />
      {active.length === 0 && header !== 'Direct Message' && (
        <Input
          value={input}
          onChange={handleInputOnChange}
          onPressEnter={handleSubmitMessage}
          addonAfter={<SendIcon onClick={handleSubmitMessage} />}
        />
      )}
    </DmWrapper>
  );
}
