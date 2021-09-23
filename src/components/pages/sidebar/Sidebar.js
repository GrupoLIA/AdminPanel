import { Layout, Menu, Typography } from 'antd';
import { UserOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SidebarStyled from './SidebarStyled';

const Sidebar = ({ collapsed, index, loggedInUserId }) => (
  <SidebarStyled collapsed={collapsed}>
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      // style={{
      //   overflow: 'auto',
      //   height: '100vh',
      //   position: 'fixed',
      //   left: 0
      // }}
    >
      <div className="logo">
        <Typography.Title level={2}>Admin Panel</Typography.Title>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        className="sidebar-items"
        defaultSelectedKeys={[index]}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link className="text-white" to="/">
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link className="text-white" to="/users">
            Users
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SettingOutlined />}>
          <Link to={`/user/${loggedInUserId}`}></Link>
          Account Settings
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  </SidebarStyled>
);

export default Sidebar;
