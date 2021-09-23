import { useState, useEffect, useContext } from 'react';
import { Layout, message } from 'antd';
import { UserContext } from '../../../contexts/user/userContext';
import Sidebar from '../sidebar/Sidebar';
import PageHeader from '../header/Header';
import CustomFooter from '../footer/Footer';

const DashboardHOC = (Component) => {
  return function DashboardCustomHoc(props) {
    const [collapsed, setCollapsed] = useState(false);
    const { state, UserReset } = useContext(UserContext);
    const handleSetCollapsed = () => setCollapsed(!collapsed);

    const {
      error,
      errResponse,
      message: userMessage,
      me: loggedInUser,
    } = state;

    useEffect(() => {
      if (error) {
        message.error(errResponse);
        UserReset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, errResponse]);

    useEffect(() => {
      if (userMessage) {
        message.success(userMessage);
        UserReset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userMessage]);

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar
          collapsed={collapsed}
          toggle={handleSetCollapsed}
          loggedInUserId={loggedInUser ? loggedInUser._id : null}
        />
        <Layout className="site-layout">
          <PageHeader history={props.history} />
          <div className="container">
            <Component {...props} />
          </div>
          <CustomFooter />
        </Layout>
      </Layout>
    );
  };
};

export default DashboardHOC;
