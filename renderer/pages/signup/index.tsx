import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { CheckOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireStore } from '../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { FormButton, FormItem, FormWrapper, HeaderWrapper } from '../../styles';

export default function SignUp() {
  const [form] = Form.useForm();
  const [button, setButton] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const errorMsg = (m: string) => {
    messageApi.destroy();
    messageApi.error(m);
  };

  const onFinish = async (values: any): Promise<void> => {
    setButton(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(collection(fireStore, 'users'), {
        name: values.email as string,
      });
      form.resetFields();
    } catch (err) {
      setButton(false);
      switch (err.code) {
        case 'auth/weak-password':
          errorMsg('비밀번호는 6자리 이상이어야 합니다 .');
          break;
        case 'auth/invalid-email':
          errorMsg('잘못된 이메일 주소입니다 .');
          break;
        case 'auth/email-already-in-use':
          errorMsg('이미 가입되어 있는 계정입니다 .');
          break;
      }
    }
  };

  return (
    <React.Fragment>
      {contextHolder}
      <FormWrapper>
        <Form form={form} onFinish={onFinish}>
          <HeaderWrapper>
            <h2>회원 가입</h2>
          </HeaderWrapper>
          <FormItem
            name="email"
            rules={[
              {
                required: true,
                message: '필수 입력 항목입니다.',
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                type: 'email',
                message: '잘못된 형식의 이메일 주소입니다.',
              },
            ]}
          >
            <Input
              placeholder="Email Address"
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault();
                }
              }}
              type="email"
              prefix={<MailOutlined />}
            />
          </FormItem>

          <FormItem
            name="password"
            rules={[
              {
                required: true,
                message: '필수 입력 항목입니다.',
              },
              {
                pattern:
                  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$|^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: '대문자, 소문자, 숫자, 특수문자 중 3종류 조합, 8자 이상 입력 하세요.',
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined />}
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault();
                }
              }}
            />
          </FormItem>

          <FormItem
            name="passwordCheck"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '비밀번호 확인을 입력해주세요.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              prefix={<CheckOutlined />}
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault();
                }
              }}
            />
          </FormItem>

          <FormItem>
            <FormButton block htmlType={!button ? 'submit' : undefined} type="primary" disabled={button}>
              회원 가입
            </FormButton>
          </FormItem>
        </Form>
      </FormWrapper>
    </React.Fragment>
  );
}
