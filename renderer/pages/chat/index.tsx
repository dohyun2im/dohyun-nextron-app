import React, { useEffect, useState } from 'react';
import { DatePickerProps } from 'antd';
import { auth, fireStore } from '../../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
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
  InputWrapper,
  PlusIcon,
} from '../../styles';

export default function Chat() {
  const [input, setInput] = useState<string>('');
  const [friends, setFriends] = useState<string[]>([]);
  const [date, setDate] = useState<string>(dayjs(new Date()).format('YYYY-MM-DD'));
  const [contents, setContents] = useState<any[]>([]);

  const inputOnChange = (e: any): void => {
    setInput(e.target.value);
  };

  const addContents = async (): Promise<void> => {
    await addDoc(collection(fireStore, 'contents'), {
      title: input,
      name: auth.currentUser.email,
      date: date,
      state: false,
    }).then((result) => {
      setInput('');
      getContents();
    });
  };

  const getfriends = async (): Promise<void> => {
    const username = auth.currentUser.email;

    const friends = await getDocs(collection(fireStore, 'friend'));
    const filteredF = friends.docs
      .filter((u) => u.data().user === username || u.data().friend === username)
      .map((u) => (u.data().user === username ? u.data().friend : u.data().user));

    setFriends(filteredF);
  };

  const getContents = async (): Promise<void> => {
    await getDocs(collection(fireStore, 'contents')).then((result) => {
      setContents(result.docs);
    });
  };

  const handleDelete = async (id: string): Promise<void> => {
    await deleteDoc(doc(fireStore, 'contents', id)).then(() => getContents());
  };

  const handleUpdate = async (id: string, state: boolean): Promise<void> => {
    await updateDoc(doc(fireStore, 'contents', id), { state: !state }).then(() => getContents());
    setInput('');
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString);
  };

  useEffect(() => {
    getContents();
    getfriends();
  }, []);

  return (
    <React.Fragment>
      <InputWrapper>
        <ChatInput
          value={input}
          placeholder="Add To do"
          onChange={inputOnChange}
          onPressEnter={addContents}
          addonBefore={<DatePick onChange={onChange} />}
          addonAfter={<PlusIcon onClick={addContents} />}
        />

        {contents &&
          contents.map((c) => {
            if (friends.includes(c.data().name) || auth.currentUser.email === c.data().name) {
              return (
                <ContentWrapper key={c.id}>
                  <ChatEmailWrapper>
                    <DateWrapper>
                      <CheckState
                        onClick={() => handleUpdate(c.id as string, c.data().state)}
                        checked={c.data().state}
                      />
                      <Content state={c.data().state}>{dayjs(c.data().date).format('YY-MM-DD')}</Content>
                    </DateWrapper>
                    <Content state={c.data().state}>{c.data().name?.split('@')[0]}</Content>
                  </ChatEmailWrapper>
                  <Content state={c.data().state}>{c.data().title}</Content>
                  <DeleteIcon onClick={() => handleDelete(c.id as string)} />
                </ContentWrapper>
              );
            }
            return null;
          })}
      </InputWrapper>
    </React.Fragment>
  );
}
