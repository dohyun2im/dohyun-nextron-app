import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { fireStore } from '../../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

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

const PlusIcon = styled(PlusOutlined)`
  background-color: white;
  font-size: 20px;
`;

const AddUserIcon = styled(UserAddOutlined)`
  font-size: 16px;
  color: lightgray;
  margin: 5px 12.5px 5px 12.5px;
`;

export default function Teams() {
  const [input, setInput] = useState<string>('');

  const inputOnChange = (e: any) => {
    setInput(e.target.value);
  };

  const plusOnClick = async (): Promise<void> => {
    await addDoc(collection(fireStore, 'contents'), {
      title: input,
      state: false,
    }).then((result) => {
      setInput('');
    });
  };

  return (
    <React.Fragment>
      <InputWrapper>
        <TeamsInput
          value={input}
          placeholder="example.gmail.com"
          onChange={inputOnChange}
          addonBefore={<AddUserIcon />}
          addonAfter={<PlusIcon onClick={plusOnClick} />}
        />
      </InputWrapper>
    </React.Fragment>
  );
}
