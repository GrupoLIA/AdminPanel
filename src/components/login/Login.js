import React, { useContext, useEffect } from 'react';
import { Form, notification, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/auth/authContext';
import { UserContext } from '../../contexts/user/userContext';
import checkAdminAuth from '../../utils/adminAuth';

const Login = ({ history }) => {
  const { LoginAction, state, AuthReset } = useContext(AuthContext);
  const { fetchLoggedInUser, fetchUsers } = useContext(UserContext);
  const { token, loading, error, errResponse } = state;
  const handleLogin = (values) => LoginAction(values);

  const openNotification = () => {
    const args = {
      message: 'Login Details',
      description: 'Please enter your credentials',
    };
    notification.open(args);
  };

  useEffect(() => {
    AuthReset();
    openNotification();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkAdminAuth(token)) {
      fetchLoggedInUser();
      fetchUsers();
      history.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, history]);

  useEffect(() => {
    if (error) {
      message.error(errResponse);
    }
  }, [error, errResponse]);

  return (
    <div className="container ">
      <div>
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-4 align-self-center text-center">
            <h2>Welcome</h2>
            <p>Input your login details to continue</p>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={handleLogin}
              size="large"
            >
              <Form.Item
                key="1"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  className="rounded-pill"
                />
              </Form.Item>
              <Form.Item
                key="2"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  className="rounded-pill"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
