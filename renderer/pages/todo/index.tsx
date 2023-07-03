import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Checkbox, DatePicker, DatePickerProps, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { fireStore } from '../../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

const InputWrapper = styled.div`
  padding: 10px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateWrapper = styled.div`
  width: 110px;
  display: flex;
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

export default function Teams() {
  const [input, setInput] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [contents, setContents] = useState<any[]>([]);

  const inputOnChange = (e: any) => {
    setInput(e.target.value);
  };

  const plusOnClick = () => {
    addDoc(collection(fireStore, 'contents'), {
      title: input,
      date: date,
      state: false,
    }).then((result) => {
      setInput('');
      getContents();
    });
  };

  const getContents = async () => {
    await getDocs(collection(fireStore, 'contents')).then((result) => {
      setContents(result.docs);
    });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(fireStore, 'contents', id)).then(() => getContents());
  };

  const handleUpdate = async (id: string, state:boolean) => {
    await updateDoc(doc(fireStore, 'contents', id), { state: !state }).then(() => getContents());
    setInput('');
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(dateString);
  };

  useEffect(() => {
    getContents();
  }, []);
  return (
    <React.Fragment>
      <InputWrapper>
        <TeamsInput
          value={input}
          onChange={inputOnChange}
          addonBefore={<DatePick onChange={onChange} />}
          addonAfter={<PlusIcon onClick={plusOnClick} />}
        />

        {contents &&
          contents.map((c, i) => (
            <ContentWrapper key={i}>
              <DateWrapper>
                <CheckState onClick={() => handleUpdate(c.id as string, c.data().state)} checked={c.data().state} />
                <Content state={c.data().state}>{dayjs(c.data().date).format('YY-MM-DD')}</Content>
              </DateWrapper>
              <Content state={c.data().state}>{c.data().title}</Content>
              <DeleteIcon onClick={() => handleDelete(c.id as string)} />
            </ContentWrapper>
          ))}

      </InputWrapper>
    </React.Fragment>
  );
}
