import { message, Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { auth, fireStore } from '../../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import {
  AddUserIcon,
  BlackPlusIcon,
  CloseIcon,
  CollapseLabel,
  EmailWrapper,
  PlusIcon,
  TeamsCollapse,
  TeamsInput,
} from '../../styles';
import { frined } from '../../types';

export default function Teams() {
  const [input, setInput] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friends, setFriends] = useState<frined[]>([{ id: '0', name: 'No friends' }]);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = (e: any) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const warningMsg = useCallback(() => {
    messageApi.warning('존재하지 않는 사용자 입니다.');
  }, []);

  const errorMsg = useCallback(() => {
    messageApi.error('이미 추가 된 사용자 입니다.');
  }, []);

  const successMsg = useCallback(() => {
    messageApi.success('친구 추가 되었습니다.');
  }, []);

  const inputOnChange = (e: any) => {
    setInput(e.target.value);
  };

  const addFriend = async (): Promise<void> => {
    const username = auth.currentUser.email;

    const users = await getDocs(collection(fireStore, 'users'));
    const filteredU = users.docs.filter((u) => u.data().name === input);
    if (filteredU[0]?.data()?.name !== input || filteredU?.length !== 1) {
      warningMsg();
      return;
    }

    const friends = await getDocs(collection(fireStore, 'friend'));
    const filteredF = friends.docs.filter((u) => u.data().user === username && u.data().friend === input);
    if (filteredF?.length > 0) {
      errorMsg();
      return;
    }

    await addDoc(collection(fireStore, 'friend'), {
      user: username,
      friend: filteredU[0]?.data()?.name,
    }).then(() => {
      getfriends();
      successMsg();
      setInput('');
      handleClose();
    });
  };

  const getfriends = async (): Promise<void> => {
    const username = auth.currentUser.email;

    const friends = await getDocs(collection(fireStore, 'friend'));
    const filteredF = friends.docs
      .filter((u) => u.data().user === username || u.data().friend === username)
      .map((u) =>
        u.data().user === username ? { id: u.id, name: u.data().friend } : { id: u.id, name: u.data().user },
      );

    if (filteredF?.length === 0) setFriends([{ id: '0', name: 'No friends' }]);
    else setFriends(filteredF);
  };

  const deletefriends = async (id: string): Promise<void> => {
    await deleteDoc(doc(fireStore, 'friend', id)).then(() => getfriends());
  };

  const AddfriendModal = () => (
    <React.Fragment>
      <CollapseLabel>
        Teams
        <BlackPlusIcon onClick={showModal} />
      </CollapseLabel>
      <Modal title="Add friend" open={isModalOpen} onCancel={handleClose} footer={[]}>
        <TeamsInput
          value={input}
          placeholder="example.gmail.com"
          onChange={inputOnChange}
          onPressEnter={addFriend}
          addonBefore={<AddUserIcon />}
          addonAfter={<PlusIcon onClick={addFriend} />}
        />
      </Modal>
    </React.Fragment>
  );

  useEffect(() => {
    getfriends();
  }, []);

  return (
    <React.Fragment>
      {contextHolder}
      <TeamsCollapse
        ghost
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: <AddfriendModal />,
            children: friends.map((f: frined) => (
              <EmailWrapper key={f.id}>
                <span>{f.name}</span>
                {f.id !== '0' && <CloseIcon onClick={() => deletefriends(f.id)} />}
              </EmailWrapper>
            )),
          },
        ]}
      />
    </React.Fragment>
  );
}
