import React, { useEffect, useState } from 'react';
import { DatePickerProps } from 'antd';
import { auth, fireStore } from '../../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import dayjs from 'dayjs';
import {
  ChatEmailWrapper,
  ChatInput,
  CheckState,
  Content,
  ContentWrapper,
  DatePick,
  DateWrapper,
  DeleteIcon,
  EmailWrapper,
  InputWrapper,
  PlusIcon,
  TeamsCollapse,
} from '../../styles';

export default function Dm() {
  const [dmRoom, setDmRoom] = useState<any>();

  const getDmRoom = async (): Promise<void> => {
    const username = auth.currentUser.email;
    await getDocs(query(collection(fireStore, 'dm'), where('user', 'array-contains-any', [username]))).then(
      (result) => {
        setDmRoom(result.docs);
      },
    );
  };

  useEffect(() => {
    getDmRoom();
  }, []);

  return (
    <React.Fragment>
      <TeamsCollapse
        ghost
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: 'Direct Message',
            children:
              dmRoom &&
              dmRoom.map((d: any) => (
                <EmailWrapper>
                  <span>{d.data().user.filter((d) => d !== auth.currentUser.email)[0]}</span>
                </EmailWrapper>
              )),
          },
        ]}
      />
    </React.Fragment>
  );
}
