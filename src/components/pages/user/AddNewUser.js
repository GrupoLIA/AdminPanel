import { useContext } from 'react';
import { UserContext } from '../../../contexts/user/userContext';
import UserForm from '../forms/UserForm';
import DashboardHOC from '../dashboard/DashboardHOC';

const AddNewUser = () => {
  const { addUser } = useContext(UserContext);
  const onFinish = (values) => addUser(values);

  return (
    <>
      <UserForm onFinish={onFinish} />
    </>
  );
};

export default DashboardHOC(AddNewUser);
