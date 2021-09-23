import { Modal, Form, Input, DatePicker } from 'antd';

const TradeForm = ({ visible, onCreate, onCancel, id }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Add Trade"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            values.admin = true;
            values._id = id;
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="trade"
          label="Trade name"
          rules={[
            {
              required: true,
              message: 'Please input the trade!',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="expiracy_date"
          label="Expiracy date"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input the expiracy date!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TradeForm;
