import { Table } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    responsive: ['lg'],
  },
  {
    title: 'email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
    render: (text, record) => <Link to={`/user/${record._id}`}>{text}</Link>,
    sortDirections: ['descend', 'ascend'],
    responsive: ['md'],
  },
  {
    title: 'Telephones',
    dataIndex: 'telephones',
    render: (phones) =>
      phones.map((phone, index) => <div key={index}>{phone}</div>),
    sorter: (a, b) => a.telephones.length - b.telephones.length,
  },
  {
    title: 'Trades',
    dataIndex: 'trades',
    render: (value) => value.length,
    sorter: (a, b) => a.trades.length - b.trades.length,
  },
];

const UserTable = ({ data }) => (
  <>
    <Table
      className="clearfix"
      columns={columns}
      dataSource={data}
      style={{ clear: 'both' }}
    />
  </>
);

export default UserTable;
