import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Store from 'electron-store';
import { FormButton, FormItem, FormWrapper, HeaderWrapper } from '../../styles';

export default function SignIn() {
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
      await signInWithEmailAndPassword(auth, values.email, values.password);
      const store = new Store();
      store.set('email', values.email as string);
      store.set('pw', values.password as string);
      form.resetFields();
    } catch (err) {
      setButton(false);
      switch (err.code) {
        case 'auth/user-not-found':
          errorMsg('아이디가 존재하지 않습니다 .');
          break;
        case 'auth/wrong-password':
          errorMsg('비밀번호가 잘못 되었습니다 .');
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
            <h2>로그인</h2>
          </HeaderWrapper>
          <FormItem
            name="email"
            rules={[
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
                pattern:
                  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$|^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: '대문자, 소문자, 숫자, 특수문자 중 3종류 조합으로 8자 이상 설정 해주세요.',
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

          <FormItem>
            <FormButton block htmlType={!button ? 'submit' : undefined} type="primary" disabled={button}>
              로그인
            </FormButton>
          </FormItem>
        </Form>
      </FormWrapper>
    </React.Fragment>
  );
}
