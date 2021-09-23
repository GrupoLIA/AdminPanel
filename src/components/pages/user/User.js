import { useContext, useState, useEffect } from 'react';
import { Typography, Popconfirm, Button } from 'antd';
import { UserContext } from '../../../contexts/user/userContext';
import DashboardHOC from '../dashboard/DashboardHOC';
import UserStyled from './UserStyled';
import TradeForm from '../forms/TradeForm';
import UserForm from '../forms/UserForm';
import CustomLoader from '../../common/CustomLoader';

const SingleUser = (props) => {
  const {
    state,
    fetchSingleUser,
    editUserAction,
    deleteUserAction,
    addTradeAction,
  } = useContext(UserContext);

  const [tradeFormVisibility, settradeFormVisibility] = useState(false);

  const { loading, user } = state;

  const handlePasswordChange = (data) => {
    addTradeAction(data);
    settradeFormVisibility(false);
  };

  const addTradeModal = () => settradeFormVisibility(!tradeFormVisibility);

  const id = props.match.params.id;

  useEffect(() => {
    fetchSingleUser(id);
  }, [fetchSingleUser, id]);

  const onFinish = (values) => {
    values._id = user._id;
    // uncomment this line if you don't want to send the password to the server
    // delete values.password;
    editUserAction(values);
  };

  const onConfirmDelete = () => {
    deleteUserAction(id);
    props.history.push('/users');
  };

  return (
    <UserStyled>
      {user ? (
        <>
          <Typography>Edit {user.email}'s Profile</Typography>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={onConfirmDelete}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button className="float-right" danger>
              Delete {user.email}
            </Button>
          </Popconfirm>

          <UserForm
            user={user}
            onFinish={onFinish}
            addTradeModal={addTradeModal}
            loading={loading}
          />
        </>
      ) : (
        <CustomLoader text={'Getting user data, please wait'} />
      )}
      <TradeForm
        visible={tradeFormVisibility}
        onCreate={handlePasswordChange}
        loading={loading}
        onCancel={() => settradeFormVisibility(false)}
        id={id}
      />
    </UserStyled>
  );
};

export default DashboardHOC(SingleUser);
