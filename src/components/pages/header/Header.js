import { useContext } from 'react';
import { Layout, Menu, Dropdown, Typography } from 'antd';
import { UserContext } from '../../../contexts/user/userContext';
import HeaderStyled from './HeaderStyled';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';

const PageHeader = ({ history }) => {
  const { state, logOut } = useContext(UserContext);
  const { me } = state;

  const handleLogout = async () => {
    await logOut();
    localStorage.clear();
    history.push('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span onClick={() => handleLogout()}>Log out</span>
      </Menu.Item>
    </Menu>
  );

  function capitalize(str) {
    const lower = str.toLowerCase();

    return str.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <HeaderStyled>
      <Layout.Header className="site-layout-background d-flex">
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
            <Typography.Text strong={true}>
              {me ? capitalize(me.email.split('@')[0]) : 'Admin'}
            </Typography.Text>
          </div>
        </div>
      </Layout.Header>
    </HeaderStyled>
  );
};

export default PageHeader;
