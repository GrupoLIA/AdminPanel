import { Table, Typography, DatePicker } from 'antd';
import moment from 'moment';

const { Text } = Typography;
const dateFormat = 'YYYY-MM-DD';

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    responsive: ['md'],
    width: '1%',
  },
  {
    title: 'Employer',
    dataIndex: 'employer',
  },
  {
    title: 'Employee',
    dataIndex: 'employee',
  },
  {
    title: 'Trade',
    dataIndex: 'trade',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Creation date',
    dataIndex: 'createdAt',
    render: (date) => (
      <DatePicker defaultValue={moment(date, dateFormat)} disabled />
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (text) => {
      switch (text) {
        case 'accepted':
          return <Text type="success">{text}</Text>;
        case 'pending':
          return <Text type="warning">{text}</Text>;
        case 'expired':
          return <Text type="danger">{text}</Text>;
        case 'finished':
          return <Text italic>{text}</Text>;
        default:
          return;
      }
    },
  },
];

const ContractTable = ({ data }) => (
  <>
    <Table
      className="clearfix"
      columns={columns}
      dataSource={data}
      style={{ clear: 'both' }}
      rowkey="id"
    />
  </>
);

export default ContractTable;
