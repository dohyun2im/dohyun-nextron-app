import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Checkbox, DatePicker, DatePickerProps, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { auth, fireStore } from '../../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

const InputWrapper = styled.div`
  padding: 10px;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
`;

const EmailWrapper = styled.div`
  min-width: 260px;
  display: flex;
  justify-content: space-between;
`;

const DateWrapper = styled.div`
  min-width: 90px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div<{ state: boolean }>`
  text-decoration: ${(p) => (p.state ? 'line-through' : 'none')};
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => (p.state ? 'orange' : 'white')};
`;

const TeamsInput = styled(Input)`
  .ant-input-group-addon {
    background-color: white !important;
  }
  margin-bottom: 30px;
`;

const CheckState = styled(Checkbox)`
  margin-left: 3px;
  margin-right: 6px;
`;

const DatePick = styled(DatePicker)`
  border: none;
  .ant-picker-focused {
    border: none !important;
  }
`;

const PlusIcon = styled(PlusOutlined)`
  background-color: white;
  font-size: 20px;
`;

const DeleteIcon = styled(DeleteOutlined)`
  font-size: 20px;
  margin-right: 5px;
  margin-bottom: 3px;
`;

export default function Todo() {
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
        <TeamsInput
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
                  <EmailWrapper>
                    <DateWrapper>
                      <CheckState
                        onClick={() => handleUpdate(c.id as string, c.data().state)}
                        checked={c.data().state}
                      />
                      <Content state={c.data().state}>{dayjs(c.data().date).format('YY-MM-DD')}</Content>
                    </DateWrapper>
                    <Content state={c.data().state}>{c.data().name?.split('@')[0]}</Content>
                  </EmailWrapper>
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
