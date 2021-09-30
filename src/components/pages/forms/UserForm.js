import { Link } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';

import {
  Form,
  Input,
  Button,
  Select,
  Avatar,
  Row,
  Col,
  DatePicker,
} from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';

// DatePicker need moment object to parse the date correctly
const changeUserData = (user) => {
  const newUser = { ...user, trades: [] };

  if (user.trades.length > 0) {
    user.trades.forEach((trade) => {
      newUser['trades'].push({
        ...trade,
        validation_date: moment(trade.validation_date),
        expiracy_date: moment(trade.expiracy_date),
      });
    });
  }

  return newUser;
};

const UserForm = ({ user, onFinish, addTradeModal, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(changeUserData(user));
  }, [form, user]);

  return (
    <>
      <Form
        name="user_details_form"
        className="login-form"
        onFinish={onFinish}
        layout="vertical"
        size="large"
        initialValues={changeUserData(user)}
        style={{ clear: 'both' }}
        form={form}
      >
        <Row justify="center">
          <Col>
            <Avatar
              icon={<UserOutlined />}
              src={user.avatar}
              size={128}
              shape="square"
            />
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={user.email}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Role" name="role">
              <Select defaultValue={user.role}>
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item name="profile_description" label="Description">
              <Input.TextArea />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="avatar" label="Image URL">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Col span={5}>
          {user &&
            user.telephones.map((phone, index) => (
              <Form.Item label="Telephone" name={['telephones', index]}>
                <Input prefix={<PhoneOutlined />} key={index} />
              </Form.Item>
            ))}
        </Col>

        <Col span={12}>
          <Form.Item
            label="Trades"
            rules={[
              {
                required: false,
              },
            ]}
          >
            {user.trades.map((trade, index) => (
              <div
                key={index}
                style={{
                  border: '1px gray solid',
                  marginBottom: '1em',
                  padding: '1em',
                }}
              >
                <Form.Item
                  name={['trades', index, '_id']}
                  hidden={true}
                  label="ID"
                >
                  <Input readOnly></Input>
                </Form.Item>

                <Form.Item name={['trades', index, 'trade']} label="Name">
                  <Input />
                </Form.Item>

                <Form.Item
                  name={['trades', index, 'validation_date']}
                  label="Validation"
                >
                  <DatePicker format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item
                  name={['trades', index, 'expiracy_date']}
                  label="Expiration Date"
                >
                  <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
              </div>
            ))}
          </Form.Item>
        </Col>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            className="mr-2"
            disabled={loading}
          >
            Update
          </Button>
          <Button onClick={() => addTradeModal()}>Add Trade</Button>
          <Button type="info" className="login-form-button">
            <Link to="/users">Back</Link>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserForm;
