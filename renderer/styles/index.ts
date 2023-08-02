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
  UsergroupAddOutlined,
  SendOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Checkbox, Collapse, DatePicker, Form, Input } from 'antd';
import styled from '@emotion/styled';

// Wrappers
export const InputWrapper = styled.div`
  width: 100%;
  padding: 10px;
  overflow-y: auto;
`;

export const DmWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const MsgsWrapper = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  margin: 10px 0px;

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: #222222;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const MsgWrapper = styled.div`
  display: flex;
  padding: 3px;
`;

export const MsgContentWrapper = styled.div`
  padding: 6px;
  width: 100%;
  white-space: pre-wrap;
`;

export const MsgDateWrapper = styled.span`
  color: gray;
  font-size: 12px;
  font-weight: 600;
  margin: 0px 5px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
`;

export const DateWrapper = styled.div`
  min-width: 90px;
  display: flex;
  justify-content: space-between;
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

export const EmailWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  :hover {
    background-color: #737373;
    border-radius: 8px;
  }
`;

export const TitleWrapper = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 26px;
`;

export const SideTabsWrapper = styled.div`
  width: 100px;
  height: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
`;

export const ChildrenWrapper = styled.div`
  width: 100%;
  height: 98%;
  padding: 10px;
`;

// Icons
export const SendIcon = styled(SendOutlined)`
  color: white;
  font-size: 20px;
`;

export const ExportIcon = styled(ExportOutlined)`
  color: white;
  font-size: 18px;
`;

export const ChannelIcon = styled(UsergroupAddOutlined)`
  color: white;
  font-size: 22px;
`;

export const CloseIcon = styled(CloseCircleOutlined)`
  color: white;
  margin-left: 7px;
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

export const PlusIcon = styled(PlusOutlined)`
  background-color: white;
  font-size: 20px;
`;

export const DeleteIcon = styled(DeleteOutlined)`
  font-size: 20px;
  margin-right: 5px;
  margin-bottom: 3px;
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

// Inputs
export const ChatInput = styled(Input)`
  .ant-input-group-addon {
    background-color: white !important;
  }
  margin-bottom: 30px;
`;

export const MsgInput = styled(Input)`
  margin-bottom: 20px;
`;

export const TeamsInput = styled(Input)`
  .ant-input-group-addon {
    background-color: white !important;
  }
  margin-top: 10px;
`;

// Button
export const FormButton = styled(Button)`
  border: none;
  background-color: gray;
  color: white;
`;

// Collapse
export const CollapseLabel = styled.span`
  display: flex;
  align-items: center;
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

// others
export const Content = styled.div<{ state: boolean }>`
  text-decoration: ${(p) => (p.state ? 'line-through' : 'none')};
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => (p.state ? 'orange' : 'white')};
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

export const FormItem = styled(Form.Item)`
  margin-bottom: 35px;
`;

// Layout
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
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
  font-size: 14px;
  font-weight: bold;
  margin-top: 7px;
`;
