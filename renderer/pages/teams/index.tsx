import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { fireStore } from '../../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const InputWrapper = styled.div`
  padding: 10px;
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

export default function Teams() {
  const [input, setInput] = useState<string>('');
  const [contents, setContents] = useState<any[]>([]);

  const inputOnChange = (e: any) => {
    setInput(e.target.value);
  };

  const plusOnClick = () => {
    addDoc(collection(fireStore, 'contents'), {
      input,
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

  const handleUpdate = async (id: string) => {
    await updateDoc(doc(fireStore, 'contents', id), { input }).then(() => getContents());
    setInput('');
  };

  useEffect(() => {
    getContents();
  }, []);

  return (
    <React.Fragment>
      <InputWrapper>
        <TeamsInput value={input} onChange={inputOnChange} addonAfter={<PlusIcon onClick={plusOnClick} />} />
        {contents &&
          contents.map((c) => (
            <>
              <div>{c.id}</div>
              <div>{c.data().input}</div>
              <div onClick={() => handleUpdate(c.id as string)}>to update</div>
              <div onClick={() => handleDelete(c.id as string)}>to trash</div>
              <br />
            </>
          ))}
      </InputWrapper>
    </React.Fragment>
  );
}
