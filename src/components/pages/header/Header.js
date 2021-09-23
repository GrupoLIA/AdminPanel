import { useContext } from 'react';
import { Layout, Menu, Dropdown, Typography } from 'antd';
import { UserContext } from '../../../contexts/user/userContext';
import HeaderStyled from './HeaderStyled';
import Avatar from 'antd/lib/avatar/avatar';
import {
  UserOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const PageHeader = ({ collapsed, toggle, history }) => {
  const { state } = useContext(UserContext);
  const { me } = state;

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <span onClick={() => handleLogout()}>Log out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderStyled>
      <Layout.Header className="site-layout-background d-flex">
        {collapsed ? (
          <ArrowLeftOutlined className="trigger" onClick={toggle} />
        ) : (
          <ArrowRightOutlined className="trigger" onClick={toggle} />
        )}
        <div className="mr-5 mx-auto">
          <div className="name-header mx-3">
            <Dropdown overlay={menu}>
              <button
                className="ant-dropdown-link button"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar icon={<UserOutlined />} />
              </button>
            </Dropdown>
            <Typography.Text>
              {me ? me.email.split('@')[0] : 'Admin'}
            </Typography.Text>
          </div>
        </div>
      </Layout.Header>
    </HeaderStyled>
  );
};

export default PageHeader;
