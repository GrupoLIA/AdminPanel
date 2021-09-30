import { useContext } from 'react';
import { UserContext } from '../../../contexts/user/userContext';
import DashboardHOC from '../dashboard/DashboardHOC';
import UserTable from '../table/UserTable';
import CustomLoader from '../../common/CustomLoader';

const UserListPage = () => {
  const { users, loading } = useContext(UserContext).state;

  return (
    <div>
      {!loading ? (
        <UserTable data={users} />
      ) : (
        <CustomLoader text={'Getting users from DB'} />
      )}
    </div>
  );
};

export default DashboardHOC(UserListPage);
