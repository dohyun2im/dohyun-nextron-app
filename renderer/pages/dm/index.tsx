import React, { useEffect, useRef, useState } from 'react';
import { auth, fireStore } from '../../firebase/firebase';
import {
  Timestamp,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  EmailWrapper,
  ExportIcon,
  DmWrapper,
  SendIcon,
  TeamsCollapse,
  MsgInput,
  MsgsWrapper,
  UserAvatar,
  MsgWrapper,
  MsgContentWrapper,
  MsgDateWrapper,
} from '../../styles';
import { formatTimestampToTimeString } from '../../utils';
import { Message } from '../../types';

export default function Dm() {
  const [dmRoom, setDmRoom] = useState<any>();
  const [active, setActive] = useState<string[]>(['1']);
  const [header, setHeader] = useState<string>('Direct Message');
  const [input, setInput] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [msgs, setMsgs] = useState<Message[]>([]);
  const mRef = useRef<HTMLDivElement | null>(null);
  const username = auth.currentUser.email;

  const getDmRoom = async (): Promise<void> => {
    await getDocs(query(collection(fireStore, 'dm'), where('user', 'array-contains-any', [username]))).then(
      (result) => {
        setDmRoom(result.docs);
      },
    );
  };

  const deleteDmRoom = async (e: any, id: string): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();
    setMsgs([]);
    setRoomId('');
    await deleteDoc(doc(fireStore, 'dm', id)).then(() => getDmRoom());
  };

  const collapseOnchange = (key: string[]): void => {
    if (key[0] === '1') {
      setHeader('Direct Message');
      setMsgs([]);
      setRoomId('');
    }
    setActive(key);
  };

  const handleEmailClick = (id: string, email: string): void => {
    if (header !== `${email} 님과 대화`) {
      console.log('이메일');
      setHeader(`${email} 님과 대화`);
      setRoomId(id);
      setActive([]);
      setTimeout(() => {
        if (mRef.current) mRef.current.scrollTop = mRef.current.scrollHeight;
      }, 200);
    } else {
      setHeader('Direct Message');
      setRoomId('');
      setActive(['1']);
    }
  };

  const handleSubmitMessage = async (): Promise<void> => {
    await updateDoc(doc(fireStore, 'dm', roomId), {
      msgs: arrayUnion({ from: auth.currentUser.email, msg: input, createAt: Timestamp.fromDate(new Date()) }),
    }).then(() => {
      setInput('');
      getDmRoom();
      if (mRef.current) mRef.current.scrollTop = mRef.current.scrollHeight;
    });
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    getDmRoom();
  }, []);

  useEffect(() => {
    if (!roomId) return;
    onSnapshot(doc(fireStore, 'dm', roomId), (qs) => setMsgs(qs.data().msgs));
  }, [roomId]);

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
        <>
          <MsgsWrapper ref={mRef}>
            {msgs?.length > 0 &&
              msgs.map((msg, i) => (
                <MsgWrapper key={i}>
                  <UserAvatar>{msg.from.slice(0, 2)}</UserAvatar>
                  <MsgContentWrapper>
                    <div>
                      {msg.from}
                      <MsgDateWrapper>{formatTimestampToTimeString(msg.createAt.seconds)}</MsgDateWrapper>
                    </div>
                    <div>{msg.msg}</div>
                  </MsgContentWrapper>
                </MsgWrapper>
              ))}
          </MsgsWrapper>
          <MsgInput
            value={input}
            onChange={handleInputOnChange}
            onPressEnter={handleSubmitMessage}
            addonAfter={<SendIcon onClick={handleSubmitMessage} />}
          />
        </>
      )}
    </DmWrapper>
  );
}
