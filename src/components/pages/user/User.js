import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/user/userContext';
import DashboardHOC from '../dashboard/DashboardHOC';
import UserStyled from './UserStyled';
import TradeForm from '../forms/TradeForm';
import UserForm from '../forms/UserForm';
import CustomLoader from '../../common/CustomLoader';

const SingleUser = (props) => {
  const { state, fetchSingleUser, editUserAction, addTradeAction } =
    useContext(UserContext);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values) => {
    values._id = user._id;
    // uncomment this line if you don't want to send the password to the server
    // delete values.password;
    editUserAction(values);
  };

  return (
    <UserStyled>
      {user ? (
        <UserForm
          user={user}
          onFinish={onFinish}
          addTradeModal={addTradeModal}
          loading={loading}
        />
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
