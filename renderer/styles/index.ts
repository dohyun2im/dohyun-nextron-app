import {
  CommentOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
  WhatsAppOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Checkbox, Collapse, DatePicker, Form, Input } from 'antd';
import styled from '@emotion/styled';

export const InputWrapper = styled.div`
  width: 100%;
  padding: 10px;
  overflow-y: auto;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
`;

export const ChatEmailWrapper = styled.div`
  min-width: 260px;
  display: flex;
  justify-content: space-between;
`;

export const DateWrapper = styled.div`
  min-width: 90px;
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div<{ state: boolean }>`
  text-decoration: ${(p) => (p.state ? 'line-through' : 'none')};
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => (p.state ? 'orange' : 'white')};
`;

export const ChatInput = styled(Input)`
  .ant-input-group-addon {
    background-color: white !important;
  }
  margin-bottom: 30px;
`;

export const CheckState = styled(Checkbox)`
  margin-left: 3px;
  margin-right: 6px;
`;

export const DatePick = styled(DatePicker)`
  border: none;
  .ant-picker-focused {
    border: none !important;
  }
`;

export const DeleteIcon = styled(DeleteOutlined)`
  font-size: 20px;
  margin-right: 5px;
  margin-bottom: 3px;
`;

export const HeaderWrapper = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 70px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  padding: 24px;
`;

export const FormItem = styled(Form.Item)`
  margin-bottom: 35px;
`;

export const FormButton = styled(Button)`
  border: none;
  background-color: gray;
  color: white;
`;

export const EmailWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export const TeamsInput = styled(Input)`
  .ant-input-group-addon {
    background-color: white !important;
  }
  margin-top: 10px;
`;

export const TeamsCollapse = styled(Collapse)`
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

export const CloseIcon = styled(CloseCircleOutlined)`
  color: white;
  font-size: 20px;
`;

export const AddUserIcon = styled(UserAddOutlined)`
  font-size: 16px;
  color: lightgray;
  margin: 5px 12.5px 5px 12.5px;
`;

export const BlackPlusIcon = styled(PlusCircleOutlined)`
  background-color: #222222;
  color: white;
  font-size: 22px;
  margin-left: 5px;
`;

export const CollapseLabel = styled.span`
  display: flex;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 26px;
`;

export const PlusIcon = styled(PlusOutlined)`
  background-color: white;
  font-size: 20px;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
`;

export const SideTabsWrapper = styled.div`
  width: 10vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
`;

export const ChildrenWrapper = styled.div`
  width: 84vw;
  height: 100vh;
  padding: 10px;
`;

export const SideBarTabsItem = styled.span`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 7px;
  margin-bottom: 20px;
  border-radius: 8px;
  :hover {
    scale: 1.07;
    background-color: #737373;
  }
`;

export const Logo = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  padding: 10px 0px 10px 10px;
  margin: 7px 0px 21px 0px;
`;

export const UserAvatar = styled(Avatar)`
  width: 34px;
  height: 34px;
  background-color: #fde3cf;
  color: #f56a00;
  font-weight: bold;
  margin-top: 7px;
`;

export const UserIcon = styled(UserOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

export const LoginIcon = styled(LoginOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

export const LogoutIcon = styled(LogoutOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

export const ChatIcon = styled(CommentOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

export const CallIcon = styled(WhatsAppOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;

export const SignUpIcon = styled(UserAddOutlined)`
  font-size: 18px;
  padding-bottom: 10px;
`;
