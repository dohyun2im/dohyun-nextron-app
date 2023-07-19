import { CloseCircleOutlined, PlusCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Collapse, Input, message, Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { auth, fireStore } from '../../firebase/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { PlusIcon } from '../../styles';

const EmailWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const TeamsInput = styled(Input)`
  .ant-input-group-addon {
    background-color: white !important;
  }
  margin-top: 10px;
`;

const TeamsCollapse = styled(Collapse)`
  width: 100%;
  .ant-collapse-arrow,
  .ant-collapse-header-text,
  .ant-collapse-content-box {
    color: white !important;
    font-weight: 600;
  }
  .ant-collapse-content-box {
    border-bottom: 1px solid #eee;
  }
  .ant-collapse-header {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-radius: 0px !important;
  }
`;

const CloseIcon = styled(CloseCircleOutlined)`
  color: white;
  font-size: 20px;
`;

const AddUserIcon = styled(UserAddOutlined)`
  font-size: 16px;
  color: lightgray;
  margin: 5px 12.5px 5px 12.5px;
`;

const BlackPlusIcon = styled(PlusCircleOutlined)`
  background-color: #222222;
  color: white;
  font-size: 22px;
  margin-left: 5px;
`;

const CollapseLabel = styled.span`
  display: flex;
  align-items: center;
`;

interface frined {
  id: string;
  name: string;
}

export default function Teams() {
  const [input, setInput] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friends, setFriends] = useState<frined[]>([{ id: '0', name: 'No friends' }]);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = (e:any) => {
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
